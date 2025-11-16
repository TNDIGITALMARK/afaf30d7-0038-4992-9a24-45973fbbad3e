'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, FlipHorizontal, Sparkles, Timer, X } from '@/components/icons';
import { BottomNav } from '@/components/bottom-nav';

export default function CreatePage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [timerDuration, setTimerDuration] = useState(60);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filters = [
    { id: 'none', name: 'Original', preview: '🎨' },
    { id: 'vibrant', name: 'Vibrant', preview: '✨' },
    { id: 'retro', name: 'Retro', preview: '📷' },
    { id: 'neon', name: 'Neon', preview: '💜' },
    { id: 'cinematic', name: 'Cinematic', preview: '🎬' }
  ];

  const effects = [
    { id: 'beauty', name: 'Beauty', icon: '✨' },
    { id: 'sticker', name: 'Stickers', icon: '😊' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'music', name: 'Sounds', icon: '🎵' }
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setRecordingProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        setRecordingProgress(0);
        // In production, this would navigate to editing screen
        alert('Video recorded! (This would navigate to editing screen in production)');
      }
    }, (timerDuration * 1000) / 100);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingProgress(0);
  };

  const handleUploadVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`File selected: ${file.name}\nIn production, this would navigate to the editing screen.`);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      {/* Camera Preview Area */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="w-32 h-32 mx-auto mb-6 opacity-50" />
          <p className="text-lg font-semibold mb-2">Camera Preview</p>
          <p className="text-sm opacity-70 max-w-xs mx-auto px-4">
            In production, this would show the live camera feed. For MVP, tap the record button or upload a video.
          </p>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110">
              <FlipHorizontal className="w-5 h-5 text-white" />
            </button>

            <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110">
              <Sparkles className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar - Horizontal Scroll */}
      <div className="absolute top-20 left-0 right-0 z-10 px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-transform hover:scale-105 ${
                selectedFilter === filter.id ? 'scale-110' : ''
              }`}
            >
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all ${
                  selectedFilter === filter.id
                    ? 'gradient-purple-pink shadow-purple-glow'
                    : 'bg-black/50 backdrop-blur-sm'
                }`}
              >
                {filter.preview}
              </div>
              <span
                className={`text-xs font-semibold ${
                  selectedFilter === filter.id ? 'text-white' : 'text-white/70'
                }`}
              >
                {filter.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Effects Bar - Right Side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col gap-4">
          {effects.map((effect) => (
            <button
              key={effect.id}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-xl transition-transform hover:scale-110"
            >
              {effect.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-20 left-0 right-0 z-10 pb-8">
        <div className="flex items-center justify-center gap-8 px-4">
          {/* Upload Button */}
          <button
            onClick={handleUploadVideo}
            className="w-12 h-12 rounded-lg bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center transition-transform hover:scale-110"
          >
            <span className="text-2xl">📁</span>
            <span className="text-[10px] text-white mt-1">Upload</span>
          </button>

          {/* Record Button */}
          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className="relative group"
          >
            {/* Outer ring */}
            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
              {/* Inner circle */}
              <div
                className={`transition-all ${
                  isRecording
                    ? 'w-8 h-8 rounded-md bg-red-500'
                    : 'w-16 h-16 rounded-full gradient-purple-pink group-hover:scale-95'
                }`}
              />
            </div>

            {/* Recording Progress Ring */}
            {isRecording && (
              <svg
                className="absolute inset-0 w-20 h-20 -rotate-90"
                style={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 - (251.2 * recordingProgress) / 100 }}
              >
                <circle
                  cx="40"
                  cy="40"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </button>

          {/* Timer Selector */}
          <button className="w-12 h-12 rounded-lg bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center transition-transform hover:scale-110">
            <Timer className="w-5 h-5 text-white" />
            <span className="text-[10px] text-white mt-1">{timerDuration}s</span>
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Recording Status Text */}
        {isRecording && (
          <div className="text-center mt-4">
            <p className="text-white text-sm font-semibold animate-pulse">
              Recording... {Math.floor((recordingProgress / 100) * timerDuration)}s
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
