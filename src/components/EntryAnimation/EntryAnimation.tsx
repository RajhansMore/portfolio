'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';

interface EntryAnimationProps {
  onComplete: () => void;
}

export const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'name' | 'about' | 'complete'>('name');
  const [canAdvance, setCanAdvance] = useState(false);

  // Stage 1: Show name for 3 seconds
  useEffect(() => {
    if (stage === 'name') {
      const timer = setTimeout(() => {
        setCanAdvance(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Stage 2: Show about for 3 seconds
  useEffect(() => {
    if (stage === 'about') {
      const timer = setTimeout(() => {
        setCanAdvance(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleAdvance = () => {
    if (!canAdvance) return;

    if (stage === 'name') {
      setStage('about');
      setCanAdvance(false);
    } else if (stage === 'about') {
      setStage('complete');
      onComplete();
    }
  };

  // Handle keyboard/touch
  useEffect(() => {
    const handleKeyPress = () => {
      handleAdvance();
    };

    const handleTouchSwipe = (e: TouchEvent) => {
      if (canAdvance) {
        handleAdvance();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchSwipe);
    window.addEventListener('click', handleAdvance);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchSwipe);
      window.removeEventListener('click', handleAdvance);
    };
  }, [canAdvance, stage]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 to-black flex items-center justify-center">
      {stage === 'name' && (
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tighter"
          >
            {portfolioConfig.personal?.fullName}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-4"
          />
        </div>
      )}

      {stage === 'about' && (
        <div className="max-w-5xl px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-blue-500/50 p-1 mb-8 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
            >
              <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
                {portfolioConfig.personal.fullName.charAt(0)}
              </span>
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              {portfolioConfig.personal?.fullName}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed text-justify font-light">
              {portfolioConfig.personal?.aboutMe}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
              className="mt-12 text-[10px] text-gray-500 uppercase tracking-[0.4em]"
            >
              Click to skip
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EntryAnimation;
