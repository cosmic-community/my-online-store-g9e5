# My Online Store

![My Online Store](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop&auto=format)

A modern, responsive e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products by category, view detailed product pages with customer reviews, and enjoy a beautiful shopping experience.

## Features

- 🛍️ **Product Catalog** — Browse all products with images, pricing, and inventory badges
- 🏷️ **Category Pages** — Dedicated pages for each product category
- ⭐ **Customer Reviews** — Star ratings and review comments on product detail pages
- 📦 **Inventory Status** — Visual indicators for stock availability
- 🖼️ **Image Galleries** — Optimized product images with imgix
- 📱 **Responsive Design** — Mobile-first layout that works beautifully on all devices
- 🚀 **Server-Side Rendering** — Fast, SEO-optimized pages with Next.js 16 App Router
- 🎨 **Modern UI** — Tailwind CSS styling with smooth animations and transitions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a4c8554daadac4eab638de&clone_repository=69a4c96c4daadac4eab63906)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file with:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product with Reviews

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'product-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with three Cosmic object types:

| Object Type | Description |
|-------------|-------------|
| **Products** | Product listings with price, images, gallery, inventory status, and category |
| **Categories** | Product categories with name, description, and image |
| **Reviews** | Customer reviews with reviewer name, rating, comment, and linked product |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository in [Netlify](https://netlify.com)
3. Set the build command to `bun run build`
4. Add your environment variables
5. Deploy

<!-- README_END -->