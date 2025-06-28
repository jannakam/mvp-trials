'use client';

import { useAppContext } from '@/context/AppContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { useCart } from '@/context/CartContext';
import { translations } from '@/context/translations';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from './ui/Icons';
import { IconButton } from './ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  condition: 'excellent' | 'good' | 'fair';
  size?: string;
  seller: {
    name: string;
    avatar: string;
  };
  showWatchButton?: boolean;
  showAddToCart?: boolean;
}

export const ProductCard = ({ 
  id,
  name, 
  price, 
  image, 
  condition, 
  size,
  seller,
  showWatchButton = true,
  showAddToCart = true
}: ProductCardProps) => {
  const { language } = useAppContext();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { addItem, isInCart } = useCart();
  const t = translations[language];

  const isWatched = isInWatchlist(id);
  const isInCartItem = isInCart(id);

  const handleWatchToggle = () => {
    toggleWatchlist({
      id,
      name,
      price,
      image,
      condition,
      size,
      seller
    });
  };

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      condition,
      size,
      seller
    });
  };

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
    <div className="mobile-card bg-background-light dark:bg-background-dark rounded-lg overflow-hidden group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-2 py-1 rounded-full text-mobile-xs font-medium ${getConditionColor(condition)}`}>
            {getConditionText(condition)}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Watchlist Button */}
          {showWatchButton && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWatchToggle();
              }}
              className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full p-2 hover:bg-accent-peach hover:text-white transition-colors"
            >
              <Icons.Watchlist filled={isWatched} size="sm" />
            </button>
          )}
          
          {/* Add to Cart Button */}
          {showAddToCart && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart();
              }}
              className={`backdrop-blur-sm rounded-full p-2 transition-colors ${
                isInCartItem 
                  ? 'bg-accent-peach text-white' 
                  : 'bg-white/90 dark:bg-black/90 hover:bg-accent-peach hover:text-white'
              }`}
            >
              <Icons.Cart size="sm" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4">
        <Link href={`/product/${id}`} className="block group-hover:text-accent-peach transition-colors">
          <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-sm md:text-base line-clamp-2 mb-2 leading-tight">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-accent-peach font-bold text-mobile-base md:text-lg">
            {price} {t.currency}
          </p>
          {size && (
            <span className="text-mobile-xs text-gray-600 dark:text-gray-400 bg-neutral-beige dark:bg-accent-olive px-2 py-1 rounded">
              {size}
            </span>
          )}
        </div>

        {/* Seller Info */}
        <Link href={`/seller/${seller.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center space-x-2 rtl:space-x-reverse hover:text-accent-peach transition-colors">
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={seller.avatar}
              alt={seller.name}
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-mobile-xs text-gray-600 dark:text-gray-400 truncate">
            {seller.name}
          </span>
        </Link>
      </div>
    </div>
  );
}; 