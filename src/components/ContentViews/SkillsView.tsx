/**
 * SKILLS CONTENT VIEW
 * Categorized layout with skills grouped by category
 */

'use client';

import React, { useState, useMemo } from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface SkillsViewProps {
  onClose?: () => void;
}

const TECH_COLORS: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Node.js': '#68a063',
  'Python': '#3776ab',
  'AWS': '#ff9900',
  'Docker': '#2496ed',
  'PostgreSQL': '#336791',
  'MongoDB': '#13aa52',
  'GraphQL': '#e10098',
  'REST': '#009688',
  'JavaScript': '#f7df1e',
  'Next.js': '#000000',
  'Tailwind': '#06b6d4',
  'Git': '#f1502f',
  'Kubernetes': '#326ce5',
  'Redis': '#dc382d',
};

export const SkillsView: React.FC<SkillsViewProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, any[]> = {};

    (portfolioConfig.skills || []).forEach((skill: any) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      // Filter by search
      if (searchQuery === '' || skill.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        groups[skill.category].push(skill);
      }
    });

    return groups;
  }, [searchQuery]);

  const getTechColor = (skillName: string): string => {
    return TECH_COLORS[skillName] || '#6366f1';
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-4 md:p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Technical Skills
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </FadeIn>

      {/* Categorized Skills */}
      <StaggerContainer className="space-y-8 flex-1">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <StaggerItem key={category}>
            <h3 className="text-xl font-bold text-slate-300 mb-4 uppercase tracking-wide">
              {category}
            </h3>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" delay={0.2}>
              {skills.map((skill: any, index: number) => (
                <StaggerItem
                  key={index}
                  className="group relative overflow-hidden rounded-lg p-4 bg-slate-900/50 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                    style={{
                      backgroundColor: getTechColor(skill.name),
                      opacity: 0.1,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div
                      className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: getTechColor(skill.name) }}
                    >
                      {skill.name[0]}
                    </div>
                    <h4 className="font-bold text-white mb-1">{skill.name}</h4>
                    {skill.proficiency && (
                      <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${skill.proficiency}%`,
                            backgroundColor: getTechColor(skill.name),
                          }}
                        />
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {Object.keys(groupedSkills).length === 0 && (
        <FadeIn className="flex items-center justify-center flex-1">
          <p className="text-gray-400 text-lg">No skills match your search.</p>
        </FadeIn>
      )}

      {/* Close Button */}
      {/* Back button now in PersistentUI */}
    </div>
  );
};

export default SkillsView;
