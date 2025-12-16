import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import BlogLayout from "@/components/BlogLayout";
import ArticleCard from "@/components/ArticleCard";
import { filterByCategory, loadAllArticles } from "@/lib/articles";
import type { BlogArticle } from "@/types/blog";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:category");
  const categoryName = params?.category ? decodeURIComponent(params.category) : "";
  
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (match && categoryName) {
      loadAllArticles().then((loaded) => {
        const filtered = filterByCategory(loaded, categoryName);
        setArticles(filtered);
        setLoading(false);
      });
    }
  }, [match, categoryName]);

  if (!match) return null;

  return (
    <BlogLayout>
      <section className="bg-card border-b border-border py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-accent transition-colors">首页</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-accent transition-colors">分类</Link>
            <span>/</span>
            <span>{categoryName}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3">
            <div className="w-8 h-8 triangle-icon triangle-accent" />
            {categoryName}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            分类“{categoryName}”下的所有文章。
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">加载中...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">暂无文章</h2>
              <p className="text-muted-foreground mb-8">
                该分类下暂时没有文章。
              </p>
              <Link href="/categories" className="button-primary">返回分类列表</Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-sm text-muted-foreground">
                显示 {articles.length} 篇文章
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article) => (
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
