'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Video, User, Plus } from './icons';

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      active: pathname === '/'
    },
    {
      id: 'discover',
      label: 'Discover',
      icon: Video,
      path: '/discover',
      active: pathname === '/discover'
    },
    {
      id: 'create',
      label: 'Create',
      icon: Plus,
      path: '/create',
      active: pathname === '/create',
      special: true
    },
    {
      id: 'inbox',
      label: 'Inbox',
      icon: Video,
      path: '/inbox',
      active: pathname === '/inbox'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      active: pathname === '/profile'
    }
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.special) {
              // Special Create button with gradient
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className="relative group"
                  aria-label={item.label}
                >
                  <div className="relative">
                    {/* Gradient border effect */}
                    <div className="absolute inset-0 gradient-purple-pink rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />

                    {/* Button */}
                    <div className="relative w-12 h-8 gradient-purple-pink rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                      <Icon className="w-5 h-5 text-white font-bold" strokeWidth={3} />
                    </div>
                  </div>
                </button>
              );
            }

            // Regular navigation items
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 transition-all ${
                  item.active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={item.label}
              >
                <Icon
                  className={`w-6 h-6 transition-transform ${
                    item.active ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  strokeWidth={item.active ? 2.5 : 2}
                />
                <span className={`text-[10px] font-semibold ${
                  item.active ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safe area spacer for mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
