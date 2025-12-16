/**
 * Blog Layout Component
 * Main layout wrapper for all blog pages
 * Design: Minimal corporate style with Triangle Agency branding
 */

import { ReactNode } from 'react';
import { Link } from 'wouter';

interface BlogLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function BlogLayout({
  children,
  showHeader = true,
  showFooter = true,
}: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      {showHeader && (
        <header className="border-b border-border bg-card sticky top-0 z-50">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                {/* Triangle Icon */}
                <div className="w-8 h-8 triangle-icon triangle-accent" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">三角机构</h1>
                  <p className="text-sm text-muted-foreground">博客 & 文章</p>
                </div>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
                  首页
                </Link>
                <Link href="/articles" className="text-foreground hover:text-accent transition-colors font-medium">
                  文章
                </Link>
                <Link href="/categories" className="text-foreground hover:text-accent transition-colors font-medium">
                  分类
                </Link>
                <Link href="/tags" className="text-foreground hover:text-accent transition-colors font-medium">
                  标签
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="border-t border-border bg-card mt-16">
          <div className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <div className="w-4 h-4 triangle-icon triangle-accent" />
                  三角机构
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  一个致力于探索三角机构桌面角色扮演游戏世界的博客。
                  分享游戏中的见解、故事和经验。
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">快速链接</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-accent hover:underline">首页</Link>
                  </li>
                  <li>
                    <Link href="/articles" className="text-accent hover:underline">全部文章</Link>
                  </li>
                  <li>
                    <Link href="/categories" className="text-accent hover:underline">分类</Link>
                  </li>
                  <li>
                    <Link href="/tags" className="text-accent hover:underline">标签</Link>
                  </li>
                </ul>
              </div>

              {/* Info */}
              <div>
                <h4 className="font-semibold mb-4">关于</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  本博客使用 React、TypeScript 和 Tailwind CSS 构建。
                </p>
                <p className="text-xs text-muted-foreground">
                  © 2025 三角机构博客。保留所有权利。
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
              <p>
                由{' '}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub Pages
                </a>
                {' '}提供托管
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
