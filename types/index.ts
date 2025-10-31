// Core type definitions for the portfolio website

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  tags: string[];
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  date: string;
  content?: string; // MDX content
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // MDX content
  date: string;
  updated?: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  readingTime: number;
  published: boolean;
  coverImage?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      [key: string]: string | undefined;
    };
  };
  navigation: NavigationItem[];
  analytics: {
    provider: 'plausible' | 'umami';
    siteId: string;
  };
}

export interface MDXFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  published?: boolean;
  coverImage?: string;
  [key: string]: any;
}

// Skills data structure
export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience: number;
  icon?: string;
}

export interface SkillsData {
  frontend: Skill[];
  backend: Skill[];
  database: Skill[];
  devops: Skill[];
  tools: Skill[];
}

export interface SkillCategory {
  [category: string]: Skill[];
}

// Experience data structures
export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  startDate: string; // YYYY-MM format
  endDate: string | null; // YYYY-MM format or null if current
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string; // YYYY-MM format
  endDate: string; // YYYY-MM format
  gpa?: string;
  description: string;
  coursework: string[];
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM format
  expiryDate: string | null; // YYYY-MM format or null if no expiry
  credentialId: string;
  verificationUrl?: string;
}

export interface ExperienceData {
  work: WorkExperience[];
  education: Education[];
  certifications: Certification[];
}

// Timeline item for display purposes
export interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'project';
  technologies?: string[];
  achievements?: string[];
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}
