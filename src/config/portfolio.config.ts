/**
 * MIND PALACE PORTFOLIO - CENTRALIZED CONFIGURATION
 */

export interface SkillItem {
  name: string;
  category:
  | 'Programming & Frameworks'
  | 'Machine Learning & AI'
  | 'Model Deployment & APIs'
  | 'Visualization & Frontend'
  | 'Cloud Computing & MLOps'
  | 'Data Engineering'
  | 'Soft Skills & Collaboration';
}

export interface CertificationItem {
  title: string;
  issuer: string;
  verificationLink: string;
  issuedDate: string;
}

export interface ExtracurricularItem {
  title: string;
  date: string;
  description: string;
}

export interface InterestItem {
  name: string;
  description: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const portfolioConfig = {
  // ============================================
  // PERSONAL INFORMATION
  // ============================================
  personal: {
    fullName: 'Rajhans More',
    email: 'rajhansmore045@gmail.com',
    phone: '+91 8669988338',
    profileImage: 'https://avatars.githubusercontent.com/u/132777364?v=4',
    title: 'Full Stack Developer & AI/ML Engineer',
    aboutMe: "I am a dedicated professional who prioritizes profound comprehension over mere execution. Where others might observe the surface, I delve into the nuances that define excellence. **I fell in love with coding when I built my first automated data pipeline**, seeing how logic could transform raw chaos into actionable insights. Beyond tech, I'm an avid **trekker and reader**, finding that the discipline of the trail and the perspective of a book both fuel my approach to complex problem-solving. My mission is to cultivate environments where synergy and innovation flourish.",
  },

  // ============================================
  // SOCIAL & EXTERNAL LINKS
  // ============================================
  social: {
    linkedinUrl: 'https://www.linkedin.com/in/rajhans-more-86593024a/',
    githubUrl: 'https://github.com/RajhansMore',
    contactFormBackend: process.env.NEXT_PUBLIC_CONTACT_FORM_URL || 'http://localhost:3000/api/contact',
  },

  // ============================================
  // RESUME / CV
  // ============================================
  resume: {
    googleDriveLink: process.env.NEXT_PUBLIC_RESUME_LINK || 'https://drive.google.com/file/d/14yjJ3cn0wFU1ULzuFhbOOOo7bBlYDL0A/view?usp=drive_link',
    fileName: 'Rajhans_More_Resume.pdf',
  },

  // ============================================
  // SKILLS & TECHNICAL STACK
  // ============================================
  skills: [
    // Programming & Frameworks
    { name: 'Python', category: 'Programming & Frameworks', proficiency: 95 },
    { name: 'Java', category: 'Programming & Frameworks', proficiency: 85 },
    { name: 'JavaScript', category: 'Programming & Frameworks', proficiency: 90 },
    { name: 'TypeScript', category: 'Programming & Frameworks', proficiency: 88, isHighlight: true },
    { name: 'Flask', category: 'Programming & Frameworks', proficiency: 80 },
    { name: 'Django', category: 'Programming & Frameworks', proficiency: 75 },
    { name: 'Spring Boot', category: 'Programming & Frameworks', proficiency: 70 },
    { name: 'Express.js', category: 'Programming & Frameworks', proficiency: 82 },
    { name: 'Next.js', category: 'Programming & Frameworks', proficiency: 90, isHighlight: true },

    // Machine Learning & AI
    { name: 'TensorFlow', category: 'Machine Learning & AI', proficiency: 85 },
    { name: 'PyTorch', category: 'Machine Learning & AI', proficiency: 80 },
    { name: 'OpenCV', category: 'Machine Learning & AI', proficiency: 88 },
    { name: 'Generative AI', category: 'Machine Learning & AI', proficiency: 82, isHighlight: true },
    { name: 'Transformers', category: 'Machine Learning & AI', proficiency: 78 },
    { name: 'NLP', category: 'Machine Learning & AI', proficiency: 85 },

    // Data Engineering
    { name: 'PostgreSQL', category: 'Data Engineering', proficiency: 85 },
    { name: 'MongoDB', category: 'Data Engineering', proficiency: 82 },
    { name: 'Pandas', category: 'Data Engineering', proficiency: 95 },
    { name: 'NumPy', category: 'Data Engineering', proficiency: 92 },

    // Cloud & DevOps
    { name: 'AWS', category: 'Cloud Computing & MLOps', proficiency: 75 },
    { name: 'Docker', category: 'Cloud Computing & MLOps', proficiency: 80 },
    { name: 'Vercel', category: 'Cloud Computing & MLOps', proficiency: 90 },
  ] as (SkillItem & { proficiency?: number, isHighlight?: boolean })[],

  // ============================================
  // CERTIFICATIONS
  // ============================================
  certifications: [
    {
      title: 'Mastering Multimodal RAG',
      issuer: 'Analytics Vidya',
      verificationLink: 'https://drive.google.com/file/d/18As2IVbkzW6Pa53pht8bOy9qJcq8pMzh/view',
      issuedDate: '2025-06',
    },
    {
      title: 'Computer Vision Onramp',
      issuer: 'MathWorks',
      verificationLink: 'https://drive.google.com/file/d/17OW13a4gD-gvu1-DyXwdzadTlN0HTk48/view',
      issuedDate: '2025',
    },
  ] as CertificationItem[],

  // ============================================
  // EXTRACURRICULAR ACHIEVEMENTS
  // ============================================
  extracurriculars: [
    {
      title: 'Emotune- Research Publication',
      date: '2025',
      description: 'Research paper for the project submitted to MethodsX, 2025. Status: Currently under review.',
    },
    {
      title: 'NGO Volunteering',
      date: '2024',
      description: 'Collaborated with multiple NGOs in the education sector to teach computer science fundamentals.',
    },
    {
      title: 'Sports & Endurance Achievements',
      date: '2022',
      description: 'Winner of multiple Badminton medals and finisher in multiple city marathons.',
    },
  ] as ExtracurricularItem[],

  // ============================================
  // PERSONAL INTERESTS
  // ============================================
  interests: [
    {
      name: 'Reading',
      description: 'An avid reader who finds solace and inspiration in books, from technical non-fiction to gripping narratives.',
    },
    {
      name: 'Trekking & Hiking',
      description: 'Scaling peaks is my way of disconnecting to reconnect. The physical challenge provides a perfect balance to tech life.',
    },
    {
      name: 'Outdoor Sports',
      description: 'Whether it\'s smashing a shuttlecock in badminton or cycling through scenic routes, I thrive on the energy and competitive spirit of outdoor sports.',
    },
    {
      name: 'Social Events & Networking',
      description: 'I believe in the power of community. Attending meetups and social gatherings allows me to exchange ideas, learn from diverse minds, and build lasting professional relationships.',
    },
    {
      name: 'Travel & Culture',
      description: 'Wanderlust drives me to explore new geographies. Immersing myself in different cultures, tasting local cuisines, and understanding history firsthand is my ultimate learning experience.',
    },
    {
      name: 'Tech Exploration',
      description: 'Beyond my core stack, I love tinkering with emerging technologies like IoT and AR/VR.',
    },
    {
      name: 'Creative Writing',
      description: 'Penning down thoughts, short stories, and tech blogs helps me articulate complex ideas simply and creatively, bridging the gap between logic and emotion.',
    },
  ] as InterestItem[],

  // ============================================
  // EXPERIENCE
  // ============================================
  experience: [] as ExperienceItem[],

  // ============================================
  // EDUCATION
  // ============================================
  education: [
    {
      school: 'Symbiosis Institute of Technology',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      graduationYear: '2024',
      startDate: '2020',
      endDate: '2024',
      gpa: '3.8/4.0',
      description: 'Focused on Full-Stack Development and AI/ML applications.',
      achievements: [
        'Dean\'s List for academic excellence',
        'Lead Tech Club - organized 10+ tech events',
        'Published research on Neural Networks',
      ],
    },
  ] as EducationItem[],

  // ============================================
  // GITHUB SYNC CONFIGURATION
  // ============================================
  github: {
    portfolioTopic: 'portfolio-showcase',
    username: 'RajhansMore',
    cacheDuration: 3600,
  },

  // ============================================
  // LINKEDIN CSV CONFIGURATION
  // ============================================
  linkedin: {
    csvPath: 'public/data/Connections.csv',
    staleLimitDays: 120,
  },

  // ============================================
  // THEME & COLORS (System Overhauled to Dark/Light)
  // ============================================
  theme: {
    defaultMode: 'dark',
    accent: '#3b82f6', // Neural Blue
  },
};

export default portfolioConfig;
