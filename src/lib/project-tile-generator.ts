/**
 * PROJECT TILE VISUALIZATION GENERATOR
 * 
 * Generates professional SVG placeholder tiles for GitHub projects
 * based on detected tech stack with standard tech colors
 */

import { getTechColor } from './constants';

export interface ProjectTile {
  name: string;
  description: string;
  technologies: string[];
  url: string;
  svgUrl: string; // Data URL of generated SVG
}

/**
 * Generate SVG placeholder for project tile
 * Shows abstract generative art based on project name
 */
export function generateProjectTileSVG(
  projectName: string,
  technologies: string[]
): string {
  const width = 400;
  const height = 250;

  // Robust hash function for better distribution
  let hash = 0;
  for (let i = 0; i < projectName.length; i++) {
    hash = ((hash << 5) - hash) + projectName.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Seeded random generator
  const random = (offset = 0) => {
    const x = Math.sin(hash + offset) * 10000;
    return x - Math.floor(x);
  };

  // Premium Dark Gradients
  const gradients = [
    ['#0f172a', '#334155'], // Slate
    ['#1e1b4b', '#312e81'], // Indigo
    ['#2e1065', '#581c87'], // Violet
    ['#172554', '#1e40af'], // Blue
    ['#022c22', '#047857'], // Emerald
    ['#450a0a', '#991b1b'], // Red
  ];

  const selectedGradient = gradients[Math.floor(random(0) * gradients.length)];
  const color1 = selectedGradient[0];
  const color2 = selectedGradient[1];

  // Choose a pattern style based on hash
  const styleType = Math.floor(random(5) * 3); // 0: Circuit, 1: Dots, 2: Waves

  let shapes = '';
  const accentColor = 'rgba(255, 255, 255, 0.1)';

  if (styleType === 0) {
    // Circuit/Tech Lines
    shapes = Array.from({ length: 12 }).map((_, i) => {
      const x1 = Math.floor(random(i * 10) * 10) * (width / 10);
      const y1 = Math.floor(random(i * 10 + 1) * 10) * (height / 10);
      const isHorizontal = random(i) > 0.5;
      const length = (random(i * 10 + 2) * 0.4 + 0.1) * (isHorizontal ? width : height);
      const x2 = isHorizontal ? x1 + length : x1;
      const y2 = isHorizontal ? y1 : y1 + length;

      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${accentColor}" stroke-width="${random(i) * 2 + 1}" />
              <circle cx="${x1}" cy="${y1}" r="2" fill="${accentColor}" />
              <circle cx="${x2}" cy="${y2}" r="2" fill="${accentColor}" />`;
    }).join('');
  } else if (styleType === 1) {
    // Dot Matrix
    shapes = Array.from({ length: 40 }).map((_, i) => {
      const x = Math.floor(random(i * 10) * 20) * (width / 20);
      const y = Math.floor(random(i * 10 + 1) * 10) * (height / 10);
      const r = random(i * 10 + 2) * 2 + 1;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="${accentColor}" />`;
    }).join('');
  } else {
    // Abstract Waves
    shapes = Array.from({ length: 5 }).map((_, i) => {
      const y = height * (0.2 + i * 0.15);
      const amplitude = 20 + random(i) * 30;
      const freq = 0.01 + random(i + 1) * 0.02;
      const points = Array.from({ length: 20 }).map((_, j) => {
        const x = (j / 19) * width;
        const py = y + Math.sin(x * freq + random(i) * 10) * amplitude;
        return `${x},${py}`;
      }).join(' ');

      return `<polyline points="${points}" fill="none" stroke="${accentColor}" stroke-width="2" />`;
    }).join('');
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="grad-${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1}" />
          <stop offset="100%" style="stop-color:${color2}" />
        </linearGradient>
        <pattern id="grid-${hash}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#grad-${hash})" />
      
      <!-- Grid Overlay -->
      <rect width="${width}" height="${height}" fill="url(#grid-${hash})" />
      
      <!-- Generative Shapes -->
      <g>
        ${shapes}
      </g>
      
      <!-- Vignette -->
      <radialGradient id="vig-${hash}" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="transparent" stop-opacity="0" />
        <stop offset="100%" stop-color="black" stop-opacity="0.4" />
      </radialGradient>
      <rect width="${width}" height="${height}" fill="url(#vig-${hash})" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
