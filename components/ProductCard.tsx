import Link from 'next/link';
import type { Product } from '@/types';
import InventoryBadge from '@/components/InventoryBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata?.featured_image?.imgix_url;
  const price = product.metadata?.price;
  const category = product.metadata?.category;
  const inventoryStatus = product.metadata?.inventory_status;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {inventoryStatus && (
            <div className="absolute top-3 right-3">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}
        </div>

        <div className="p-4">
          {category && (
            <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
              {category.title}
            </span>
          )}
          <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {product.title}
          </h3>
          {product.metadata?.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {product.metadata.description}
            </p>
          )}
          {typeof price === 'number' && (
            <p className="mt-3 text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}