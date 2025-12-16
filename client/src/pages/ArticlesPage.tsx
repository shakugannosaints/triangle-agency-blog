/**
 * Articles List Page
 * Displays all articles with filtering and search
 * Design: Minimal corporate style with Triangle Agency branding
 */

import { useEffect, useState } from 'react';
import BlogLayout from '@/components/BlogLayout';
import ArticleCard from '@/components/ArticleCard';
import { loadAllArticles, extractCategories, filterByCategory, searchArticles } from '@/lib/articles';
import { BlogArticle } from '@/types/blog';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [categories, setCategories] = useState<Map<string, number>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllArticles().then((articles) => {
      setArticles(articles);
      setFilteredArticles(articles);
      setCategories(extractCategories(articles));
      setLoading(false);
    });
  }, []);

  // Filter articles based on category and search
  useEffect(() => {
    let result = articles;

    if (selectedCategory) {
      result = filterByCategory(result, selectedCategory);
    }

    if (searchQuery) {
      result = searchArticles(result, searchQuery);
    }

    setFilteredArticles(result);
  }, [articles, selectedCategory, searchQuery]);

  return (
    <BlogLayout>
      {/* Page Header */}
      <section className="bg-card border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
            <div className="w-8 h-8 triangle-icon triangle-accent" />
            All Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our collection of articles about Triangle Agency. Use the filters below to
            find what you're looking for.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-background border-b border-border py-8">
        <div className="container">
          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Categories */}
          {categories.size > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded font-medium transition-colors ${
                    selectedCategory === null
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent/10'
                  }`}
                >
                  All Articles
                </button>
                {Array.from(categories.entries()).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    {category} ({count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No Articles Found</h2>
              <p className="text-muted-foreground mb-8">
                {searchQuery
                  ? `No articles match your search for "${searchQuery}"`
                  : 'No articles available in this category'}
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="button-primary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8 text-sm text-muted-foreground">
                Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </BlogLayout>
  );
}
