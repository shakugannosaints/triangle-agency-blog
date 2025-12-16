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
              <Link href="/">
                <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  {/* Triangle Icon */}
                  <div className="w-8 h-8 triangle-icon triangle-accent" />
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Triangle Agency</h1>
                    <p className="text-sm text-muted-foreground">Blog & Articles</p>
                  </div>
                </a>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/">
                  <a className="text-foreground hover:text-accent transition-colors font-medium">
                    Home
                  </a>
                </Link>
                <Link href="/articles">
                  <a className="text-foreground hover:text-accent transition-colors font-medium">
                    Articles
                  </a>
                </Link>
                <Link href="/categories">
                  <a className="text-foreground hover:text-accent transition-colors font-medium">
                    Categories
                  </a>
                </Link>
                <Link href="/tags">
                  <a className="text-foreground hover:text-accent transition-colors font-medium">
                    Tags
                  </a>
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
                  Triangle Agency
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A blog dedicated to exploring the world of Triangle Agency tabletop role-playing game.
                  Share insights, stories, and experiences from the game.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/">
                      <a className="text-accent hover:underline">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles">
                      <a className="text-accent hover:underline">All Articles</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a className="text-accent hover:underline">Categories</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tags">
                      <a className="text-accent hover:underline">Tags</a>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Info */}
              <div>
                <h4 className="font-semibold mb-4">Information</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  This blog is built with React, TypeScript, and Tailwind CSS.
                </p>
                <p className="text-xs text-muted-foreground">
                  © 2025 Triangle Agency Blog. All rights reserved.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
              <p>
                Powered by{' '}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub Pages
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
