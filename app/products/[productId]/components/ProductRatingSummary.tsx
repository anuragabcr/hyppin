"use client";

import { MessageSquare } from "lucide-react";

interface RatingSummaryProps {
  averageRating: number;
  totalRatings: number;
  totalReviews: number;
  breakdown: {
    Excellent: number;
    "Very Good": number;
    Good: number;
    Average: number;
    Poor: number;
  };
}

export default function ProductRatingSummary({
  averageRating,
  totalRatings,
  totalReviews,
  breakdown,
}: RatingSummaryProps) {
  const maxValue = Math.max(...Object.values(breakdown));

  const colors: Record<string, string> = {
    Excellent: "bg-green-600",
    "Very Good": "bg-green-400",
    Good: "bg-yellow-500",
    Average: "bg-orange-400",
    Poor: "bg-red-500",
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Product Ratings & Reviews
        </h2>

        <a
          href="#"
          className="flex items-center text-purple-600 font-medium hover:underline text-sm"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          View All Products →
        </a>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row md:space-x-10">
        {/* Left Side: Big Rating */}
        <div className="flex flex-col items-start md:w-1/3 mb-6 md:mb-0">
          <div className="flex items-center text-5xl font-bold text-gray-900">
            {averageRating}
            <span className="ml-1 text-green-600">★</span>
          </div>

          <p className="mt-2 text-gray-600 text-sm">
            {totalRatings.toLocaleString()} Ratings,{" "}
            {totalReviews.toLocaleString()} Reviews
          </p>
        </div>

        {/* Right Side: Rating Bars */}
        <div className="flex-1 space-y-4">
          {Object.entries(breakdown).map(([label, count]) => (
            <div key={label} className="flex items-center space-x-4">
              {/* Rating Label */}
              <span className="w-24 text-gray-700 text-sm">{label}</span>

              {/* Bar Background */}
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors[label]}`}
                  style={{
                    width: `${(count / maxValue) * 100}%`,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>

              {/* Count */}
              <span className="w-12 text-right text-gray-700 text-sm">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
