import type { Review } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const rating = review.metadata?.rating ?? 0;
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const comment = review.metadata?.comment || '';
  const product = review.metadata?.product;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold text-sm">
            {reviewerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{reviewerName}</p>
            {showProduct && product && (
              <p className="text-xs text-gray-500">
                Reviewed <span className="font-medium text-brand-600">{product.title}</span>
              </p>
            )}
          </div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>

      {comment && (
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{comment}</p>
      )}
    </div>
  );
}