'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { VideoPlayer } from '@/components/video-player';
import { EngagementBar } from '@/components/engagement-bar';
import { BottomNav } from '@/components/bottom-nav';
import { MusicNote, VerifiedBadge } from '@/components/icons';
import { mockVideos, ai_content_recommendation_engine, engagement_tracker, type Video } from '@/lib/mock-data';

export default function VideoFeedPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Load videos on mount
  useEffect(() => {
    const loadedVideos = ai_content_recommendation_engine();
    setVideos(loadedVideos);
  }, []);

  const currentVideo = videos[currentIndex];

  // Handle swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartY.current - touchEndY.current;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(swipeDistance) > threshold && !isTransitioning) {
      if (swipeDistance > 0) {
        // Swiped up - next video
        goToNextVideo();
      } else {
        // Swiped down - previous video
        goToPreviousVideo();
      }
    }
  };

  const goToNextVideo = useCallback(() => {
    if (currentIndex < videos.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, videos.length, isTransitioning]);

  const goToPreviousVideo = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [currentIndex, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        goToPreviousVideo();
      } else if (e.key === 'ArrowDown') {
        goToNextVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextVideo, goToPreviousVideo]);

  const handleLike = () => {
    if (currentVideo) {
      engagement_tracker('like', currentVideo.id);
    }
  };

  const handleComment = () => {
    // In MVP, we'll just show an alert
    alert('Comments feature coming soon!');
  };

  const handleShare = () => {
    if (currentVideo && navigator.share) {
      navigator.share({
        title: 'Check out this video!',
        text: currentVideo.caption,
        url: window.location.href
      });
    } else {
      alert('Share feature coming soon!');
    }
  };

  if (!currentVideo) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      {/* Video Container - Full Screen */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <VideoPlayer
          videoUrl={currentVideo.videoUrl}
          thumbnailUrl={currentVideo.thumbnailUrl}
          isActive={true}
          onDoubleClick={handleLike}
        />
      </div>

      {/* Video Info Overlay - Bottom Left */}
      <div className="absolute bottom-20 left-0 right-0 z-10 pointer-events-none">
        <div className="px-4 pb-4 space-y-3">
          {/* Username */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button className="flex items-center gap-2 group">
              <span className="text-white font-bold text-base drop-shadow-lg">
                {currentVideo.user.username}
              </span>
              {currentVideo.user.verified && (
                <VerifiedBadge className="w-4 h-4 text-primary" />
              )}
            </button>
          </div>

          {/* Caption */}
          <p className="text-white text-sm drop-shadow-lg max-w-[70%] line-clamp-2">
            {currentVideo.caption}
          </p>

          {/* Music Info */}
          {currentVideo.music && (
            <div className="flex items-center gap-2 pointer-events-auto">
              <MusicNote className="w-4 h-4 text-white" animated />
              <span className="text-white text-xs drop-shadow-lg">
                {currentVideo.music}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Engagement Bar - Right Side */}
      <div className="absolute bottom-20 right-2 z-10">
        <EngagementBar
          user={currentVideo.user}
          likes={currentVideo.likes}
          comments={currentVideo.comments}
          shares={currentVideo.shares}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
      </div>

      {/* Progress Indicator - Right Side */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white'
                : index < currentIndex
                ? 'bg-white/50'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}