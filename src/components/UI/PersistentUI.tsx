'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';
interface PersistentUIProps {
  onContactClick?: () => void;
  onBackClick?: () => void;
  onAboutClick?: () => void;
}

export const PersistentUI: React.FC<PersistentUIProps> = ({ onContactClick, onBackClick, onAboutClick }) => {
  return (
    <>
      {/* Top-left name anchor & Hook */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 group flex flex-col">
        <motion.button
          onClick={onAboutClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-lg md:text-2xl font-bold text-white transition-all duration-300 flex items-center gap-2 w-fit"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10 bg-slate-900/80 backdrop-blur-sm border border-slate-500 group-hover:border-blue-500 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-blue-400 font-bold text-xs md:text-sm transition-all duration-300 shadow-lg shadow-black/50 overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />
            <span className="relative z-10">{portfolioConfig.personal?.fullName?.charAt(0) || 'R'}</span>
          </div>

          <AnimatePresence>
            {!onBackClick && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col items-start"
              >
                <span className="relative z-10">{portfolioConfig.personal?.fullName}</span>
                {/* Animated underline */}
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Top-right social & contact & Resume */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex items-center gap-2 md:gap-4">
        {/* LinkedIn Icon */}
        {portfolioConfig.social?.linkedinUrl && (
          <a
            href={portfolioConfig.social?.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-600 hover:border-blue-500 transition-all duration-300 text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] group"
            title="LinkedIn Profile"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        )}

        {/* GitHub Icon */}
        {portfolioConfig.social?.githubUrl && (
          <a
            href={portfolioConfig.social?.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-600 hover:border-purple-500 transition-all duration-300 text-gray-400 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] group"
            title="GitHub Profile"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}

        {/* Resume Button */}
        {portfolioConfig.resume?.googleDriveLink && (
          <a
            href={portfolioConfig.resume.googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/50 hover:bg-blue-600 text-blue-400 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-xs md:text-sm tracking-wide group"
          >
            <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
        )}

        {/* Contact Button */}
        <button
          onClick={onContactClick}
          className="px-3 py-1.5 md:px-5 md:py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-500 hover:border-purple-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-xs md:text-sm tracking-wide"
        >
          Contact
        </button>
      </div>

      {/* Bottom-right scroll indicator + back button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col items-center gap-4">
        {/* Back Button */}
        {onBackClick && (
          <button
            onClick={onBackClick}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-110 active:scale-90 group"
            title="Go back"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default PersistentUI;
