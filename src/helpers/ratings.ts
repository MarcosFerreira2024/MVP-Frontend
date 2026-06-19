import type { Rating } from "../types/Outing";

export function calcRatingAverage(ratings?: Rating[]): {
  rating: number;
  ratingCount: number;
} {
  const ratingCount = ratings ? ratings.length : 0;
  const totalRating = ratings
    ? ratings.reduce(
        (sum: number, r: Rating) => sum + (Number(r.rating) || 0),
        0,
      )
    : 0;
  const rating = ratingCount > 0 ? totalRating / ratingCount : 0;
  return { rating, ratingCount };
}
