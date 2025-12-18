'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    direction = 'up',
    className = '',
}) => {
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up':
                return { y: 20 };
            case 'down':
                return { y: -20 };
            case 'left':
                return { x: 20 };
            case 'right':
                return { x: -20 };
            case 'none':
                return {};
            default:
                return { y: 20 };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...getDirectionOffset() }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
                duration: 0.5,
                delay: delay,
                ease: 'easeOut',
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = '' }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const Typewriter: React.FC<{
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
}> = ({ text, className = '', delay = 0, speed = 0.02 }) => {
    // Split text into words to preserve spacing better than characters
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: '5px' }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};
