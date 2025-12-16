/**
 * Home Page
 * Landing page with featured articles and introduction
 * Design: Minimal corporate style with Triangle Agency branding
 */

import { useEffect, useState } from 'react';
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
                Triangle Agency
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Exploring the World of Triangle Agency
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A collection of articles, insights, and stories about the Triangle Agency tabletop
              role-playing game. Dive into the world of anomalies, missions, and the mysterious
              organization that holds it all together.
            </p>

            <div className="flex gap-4">
              <button className="button-primary">
                Start Reading
              </button>
              <button className="button-secondary">
                Browse Categories
              </button>
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
              Featured
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
            Recent Articles
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : recentArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found yet.</p>
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
              <a href="/articles" className="button-primary">
                View All Articles
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent/5 border-t border-border">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Join the Community</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Share your stories, insights, and experiences with the Triangle Agency community.
            Contribute your own articles and help grow this knowledge base.
          </p>
          <button className="button-primary">
            Learn How to Contribute
          </button>
        </div>
      </section>
    </BlogLayout>
  );
}
