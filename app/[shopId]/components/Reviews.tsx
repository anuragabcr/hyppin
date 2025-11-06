"use client";

import React from "react";
import { ThumbsUp, MessageSquare, Share2, Star } from "lucide-react";
import Image from "next/image";

// --- 1. Define Data Structures ---

interface ReviewImage {
  url: string;
  alt: string;
}

interface Review {
  id: number;
  userName: string;
  reviewCount: number;
  followerCount: number;
  userAvatarUrl: string;
  rating: number; // e.g., 5
  timeAgo: string;
  text: string;
  images: ReviewImage[];
  votesHelpful: number;
  comments: number;
}

// --- 2. Dummy Data from the Image ---
const dummyReviews: Review[] = [
  {
    id: 1,
    userName: "Aditi Sharma",
    reviewCount: 12,
    followerCount: 340,
    userAvatarUrl: "https://placehold.co/40x40/F59E0B/FFFFFF?text=AS",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Absolutely love the fit and fabric! The color is exactly as shown, and it feels super soft on the skin. Definitely worth the price!",
    images: [
      {
        url: "https://placehold.co/120x120/FBBF24/FFF?text=Outfit",
        alt: "Outfit Image",
      },
      {
        url: "https://placehold.co/120x120/F87171/FFF?text=Fabric",
        alt: "Fabric Texture",
      },
    ],
    votesHelpful: 4,
    comments: 1,
  },
  {
    id: 2,
    userName: "Rahul Mehta",
    reviewCount: 7,
    followerCount: 189,
    userAvatarUrl: "https://placehold.co/40x40/60A5FA/ffffff?text=RM",
    rating: 4,
    timeAgo: "1 month ago",
    text: "Ordered a pair of slim-fit jeans and a casual shirt. The jeans fit perfectly, but the shirt was slightly loose. Overall quality is impressive, and delivery was quick.",
    images: [
      {
        url: "https://placehold.co/120x120/93C5FD/FFF?text=Jeans",
        alt: "Denim Jeans",
      },
      {
        url: "https://placehold.co/120x120/FDE047/333?text=Shirt",
        alt: "Casual Shirt",
      },
      {
        url: "https://placehold.co/120x120/A3E635/FFF?text=Look",
        alt: "Outfit Look",
      },
    ],
    votesHelpful: 6,
    comments: 2,
  },
  {
    id: 3,
    userName: "Sneha Patel",
    reviewCount: 4,
    followerCount: 98,
    userAvatarUrl: "https://placehold.co/40x40/EF4444/ffffff?text=SP",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Visited the flagship store last weekend — beautiful layout and helpful staff! Got an amazing deal on a blazer. Fabric feels luxurious.",
    images: [
      {
        url: "https://placehold.co/120x120/9333EA/FFF?text=Blazer",
        alt: "Navy Blue Blazer",
      },
      {
        url: "https://placehold.co/120x120/F9A8D4/333?text=Store",
        alt: "Store Interior",
      },
    ],
    votesHelpful: 3,
    comments: 0,
  },
];

// --- 3. Review Action Button Component ---
const ReviewAction: React.FC<{ Icon: React.ElementType; label: string }> = ({
  Icon,
  label,
}) => (
  <button className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700 transition-colors">
    <Icon className="w-4 h-4" />
    <span className="font-medium">{label}</span>
  </button>
);

// --- 4. Single Review Card Component ---
const SingleReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const displayImages = review.images.slice(0, 3);
  const remainingImages = review.images.length - 3;

  return (
    <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
      {/* Header: User Info and Follow Button */}
      <div className="flex justify-between">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            <Image
              width={40}
              height={40}
              src={review.userAvatarUrl}
              alt={review.userName}
              unoptimized
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{review.userName}</p>
              <p className="text-xs text-gray-500">
                {review.reviewCount} reviews • {review.followerCount} Followers
              </p>
            </div>
          </div>
        </div>

        {/* Review Metadata: Rating and Time */}
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-0.5 px-2 py-0.5 text-white bg-green-600 rounded-lg text-xs font-bold">
            {review.rating}
            <Star className="w-3 h-3 fill-white stroke-none ml-0.5" />
          </span>
          <span className="text-xs text-gray-500">• {review.timeAgo}</span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-base text-gray-800 leading-relaxed mb-3">
        {review.text}
      </p>

      {/* Images Section */}
      {review.images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {displayImages.map((image, index) => (
            <div key={index} className="relative flex-shrink-0">
              <Image
                width={128}
                height={128}
                src={image.url}
                alt={image.alt}
                className="w-32 h-32 object-cover rounded-lg"
                unoptimized
              />
              {/* Overlay for remaining photos on the last visible image */}
              {index === 2 && remainingImages > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg cursor-pointer">
                  <span className="text-white text-lg font-bold">
                    +{remainingImages} Photo(s)
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer: Votes and Actions */}
      <div className="text-sm text-gray-500 mb-3">
        {review.votesHelpful} Votes for helpful, {review.comments} Comments
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-6 pt-2">
        <ReviewAction Icon={ThumbsUp} label="Helpful" />
        <ReviewAction Icon={MessageSquare} label="Comment" />
        <ReviewAction Icon={Share2} label="Share" />
      </div>
    </div>
  );
};

// --- 5. Main Reviews Component (Renders all dummy reviews) ---
const Reviews: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold p-6 border-b border-gray-200">
        Customer Reviews
      </h2>

      {dummyReviews.map((review) => (
        <SingleReviewCard key={review.id} review={review} />
      ))}

      {/* Dummy button to load more reviews */}
      <div className="p-6 text-center">
        <button className="text-red-500 font-semibold text-lg hover:text-red-600 transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
