'use client';

import React from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/UI/Animations';
import { motion } from 'framer-motion';

interface ResumeViewProps {
  onClose?: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ onClose }) => {
  const resumeLink = portfolioConfig.resume.googleDriveLink;
  const fileName = portfolioConfig.resume.fileName;

  return (
    <div className="w-full h-full flex flex-col bg-black/90 backdrop-blur-xl rounded-lg overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex-shrink-0 p-6 md:p-12 border-b border-slate-800/50 relative z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
          <FadeIn direction="down">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 md:mb-2 tracking-tight">
              Curriculum <span className="text-blue-400">Vitae</span>
            </h2>
            <p className="text-xs md:text-base text-gray-400 font-light">Professional background and technical expertise</p>
          </FadeIn>
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors p-2 bg-slate-900/50 rounded-full border border-slate-800"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 relative z-10">
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-full">
          <StaggerContainer className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 md:p-12 border border-slate-800 text-center shadow-2xl relative overflow-hidden group">
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <StaggerItem className="relative z-10">
              <div className="w-24 h-24 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors duration-500">
                <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </StaggerItem>

            <StaggerItem className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{fileName}</h3>
              <p className="text-gray-400 mb-10 max-w-md mx-auto font-light leading-relaxed">
                My comprehensive resume detailing my journey in Machine Learning, Software Engineering, and AI research.
              </p>
            </StaggerItem>

            <StaggerItem className="relative z-10">
              <motion.a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl shadow-blue-900/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Resume
              </motion.a>
            </StaggerItem>

            {/* Highlights Grid */}
            <StaggerItem className="mt-16 grid grid-cols-2 gap-4 relative z-10">
              {[
                { label: 'Skills', value: 'Full Stack, AIML, DevOps' },
                { label: 'Education', value: 'AIML' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 text-left hover:border-blue-500/30 transition-colors duration-300">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-200">{item.value}</p>
                </div>
              ))}
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
};

export default ResumeView;
