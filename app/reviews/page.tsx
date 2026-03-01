import type { Metadata } from 'next';
import { getAllReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read what our customers are saying about our products.',
};

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => (r.metadata?.rating ?? 0) === star).length,
  }));

  return (
    <div className="container-main py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="mt-2 text-lg text-gray-500">
          See what our customers think about our products
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600">No reviews yet</h2>
          <p className="mt-2 text-gray-400">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <div className="flex justify-center mt-2">
                  <StarRating rating={Math.round(averageRating)} size="lg" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="space-y-3">
                {ratingCounts.map(({ star, count }) => {
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-4">{star}</span>
                      <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}