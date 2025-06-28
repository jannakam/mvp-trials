'use client';

import { useAppContext } from '@/context/AppContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/context/translations';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './ui/Icons';
import { IconButton } from './ui/Button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Collections', href: '/collections' },
  { name: 'Brands', href: '/brands' },
];

export const Header = () => {
  const { language, theme, toggleLanguage, toggleTheme } = useAppContext();
  const { state: cartState } = useCart();
  const t = translations[language];
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    if (isProfileMenuOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen, isMobileMenuOpen]);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark">
      {/* Header with Logo, Navigation, and Icons */}
      <div className="container mx-auto mobile-px py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse mobile-transition touch-target flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-accent-peach rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">V</span>
            </div>
            <h1 className="text-mobile-lg md:text-xl font-bold text-accent-olive-dark dark:text-neutral-beige">
              DUSTED
            </h1>
          </Link>

          {/* Desktop Navigation - Inline */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse flex-1 justify-center h-full">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-mobile-base transition-colors touch-target flex items-center h-full ${
                  pathname === link.href 
                    ? 'text-accent-peach' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-accent-peach'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse flex-shrink-0">
            <IconButton
              variant="secondary"
              size="md"
              icon={<Icons.Watchlist />}
              href="/watchlist"
              aria-label={t.watchlist}
            />
            <div className="relative">
              <IconButton
                variant="secondary"
                size="md"
                icon={<Icons.Cart />}
                href="/cart"
                aria-label={t.cart}
              />
              {cartState.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartState.totalItems > 99 ? '99+' : cartState.totalItems}
                </span>
              )}
            </div>
            {/* Profile Icon with dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <IconButton
                variant="secondary"
                size="md"
                icon={<Icons.Profile />}
                aria-label={t.profile}
                onClick={() => setIsProfileMenuOpen((v) => !v)}
              />
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-background-dark z-50 py-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-mobile-sm text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige/40 dark:hover:bg-accent-olive/40 transition-colors"
                    onClick={toggleLanguage}
                  >
                    <span className="flex-1">{language === 'en' ? 'عربي' : 'EN'}</span>
                    <Icons.Globe size="sm" className="ml-2" />
                  </button>
                  <button
                    className="w-full flex items-center px-4 py-2 text-mobile-sm text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige/40 dark:hover:bg-accent-olive/40 transition-colors"
                    onClick={toggleTheme}
                  >
                    <span className="flex-1">{theme === 'light' ? ((t as any)?.darkMode || 'Dark Mode') : ((t as any)?.lightMode || 'Light Mode')}</span>
                    {theme === 'light' ? <Icons.Moon size="sm" className="ml-2" /> : <Icons.Sun size="sm" className="ml-2" />}
                  </button>
                  <Link
                    href="/profile"
                    className="w-full flex items-center px-4 py-2 text-mobile-sm text-accent-olive-dark dark:text-neutral-beige hover:bg-neutral-beige/40 dark:hover:bg-accent-olive/40 transition-colors"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <span className="flex-1">{t.profile}</span>
                    <Icons.Profile size="sm" className="ml-2" />
                  </Link>
                  <button
                    className="w-full flex items-center px-4 py-2 text-mobile-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    // onClick={logout}
                  >
                    <span className="flex-1">{t.logout || 'Logout'}</span>
                    <Icons.Logout size="sm" className="ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden relative" ref={mobileMenuRef}>
            <IconButton
              variant="secondary"
              size="md"
              icon={<Icons.Menu />}
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            />
            
            {/* Full Screen Mobile Menu Overlay */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-beige dark:border-accent-olive-dark">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-8 h-8 bg-accent-peach rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <h1 className="text-mobile-lg font-bold text-accent-olive-dark dark:text-neutral-beige">
                      DUSTED
                    </h1>
                  </Link>
                  <IconButton
                    variant="secondary"
                    size="md"
                    icon={<Icons.Close />}
                    aria-label="Close menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                </div>
                
                {/* Navigation Links - Prominent */}
                <div className="flex-1 p-4">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block w-full px-4 py-4 rounded-lg text-mobile-lg font-medium transition-colors ${
                          pathname === link.href 
                            ? 'text-accent-peach border-2 border-accent-peach' 
                            : 'text-accent-olive-dark dark:text-neutral-beige hover:border-2 hover:border-accent-peach/50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Quick Actions - Smaller Icons */}
                <div className="p-4 border-t border-neutral-beige dark:border-accent-olive-dark">
                  <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse">
                    <Link
                      href="/watchlist"
                      className="flex flex-col items-center space-y-1 text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icons.Watchlist size="lg" />
                      <span className="text-mobile-xs">{t.watchlist}</span>
                    </Link>
                    <Link
                      href="/cart"
                      className="flex flex-col items-center space-y-1 text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors relative"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icons.Cart size="lg" />
                      <span className="text-mobile-xs">{t.cart}</span>
                      {cartState.totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                          {cartState.totalItems > 99 ? '99+' : cartState.totalItems}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/profile"
                      className="flex flex-col items-center space-y-1 text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icons.Profile size="lg" />
                      <span className="text-mobile-xs">{t.profile}</span>
                    </Link>
                  </div>
                </div>
                
                {/* Settings - Small Icons */}
                <div className="p-4 border-t border-neutral-beige dark:border-accent-olive-dark">
                  <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
                    <button
                      className="flex flex-col items-center space-y-1 text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors"
                      onClick={toggleLanguage}
                    >
                      <Icons.Globe size="md" />
                      <span className="text-mobile-xs">{language === 'en' ? 'عربي' : 'EN'}</span>
                    </button>
                    <button
                      className="flex flex-col items-center space-y-1 text-accent-olive-dark dark:text-neutral-beige hover:text-accent-peach transition-colors"
                      onClick={toggleTheme}
                    >
                      {theme === 'light' ? <Icons.Moon size="md" /> : <Icons.Sun size="md" />}
                      <span className="text-mobile-xs">{theme === 'light' ? ((t as any)?.darkMode || 'Dark') : ((t as any)?.lightMode || 'Light')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 