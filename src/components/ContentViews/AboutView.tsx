/**
 * ABOUT CONTENT VIEW
 */

'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { portfolioConfig } from '@/config/portfolio.config';
import { Typewriter, FadeIn } from '@/components/UI/Animations';

interface AboutViewProps {
    onClose?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onClose }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <div
            className="w-full h-full flex flex-col items-center justify-start bg-black/90 backdrop-blur-xl rounded-lg p-4 md:p-8 cursor-pointer overflow-y-auto custom-scrollbar relative"
            onClick={onClose}
            onMouseMove={handleMouseMove}
        >
            {/* Subtle background glow */}
            <motion.div
                className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
                style={{
                    x: useSpring(mouseX, springConfig),
                    y: useSpring(mouseY, springConfig),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            <motion.div
                className="max-w-3xl text-center relative z-10 mt-12 md:mt-20"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
                <FadeIn direction="down" className="mb-4 md:mb-6 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32 rounded-full border-2 border-blue-500/50 p-1 mb-4 md:mb-6 relative group flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-lg group-hover:bg-blue-500/30 transition-colors duration-500" />
                        <span className="text-5xl sm:text-6xl md:text-6xl font-bold text-white relative z-10 tracking-tighter group-hover:text-blue-400 transition-colors duration-500">
                            {portfolioConfig.personal.fullName.charAt(0)}
                        </span>
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 tracking-tight">
                        About <span className="text-blue-400">Me</span>
                    </h2>
                    <div className="h-1 w-16 md:w-20 bg-blue-500/50 mx-auto rounded-full" />
                </FadeIn>

                <div className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light text-justify max-w-2xl mx-auto">
                    {portfolioConfig.personal.aboutMe.split('**').map((part: string, i: number) =>
                        i % 2 === 1 ? (
                            <span key={i} className="font-bold text-blue-400">
                                {part}
                            </span>
                        ) : (
                            part
                        )
                    )}
                </div>

                <FadeIn delay={1} className="mt-8 pb-32 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {portfolioConfig.interests.map((interest: any, i: number) => (
                            <div key={i} className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-xs text-gray-400">
                                {interest.name}
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </motion.div>
        </div>
    );
};

export default AboutView;
