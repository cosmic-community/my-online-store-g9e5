import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'All Products | My Online Store',
  description: 'Browse our full collection of products.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container-main py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-lg text-gray-500">
          Browse our complete collection of {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600">No products yet</h2>
          <p className="mt-2 text-gray-400">Check back soon for new arrivals!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}