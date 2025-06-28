'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { useCart } from '@/context/CartContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Vintage Persian Rug',
  price: 250,
  image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
  condition: 'excellent' as const,
  size: '2.5m x 1.8m',
  description: 'A beautiful hand-woven Persian rug with intricate patterns and rich colors. This vintage piece has been carefully maintained and shows excellent condition with minimal wear.',
  seller: {
    name: 'Amina',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 4.8,
    reviews: 127
  },
  images: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop'
  ]
};

export default function ProductDetailPage() {
  const { language } = useAppContext();
  const { addItem, isInCart } = useCart();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState(0);

  const isWatched = isInWatchlist(mockProduct.id);
  const isInCartItem = isInCart(mockProduct.id);

  const handleAddToCart = () => {
    addItem({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.image,
      condition: mockProduct.condition,
      size: mockProduct.size,
      seller: {
        name: mockProduct.seller.name,
        avatar: mockProduct.seller.avatar
      }
    });
  };

  const handleWatchToggle = () => {
    toggleWatchlist({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.image,
      condition: mockProduct.condition,
      size: mockProduct.size,
      seller: {
        name: mockProduct.seller.name,
        avatar: mockProduct.seller.avatar
      }
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

  const getSizeAvailability = () => {
    // Mock availability - in real app this would come from API
    return {
      available: true,
      color: 'bg-success text-white'
    };
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-7xl">
          {/* Desktop Layout: Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column: Product Images */}
            <div className="space-y-4">
              {/* Main Product Image */}
              <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-beige dark:bg-accent-olive">
                <Image
                  src={mockProduct.images[selectedImage]}
                  alt={mockProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button
                    onClick={handleWatchToggle}
                    className="mobile-button p-3 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors"
                    aria-label={isWatched ? t.removeFromWatchlist : t.addToWatchlist}
                  >
                    <Icons.Watchlist filled={isWatched} size="md" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`mobile-button p-3 rounded-full backdrop-blur-sm transition-colors ${
                      isInCartItem 
                        ? 'bg-accent-peach text-white' 
                        : 'bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black'
                    }`}
                    aria-label={isInCartItem ? 'Remove from cart' : 'Add to cart'}
                  >
                    <Icons.Cart size="md" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto mobile-scroll pb-2">
                {mockProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden border-2 transition-colors mobile-button ${
                      selectedImage === index 
                        ? 'border-accent-peach' 
                        : 'border-transparent hover:border-neutral-beige-dark'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${mockProduct.name} ${index + 1}`}
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="space-y-6 lg:space-y-8">
              {/* Product Title and Price */}
              <div>
                <h1 className="text-mobile-2xl md:text-3xl lg:text-4xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4 leading-tight">
                  {mockProduct.name}
                </h1>
                <p className="text-mobile-3xl md:text-4xl lg:text-5xl font-bold text-accent-peach-dark dark:text-accent-peach mb-4">
                  {mockProduct.price} {t.currency}
                </p>
              </div>

              {/* Condition and Size Badges */}
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-mobile-sm md:text-base font-medium ${getConditionColor(mockProduct.condition)}`}>
                  {t.condition}: {getConditionText(mockProduct.condition)}
                </span>
                {mockProduct.size && (
                  <span className={`px-4 py-2 rounded-full text-mobile-sm md:text-base font-medium ${getSizeAvailability().color}`}>
                    {t.size}: {mockProduct.size}
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-mobile-lg md:text-xl font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                  {language === 'en' ? 'Description' : 'الوصف'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-mobile-base md:text-lg">
                  {mockProduct.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 mobile-button px-8 py-4 font-semibold rounded-lg transition-colors text-mobile-base md:text-lg ${
                    isInCartItem
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-accent-peach text-white hover:bg-accent-peach-dark'
                  }`}
                >
                  {isInCartItem ? (language === 'en' ? 'Added to Cart' : 'أضيف إلى العربة') : t.addToCart}
                </button>
                <button 
                  onClick={handleWatchToggle}
                  className={`mobile-button px-8 py-4 font-semibold rounded-lg transition-colors text-mobile-base md:text-lg ${
                    isWatched
                      ? 'bg-accent-peach text-white hover:bg-accent-peach-dark'
                      : 'border-2 border-accent-peach text-accent-peach hover:bg-accent-peach hover:text-white'
                  }`}
                >
                  {isWatched ? t.watching : t.watch}
                </button>
              </div>

              {/* Seller Information */}
              <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6 lg:p-8">
                <h3 className="text-mobile-lg md:text-xl font-semibold text-accent-olive-dark dark:text-neutral-beige mb-4">
                  {language === 'en' ? 'Seller' : 'البائع'}
                </h3>
                <Link href="/seller/amina-123" className="block hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark rounded-lg p-4 -m-4 transition-colors">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={mockProduct.seller.avatar}
                        alt={mockProduct.seller.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-base md:text-lg">
                        {mockProduct.seller.name}
                      </p>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(mockProduct.seller.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-mobile-sm md:text-base text-gray-600 dark:text-gray-400">
                          {mockProduct.seller.rating} ({mockProduct.seller.reviews} {language === 'en' ? 'reviews' : 'تقييم'})
                        </span>
                      </div>
                      <p className="text-mobile-sm md:text-base text-accent-peach mt-2 font-medium">
                        {language === 'en' ? 'View Profile →' : 'عرض الملف ←'}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Additional Product Information */}
              <div className="border-t border-neutral-beige dark:border-accent-olive-dark pt-6">
                <div className="grid grid-cols-2 gap-4 text-mobile-sm md:text-base">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Condition:' : 'الحالة:'}</span>
                    <p className="font-medium text-accent-olive-dark dark:text-neutral-beige">{getConditionText(mockProduct.condition)}</p>
                  </div>
                  {mockProduct.size && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">{language === 'en' ? 'Size:' : 'المقاس:'}</span>
                      <p className="font-medium text-accent-olive-dark dark:text-neutral-beige">{mockProduct.size}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 