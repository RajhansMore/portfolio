/**
 * SKILLS CONTENT VIEW
 * Categorized layout with skills grouped by category
 */

'use client';

import React, { useState, useMemo } from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';
import { motion } from 'framer-motion';

interface SkillsViewProps {
  onClose?: () => void;
}

const TECH_COLORS: Record<string, string> = {
  'React': '#61dafb',
  'TypeScript': '#3178c6',
  'Node.js': '#68a063',
  'Python': '#3776ab',
  'Java': '#b07219',
  'Next.js': '#666666',
  'Tailwind': '#06b6d4',
  'PostgreSQL': '#336791',
  'MongoDB': '#47a248',
  'TensorFlow': '#ff6f00',
  'PyTorch': '#ee4c2c',
  'Docker': '#2496ed',
  'AWS': '#ff9900',
  'Vercel': '#000000',
  'FastAPI': '#05998b',
  'Flask': '#000000',
  'Django': '#092e20',
  'Spring Boot': '#6db33f',
  'OpenCV': '#5c3ee8',
};

export const SkillsView: React.FC<SkillsViewProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    return TECH_COLORS[skillName] || '#3b82f6';
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <FadeIn direction="down" className="mb-6 md:mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Technical Arsenal</h2>
        <p className="text-gray-400 mb-6">Technologies and tools I use to bring ideas to life</p>

        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all focus:ring-1 focus:ring-blue-500/50 shadow-inner"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-focus-within:text-blue-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </FadeIn>

      {/* Categorized Skills */}
      <StaggerContainer className="space-y-10 flex-1">
        {Object.entries(groupedSkills).map(([category, skills]) => (
          <StaggerItem key={category}>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] whitespace-nowrap">
                {category}
              </h3>
              <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {skills.map((skill: any, index: number) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`group relative overflow-hidden rounded-xl p-4 bg-slate-900/40 border transition-all duration-300 ${skill.isHighlight ? 'border-blue-500/50 bg-blue-500/5' : 'border-slate-800'
                    } hover:border-blue-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 cursor-default`}
                >
                  {/* Background glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      backgroundColor: getTechColor(skill.name),
                      opacity: 0.05,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: getTechColor(skill.name) }}
                      >
                        {skill.name[0]}
                      </div>
                      {skill.isHighlight && (
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                      )}
                    </div>

                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{skill.name}</h4>

                    {skill.proficiency && (
                      <div className="mt-3 space-y-1.5">
                        <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                          <span>Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-slate-800/50 rounded-full h-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full"
                            style={{ backgroundColor: getTechColor(skill.name) }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {Object.keys(groupedSkills).length === 0 && (
        <FadeIn className="flex flex-col items-center justify-center flex-1 py-20 grayscale opacity-50">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <p className="text-gray-400 text-lg">No technologies match your search.</p>
        </FadeIn>
      )}
    </div>
  );
};

export default SkillsView;
