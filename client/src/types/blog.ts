/**
 * Blog Data Types
 * Defines the structure for articles, categories, tags, and metadata
 */

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  lastModified?: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  readingTime: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface BlogMetadata {
  title: string;
  description: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  siteUrl: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}
