import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Calculate reading time for content
 * @param content - The text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

/**
 * Extract excerpt from content
 * @param content - The full content
 * @param length - Maximum length of excerpt in characters (default: 160)
 * @returns Excerpt string
 */
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove MDX/Markdown syntax
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links but keep text
    .replace(/[*_~`]/g, '') // Remove formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  // Find the last space before the length limit
  const truncated = plainText.substring(0, length);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Parse MDX file and extract frontmatter and content
 * @param filePath - Path to the MDX file
 * @returns Object containing frontmatter data and content
 */
export function parseMDXFile(filePath: string) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Compile MDX content with plugins
 * @param source - MDX source string
 * @returns Compiled MDX with frontmatter
 */
export async function compileMDXWithPlugins<TFrontmatter>(source: string) {
  return await compileMDX<TFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrism,
            {
              ignoreMissing: true, // Don't throw errors for unknown languages
              alias: {
                vue: 'html', // Map Vue to HTML syntax highlighting
                svelte: 'html', // Map Svelte to HTML syntax highlighting
              },
            },
          ],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
      },
    },
  });
}

/**
 * Get all MDX files from a directory
 * @param directory - Directory path relative to project root
 * @returns Array of file paths
 */
export function getMDXFiles(directory: string): string[] {
  const fullPath = path.join(process.cwd(), directory);

  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const files = fs.readdirSync(fullPath);
  return files.filter(
    (file) => file.endsWith('.mdx') || file.endsWith('.md')
  );
}

/**
 * Get slug from filename
 * @param filename - The filename with extension
 * @returns Slug without extension
 */
export function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.(mdx|md)$/, '');
}
