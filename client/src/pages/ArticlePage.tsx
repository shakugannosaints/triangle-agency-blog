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
          <p className="text-muted-foreground">加载文章中...</p>
        </div>
      </BlogLayout>
    );
  }

  if (!article) {
    return (
      <BlogLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
          <p className="text-muted-foreground mb-8">
            您要查找的文章不存在或已被删除。
          </p>
          <Link href="/articles" className="button-primary">返回文章列表</Link>
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
            <Link href="/" className="hover:text-accent transition-colors">首页</Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-accent transition-colors">文章</Link>
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
            <span>·</span>
            <time>{formatDate(article.date)}</time>
            <span>·</span>
            <span>{article.readingTime} 分钟阅读</span>
            {article.lastModified && (
              <>
                <span>·</span>
                <span>更新于 {formatDate(article.lastModified)}</span>
              </>
            )}
          </div>

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="inline-block px-4 py-2 bg-accent/10 text-accent rounded font-medium hover:bg-accent/20 transition-colors"
                >
                  {category}
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
                <h3 className="text-sm font-semibold text-foreground mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag}`}
                      className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      #{tag}
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
                一个游戏玩家。
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
            更多文章
          </h2>
          <p className="text-muted-foreground">
            敬请期待更多相关主题的文章。
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
