import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.metadata?.image?.imgix_url;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={category.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-brand-200 transition-colors">
            {category.metadata?.name || category.title}
          </h3>
          {category.metadata?.description && (
            <p className="mt-1 text-sm text-gray-200 line-clamp-2">
              {category.metadata.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}