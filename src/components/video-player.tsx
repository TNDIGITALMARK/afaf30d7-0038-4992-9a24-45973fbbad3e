'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX } from './icons';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  isActive: boolean;
  onDoubleClick?: () => void;
}

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  isActive,
  onDoubleClick
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Auto-play when video becomes active
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {
          // Auto-play failed, user needs to interact
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClick = () => {
    setShowControls(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide controls after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick();
    }
  };

  return (
    <div
      className="relative w-full h-full bg-black overflow-hidden"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* For MVP, we'll use the thumbnail as a static image */}
      <div className="relative w-full h-full">
        <Image
          src={videoUrl}
          alt="Video content"
          fill
          className="object-cover"
          priority={isActive}
          sizes="100vw"
        />
      </div>

      {/* Play/Pause Overlay */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-white" />
            ) : (
              <Play className="w-10 h-10 text-white ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Volume Control */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110 z-10"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Double-tap heart animation indicator */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* This would show a heart animation on double-tap in production */}
      </div>
    </div>
  );
}
