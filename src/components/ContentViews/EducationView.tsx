/**
 * EDUCATION CONTENT VIEW
 * Education history from LinkedIn CSV
 */

'use client';

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface EducationViewProps {
  onClose?: () => void;
}

export const EducationView: React.FC<EducationViewProps> = ({ onClose }) => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/linkedin-parse');
        const data = await response.json();

        if (data.success && data.data?.education) {
          setEducationList(data.data.education);
        } else {
          // If API fails, fall back to empty list (or handle error)
          // But since we want to support empty state, we just set empty
          if (data.data?.education) {
            setEducationList(data.data.education);
          } else {
            // If completely failed, maybe show error?
            // For now, let's assume if success is false, it's an error
            if (!data.success) setError('Failed to fetch education data');
          }
        }
      } catch (err) {
        setError('Error fetching education data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          Education
        </h2>
        <p className="text-gray-400">
          Academic background
        </p>
      </FadeIn>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400">Loading education data...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <FadeIn className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-gray-500 text-sm">
              Place your LinkedIn CSV export (Education.csv) in public/data/
            </p>
          </div>
        </FadeIn>
      )}

      {/* Education Timeline */}
      {!loading && !error && educationList.length > 0 && (
        <StaggerContainer className="space-y-6">
          {educationList.map((edu, index) => (
            <StaggerItem
              key={index}
              className="relative pl-8 pb-6 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3.5 top-1 w-6 h-6 bg-cyan-500 rounded-full border-2 border-slate-950 shadow-lg shadow-cyan-500/50"></div>

              {/* Content */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 hover:border-cyan-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 group">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {edu.school}
                    </h3>
                    <p className="text-cyan-400 font-semibold">
                      {edu.degree}
                    </p>
                  </div>
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 group-hover:bg-cyan-500/30 transition-colors">
                    {edu.endDate || edu.startDate}
                  </span>
                </div>

                <p className="text-gray-300 mb-3">
                  {edu.field}
                </p>

                <p className="text-gray-500 text-sm">
                  {edu.startDate} — {edu.endDate || 'Present'}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Empty State */}
      {!loading && !error && educationList.length === 0 && (
        <FadeIn className="flex items-center justify-center flex-1">
          <p className="text-gray-400 text-lg">No education history found in CSV.</p>
        </FadeIn>
      )}
    </div>
  );
};

export default EducationView;
