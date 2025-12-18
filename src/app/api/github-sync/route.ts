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
    console.warn(
      '[GitHub Sync] No GITHUB_TOKEN found. Add it to .env.local to enable GitHub sync.'
    );
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
      console.error('[GitHub Sync] GraphQL Error:', json.errors);
      return [];
    }

    if (!json.data?.viewer?.repositories?.nodes) {
      console.warn('[GitHub Sync] No repositories found');
      return [];
    }

    // Filter repositories with 'portfolio-showcase' topic
    const portfolioTopic = portfolioConfig.github.portfolioTopic.toLowerCase();
    const syncedProjects: SyncedProject[] = json.data.viewer.repositories.nodes
      .filter((repo: any) => {
        const topics = repo.repositoryTopics?.nodes?.map((t: any) =>
          t.topic.name.toLowerCase()
        ) || [];
        return topics.includes(portfolioTopic);
      })
      .map((repo: any) => ({
        id: repo.name,
        name: repo.name,
        description: repo.description || 'No description provided',
        url: repo.url,
        imageUrl: repo.openGraphImageUrl,
        technologies:
          repo.languages?.nodes?.map((lang: any) => lang.name) || [],
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
      }));

    console.log(
      `[GitHub Sync] Synced projects: ${syncedProjects.map(p => p.name).join(', ')}`
    );
    console.log(
      `[GitHub Sync] Successfully synced ${syncedProjects.length} projects from GitHub`
    );
    return syncedProjects;
  } catch (error) {
    console.error('[GitHub Sync] Error fetching from GitHub:', error);
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
      console.log('[GitHub Sync] Returning cached projects');
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
    console.log('[GitHub Sync] Fetching fresh projects from GitHub');
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
    console.error('[GitHub Sync] Unexpected error:', error);
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
    console.error('[GitHub Sync] Error during forced refresh:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to force refresh GitHub projects',
      },
      { status: 500 }
    );
  }
}
