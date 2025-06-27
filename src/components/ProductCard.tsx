'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  condition: 'excellent' | 'good' | 'fair';
  size?: string;
  seller?: {
    name: string;
    avatar: string;
  };
  isWishlisted?: boolean;
  onWishlistToggle?: () => void;
}

export const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  condition, 
  size, 
  seller, 
  isWishlisted = false,
  onWishlistToggle 
}: ProductCardProps) => {
  const { language } = useAppContext();
  const t = translations[language];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-success text-white';
      case 'good':
        return 'bg-accent-peach text-white';
      case 'fair':
        return 'bg-neutral-beige text-accent-olive-dark';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return t.excellent;
      case 'good':
        return t.good;
      case 'fair':
        return t.fair;
      default:
        return condition;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark rounded-lg shadow-sm border border-neutral-beige dark:border-accent-olive-dark overflow-hidden transition-transform hover:scale-105">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            unoptimized
          />
          {onWishlistToggle && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onWishlistToggle();
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors"
            >
              <svg 
                className={`w-5 h-5 ${isWishlisted ? 'text-accent-peach fill-current' : 'text-gray-500'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(condition)}`}>
              {getConditionText(condition)}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-3">
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-accent-olive-dark dark:text-neutral-beige mb-1 line-clamp-2">
            {name}
          </h3>
        </Link>
        
        {size && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {t.size}: {size}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-accent-peach-dark dark:text-accent-peach">
            {price} {t.currency}
          </span>
          
          {seller && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  width={24}
                  height={24}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {seller.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 