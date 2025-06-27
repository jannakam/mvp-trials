'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const { language } = useAppContext();
  const pathname = usePathname();
  const t = translations[language];

  const navItems = [
    {
      name: t.home,
      href: '/',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-accent-peach' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: t.explore,
      href: '/explore',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-accent-peach' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      name: t.wishlist,
      href: '/wishlist',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-accent-peach' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: t.profile,
      href: '/profile',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-accent-peach' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: t.cart,
      href: '/cart',
      icon: (active: boolean) => (
        <div className="relative">
          <svg className={`w-6 h-6 ${active ? 'text-accent-peach' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-accent-peach text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </div>
      ),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark border-t border-neutral-beige dark:border-accent-olive-dark">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors hover:bg-neutral-beige dark:hover:bg-accent-olive min-w-0 flex-1"
            >
              {item.icon(isActive)}
              <span className={`text-xs ${isActive ? 'text-accent-peach font-medium' : 'text-gray-500'} truncate`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}; 