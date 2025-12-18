/**
 * EXTRACURRICULARS CONTENT VIEW
 * Achievement showcase with descriptions and dates
 */

'use client';

import React from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface ExtracurricularsViewProps {
  onClose?: () => void;
}

export const ExtracurricularsView: React.FC<ExtracurricularsViewProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          Extracurriculars
        </h2>
      </FadeIn>

      {/* Achievements Timeline */}
      <StaggerContainer className="space-y-6">
        {portfolioConfig.extracurriculars.map((item, index) => (
          <StaggerItem
            key={index}
            className="relative pl-8 pb-6 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors duration-300"
          >
            {/* Timeline dot */}
            <div className="absolute -left-3.5 top-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-slate-950 shadow-lg shadow-blue-500/50"></div>

            {/* Content */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white flex-1">
                  {item.title}
                </h3>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4">
                  {item.date}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Close Button */}
      {/* Back button now in PersistentUI */}
    </div>
  );
};

export default ExtracurricularsView;
