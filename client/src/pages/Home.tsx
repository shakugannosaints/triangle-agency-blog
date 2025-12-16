/**
 * Home Page
 * Landing page with featured articles and introduction
 * Design: Minimal corporate style with Triangle Agency branding
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import BlogLayout from '@/components/BlogLayout';
import ArticleCard from '@/components/ArticleCard';
import { loadAllArticles } from '@/lib/articles';
import { BlogArticle } from '@/types/blog';

export default function Home() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  // Get featured articles
  const featuredArticles = articles.filter((a) => a.featured).slice(0, 1);
  const recentArticles = articles.slice(0, 6);

  return (
    <BlogLayout>
      {/* Hero Section */}
      <section className="bg-card border-b border-border py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 triangle-icon triangle-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                三角机构
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              探索叙事的边界
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              关于三角机构桌面角色扮演游戏的文章、想法和故事集。
            </p>

            <div className="flex gap-4">
              <Link href="/articles" className="button-primary">开始阅读</Link>
              <Link href="/categories" className="button-secondary">浏览分类</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
              <div className="w-5 h-5 triangle-icon triangle-accent" />
              精选文章
            </h2>

            <div className="grid grid-cols-1 gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-16 md:py-24 bg-card border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
            <div className="w-5 h-5 triangle-icon triangle-accent" />
            最新文章
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">加载文章中...</p>
            </div>
          ) : recentArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无文章。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* View All Button */}
          {recentArticles.length > 0 && (
            <div className="text-center mt-12">
              <Link href="/articles" className="button-primary">查看全部文章</Link>
            </div>
          )}
        </div>
      </section>

    </BlogLayout>
  );
}
