'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
  const t = translations[language];
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

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

  const getSizeAvailability = (size: string) => {
    // Mock availability - in real app this would come from API
    return {
      available: true,
      color: 'bg-success text-white'
    };
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 pt-4">
        <div className="container mx-auto px-4">
          {/* Product Images */}
          <div className="mb-6">
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors"
              >
                <svg 
                  className={`w-6 h-6 ${isWishlisted ? 'text-accent-peach fill-current' : 'text-gray-500'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-accent-peach' 
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${mockProduct.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
                {mockProduct.name}
              </h1>
              <p className="text-3xl font-bold text-accent-peach-dark dark:text-accent-peach">
                {mockProduct.price} {t.currency}
              </p>
            </div>

            {/* Condition and Size */}
            <div className="flex flex-wrap gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(mockProduct.condition)}`}>
                {t.condition}: {getConditionText(mockProduct.condition)}
              </span>
              {mockProduct.size && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSizeAvailability(mockProduct.size).color}`}>
                  {t.size}: {mockProduct.size}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                {language === 'en' ? 'Description' : 'الوصف'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-4">
              <h3 className="text-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                {language === 'en' ? 'Seller' : 'البائع'}
              </h3>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={mockProduct.seller.avatar}
                    alt={mockProduct.seller.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-accent-olive-dark dark:text-neutral-beige">
                    {mockProduct.seller.name}
                  </p>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
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
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {mockProduct.seller.rating} ({mockProduct.seller.reviews} {language === 'en' ? 'reviews' : 'تقييم'})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-6 py-4 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors">
                {t.addToCart}
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 font-semibold rounded-lg transition-colors ${
                  isWishlisted
                    ? 'bg-accent-peach text-white'
                    : 'border-2 border-accent-peach text-accent-peach hover:bg-accent-peach hover:text-white'
                }`}
              >
                {isWishlisted ? t.remove : t.addToWishlist}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 