/**
 * Article Card Component
 * Displays a preview of a blog article
 * Design: Minimal card with hover effects
 */

import { Link } from 'wouter';
import { BlogArticle } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`}>
      <a className="block group">
        <div
          className={`card-minimal ${featured ? 'md:col-span-2 md:flex gap-6' : ''}`}
        >
          {/* Featured Image (if featured) */}
          {featured && article.coverImage && (
            <div className="md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className={featured ? 'md:w-2/3 flex flex-col justify-between' : ''}>
            {/* Meta Information */}
            <div className="flex items-center gap-3 mb-3">
              <time className="text-sm text-muted-foreground">{formatDate(article.date)}</time>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{article.readingTime} min read</span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>

            {/* Categories & Tags */}
            <div className="flex flex-wrap gap-2">
              {/* Categories */}
              {article.categories.length > 0 && (
                <div className="flex gap-2">
                  {article.categories.slice(0, 2).map((category) => (
                    <span
                      key={category}
                      className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Read More Link */}
            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-accent font-semibold text-sm group-hover:underline">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
