import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import Papa from 'papaparse';
import { portfolioConfig } from '@/config/portfolio.config';

export interface LinkedInExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
}

export interface LinkedInEducation {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface LinkedInData {
  experiences: LinkedInExperience[];
  education: LinkedInEducation[];
  parsedAt: string;
  fileAge: number; // in days
  isStale: boolean;
}

/**
 * Check if CSV file exists and get its age
 */
function getCSVFileAge(): number {
  try {
    const csvPath = join(process.cwd(), 'public', 'data', 'linkedin.csv');
    readFileSync(csvPath);
    return 0;
  } catch {
    return -1; // File not found
  }
}

/**
 * Parse LinkedIn CSV export
 * Supports multiple files: Positions.csv, Education.csv, Profile.csv, or a combined linkedin.csv
 */
async function parseLinkedInCSV(): Promise<LinkedInData> {
  const experiences: LinkedInExperience[] = [];
  const education: LinkedInEducation[] = [];
  let fileAge = 0;
  let filesFound = 0;

  const FILES_TO_CHECK = [
    'Positions.csv',
    'Education.csv',
    'Profile.csv',
    'linkedin.csv'
  ];

  try {
    for (const filename of FILES_TO_CHECK) {
      const csvPath = join(process.cwd(), 'public', 'data', filename);

      let csvContent: string;
      try {
        csvContent = readFileSync(csvPath, 'utf-8');
        filesFound++;
      } catch (e) {
        continue; // File not found, skip
      }

      if (!csvContent) continue;

      // Parse CSV
      const { data: rows } = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: false,
        transformHeader: (h) => h.trim().toLowerCase(),
      });

      // Process rows
      for (const row of rows as any[]) {
        // Experience Detection
        const isExperience =
          (row['position'] || row['title'] || row['job title']) &&
          (row['company name'] || row['company']);

        // Education Detection
        const isEducation = row['school name'] || row['school'] || row['university'];

        if (isExperience) {
          experiences.push({
            title: row['position'] || row['title'] || row['job title'] || '',
            company: row['company name'] || row['company'] || '',
            startDate: row['started on'] || row['start date'] || '',
            endDate: row['finished on'] || row['end date'] || '',
            description: row['description'] || '',
            location: row['location'] || '',
          });
        } else if (isEducation) {
          education.push({
            school: row['school name'] || row['school'] || row['university'] || '',
            degree: row['degree name'] || row['degree'] || '',
            field: row['notes'] || row['field of study'] || row['field'] || '', // 'Notes' often contains field in some exports
            startDate: row['start date'] || '',
            endDate: row['end date'] || '',
          });
        }
      }
    }

    if (filesFound === 0) {
      throw new Error('ENOENT: No LinkedIn CSV files found');
    }

    const isStale = false; // Default to false for now

    return {
      experiences: experiences.filter((e) => e.title && e.company),
      education: education.filter((e) => e.school),
      parsedAt: new Date().toISOString(),
      fileAge,
      isStale,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * GET /api/linkedin-parse
 * Returns parsed LinkedIn experience and education data
 */
export async function GET(request: NextRequest) {
  try {
    const linkedinData = await parseLinkedInCSV();

    return NextResponse.json(
      {
        success: true,
        data: linkedinData,
      },
      { status: 200 }
    );
  } catch (error) {
    // If CSV not found, return empty data with helpful message
    if (error instanceof Error && error.message.includes('ENOENT')) {
      return NextResponse.json(
        {
          success: false,
          error: 'LinkedIn CSV not found',
          message:
            'Please place your LinkedIn data export (CSV) in public/data/linkedin.csv. ' +
            'Export your data from LinkedIn Settings > Personal Data.',
          data: {
            experiences: [],
            education: [],
            parsedAt: new Date().toISOString(),
            fileAge: -1,
            isStale: true,
          },
        },
        { status: 200 } // Return 200 even if file missing, allow graceful fallback
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to parse LinkedIn data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/linkedin-parse
 * Accept CSV file upload and parse
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const csvContent = await file.text();

    // Parse CSV
    const { data: rows } = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      transformHeader: (h) => h.trim().toLowerCase(),
    });

    const experiences: LinkedInExperience[] = [];
    const education: LinkedInEducation[] = [];

    for (const row of rows as any[]) {
      const isExperience =
        (row['position'] || row['title'] || row['job title']) &&
        (row['company name'] || row['company']);

      if (isExperience) {
        experiences.push({
          title: row['position'] || row['title'] || row['job title'] || '',
          company: row['company name'] || row['company'] || '',
          startDate: row['start date'] || '',
          endDate: row['end date'] || '',
          description: row['description'] || '',
          location: row['location'] || '',
        });
      } else if (row['school'] || row['university']) {
        education.push({
          school: row['school'] || row['university'] || '',
          degree: row['degree'] || '',
          field: row['field of study'] || row['field'] || '',
          startDate: row['start date'] || '',
          endDate: row['end date'] || '',
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          experiences: experiences.filter((e) => e.title && e.company),
          education: education.filter((e) => e.school),
          parsedAt: new Date().toISOString(),
          fileAge: 0,
          isStale: false,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to parse uploaded CSV',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
