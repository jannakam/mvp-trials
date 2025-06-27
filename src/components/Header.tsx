'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Header = () => {
  const { theme, language, toggleTheme, toggleLanguage, isRTL } = useAppContext();
  const t = translations[language];
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: t.home, href: '/' },
    { name: t.explore, href: '/explore' },
    { name: t.wishlist, href: '/wishlist' },
    { name: t.profile, href: '/profile' },
    { name: t.cart, href: '/cart' },
  ];

  const categories = [
    { name: language === 'en' ? 'Furniture' : 'الأثاث', href: '/explore?category=furniture' },
    { name: language === 'en' ? 'Decor' : 'الديكور', href: '/explore?category=decor' },
    { name: language === 'en' ? 'Fashion' : 'الأزياء', href: '/explore?category=fashion' },
    { name: language === 'en' ? 'Collectibles' : 'المقتنيات', href: '/explore?category=collectibles' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-neutral-beige dark:border-accent-olive-dark">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-accent-peach rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="text-xl font-bold text-accent-olive-dark dark:text-neutral-beige">
              Vintage Kuwait
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent-peach ${
                  pathname === item.href
                    ? 'text-accent-peach'
                    : 'text-accent-olive-dark dark:text-neutral-beige'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Profile & Cart Icons */}
            <Link
              href="/profile"
              className="p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            <Link
              href="/cart"
              className="p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark transition-colors relative"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Category Navigation */}
      <div className="hidden md:block border-t border-neutral-beige dark:border-accent-olive-dark">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 rtl:space-x-reverse py-3">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-sm font-medium text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-beige dark:border-accent-olive-dark bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-accent-peach'
                      : 'text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-neutral-beige dark:border-accent-olive-dark">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={toggleLanguage}
                    className="px-3 py-1.5 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige text-sm"
                  >
                    {language === 'en' ? 'عربي' : 'EN'}
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="px-3 py-1.5 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige text-sm"
                  >
                    {theme === 'light' ? '🌙' : '☀️'}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}; 