// Central Data Storage Engine for Portfolio CMS

const STORAGE_KEYS = {
  PROJECTS: "esha_portfolio_projects_v1",
  ARTICLES: "esha_portfolio_articles_v1",
  PROFILE: "esha_portfolio_profile_v1",
  EDUCATION: "esha_portfolio_education_v1",
  EXPLORATIONS: "esha_portfolio_explorations_v1",
};

// Initial Seed Data
export const DEFAULT_PROJECTS = [
  {
    id: "proj_1",
    title: "Placement Portal",
    category: "Full-Stack Platform",
    domain: "portal.hiring.internal",
    description:
      "Full-stack placement management system streamlining student job applications, recruiter workflows, and automated status updates.",
    highlights: [
      "Role-based authentication & permissions (Student, Recruiter, Admin)",
      "Real-time application status tracking & backend API integration",
    ],
    tags: ["React", "Node.js", "Supabase", "REST API", "Tailwind"],
    href: "https://portal-app-azure.vercel.app/",
    github: "https://github.com/eshabajaj/placement-portal",
    image: "/src/assets/images/1.png",
    architecture: {
      overview:
        "Designed with a modern decoupled SPA frontend communicating with Supabase PostgreSQL and Node.js REST services.",
      stackDetails: [
        { label: "Frontend", value: "React 19 + Vite with responsive CSS" },
        { label: "Data Layer", value: "Supabase Database & Row-Level Security Policies" },
        { label: "State Management", value: "React Context & Optimistic UI Updates" },
      ],
      challenges: [
        "Implemented fail-safe mailto fallback for contact triggers when web services are down.",
        "Ensured 100% accessible keyboard navigation across student application tables.",
      ],
    },
  },
  {
    id: "proj_2",
    title: "Memory Visualizer",
    category: "Systems & Algorithms",
    domain: "memory.visualizer.dev",
    description:
      "Interactive developer utility that simulates heap/stack memory allocations and visualizes leak maps for low-level debugging.",
    highlights: [
      "Real-time heap & stack memory allocation tree graphics",
      "Algorithmic memory leak detection & pointer tracking simulation",
    ],
    tags: ["JavaScript", "Data Structures", "Vite", "Canvas API", "Algorithms"],
    href: "https://memory-visualizer01.vercel.app/",
    github: "https://github.com/eshabajaj/memory-visualizer",
    image: "/src/assets/images/4.png",
    architecture: {
      overview:
        "A client-side algorithmic engine built on HTML5 Canvas to model dynamic memory reference pointers and garbage collection cycles.",
      stackDetails: [
        { label: "Visual Engine", value: "HTML5 Canvas 2D Context with custom requestAnimationFrame loop" },
        { label: "Core Logic", value: "JavaScript dynamic pointer stack tracking" },
      ],
      challenges: [
        "Optimized 60 FPS canvas redraws during rapid simulated allocation events.",
      ],
    },
  },
  {
    id: "proj_3",
    title: "Tiffin Fusion",
    category: "Open Source Contribution",
    domain: "tiffinfusion.community.io",
    description:
      "Open-source community meal customization & delivery application focusing on accessible ordering flows and UI responsiveness.",
    highlights: [
      "Contributed custom meal customizer components & cart state flows",
      "Collaborated with open-source maintainers via Git pull request workflows",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Git", "Open Source"],
    href: "https://saismrutiranjan18.github.io/Tiffin_Fusion/",
    github: "https://github.com/saismrutiranjan18/Tiffin_Fusion",
    image: "/src/assets/images/2.png",
    architecture: {
      overview:
        "Modular frontend web app built with vanilla web technologies, optimized for fast mobile rendering and high accessibility scores.",
      stackDetails: [
        { label: "Architecture", value: "Component-driven Vanilla JS + Semantic HTML5" },
        { label: "Version Control", value: "Git GitHub flow with automated PR reviews" },
      ],
    },
  },
  {
    id: "proj_4",
    title: "EduPort Platform",
    category: "EdTech Platform",
    domain: "eduport.learn.org",
    description:
      "Educational marketplace portal featuring course catalogs, instructor profiles, and structured curriculum navigation.",
    highlights: [
      "Responsive course exploration modules & dynamic layout filtering",
      "Clean component hierarchy with zero layout shifts on resize",
    ],
    tags: ["React", "CSS Modules", "JavaScript", "Responsive Design"],
    href: "https://luminous-manatee-4962a0.netlify.app/",
    github: "https://github.com/eshabajaj/eduport",
    image: "/src/assets/images/3.png",
  },
];

export const DEFAULT_ARTICLES = [
  {
    id: "art_1",
    title: "Building Resilient Placement Systems with Supabase & Node.js",
    subtitle: "A deep dive into backend data pipelines, role-based authorization, and schema isolation.",
    type: "Blogs",
    categoryLabel: "Blogs",
    date: "Sep 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Analyzing row-level security policies, fallback email notifications, and zero-downtime database updates in high-volume student application portals.",
    content: `In modern full-stack web applications, reliability under heavy traffic is paramount. When building our Placement Portal, we engineered a dual-layer authentication & data access strategy utilizing Supabase Row Level Security (RLS) alongside Node.js micro-services.

### Key Architectural Pillars:
1. **Isolated Schemas**: Student records, recruiter submissions, and admin privileges are decoupled to prevent privilege escalation.
2. **Fail-Safe Communications**: Integrated automated email dispatchers with client-side mailto fallbacks to ensure 100% notification delivery.`,
  },
  {
    id: "art_2",
    title: "Custom SaaS Invoicing & Workflow Engine",
    subtitle: "End-to-end commercial software solution built and delivered for client operations.",
    type: "Commercials",
    categoryLabel: "Commercials",
    date: "Aug 2025",
    readTime: "8 min case study",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    excerpt:
      "Delivered a full-stack automated invoicing and client management solution built on React and n8n workflow pipelines.",
    content: `Delivered a complete client platform integrating n8n automated webhook pipelines with a custom React portal. 

### Deliverables & Results:
- Automated invoice processing and real-time status webhooks.
- Decreased manual client data entry time by over 70%.`,
  },
];

export const DEFAULT_PROFILE = {
  name: "Esha Bajaj",
  roleTitle: "Software Engineer & Student",
  email: "eshabajaj1626@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1CFY7JI-fQ7FN015Gq3GoLCFSd-SQ0xf4/view?usp=sharing",
  bio: "Building full-stack web applications, exploring low-level systems & memory tools, and specializing in AI/ML at IIT Patna while studying at the PW Institute of Innovation in Bangalore. Driven by ownership, clean code, and engineering depth.",
};

export const DEFAULT_EDUCATION = [
  {
    id: "edu_1",
    year: "2025 – 2027",
    institution: "IIT Patna",
    degree: "Bachelor of Science in AI/ML (Dual Degree)",
    description: "Specializing in Machine Learning models, data structures, and algorithmic problem-solving.",
  },
  {
    id: "edu_2",
    year: "2025 – Present",
    institution: "PW Institute of Innovation",
    degree: "Technology Program, Bangalore",
    description: "Hands-on software development, full-stack web architecture, and real-world system building.",
  },
];

export const DEFAULT_EXPLORATIONS = [
  {
    id: "exp_1",
    title: "Finance Sakhi PRD",
    category: "PRDs & Case Studies",
    badgeLabel: "PRD & User Flow",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary: "Complete Product Requirement Document analyzing AI-driven personal finance tracking and user journeys.",
    link: "https://drive.google.com/file/d/1CFY7JI-fQ7FN015Gq3GoLCFSd-SQ0xf4/view?usp=sharing",
    linkText: "View PRD Document ↗",
    tags: ["Product Thinking", "PRD", "AI"],
    accentColor: "blue",
    whyBuilt: "A simple AI financial co-pilot that questions impulsive purchases before checkout.",
    whatLearned: "Defining strict edge cases and friction-free mobile UX.",
  },
  {
    id: "exp_2",
    title: "Browser Focus Detection",
    category: "Rabbit Hole",
    badgeLabel: "Rabbit Hole",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    summary: "Exploring browser APIs, Page Visibility API, and WebRTC streams without invasive permissions.",
    link: "https://github.com/eshabajaj",
    linkText: "Explore Experiment ↗",
    tags: ["Browser APIs", "WebRTC", "Research"],
    accentColor: "green",
    whyBuilt: "Understanding how focus-time platforms track tab activity.",
    whatLearned: "Page Visibility API limitations.",
  },
  {
    id: "exp_3",
    title: "Autonomous RAG Pipelines",
    category: "Experiments",
    badgeLabel: "Experiment",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    summary: "Building multi-agent automation workflows using n8n webhooks, vector embeddings, and Supabase pgvector.",
    link: "https://github.com/eshabajaj",
    linkText: "See Architecture ↗",
    tags: ["RAG", "n8n", "Vector DB"],
    accentColor: "coral",
    whyBuilt: "Automating background indexing of unstructured client notes into searchable vector spaces.",
    whatLearned: "Chunking strategies and contextual retrieval tuning.",
  },
];

// Helper functions for LocalStorage Persistence
export function loadFromStorage(key, defaultData) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultData;
    return JSON.parse(stored);
  } catch (err) {
    console.error(`Error loading storage key ${key}:`, err);
    return defaultData;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving storage key ${key}:`, err);
  }
}

export function resetAllStorage() {
  saveToStorage(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
  saveToStorage(STORAGE_KEYS.ARTICLES, DEFAULT_ARTICLES);
  saveToStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
  saveToStorage(STORAGE_KEYS.EDUCATION, DEFAULT_EDUCATION);
  saveToStorage(STORAGE_KEYS.EXPLORATIONS, DEFAULT_EXPLORATIONS);
}
