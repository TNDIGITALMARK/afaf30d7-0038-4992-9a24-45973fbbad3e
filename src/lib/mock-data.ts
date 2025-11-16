/**
 * Mock Data System for Flick TikTok Clone
 * Simulates backend data and functions for MVP demonstration
 */

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  videoCount: number;
  verified: boolean;
  bio?: string;
  category?: string;
}

export interface Video {
  id: string;
  userId: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  music?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: Date;
  tags: string[];
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  user: User;
  text: string;
  likes: number;
  createdAt: Date;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user_sarah_dance',
    username: '@sarahdance',
    displayName: 'Sarah Dance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    followers: 45000,
    following: 234,
    likes: 1200000,
    videoCount: 23,
    verified: true,
    bio: '💃 Professional dancer | Dance challenges',
    category: 'verified_creator_badge'
  },
  {
    id: 'user_chef_mike',
    username: '@chefmike',
    displayName: 'Chef Mike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    followers: 120000,
    following: 567,
    likes: 3400000,
    videoCount: 67,
    verified: true,
    bio: '👨‍🍳 Cooking hacks & recipes | Food lover',
    category: 'cooking_category_expert'
  },
  {
    id: 'user_animal_lover',
    username: '@animallover',
    displayName: 'Pet Paradise',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pets',
    followers: 89000,
    following: 892,
    likes: 2100000,
    videoCount: 145,
    verified: false,
    bio: '🐾 Funny pet videos | Animal content',
    category: 'pet_content_specialist'
  },
  {
    id: 'user_home_design',
    username: '@homedesign',
    displayName: 'Home Design Pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=design',
    followers: 78000,
    following: 345,
    likes: 980000,
    videoCount: 42,
    verified: true,
    bio: '🏠 DIY room makeovers | Interior design',
    category: 'home_design_expert'
  }
];

// Mock Videos
export const mockVideos: Video[] = [
  {
    id: 'video_1',
    userId: 'user_sarah_dance',
    user: mockUsers[0],
    videoUrl: '/generated/dance-challenge.png',
    thumbnailUrl: '/generated/dance-challenge.png',
    caption: '💜 New dance challenge! Can you do this? #DanceChallenge #Viral',
    music: 'Original Sound - Sarah Dance',
    likes: 245000,
    comments: 3420,
    shares: 12400,
    views: 1200000,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['dance', 'challenge', 'viral', 'trending']
  },
  {
    id: 'video_2',
    userId: 'user_chef_mike',
    user: mockUsers[1],
    videoUrl: '/generated/cooking-hack.png',
    thumbnailUrl: '/generated/cooking-hack.png',
    caption: '🔥 Mind-blowing pasta hack! Try this tonight #CookingHack #FoodTok',
    music: 'Cooking Vibes - Chef Mike',
    likes: 89000,
    comments: 1890,
    shares: 8900,
    views: 890000,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['cooking', 'recipe', 'foodhack', 'pasta']
  },
  {
    id: 'video_3',
    userId: 'user_animal_lover',
    user: mockUsers[2],
    videoUrl: '/generated/pet-compilation.png',
    thumbnailUrl: '/generated/pet-compilation.png',
    caption: '😂 Funniest pet fails of the week! #Pets #Funny #Animals',
    music: 'Funny Pet Music',
    likes: 156000,
    comments: 5670,
    shares: 23400,
    views: 2100000,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['pets', 'funny', 'animals', 'comedy']
  },
  {
    id: 'video_4',
    userId: 'user_home_design',
    user: mockUsers[3],
    videoUrl: '/generated/room-makeover.png',
    thumbnailUrl: '/generated/room-makeover.png',
    caption: '✨ $200 bedroom glow-up! Before & After #DIY #RoomMakeover',
    music: 'Home Sweet Home',
    likes: 78000,
    comments: 2340,
    shares: 6700,
    views: 670000,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    tags: ['diy', 'home', 'makeover', 'interior']
  }
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment_1',
    videoId: 'video_1',
    userId: 'user_chef_mike',
    user: mockUsers[1],
    text: 'This is amazing! 🔥🔥🔥',
    likes: 234,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'comment_2',
    videoId: 'video_1',
    userId: 'user_animal_lover',
    user: mockUsers[2],
    text: 'I need to learn this dance!!',
    likes: 128,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

/**
 * Simulated Functions
 */

// AI Content Recommendation Engine
export function ai_content_recommendation_engine(userId?: string): Video[] {
  // Simulate personalized video queue
  return [...mockVideos].sort(() => Math.random() - 0.5);
}

// Video Upload Processor
export function video_upload_processor(file: File, metadata: {
  caption: string;
  music?: string;
  tags: string[];
}): Promise<Video> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVideo: Video = {
        id: `video_${Date.now()}`,
        userId: 'current_user',
        user: mockUsers[0], // Simulating current user
        videoUrl: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        caption: metadata.caption,
        music: metadata.music,
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        createdAt: new Date(),
        tags: metadata.tags
      };
      resolve(newVideo);
    }, 2000); // Simulate 2s upload time
  });
}

// Engagement Tracker
export function engagement_tracker(action: 'like' | 'comment' | 'share' | 'view', videoId: string) {
  const video = mockVideos.find(v => v.id === videoId);
  if (!video) return;

  switch (action) {
    case 'like':
      video.likes++;
      break;
    case 'comment':
      video.comments++;
      break;
    case 'share':
      video.shares++;
      break;
    case 'view':
      video.views++;
      break;
  }
}

// User Authentication System
export function user_authentication_system(username: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulated authentication
      if (username && password) {
        resolve(mockUsers[0]);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

// Format numbers for display (e.g., 1234 -> 1.2K)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// Format date for display (e.g., "2 days ago")
export function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
