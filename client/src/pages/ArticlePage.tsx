/**
 * Article Detail Page
 * Displays a single article with full content
 * Design: Minimal corporate style with Triangle Agency branding
 */

import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import BlogLayout from '@/components/BlogLayout';
import { loadArticle } from '@/lib/articles';
import { BlogArticle } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { Streamdown } from 'streamdown';

export default function ArticlePage() {
  const [match, params] = useRoute('/article/:slug');
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (match && params?.slug) {
      loadArticle(params.slug).then((article) => {
        setArticle(article);
        setLoading(false);
      });
    }
  }, [match, params?.slug]);

  if (!match) return null;

  if (loading) {
    return (
      <BlogLayout>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </BlogLayout>
    );
  }

  if (!article) {
    return (
      <BlogLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/articles">
            <a className="button-primary">Back to Articles</a>
          </Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      {/* Article Header */}
      <article className="bg-card border-b border-border">
        <div className="container py-12 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/">
              <a className="hover:text-accent transition-colors">Home</a>
            </Link>
            <span>/</span>
            <Link href="/articles">
              <a className="hover:text-accent transition-colors">Articles</a>
            </Link>
            <span>/</span>
            <span>{article.title}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{article.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{article.author}</span>
            </div>
            <span>•</span>
            <time>{formatDate(article.date)}</time>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            {article.lastModified && (
              <>
                <span>•</span>
                <span>Updated {formatDate(article.lastModified)}</span>
              </>
            )}
          </div>

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Link key={category} href={`/category/${category}`}>
                  <a className="inline-block px-4 py-2 bg-accent/10 text-accent rounded font-medium hover:bg-accent/20 transition-colors">
                    {category}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Article Content */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Cover Image */}
            {article.coverImage && (
              <div className="mb-12 rounded-lg overflow-hidden border border-border">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-invert max-w-none">
              <Streamdown>{article.content}</Streamdown>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${tag}`}>
                      <a className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                        #{tag}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Info */}
      <section className="bg-card border-t border-border py-12">
        <div className="container max-w-3xl mx-auto">
          <div className="flex items-start gap-6 p-6 bg-background rounded-lg border border-border">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-accent">
                {article.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">{article.author}</h3>
              <p className="text-muted-foreground">
                Contributor to the Triangle Agency Blog. Passionate about sharing knowledge and
                stories from the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-background border-t border-border py-12">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-5 h-5 triangle-icon triangle-accent" />
            More Articles
          </h2>
          <p className="text-muted-foreground">
            Check back soon for more articles related to this topic.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
