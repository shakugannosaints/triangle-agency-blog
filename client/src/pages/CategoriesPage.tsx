import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import BlogLayout from "@/components/BlogLayout";
import { extractCategories, loadAllArticles } from "@/lib/articles";
import type { BlogArticle } from "@/types/blog";

export default function CategoriesPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllArticles().then((loaded) => {
      setArticles(loaded);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const map = extractCategories(articles);
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "zh-CN"));
  }, [articles]);

  return (
    <BlogLayout>
      <section className="bg-card border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
            <div className="w-8 h-8 triangle-icon triangle-accent" />
            分类
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            按分类浏览所有文章。
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">加载中...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无分类。</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {categories.map(([category, count]) => (
                <Link
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="px-4 py-2 rounded font-medium transition-colors bg-muted text-muted-foreground hover:bg-accent/10"
                >
                  {category}（{count}）
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
}
