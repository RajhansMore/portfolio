'use client';

import React, { useEffect, useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
}

interface ExperienceViewProps {
  onClose?: () => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onClose }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/linkedin-parse');
        const data = await response.json();

        if (data.success && data.data?.experiences) {
          setExperiences(data.data.experiences);
        }
      } catch (err) {
        // Silently fail and show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-4 md:p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Experience</h2>
        <p className="text-gray-400">Professional work history</p>
      </FadeIn>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Loading experience data...</p>
          </div>
        </div>
      )}

      {/* Timeline */}
      {!loading && experiences.length > 0 ? (
        <StaggerContainer className="space-y-8">
          {experiences.map((exp, index) => (
            <StaggerItem key={index} className="relative pl-8 pb-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-950 shadow-lg shadow-blue-500/50"></div>

              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-2 top-8 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
              )}

              {/* Content */}
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 group">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>
                <p className="text-gray-400 text-sm mb-3">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </p>
                {exp.location && (
                  <p className="text-gray-500 text-sm mb-3">📍 {exp.location}</p>
                )}
                {exp.description && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : !loading && (
        <FadeIn className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Newly Graduate / Early Career</h3>
          <p className="text-gray-400 max-w-md">
            I am currently at the beginning of my professional journey, focusing on building a strong foundation in Computer Science and AI. I am actively seeking opportunities to apply my skills in real-world projects.
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default ExperienceView;
