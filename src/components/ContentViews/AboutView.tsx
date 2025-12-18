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
            className="w-full h-full flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl rounded-lg p-8 cursor-pointer overflow-hidden relative"
            onClick={onClose}
            onMouseMove={handleMouseMove}
        >
            {/* Subtle background glow */}
            <motion.div
                className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"
                style={{
                    x: useSpring(mouseX, springConfig),
                    y: useSpring(mouseY, springConfig),
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            <motion.div
                className="max-w-3xl text-center relative z-10"
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            >
                <FadeIn direction="down" className="mb-6 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-blue-500/50 p-1 mb-6 relative group flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-lg group-hover:bg-blue-500/30 transition-colors duration-500" />
                        <span className="text-6xl md:text-7xl font-bold text-white relative z-10 tracking-tighter group-hover:text-blue-400 transition-colors duration-500">
                            {portfolioConfig.personal.fullName.charAt(0)}
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        About <span className="text-blue-400">Me</span>
                    </h2>
                    <div className="h-1 w-20 bg-blue-500/50 mx-auto rounded-full" />
                </FadeIn>

                <div className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                    <Typewriter
                        text={portfolioConfig.personal.aboutMe}
                        speed={0.02}
                        delay={0.5}
                        className="justify-center"
                    />
                </div>

                <FadeIn delay={4} className="mt-12">
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-sm text-gray-500 flex flex-col items-center gap-2"
                    >
                        <span className="uppercase tracking-[0.2em] text-[10px]">Tap anywhere to continue</span>
                        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
                    </motion.div>
                </FadeIn>
            </motion.div>
        </div>
    );
};

export default AboutView;
