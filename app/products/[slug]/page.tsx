// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsForProduct } from '@/lib/cosmic';
import InventoryBadge from '@/components/InventoryBadge';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | My Online Store' };
  }
  return {
    title: `${product.title} | My Online Store`,
    description: product.metadata?.description || `View details for ${product.title}`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsForProduct(product.id);

  const imageUrl = product.metadata?.featured_image?.imgix_url;
  const gallery = product.metadata?.gallery;
  const price = product.metadata?.price;
  const description = product.metadata?.description;
  const inventoryStatus = product.metadata?.inventory_status;
  const category = product.metadata?.category;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0;

  return (
    <div className="container-main py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
            {imageUrl ? (
              <img
                src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} gallery ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-brand-600 hover:text-brand-700 uppercase tracking-wider mb-2 transition-colors"
            >
              {category.title}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={Math.round(averageRating)} />
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} out of 5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {typeof price === 'number' && (
            <p className="mt-6 text-4xl font-bold text-gray-900">${price.toFixed(2)}</p>
          )}

          {inventoryStatus && (
            <div className="mt-4">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}

          {description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          {product.content && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Details</h2>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Customer Reviews
          {reviews.length > 0 && (
            <span className="ml-2 text-lg font-normal text-gray-400">({reviews.length})</span>
          )}
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500">No reviews yet for this product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}