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

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface SkillCategory {
  [category: string]: Skill[];
}

export interface TimelineItem {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'project';
}

export interface ExperienceData {
  work: TimelineItem[];
  education: TimelineItem[];
}
