import FeaturedProjectsSection from './FeaturedProjectsSection';
import { Project } from '@/types';

interface FeaturedProjectsServerProps {
  limit?: number;
}

// Mock featured projects data for now
const mockFeaturedProjects: Project[] = [
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS featuring dark/light themes, contact integration, and optimized performance',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Portfolio', 'Full Stack'],
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'MDX', 'Vercel'],
    demoUrl: 'https://lihsheng.space',
    repoUrl: 'https://github.com/LihSheng/portfolio',
    featured: true,
    date: '2024-11-03'
  },
  {
    slug: 'duty-roster',
    title: 'Duty Roster Management System',
    description: 'A comprehensive duty roster management system for organizations to schedule and track employee duties efficiently',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Management'],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    demoUrl: 'https://duty-roster-demo.com',
    repoUrl: 'https://github.com/LihSheng/duty-roster',
    featured: true,
    date: '2024-10-15'
  },
  {
    slug: 'gym-typescript',
    title: 'Gym Management System',
    description: 'A TypeScript-based gym management system with member tracking, workout plans, and progress monitoring',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'React', 'Fitness', 'Management'],
    techStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://gym-system-demo.com',
    repoUrl: 'https://github.com/LihSheng/gym-typescript',
    featured: true,
    date: '2024-09-20'
  }
];

export default function FeaturedProjectsServer({ limit = 3 }: FeaturedProjectsServerProps) {
  const featuredProjects = mockFeaturedProjects.slice(0, limit);
  return <FeaturedProjectsSection projects={featuredProjects} limit={limit} />;
}