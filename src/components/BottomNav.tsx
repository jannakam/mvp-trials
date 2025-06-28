'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './ui/Icons';

export const BottomNav = () => {
  const { language } = useAppContext();
  const t = translations[language];
  const pathname = usePathname();

  const navItems = [
    { 
      name: t.home, 
      href: '/', 
      icon: <Icons.Home />
    },
    { 
      name: t.explore, 
      href: '/explore', 
      icon: <Icons.Search />
    },
    { 
      name: t.watchlist, 
      href: '/watchlist', 
      icon: <Icons.Watchlist />
    },
    { 
      name: t.profile, 
      href: '/profile', 
      icon: <Icons.Profile />
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background-light dark:bg-background-dark border-t border-neutral-beige dark:border-accent-olive-dark pb-safe-area-inset-bottom backdrop-blur-md z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center space-y-1 mobile-button px-3 py-2 transition-colors ${
              pathname === item.href
                ? 'text-accent-peach'
                : 'text-gray-600 dark:text-gray-400 hover:text-accent-peach'
            }`}
          >
            {item.icon}
            <span className="text-mobile-xs font-medium leading-none">
              {item.name}
            </span>
          </Link>
        ))}
        
        {/* Cart with Badge */}
        <Link
          href="/cart"
          className={`flex flex-col items-center space-y-1 mobile-button px-3 py-2 transition-colors relative ${
            pathname === '/cart'
              ? 'text-accent-peach'
              : 'text-gray-600 dark:text-gray-400 hover:text-accent-peach'
          }`}
        >
          <Icons.Cart />
          <span className="text-mobile-xs font-medium leading-none">
            {t.cart}
          </span>
          <span className="absolute -top-1 -right-1 bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            2
          </span>
        </Link>
      </div>
    </nav>
  );
}; 