import fs from 'fs';
import path from 'path';
import { Project } from '@/types';
import { parseMDXFile, getMDXFiles, getSlugFromFilename } from './mdx';

const PROJECTS_DIR = 'content/projects';

function toProject(slug: string, frontmatter: Record<string, any>, content: string): Project {
  return {
    slug,
    title: frontmatter.title || '',
    description: frontmatter.description || '',
    longDescription: frontmatter.longDescription,
    screenshot: frontmatter.screenshot,
    tags: frontmatter.tags || [],
    techStack: frontmatter.techStack || [],
    demoUrl: frontmatter.demoUrl,
    repoUrl: frontmatter.repoUrl,
    featured: frontmatter.featured || false,
    date: frontmatter.date || '',
    content,
  };
}

/**
 * Get all projects from the content directory
 * @returns Array of Project objects sorted by date (newest first)
 */
export async function getAllProjects(): Promise<Project[]> {
  const files = getMDXFiles(PROJECTS_DIR);

  const projects = files.map((filename) => {
    const slug = getSlugFromFilename(filename);
    const filePath = path.join(process.cwd(), PROJECTS_DIR, filename);
    const { frontmatter, content } = parseMDXFile(filePath);

    return toProject(slug, frontmatter, content);
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
      return toProject(slug, frontmatter, content);
    }

    const { frontmatter, content } = parseMDXFile(filePath);
    return toProject(slug, frontmatter, content);
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
  return allProjects.filter((project) => project.featured);
}
