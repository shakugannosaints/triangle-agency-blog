/**
 * Article Loading and Processing Utilities
 * Handles loading markdown articles from public/articles directory
 */

import { BlogArticle } from '@/types/blog';

/**
 * Parse frontmatter from markdown content
 * Expects YAML frontmatter between --- delimiters at the start of the file
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  // Support both LF and CRLF line endings and be resilient to optional BOM/leading whitespace.
  // This will match a YAML frontmatter block starting with `---` at the beginning of the file.
  const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const frontmatter: Record<string, any> = {};
  // Split using either LF or CRLF
  const lines = frontmatterStr.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue; // skip empty or comment lines

    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();

      // Parse boolean
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Simple array parsing: [a, b, 'c']
        value = value
          .slice(1, -1)
          .split(',')
          .map((v: string) => v.trim().replace(/^['"\s]+|['"\s]+$/g, ''))
          .filter((v: string) => v.length > 0);
      } else {
        // strip surrounding quotes if present
        value = value.replace(/^['\"]|['\"]$/g, '');
      }

      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Load a single article by slug
 */
export async function loadArticle(slug: string): Promise<BlogArticle | null> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}articles/${slug}.md`);
    if (!response.ok) return null;

    const content = await response.text();
    const { frontmatter, body } = parseFrontmatter(content);

    const categories = Array.isArray(frontmatter.categories)
      ? frontmatter.categories
      : frontmatter.categories
        ? [String(frontmatter.categories)]
        : [];

    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags
      : frontmatter.tags
        ? [String(frontmatter.tags)]
        : [];

    return {
      id: slug,
      slug,
      title: String(frontmatter.title || 'Untitled'),
      excerpt: String(frontmatter.excerpt || ''),
      content: body,
      author: String(frontmatter.author || 'Anonymous'),
      date: String(frontmatter.date || new Date().toISOString().split('T')[0]),
      lastModified: frontmatter.lastModified ? String(frontmatter.lastModified) : undefined,
      categories,
      tags,
      featured: Boolean(frontmatter.featured),
      coverImage: frontmatter.coverImage ? String(frontmatter.coverImage) : undefined,
      readingTime: calculateReadingTime(body),
    };
  } catch (error) {
    console.error(`Failed to load article ${slug}:`, error);
    return null;
  }
}

/**
 * Load all articles from the articles directory
 * Requires articles.json manifest file
 */
export async function loadAllArticles(): Promise<BlogArticle[]> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}articles/manifest.json`);
    if (!response.ok) return [];

    const manifest = await response.json();
    const articles: BlogArticle[] = [];

    for (const slug of manifest.articles || []) {
      const article = await loadArticle(slug);
      if (article) {
        articles.push(article);
      }
    }

    // Sort by date, newest first
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return articles;
  } catch (error) {
    console.error('Failed to load articles manifest:', error);
    return [];
  }
}

/**
 * Get unique categories from articles
 */
export function extractCategories(articles: BlogArticle[]): Map<string, number> {
  const categories = new Map<string, number>();

  for (const article of articles) {
    for (const category of article.categories) {
      categories.set(category, (categories.get(category) || 0) + 1);
    }
  }

  return categories;
}

/**
 * Get unique tags from articles
 */
export function extractTags(articles: BlogArticle[]): Map<string, number> {
  const tags = new Map<string, number>();

  for (const article of articles) {
    for (const tag of article.tags) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }
  }

  return tags;
}

/**
 * Filter articles by category
 */
export function filterByCategory(articles: BlogArticle[], category: string): BlogArticle[] {
  return articles.filter((article) => article.categories.includes(category));
}

/**
 * Filter articles by tag
 */
export function filterByTag(articles: BlogArticle[], tag: string): BlogArticle[] {
  return articles.filter((article) => article.tags.includes(tag));
}

/**
 * Search articles by title, excerpt, or content
 */
export function searchArticles(articles: BlogArticle[], query: string): BlogArticle[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery)
  );
}
