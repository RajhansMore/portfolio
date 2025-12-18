/**
 * EXPERIENCE CONTENT VIEW
 * Work history from LinkedIn with timeline layout
 */

'use client';

import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';
import { portfolioConfig } from '@/config/portfolio.config';

interface ExperienceViewProps {
  onClose?: () => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onClose }) => {
  const experiences = portfolioConfig.experience || [];

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Experience</h2>
        <p className="text-gray-400">Professional work history</p>
      </FadeIn>

      {/* Timeline */}
      {experiences.length > 0 ? (
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
      ) : (
        <FadeIn className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Fresh Graduate / Early Career</h3>
          <p className="text-gray-400 max-w-md">
            Currently building my professional journey. Open to internships and full-time opportunities where I can apply my skills and grow.
          </p>
        </FadeIn>
      )}
    </div>
  );
};

export default ExperienceView;
