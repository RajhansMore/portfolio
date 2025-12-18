'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themes = [
        { id: 'blue', color: '#3b82f6', label: 'Neural Blue' },
        { id: 'green', color: '#39FF14', label: 'Matrix Green' },
        { id: 'purple', color: '#8b5cf6', label: 'Cyber Purple' },
    ] as const;

    return (
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
            <div className="relative">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className="absolute bottom-12 md:bottom-14 left-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-xl p-2 md:p-3 flex flex-col gap-1 md:gap-2 shadow-2xl"
                        >
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id);
                                        setIsOpen(false);
                                    }}
                                    className={`flex items-center gap-2 md:gap-3 px-2 py-1.5 md:px-3 md:py-2 rounded-lg transition-all duration-300 ${theme === t.id ? 'bg-slate-800 text-white' : 'text-gray-400 hover:bg-slate-800/50 hover:text-gray-200'
                                        }`}
                                >
                                    <div
                                        className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                        style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}80` }}
                                    />
                                    <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_var(--accent-glow)]"
                    style={{ borderColor: 'var(--accent)' }}
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
};
