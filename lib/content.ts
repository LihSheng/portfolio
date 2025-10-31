import fs from 'fs';
import path from 'path';
import { Project, BlogPost } from '@/types';
import { parseMDXFile, getMDXFiles, getSlugFromFilename } from './mdx';

const PROJECTS_DIR = 'content/projects';
const BLOG_DIR = 'content/blog';

/**
 * Get all projects from the content directory
 * @returns Array of Project objects sorted by date (newest first)
 */
export async function getAllProjects(): Promise<Project[]> {
  const files = getMDXFiles(PROJECTS_DIR);
  
  const projects = files.map((filename) => {
    const slug = getSlugFromFilename(filename);
    const filePath = path.join(process.cwd(), PROJECTS_DIR, filename);
    const { frontmatter, content, readingTime } = parseMDXFile(filePath);
    
    return {
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      longDescription: frontmatter.longDescription,
      image: frontmatter.image || '',
      images: frontmatter.images || [],
      tags: frontmatter.tags || [],
      techStack: frontmatter.techStack || [],
      demoUrl: frontmatter.demoUrl,
      repoUrl: frontmatter.repoUrl,
      featured: frontmatter.featured || false,
      date: frontmatter.date || '',
      content,
    } as Project;
  });

  // Sort by date (newest first)
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single project by slug
 * @param slug - The project slug
 * @returns Project object or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filename = `${slug}.mdx`;
    const filePath = path.join(process.cwd(), PROJECTS_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      // Try .md extension as fallback
      const mdFilename = `${slug}.md`;
      const mdFilePath = path.join(process.cwd(), PROJECTS_DIR, mdFilename);
      
      if (!fs.existsSync(mdFilePath)) {
        return null;
      }
      
      const { frontmatter, content } = parseMDXFile(mdFilePath);
      
      return {
        slug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        longDescription: frontmatter.longDescription,
        image: frontmatter.image || '',
        images: frontmatter.images || [],
        tags: frontmatter.tags || [],
        techStack: frontmatter.techStack || [],
        demoUrl: frontmatter.demoUrl,
        repoUrl: frontmatter.repoUrl,
        featured: frontmatter.featured || false,
        date: frontmatter.date || '',
        content,
      } as Project;
    }
    
    const { frontmatter, content } = parseMDXFile(filePath);
    
    return {
      slug,
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      longDescription: frontmatter.longDescription,
      image: frontmatter.image || '',
      images: frontmatter.images || [],
      tags: frontmatter.tags || [],
      techStack: frontmatter.techStack || [],
      demoUrl: frontmatter.demoUrl,
      repoUrl: frontmatter.repoUrl,
      featured: frontmatter.featured || false,
      date: frontmatter.date || '',
      content,
    } as Project;
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured projects
 * @returns Array of featured Project objects sorted by date (newest first)
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured);
}

/**
 * Get all blog posts from the content directory
 * @returns Array of BlogPost objects sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = getMDXFiles(BLOG_DIR);
  
  const posts = files.map((filename) => {
    const slug = getSlugFromFilename(filename);
    const filePath = path.join(process.cwd(), BLOG_DIR, filename);
    const { frontmatter, content, readingTime } = parseMDXFile(filePath);
    
    return {
      slug,
      title: frontmatter.title || '',
      excerpt: frontmatter.excerpt || '',
      content,
      date: frontmatter.date || '',
      updated: frontmatter.updated,
      tags: frontmatter.tags || [],
      author: frontmatter.author || {
        name: 'Anonymous',
        avatar: undefined,
      },
      readingTime,
      published: frontmatter.published !== false, // Default to true unless explicitly false
      coverImage: frontmatter.coverImage,
    } as BlogPost;
  });

  // Filter published posts and sort by date (newest first)
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 * @param slug - The blog post slug
 * @returns BlogPost object or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filename = `${slug}.mdx`;
    const filePath = path.join(process.cwd(), BLOG_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      // Try .md extension as fallback
      const mdFilename = `${slug}.md`;
      const mdFilePath = path.join(process.cwd(), BLOG_DIR, mdFilename);
      
      if (!fs.existsSync(mdFilePath)) {
        return null;
      }
      
      const { frontmatter, content, readingTime } = parseMDXFile(mdFilePath);
      
      return {
        slug,
        title: frontmatter.title || '',
        excerpt: frontmatter.excerpt || '',
        content,
        date: frontmatter.date || '',
        updated: frontmatter.updated,
        tags: frontmatter.tags || [],
        author: frontmatter.author || {
          name: 'Anonymous',
          avatar: undefined,
        },
        readingTime,
        published: frontmatter.published !== false,
        coverImage: frontmatter.coverImage,
      } as BlogPost;
    }
    
    const { frontmatter, content, readingTime } = parseMDXFile(filePath);
    
    return {
      slug,
      title: frontmatter.title || '',
      excerpt: frontmatter.excerpt || '',
      content,
      date: frontmatter.date || '',
      updated: frontmatter.updated,
      tags: frontmatter.tags || [],
      author: frontmatter.author || {
        name: 'Anonymous',
        avatar: undefined,
      },
      readingTime,
      published: frontmatter.published !== false,
      coverImage: frontmatter.coverImage,
    } as BlogPost;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get recent blog posts with a limit
 * @param limit - Maximum number of posts to return (default: 5)
 * @returns Array of recent BlogPost objects
 */
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, limit);
}