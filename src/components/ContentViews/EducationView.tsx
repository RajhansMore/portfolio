/**
 * EDUCATION CONTENT VIEW
 * Education history from LinkedIn CSV
 */

'use client';

import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';
import { portfolioConfig } from '@/config/portfolio.config';

interface EducationViewProps {
  onClose?: () => void;
}

export const EducationView: React.FC<EducationViewProps> = ({ onClose }) => {
  const educationList = portfolioConfig.education || [];

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

      {/* Education Timeline */}
      {educationList.length > 0 ? (
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
                    {edu.graduationYear}
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
      ) : (
        <FadeIn className="flex items-center justify-center flex-1">
          <p className="text-gray-400 text-lg">No education history found.</p>
        </FadeIn>
      )}
    </div>
  );
};

export default EducationView;
