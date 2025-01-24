# Tim's Modern Blog Platform

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A high-performance blog platform with MDX content support, dark mode, and modern web best practices. Built with React, Vite, and Velite for superior developer and reader experiences.

![Blog Screenshot](public/social-image.png)

## ✨ Features

- **MDX Content Authoring** - Write posts with interactive components
- **Dark/Light Theme** - System-aware theme switching
- **Content Tagging** - Organize posts with hierarchical tags
- **SEO Optimization** - Automatic meta tags and OpenGraph support
- **Blazing Fast** - 95+ Lighthouse performance scores
- **Responsive Design** - Perfect reading experience on any device
- **Syntax Highlighting** - Beautiful code blocks with line numbers

## 🛠 Tech Stack

**Core Framework**
[Vite](https://vitejs.dev/) | [React 18](https://react.dev/) | [TypeScript](https://www.typescriptlang.org/)

**Styling**
[Tailwind CSS](https://tailwindcss.com/) | [shadcn/ui](https://ui.shadcn.com/)

**Content Management**
[Velite](https://github.com/zthxxx/velite) | [MDX](https://mdxjs.com/) | [Rehype](https://github.com/rehypejs/rehype)

**Routing**
[TanStack Router](https://tanstack.com/router) | [React Helmet](https://github.com/staylor/react-helmet-async)

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/timDeHof/vite-blog.git
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📚 Content Management

Create posts in `src/content/blog/` with MDX:

```mdx
---
title: "React Component Patterns"
description: "Deep dive into modern React architecture"
date: 2024-03-20
tags: ["react", "frontend"]
published: true
---
import Chart from '../components/Chart'
Interactive Post
Embed custom components:
<Chart data={/.../} />
```

## ⚙ Configuration

### Content Processing (`velite.config.ts`)
```typescript
mdx: {
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, {
      theme: { dark: 'github-dark', light: 'github-light' },
      onVisitHighlightedLine: (node) => {
        node.properties.className.push('highlighted')
      }
    }],
    rehypeAutolinkHeadings
  ]
}
```

### Theming (`src/globals.css`)
```css
:root {
  --primary: 201 100% 36%;      /* Brand color */
  --background: 35 30% 98%;    /* Light mode background */
  --foreground: 201 100% 12%;  /* Text color */
}
```

## 📂 Project Structure

```bash
src/
├── components/      # Reusable UI components
├── config/          # App configuration
├── content/         # Blog content (MDX)
├── routes/          # Application routes
├── styles/          # Global styles
└── utils/           # Helper functions
```

## 🌐 Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/timDeHof/vite-blog)

1. Set build command: `npm run build`
2. Output directory: `dist`
3. Enable automatic deployments

## 📊 Performance

| Metric           | Score |
|------------------|-------|
| Lighthouse       | 98    |
| PageSpeed Mobile | 92    |
| Bundle Size      | 45KB  |
| LCP              | 1.2s  |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌟 Acknowledgements

- [Velite](https://github.com/zthxxx/velite) for content processing magic
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [TanStack](https://tanstack.com/) for robust routing solutions

---

🛠 Built by [Tim DeHof](https://timdehof.dev) with ❤️ and too much coffee ☕
📬 Reach out: [Twitter](https://x.com/timdehof) | [GitHub](https://github.com/timDeHof)