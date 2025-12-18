/**
 * INTERESTS CONTENT VIEW
 * Personal interests with descriptions in a tabular/list format
 */

'use client';

import React from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface InterestsViewProps {
  onClose?: () => void;
}

export const InterestsView: React.FC<InterestsViewProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          Interests & Hobbies
        </h2>
      </FadeIn>

      {/* Interests Timeline/List */}
      <StaggerContainer className="space-y-6">
        {(portfolioConfig.interests || []).map((item: any, index: number) => (
          <StaggerItem
            key={index}
            className="relative pl-8 pb-6 border-l-2 border-red-500/30 hover:border-red-500 transition-colors duration-300"
          >
            {/* Timeline dot */}
            <div className="absolute -left-3.5 top-1 w-6 h-6 bg-red-500 rounded-full border-2 border-slate-950 shadow-lg shadow-red-500/50"></div>

            {/* Content */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700 hover:border-red-500 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 group">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white flex-1 group-hover:text-red-400 transition-colors">
                  {item.name}
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {(!portfolioConfig.interests || portfolioConfig.interests.length === 0) && (
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-400 text-lg">No interests configured yet.</p>
        </div>
      )}
    </div>
  );
};

export default InterestsView;
