/**
 * PROJECTS CONTENT VIEW
 * GitHub-synced projects with auto-generated SVG tiles
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateProjectTileSVG } from '@/lib/project-tile-generator';
import { getTechColor } from '@/lib/constants';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';

interface ProjectData {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectsViewProps {
  onClose?: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onClose }) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Add a random seed to bust cache or just rely on refresh param
        const response = await fetch('/api/github-sync?refresh=true');
        const data = await response.json();

        if (data.success) {
          const sortedProjects = (data.data || []).sort((a: ProjectData, b: ProjectData) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setProjects(sortedProjects);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching GitHub projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper to parse description for problem/solution
  const parseDescription = (desc: string) => {
    if (!desc) return { main: 'No description provided', problem: '', challenge: '' };
    const parts = desc.split('---').map(p => p.trim());
    return {
      main: parts[0] || 'Technical Implementation',
      problem: parts[1] || 'Optimizing complex workflows through targeted technical solutions.',
      challenge: parts[2] || 'Maintaining performance while ensuring architectural integrity.'
    };
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <FadeIn direction="down" className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Innovation Lab</h2>
        <div className="flex items-center gap-4">
          <div className="h-1 w-20 bg-blue-500 rounded-full" />
          <p className="text-gray-400">Technical explorations and production-ready solutions</p>
        </div>
      </FadeIn>

      {/* Loading/Error/Grid states */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400 font-medium">Synchronizing repositories...</p>
          </div>
        </div>
      ) : error ? (
        <FadeIn className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-red-400 font-bold mb-2">Sync Failed</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">{error}</p>
          </div>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 pb-32">
          {projects.map((project) => {
            const { main, problem, challenge } = parseDescription(project.description);
            const tileSvg = generateProjectTileSVG(project.name, project.technologies);

            return (
              <StaggerItem key={project.id} className="group h-full">
                <div
                  onClick={() => window.open(project.url, '_blank')}
                  className="h-full flex flex-col md:flex-row bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden cursor-pointer"
                >
                  {/* Visual Side: Responsive Tech Stack Display */}
                  <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0 flex items-center justify-center bg-slate-950">
                    {/* Background SVG Tile */}
                    <div
                      className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                      style={{
                        backgroundImage: `url("${tileSvg}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />

                    {/* Tech Badges Grid */}
                    <div className="relative z-10 flex flex-wrap justify-center gap-2 p-6 md:p-8">
                      {project.technologies.slice(0, 8).map((tech: string, idx: number) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-[10px] font-black uppercase tracking-widest text-white shadow-xl flex items-center gap-2"
                          style={{ borderColor: `${getTechColor(tech)}88` }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getTechColor(tech) }} />
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Hover Overlay - Increased Z-Index to stay on top of tech badges */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-md z-20">
                      <div className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Open Repository
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-gradient-to-br from-transparent to-slate-950/20">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                        {project.name.replace(/-/g, ' ')}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
                        {main}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-black mb-1 opacity-80">Problem Analysis</h4>
                          <p className="text-xs text-gray-300 leading-relaxed font-light line-clamp-2 md:line-clamp-none">{problem}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-black mb-1 opacity-80">Tech Execution</h4>
                          <p className="text-xs text-gray-300 leading-relaxed font-light line-clamp-2 md:line-clamp-none">{challenge}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Footer */}
                    <div className="mt-8 flex items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Intel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
};

export default ProjectsView;
