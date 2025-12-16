import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import BlogLayout from "@/components/BlogLayout";
import { extractTags, loadAllArticles } from "@/lib/articles";
import type { BlogArticle } from "@/types/blog";

export default function TagsPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllArticles().then((loaded) => {
      setArticles(loaded);
      setLoading(false);
    });
  }, []);

  const tags = useMemo(() => {
    const map = extractTags(articles);
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "zh-CN"));
  }, [articles]);

  return (
    <BlogLayout>
      <section className="bg-card border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
            <div className="w-8 h-8 triangle-icon triangle-accent" />
            标签
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            按标签浏览所有文章。
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">加载中...</p>
            </div>
          ) : tags.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无标签。</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tags.map(([tag, count]) => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
                  <a className="px-4 py-2 rounded font-medium transition-colors bg-muted text-muted-foreground hover:bg-accent/10">
                    #{tag}（{count}）
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </BlogLayout>
  );
}
