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
    aboutMe: "I am a dedicated professional who prioritizes profound comprehension over mere execution, finding purpose in the intricate 'why' and 'how' of every endeavor. Where others might observe the surface, I delve into the nuances that define excellence. As an explorer of both global cultures and complex problem spaces, I maintain an unwavering commitment to lifelong learning. My mission is to cultivate environments where synergy and innovation flourish, driven by the conviction that true success is a collective achievement—one where personal growth is measured by the elevation of the entire team.",
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
  // TIP: You can also set this in .env.local as NEXT_PUBLIC_RESUME_LINK
  resume: {
    googleDriveLink: process.env.NEXT_PUBLIC_RESUME_LINK || 'https://drive.google.com/file/d/14yjJ3cn0wFU1ULzuFhbOOOo7bBlYDL0A/view?usp=drive_link',
    fileName: 'Rajhans_More_Resume.pdf',
  },

  // ============================================
  // SKILLS & TECHNICAL STACK
  // ============================================
  skills: [
    // Programming & Frameworks
    { name: 'Python', category: 'Programming & Frameworks' },
    { name: 'Java', category: 'Programming & Frameworks' },
    { name: 'JavaScript', category: 'Programming & Frameworks' },
    { name: 'Flask', category: 'Programming & Frameworks' },
    { name: 'Django', category: 'Programming & Frameworks' },
    { name: 'Spring Boot', category: 'Programming & Frameworks' },
    { name: 'Express.js', category: 'Programming & Frameworks' },
    { name: 'Next.js', category: 'Programming & Frameworks' },

    // Machine Learning & AI
    { name: 'TensorFlow', category: 'Machine Learning & AI' },
    { name: 'Keras', category: 'Machine Learning & AI' },
    { name: 'LightGBM', category: 'Machine Learning & AI' },
    { name: 'OpenCV', category: 'Machine Learning & AI' },
    { name: 'GANs', category: 'Machine Learning & AI' },
    { name: 'Convolutional Neural Networks (CNN)', category: 'Machine Learning & AI' },
    { name: 'Recurrent Neural Networks (RNN)', category: 'Machine Learning & AI' },
    { name: 'Transformers', category: 'Machine Learning & AI' },
    { name: 'Support Vector Machines (SVM)', category: 'Machine Learning & AI' },
    { name: 'Random Forest', category: 'Machine Learning & AI' },
    { name: 'Naive Bayes', category: 'Machine Learning & AI' },
    { name: 'Logistic Regression', category: 'Machine Learning & AI' },
    { name: 'K-Nearest Neighbors (KNN)', category: 'Machine Learning & AI' },
    { name: 'Gradient Boosting Machines (GBM)', category: 'Machine Learning & AI' },
    { name: 'Natural Language Processing (NLP)', category: 'Machine Learning & AI' },
    { name: 'Machine Translation', category: 'Machine Learning & AI' },
    { name: 'Computer Vision', category: 'Machine Learning & AI' },
    { name: 'VGG16', category: 'Machine Learning & AI' },
    { name: 'Sklearn', category: 'Machine Learning & AI' },
    { name: 'DenseNet', category: 'Machine Learning & AI' },
    { name: 'RestNet', category: 'Machine Learning & AI' },
    { name: 'Long short-term memory (LSTM)', category: 'Machine Learning & AI' },
    { name: 'ARIMA', category: 'Machine Learning & AI' },
    { name: 'Generative AI', category: 'Machine Learning & AI' },

    // Model Deployment & APIs
    { name: 'FastAPI', category: 'Model Deployment & APIs' },
    { name: 'Streamlit', category: 'Model Deployment & APIs' },
    { name: 'Docker', category: 'Model Deployment & APIs' },

    // Visualization & Frontend
    { name: 'HTML', category: 'Visualization & Frontend' },
    { name: 'CSS', category: 'Visualization & Frontend' },
    { name: 'jinja2', category: 'Visualization & Frontend' },
    { name: 'Python Gui', category: 'Visualization & Frontend' },

    // Cloud Computing & MLOps
    { name: 'AWS', category: 'Cloud Computing & MLOps' },
    { name: 'IBM Watson', category: 'Cloud Computing & MLOps' },
    { name: 'Vercel', category: 'Cloud Computing & MLOps' },

    // Data Engineering
    { name: 'MongoDB', category: 'Data Engineering' },
    { name: 'PostgreSQL', category: 'Data Engineering' },
    { name: 'MySQL', category: 'Data Engineering' },
    { name: 'Pandas', category: 'Data Engineering' },
    { name: 'NumPy', category: 'Data Engineering' },
    { name: 'Matplotlib', category: 'Data Engineering' },
    { name: 'Excel', category: 'Data Engineering' },

    // Soft Skills & Collaboration
    { name: 'Problem-Solving', category: 'Soft Skills & Collaboration' },
    { name: 'Project Management', category: 'Soft Skills & Collaboration' },
    { name: 'Presentation Skills', category: 'Soft Skills & Collaboration' },
  ] as SkillItem[],

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
      description: 'Researchpaper for the project submitted to MethodsX,2025. Status:Currently under review',
    },
    {
      title: 'NGO Volunteering',
      date: '2024',
      description: 'Collaborated with multiple NGOs in the education sector to teach computer science fundamentals.',
    },
    {
      title: 'Sports & Endurance Achievements',
      date: '2022',
      description: 'Winner of multiple Badminton medals and finisher in multiple city marathons, showcasing competitive edge and a passion for physical challenges.',
    },
    {
      title: 'Events Executive/EventVolunteer',
      date: '2022',
      description: 'SymbiTech and Reverb, College fests of Symbiosis Institute of Technology, Pune.',
    },
  ] as ExtracurricularItem[],

  // ============================================
  // PERSONAL INTERESTS
  // ============================================
  interests: [
    {
      name: 'Reading',
      description: 'An avid reader who finds solace and inspiration in books. From gripping fiction to insightful non-fiction, reading fuels my imagination and broadens my perspective on the world.',
    },
    {
      name: 'Trekking & Hiking',
      description: 'Scaling peaks and traversing rugged trails is my way of disconnecting to reconnect. The physical challenge and the serenity of nature provide a perfect balance to my tech-driven life.',
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
      description: 'Beyond my core stack, I love tinkering with emerging technologies like IoT and AR/VR, constantly pushing the boundaries of what\'s possible with code.',
    },
    {
      name: 'Creative Writing',
      description: 'Penning down thoughts, short stories, and tech blogs helps me articulate complex ideas simply and creatively, bridging the gap between logic and emotion.',
    },
  ] as InterestItem[],

  // ============================================
  // EXPERIENCE
  // ============================================
  experience: [
    {
      title: 'Full Stack Developer Intern',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      startDate: '2023-06',
      endDate: '2023-08',
      description: 'Developed and maintained web applications using React and Node.js. Optimized database queries and improved frontend performance by 20%.',
    },
    {
      title: 'AI/ML Research Assistant',
      company: 'Symbiosis Institute of Technology',
      location: 'Pune, India',
      startDate: '2022-09',
      endDate: '2023-05',
      description: 'Assisted in research on Neural Networks and Computer Vision. Implemented CNN models for image classification tasks.',
    },
  ] as ExperienceItem[],

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
  // THEME & COLORS
  // ============================================
  theme: {
    primaryColor: '#39FF14',
    secondaryColor: '#121212',
    accentColor: '#00FFFF',
    textPrimary: '#F0F0F0',
    textSecondary: '#8F8F8F',
  },
};

export default portfolioConfig;
