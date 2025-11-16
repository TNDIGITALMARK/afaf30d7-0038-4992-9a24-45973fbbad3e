'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark } from './icons';
import { formatNumber, type User } from '@/lib/mock-data';

interface EngagementBarProps {
  user: User;
  likes: number;
  comments: number;
  shares: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onUserClick?: () => void;
}

export function EngagementBar({
  user,
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onUserClick
}: EngagementBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    onLike?.();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.();
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* User Avatar */}
      <button
        onClick={onUserClick}
        className="relative group transition-transform hover:scale-110"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
          <Image
            src={user.avatar}
            alt={user.displayName}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        {/* Add Plus Button for Follow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full gradient-purple-pink flex items-center justify-center border-2 border-black">
          <span className="text-white text-sm font-bold">+</span>
        </div>
      </button>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
      >
        <div className={`relative ${isLiked ? 'animate-pulse' : ''}`}>
          <Heart
            className={`w-8 h-8 transition-colors ${
              isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </div>
        <span className="text-white text-xs font-semibold">
          {formatNumber(currentLikes)}
        </span>
      </button>

      {/* Comment Button */}
      <button
        onClick={onComment}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
      >
        <MessageCircle className="w-8 h-8 text-white" />
        <span className="text-white text-xs font-semibold">
          {formatNumber(comments)}
        </span>
      </button>

      {/* Share Button */}
      <button
        onClick={onShare}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
      >
        <Share2 className="w-8 h-8 text-white" />
        <span className="text-white text-xs font-semibold">
          {formatNumber(shares)}
        </span>
      </button>

      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className="flex flex-col items-center gap-1 group transition-transform hover:scale-110"
      >
        <Bookmark
          className={`w-8 h-8 transition-colors ${
            isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'
          }`}
        />
      </button>
    </div>
  );
}
