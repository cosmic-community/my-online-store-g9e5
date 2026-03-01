import Link from 'next/link';
import { getAllProducts, getAllCategories, getAllReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const latestReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-brand-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-transparent to-accent-500" />
        </div>
        <div className="container-main relative py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-300 text-sm font-medium rounded-full mb-6">
              Welcome to My Online Store
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Discover Products{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
                You&apos;ll Love
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Browse our curated collection of quality products. From everyday essentials to unique finds, we have something for everyone.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 transition-colors"
              >
                Shop Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container-main py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-500">Find what you need organized by category</p>
            </div>
            <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block">
              View All Categories →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-main">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="mt-2 text-gray-500">Our top picks just for you</p>
              </div>
              <Link href="/products" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block">
                View All Products →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {latestReviews.length > 0 && (
        <section className="container-main py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
              <p className="mt-2 text-gray-500">What our customers are saying</p>
            </div>
            <Link href="/reviews" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors hidden sm:block">
              View All Reviews →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-brand-600 py-16">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Start Shopping?</h2>
          <p className="mt-4 text-brand-100 text-lg max-w-2xl mx-auto">
            Explore our full catalog and find the perfect product for you. Quality items, great prices, and excellent customer service.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center px-8 py-3 bg-white text-brand-700 font-semibold rounded-lg hover:bg-brand-50 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}