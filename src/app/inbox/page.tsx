'use client';

import { MessageCircle, Heart, User } from 'lucide-react';
import { BottomNav } from '@/components/bottom-nav';
import Image from 'next/image';
import { mockUsers, formatDate } from '@/lib/mock-data';

export default function InboxPage() {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: mockUsers[1],
      message: 'liked your video',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'comment',
      user: mockUsers[2],
      message: 'commented on your video',
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'follow',
      user: mockUsers[3],
      message: 'started following you',
      time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-primary" />;
      case 'follow':
        return <User className="w-5 h-5 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold">Inbox</h1>
          <button className="text-sm text-primary font-semibold">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border sticky top-14 bg-background z-30">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex">
            <button className="flex-1 py-3 text-foreground font-semibold relative">
              All Activity
              <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-purple-pink" />
            </button>
            <button className="flex-1 py-3 text-muted-foreground font-semibold">
              Mentions
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-screen-xl mx-auto">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            className={`w-full flex items-center gap-3 px-4 py-4 border-b border-border hover:bg-muted transition-colors ${
              !notification.read ? 'bg-primary/5' : ''
            }`}
          >
            {/* User Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={notification.user.avatar}
                  alt={notification.user.displayName}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              {/* Notification Type Icon */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-background flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <p className="text-sm">
                <span className="font-semibold">{notification.user.username}</span>{' '}
                <span className="text-muted-foreground">{notification.message}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(notification.time)}
              </p>
            </div>

            {/* Action */}
            {notification.type === 'follow' && (
              <button className="px-4 py-1.5 rounded-lg gradient-purple-pink text-white text-sm font-semibold">
                Follow Back
              </button>
            )}

            {/* Unread Indicator */}
            {!notification.read && (
              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            )}
          </button>
        ))}

        {/* Empty State Placeholder */}
        {notifications.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">
              When someone interacts with your content, you&apos;ll see it here
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
