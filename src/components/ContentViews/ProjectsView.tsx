/**
 * PROJECTS CONTENT VIEW
 * GitHub-synced projects with auto-generated SVG tiles
 */

'use client';

import React, { useEffect, useState } from 'react';
import { generateProjectTileSVG } from '@/lib/project-tile-generator';
import { portfolioConfig } from '@/config/portfolio.config';
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
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github-sync?refresh=true');
        const data = await response.json();

        if (data.success) {
          // Sort by createdAt descending (newest first)
          const sortedProjects = (data.data || []).sort((a: ProjectData, b: ProjectData) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setProjects(sortedProjects);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching GitHub projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const allTechs = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort();

  const displayedProjects = selectedTech
    ? projects.filter((p) => p.technologies.includes(selectedTech))
    : projects;

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 to-black rounded-lg p-8 overflow-y-auto">
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Projects</h2>
      </FadeIn>

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-400">Fetching your GitHub projects...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <FadeIn className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-gray-500 text-sm">
              Make sure GITHUB_TOKEN is configured and you have repositories
              tagged with 'portfolio-showcase'
            </p>
          </div>
        </FadeIn>
      )}

      {/* Projects Grid */}
      {!loading && !error && (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((project) => {
            const tileSvg = project.imageUrl || generateProjectTileSVG(
              project.name,
              project.technologies
            );

            return (
              <StaggerItem
                key={project.id}
                className="group cursor-pointer"
              >
                <div
                  onClick={() => window.open(project.url, '_blank')}
                  className="group relative h-full bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-800 hover:border-purple-500/50 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <img
                      src={tileSvg}
                      alt={project.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Overlay Button */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-purple-600/90 backdrop-blur-sm text-white text-sm font-bold rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Project
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-slate-800/80 text-gray-400 border border-slate-700 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] px-2 py-1 text-gray-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      {!loading && !error && displayedProjects.length === 0 && (
        <FadeIn className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-center">
            No projects found with the selected technology
          </p>
        </FadeIn>
      )}

      {/* Close Button */}
      {/* Back button now in PersistentUI */}
    </div>
  );
};

export default ProjectsView;
