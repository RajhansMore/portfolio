/**
 * TECH STACK COLOR MAPPING
 * Standard tech colors for project tile visualization
 */

export const TECH_COLORS: Record<string, string> = {
  // Languages
  'python': '#3776AB',      // Python blue
  'javascript': '#F7DF1E',  // JS yellow
  'typescript': '#3178C6',  // TS blue
  'java': '#007396',        // Java blue
  'sql': '#336791',         // SQL blue
  'cpp': '#00599C',         // C++ blue
  'csharp': '#239120',      // C# green
  'go': '#00ADD8',          // Go cyan
  'rust': '#CE422B',        // Rust red
  'php': '#777BB4',         // PHP purple

  // Frontend
  'react': '#61DAFB',       // React cyan
  'vue': '#4FC08D',         // Vue green
  'angular': '#DD0031',     // Angular red
  'nextjs': '#000000',      // Next.js black
  'svelte': '#FF3E00',      // Svelte red
  'tailwind': '#06B6D4',    // Tailwind cyan
  'bootstrap': '#7952B3',   // Bootstrap purple
  'materialui': '#007FFF',  // Material UI blue
  'gsap': '#88CE02',        // GSAP green
  'd3': '#F77D3E',          // D3 orange

  // Backend
  'nodejs': '#68A063',      // Node.js green
  'express': '#000000',     // Express black
  'fastapi': '#009485',     // FastAPI teal
  'django': '#092E20',      // Django green
  'flask': '#000000',       // Flask black
  'spring': '#6DB33F',      // Spring green
  'laravel': '#FF2D20',     // Laravel red

  // Databases
  'postgresql': '#336791',  // PostgreSQL blue
  'mongodb': '#13AA52',     // MongoDB green
  'mysql': '#00758F',       // MySQL blue
  'redis': '#DC382D',       // Redis red
  'firebase': '#FFCA28',    // Firebase yellow
  'elasticsearch': '#005571', // Elasticsearch blue
  'dynamodb': '#527FFF',    // DynamoDB blue

  // DevOps & Cloud
  'docker': '#2496ED',      // Docker blue
  'kubernetes': '#326CE5',  // Kubernetes blue
  'aws': '#FF9900',         // AWS orange
  'gcp': '#4285F4',         // GCP blue
  'azure': '#0078D4',       // Azure blue
  'vercel': '#000000',      // Vercel black
  'heroku': '#430098',      // Heroku purple
  'jenkins': '#D24939',     // Jenkins red
  'github': '#181717',      // GitHub black
  'gitlab': '#FC6D26',      // GitLab orange

  // Tools & Others
  'git': '#F1502F',         // Git red
  'webpack': '#8DD6F9',     // Webpack blue
  'vite': '#646CFF',        // Vite purple
  'npm': '#CB3837',         // NPM red
  'pip': '#3775A9',         // Pip blue
  'graphql': '#E10098',     // GraphQL pink
  'rest': '#009688',        // REST teal
  'websocket': '#FFB81C',   // WebSocket yellow
};

export const DEFAULT_TECH_COLOR = '#888888'; // Gray for unknown techs

/**
 * Get color for a tech stack item
 * @param techName - Name of the technology
 * @returns Hex color code
 */
export function getTechColor(techName: string): string {
  const normalized = techName.toLowerCase().trim();
  return TECH_COLORS[normalized] || DEFAULT_TECH_COLOR;
}

/**
 * Animation timings (in milliseconds)
 */
export const ANIMATION_TIMINGS = {
  STAGE1_DURATION: 3500, // Name reveal duration
  STAGE1_HOLD: 1000, // Additional hold after reveal
  STAGE2_DURATION: 3500, // About fade + name move duration
  STAGE2_HOLD: 1000, // Additional hold after Stage 2
  STAGE3_WARP_DURATION: 1500, // Warp effect to Mind Palace
  NODE_TRANSITION: 400, // Node expand/collapse duration
  HOVER_HIGHLIGHT: 300, // Skill node highlight on hover
};

/**
 * Neural network D3 visualization settings
 */
export const D3_CONFIG = {
  FORCE_STRENGTH: -300,
  LINK_DISTANCE: 150,
  NODE_RADIUS: 40,
  NODE_RADIUS_EXPANDED: 50,
  TICK_ITERATIONS: 300,
  COLLISION_RADIUS: 60,
};

/**
 * Z-index hierarchy for UI layers
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  NEURAL_NETWORK: 10,
  PERSISTENT_UI: 100,
  MODAL: 1000,
  TOOLTIP: 1100,
  LOADING: 2000,
};
