'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Image from 'next/image';
import Link from 'next/link';

interface SellerCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  location: string;
  verified?: boolean;
  badges?: string[];
}

export const SellerCard = ({ 
  id,
  name, 
  avatar, 
  rating, 
  totalReviews, 
  totalSales,
  location,
  verified = false,
  badges = []
}: SellerCardProps) => {
  const { language } = useAppContext();
  const t = translations[language];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 md:w-4 md:h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Link href={`/seller/${id}`} className="block">
      <div className="mobile-card bg-background-light dark:bg-background-dark rounded-lg overflow-hidden">
        <div className="p-4 md:p-5">
          {/* Seller Avatar and Basic Info */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={avatar}
                  alt={name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              {verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-peach rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-sm md:text-base line-clamp-1">
                {name}
              </h3>
              <p className="text-mobile-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                📍 {location}
              </p>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
            <div className="flex">
              {renderStars(rating)}
            </div>
            <span className="text-mobile-xs text-gray-600 dark:text-gray-400">
              {rating} ({totalReviews} {language === 'en' ? 'reviews' : 'تقييم'})
            </span>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center mb-3 text-mobile-xs text-gray-600 dark:text-gray-400">
            <span>{totalSales} {language === 'en' ? 'sales' : 'مبيعة'}</span>
            <span>{language === 'en' ? 'Top Seller' : 'بائع مميز'}</span>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 border border-accent-peach text-accent-peach text-mobile-xs font-medium rounded-full line-clamp-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}; 