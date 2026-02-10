import { NextRequest, NextResponse } from 'next/server';
import { portfolioConfig } from '@/config/portfolio.config';

interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  createdAt: string;
  updatedAt: string;
  languages: Array<{ name: string }>;
}

interface SyncedProject {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  priority: number; // 1 = highest, 2 = medium, 3 = lowest
}

// In-memory cache (simple, resets on deployment - suitable for portfolio)
let projectCache: {
  data: SyncedProject[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = portfolioConfig.github.cacheDuration * 1000; // Convert to ms

/**
 * Query GitHub GraphQL API for repositories with portfolio-showcase topic
 */
async function fetchGitHubProjects(): Promise<SyncedProject[]> {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    return [];
  }

  try {
    const query = `
      query {
        viewer {
          repositories(
            first: 100
            orderBy: { field: CREATED_AT, direction: DESC }
            affiliations: [OWNER, COLLABORATOR]
          ) {
            nodes {
              name
              description
              url
              createdAt
              updatedAt
              openGraphImageUrl
              languages(first: 10) {
                nodes {
                  name
                }
              }
              repositoryTopics(first: 20) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();

    if (json.errors) {
      return [];
    }

    if (!json.data?.viewer?.repositories?.nodes) {
      return [];
    }

    // Filter repositories with 'portfolio-showcase' topic and extract priority
    const portfolioTopic = portfolioConfig.github.portfolioTopic.toLowerCase();

    const syncedProjects: SyncedProject[] = json.data.viewer.repositories.nodes
      .filter((repo: any) => {
        const topics = repo.repositoryTopics?.nodes?.map((t: any) =>
          t.topic.name.toLowerCase()
        ) || [];

        // Check for base topic or any priority variant
        const hasPortfolioTag = topics.some((topic: string) =>
          topic === portfolioTopic || topic.startsWith(`${portfolioTopic}-`)
        );

        return hasPortfolioTag;
      })
      .map((repo: any) => {
        const topics = repo.repositoryTopics?.nodes?.map((t: any) =>
          t.topic.name.toLowerCase()
        ) || [];

        // Extract priority from tags like 'portfolio-showcase-1', 'portfolio-showcase-2', etc.
        let priority = 3; // Default to lowest priority
        const priorityRegex = /portfolio-showcase-(\d+)/;

        for (const topic of topics) {
          const match = topic.match(priorityRegex);
          if (match && match[1]) {
            const extractedPriority = parseInt(match[1], 10);
            // Only accept valid priorities (1, 2, or 3)
            if (extractedPriority >= 1 && extractedPriority <= 3) {
              priority = extractedPriority;
              break;
            }
          }
        }

        return {
          id: repo.name,
          name: repo.name,
          description: repo.description || 'No description provided',
          url: repo.url,
          imageUrl: repo.openGraphImageUrl,
          technologies:
            repo.languages?.nodes?.map((lang: any) => lang.name) || [],
          createdAt: repo.createdAt,
          updatedAt: repo.updatedAt,
          priority,
        };
      })
      // Sort by priority first (ascending: 1, 2, 3), then by creation date (descending: newest first)
      .sort((a: SyncedProject, b: SyncedProject) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority; // Lower priority number = higher priority
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newer first
      });

    return syncedProjects;
  } catch (error) {
    return [];
  }
}

/**
 * GET /api/github-sync
 * Returns cached or fresh GitHub projects
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    // Check cache
    const now = Date.now();
    if (!refresh && projectCache && now - projectCache.timestamp < CACHE_DURATION) {
      return NextResponse.json(
        {
          success: true,
          data: projectCache.data,
          cached: true,
          timestamp: projectCache.timestamp,
        },
        { status: 200 }
      );
    }

    // Fetch fresh data
    const projects = await fetchGitHubProjects();

    // Update cache
    projectCache = {
      data: projects,
      timestamp: now,
    };

    return NextResponse.json(
      {
        success: true,
        data: projects,
        cached: false,
        timestamp: now,
        cacheExpire: now + CACHE_DURATION,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync GitHub projects',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/github-sync
 * Force refresh cache (useful for manual trigger)
 */
export async function POST(request: NextRequest) {
  try {
    // Clear cache to force refresh
    projectCache = null;

    const projects = await fetchGitHubProjects();

    projectCache = {
      data: projects,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        success: true,
        data: projects,
        forced: true,
        timestamp: projectCache.timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to force refresh GitHub projects',
      },
      { status: 500 }
    );
  }
}
