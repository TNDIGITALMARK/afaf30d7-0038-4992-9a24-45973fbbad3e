'use client';

import { useRouter } from 'next/navigation';
import { Search, TrendingUp } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';
import { mockVideos, formatNumber } from '@/lib/mock-data';
import Image from 'next/image';

export default function DiscoverPage() {
  const router = useRouter();

  const trendingHashtags = [
    { tag: '#DanceChallenge', views: '2.5B' },
    { tag: '#CookingHack', views: '1.8B' },
    { tag: '#Pets', views: '3.2B' },
    { tag: '#DIY', views: '890M' },
    { tag: '#Funny', views: '4.1B' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search videos, users, sounds..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Trending Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Trending Now
          </h2>

          <div className="space-y-3">
            {trendingHashtags.map((item, index) => (
              <button
                key={item.tag}
                onClick={() => alert(`Search for ${item.tag}`)}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-card hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-lg gradient-purple-pink flex items-center justify-center text-white font-bold text-lg">
                  #{index + 1}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold">{item.tag}</h3>
                  <p className="text-sm text-muted-foreground">{item.views} views</p>
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </button>
            ))}
          </div>
        </div>

        {/* Popular Videos */}
        <div>
          <h2 className="text-xl font-bold mb-4">Popular Videos</h2>

          <div className="grid grid-cols-2 gap-3">
            {mockVideos.map((video) => (
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
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Video Info */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-xs line-clamp-2 mb-2">{video.caption}</p>
                  <div className="flex items-center gap-2 text-white text-xs">
                    <span>❤️ {formatNumber(video.likes)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
