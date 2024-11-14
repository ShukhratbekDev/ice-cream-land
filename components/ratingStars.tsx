import { Star } from 'lucide-react';

type RatingStarsProps = {
  rating: number;
};
const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const isFullStar = i < Math.floor(rating);
        const isPartialStar = i === Math.floor(rating) && rating % 1 > 0;

        return (
          <div key={i} className="relative">
            <Star className={`size-4 text-gray-300`} />
            {isFullStar && <Star className={`size-4 text-yellow-400 fill-current absolute left-0 top-0`} />}
            {isPartialStar && (
              <span className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                <Star className={`size-4 text-yellow-400 fill-current`} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingStars;
