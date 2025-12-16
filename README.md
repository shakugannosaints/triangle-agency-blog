# Triangle Agency Blog

A minimalist, corporate-style blog dedicated to the Triangle Agency tabletop role-playing game. Built with React, TypeScript, and Tailwind CSS.

## Design Philosophy

This blog embraces a **minimal corporate aesthetic** inspired by the Triangle Agency rulebook's design language:

- **Color Scheme**: White/light gray backgrounds with deep red (#D7263D) accents
- **Typography**: Clean, modern sans-serif fonts with clear hierarchy
- **Design Style**: Flat design with subtle interactions and smooth transitions
- **Brand Element**: Red triangle motif used strategically throughout

## Features

- **Markdown-Driven Content**: Write articles in Markdown, stored in `/public/articles/`
- **Article Management**: Frontmatter-based metadata (title, date, categories, tags, etc.)
- **Category & Tag Filtering**: Browse articles by category or tag
- **Search Functionality**: Full-text search across article titles, excerpts, and content
- **Responsive Design**: Mobile-first, fully responsive layout
- **GitHub Pages Ready**: Deploy directly to GitHub Pages with zero configuration
- **Static Generation**: Pure frontend, no backend required

## Project Structure

```
triangle-agency-blog/
├── client/
│   ├── public/
│   │   └── articles/           # Markdown articles stored here
│   │       ├── manifest.json   # List of articles
│   │       └── *.md            # Article files
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── lib/                # Utility functions
│   │   ├── types/              # TypeScript type definitions
│   │   ├── App.tsx             # Main app component
│   │   └── index.css           # Global styles
│   └── index.html              # HTML entry point
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── package.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ or 22+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Writing Articles

### Article Format

Create a new Markdown file in `/client/public/articles/` with the following structure:

```markdown
---
title: Article Title
excerpt: Brief description of the article
author: Author Name
date: 2025-01-15
categories: [Category1, Category2]
tags: [tag1, tag2, tag3]
featured: false
coverImage: /path/to/image.jpg
---

# Article Title

Your article content here in Markdown format...
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Article title |
| excerpt | string | Yes | Short description for previews |
| author | string | Yes | Author name |
| date | string | Yes | Publication date (YYYY-MM-DD) |
| categories | array | No | Article categories |
| tags | array | No | Article tags |
| featured | boolean | No | Mark as featured article |
| coverImage | string | No | Path to cover image |
| lastModified | string | No | Last modification date |

### Updating the Manifest

After creating a new article, add its slug to `/client/public/articles/manifest.json`:

```json
{
  "articles": [
    "article-slug-1",
    "article-slug-2",
    "new-article-slug"
  ]
}
```

The slug is the filename without the `.md` extension.

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. The GitHub Actions workflow will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://<username>.github.io/<repo-name>`

To use a custom domain:
1. Update the `cname` field in `.github/workflows/deploy.yml`
2. Add a `CNAME` file to your repository root with your domain name
3. Configure your domain's DNS settings to point to GitHub Pages

### Manual Deployment

```bash
# Build the project
pnpm build

# The dist/public directory contains the static files ready for deployment
```

## Customization

### Colors

Edit `/client/src/index.css` to customize the color scheme:

```css
:root {
  --agency-red: #D7263D;
  --agency-dark: #1A1A1A;
  --agency-light: #F8F6F4;
  /* ... other colors ... */
}
```

### Typography

Modify font families in `/client/src/index.css`:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', ...;
}
```

### Layout

Adjust container widths and spacing in `/client/src/index.css`:

```css
.container {
  max-width: 1280px;
  padding-left: 2rem;
  padding-right: 2rem;
}
```

## Technologies

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **Vite**: Fast build tool
- **Wouter**: Lightweight routing
- **Streamdown**: Markdown rendering
- **shadcn/ui**: UI component library

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the Triangle Agency tabletop RPG
- Design influenced by AgencyOS project
- Built with modern web technologies

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy blogging! Share your Triangle Agency stories with the world.** 🔺
