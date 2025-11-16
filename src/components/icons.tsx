/**
 * Icon Components Library
 * Lucide-based icons matching the TikTok-style design
 */

import {
  Home,
  Video,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music,
  Camera,
  FlipHorizontal,
  Sparkles,
  Timer,
  X,
  MoreHorizontal,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  Plus,
  Search,
  Settings,
  LogOut,
  Grid3x3
} from 'lucide-react';

// Re-export commonly used icons
export {
  Home,
  Video,
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music,
  Camera,
  FlipHorizontal,
  Sparkles,
  Timer,
  X,
  MoreHorizontal,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  Plus,
  Search,
  Settings,
  LogOut,
  Grid3x3
};

// Custom TikTok-style Logo Icon
export function FlickLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

// Verified Badge Icon
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

// Music Note Icon (Animated)
export function MusicNote({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={`${className} ${animated ? 'animate-pulse' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
