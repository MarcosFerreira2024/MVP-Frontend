import { Star } from "lucide-react";
import React from "react";

function Counts({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount: number;
}) {
  return (
    <div className="flex items-center gap-2 font-segoe font-semibold text-gray-500">
      <Star className="text-green-900" width={16} height={16} />
      <p>
        {rating} <span>({ratingCount})</span>
      </p>
    </div>
  );
}

export default Counts;
