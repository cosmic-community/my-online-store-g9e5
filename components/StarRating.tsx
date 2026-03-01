interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating ? 'text-accent-400' : 'text-gray-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}