'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Background3DProps {
    visible: boolean;
    opacity?: number;
}

export const Background3D: React.FC<Background3DProps> = ({ visible, opacity = 1 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Particle system
        const particles: Particle[] = [];
        const particleCount = 200;

        // Theme-based colors
        const themeColors: Record<string, string[]> = {
            blue: ['#3b82f6', '#60a5fa', '#93c5fd'],
            green: ['#39FF14', '#58ff40', '#8cff7d'],
            purple: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
        };

        const currentColors = themeColors[theme] || themeColors.blue;

        class Particle {
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;
            color: string;

            constructor() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * width;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.vz = Math.random() * 0.5;
                this.size = Math.random() * 3 + 1;
                this.color = currentColors[Math.floor(Math.random() * currentColors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.z -= this.vz;

                if (this.z < 1 || Math.abs(this.x) > width / 2 || Math.abs(this.y) > height / 2) {
                    this.x = (Math.random() - 0.5) * width;
                    this.y = (Math.random() - 0.5) * height;
                    this.z = width;
                }
            }

            draw() {
                if (!ctx) return;
                const fov = 300;
                const scale = fov / (fov + this.z);
                const x2d = this.x * scale + width / 2;
                const y2d = this.y * scale + height / 2;

                ctx.beginPath();
                ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = Math.min(scale * 1.5, 1);
                ctx.fill();
            }
        }

        const resize = () => {
            if (!containerRef.current || !canvas) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const init = () => {
            resize();
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            ctx.lineWidth = 0.5;
            const accentColor = currentColors[0];

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dz = p1.z - p2.z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < 200) {
                        const fov = 300;
                        const scale1 = fov / (fov + p1.z);
                        const scale2 = fov / (fov + p2.z);

                        const x1 = p1.x * scale1 + width / 2;
                        const y1 = p1.y * scale1 + height / 2;
                        const x2 = p2.x * scale2 + width / 2;
                        const y2 = p2.y * scale2 + height / 2;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `${accentColor}${Math.floor(0.2 * (1 - dist / 200) * 255).toString(16).padStart(2, '0')}`;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 transition-opacity duration-1000 pointer-events-none"
            style={{ opacity: visible ? opacity : 0 }}
        >
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};
