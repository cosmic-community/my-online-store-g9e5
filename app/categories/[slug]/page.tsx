// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Category Not Found | My Online Store' };
  }
  return {
    title: `${category.metadata?.name || category.title} | My Online Store`,
    description: category.metadata?.description || `Browse products in ${category.title}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const imageUrl = category.metadata?.image?.imgix_url;
  const categoryName = category.metadata?.name || category.title;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 overflow-hidden">
        {imageUrl && (
          <img
            src={`${imageUrl}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={categoryName}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative container-main py-16 md:py-24">
          <nav className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-white font-medium">{categoryName}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{categoryName}</h1>
          {category.metadata?.description && (
            <p className="mt-4 text-lg text-gray-300 max-w-2xl">{category.metadata.description}</p>
          )}
        </div>
      </section>

      {/* Products */}
      <div className="container-main py-12">
        <div className="mb-8">
          <p className="text-gray-500">
            {products.length} product{products.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-600">No products in this category</h2>
            <p className="mt-2 text-gray-400">Check back soon for new additions!</p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}