import type { Metadata } from 'next';
import { getAllCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse products by category.',
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="container-main py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Categories</h1>
        <p className="mt-2 text-lg text-gray-500">
          Browse our {categories.length} product categor{categories.length !== 1 ? 'ies' : 'y'}
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600">No categories yet</h2>
          <p className="mt-2 text-gray-400">Categories will appear here once added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}