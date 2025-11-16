'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Settings, Grid3x3, Heart, Bookmark, VerifiedBadge } from '@/components/icons';
import { BottomNav } from '@/components/bottom-nav';
import { mockUsers, mockVideos, formatNumber, type Video } from '@/lib/mock-data';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'videos' | 'likes'>('videos');

  // In production, this would be the current user from auth context
  const currentUser = mockUsers[0];
  const userVideos = mockVideos.filter(v => v.userId === currentUser.id);
  const likedVideos = mockVideos.filter((_, index) => index % 2 === 0); // Mock liked videos

  const stats = [
    { label: 'Following', value: formatNumber(currentUser.following) },
    { label: 'Followers', value: formatNumber(currentUser.followers) },
    { label: 'Likes', value: formatNumber(currentUser.likes) }
  ];

  const tabs = [
    { id: 'videos', label: 'Videos', icon: Grid3x3, count: userVideos.length },
    { id: 'likes', label: 'Likes', icon: Heart, count: likedVideos.length }
  ];

  const displayVideos = activeTab === 'videos' ? userVideos : likedVideos;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold">{currentUser.username}</h1>
          <button
            onClick={() => alert('Settings coming soon!')}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-screen-xl mx-auto px-4 pt-6">
        {/* Avatar and Stats */}
        <div className="flex items-center gap-6 mb-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary shadow-purple-glow">
              <Image
                src={currentUser.avatar}
                alt={currentUser.displayName}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 flex justify-around">
            {stats.map((stat) => (
              <button
                key={stat.label}
                className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Name and Bio */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold">{currentUser.displayName}</h2>
            {currentUser.verified && (
              <VerifiedBadge className="w-5 h-5 text-primary" />
            )}
          </div>
          {currentUser.bio && (
            <p className="text-sm text-muted-foreground">{currentUser.bio}</p>
          )}
          {currentUser.category && (
            <p className="text-xs text-primary mt-1">
              {currentUser.category.replace(/_/g, ' ')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <button className="flex-1 py-2.5 px-4 rounded-lg gradient-purple-pink text-white font-semibold transition-transform hover:scale-105">
            Edit Profile
          </button>
          <button className="flex-1 py-2.5 px-4 rounded-lg border-2 border-border font-semibold transition-transform hover:scale-105">
            Share Profile
          </button>
          <button className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center transition-transform hover:scale-105">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'videos' | 'likes')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 relative transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.count}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-purple-pink" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-1 pb-4">
          {displayVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => router.push('/')}
              className="relative aspect-[9/16] rounded-lg overflow-hidden group"
            >
              <Image
                src={video.thumbnailUrl}
                alt={video.caption}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 25vw"
              />

              {/* Overlay with view count */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
                  <Heart className="w-4 h-4" />
                  <span className="font-semibold">{formatNumber(video.likes)}</span>
                </div>
              </div>

              {/* View count badge */}
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-xs font-semibold">
                {formatNumber(video.views)}
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {displayVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Grid3x3 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeTab === 'videos'
                ? 'Start creating content to see it here'
                : 'Videos you like will appear here'}
            </p>
            {activeTab === 'videos' && (
              <button
                onClick={() => router.push('/create')}
                className="px-6 py-2.5 rounded-lg gradient-purple-pink text-white font-semibold transition-transform hover:scale-105"
              >
                Create Video
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
