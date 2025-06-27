'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { ProductCard } from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: '1',
    name: 'Vintage Persian Rug',
    price: 250,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    size: '2.5m x 1.8m',
    seller: {
      name: 'Amina',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '3',
    name: 'Vintage Ceramic Vase',
    price: 120,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    size: '30cm',
    seller: {
      name: 'Layla',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '6',
    name: 'Antique Mirror',
    price: 150,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    size: '80cm x 60cm',
    seller: {
      name: 'Mariam',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '8',
    name: 'Antique Silver Teapot',
    price: 200,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    seller: {
      name: 'Yasmin',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  }
];

export default function WishlistPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 pt-4">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
              {t.wishlist}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {wishlistItems.length} {language === 'en' ? 'items' : 'عناصر'} • {t.currency} {totalValue}
            </p>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="relative">
                  <ProductCard
                    {...item}
                    isWishlisted={true}
                    onWishlistToggle={() => removeFromWishlist(item.id)}
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 left-2 p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-colors z-10"
                  >
                    <svg className="w-4 h-4 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-accent-olive-dark dark:text-neutral-beige" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                {t.noWishlistItems}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {language === 'en' 
                  ? 'Start exploring and add items you love to your wishlist' 
                  : 'ابدأ الاستكشاف وأضف العناصر التي تحبها إلى المفضلة'
                }
              </p>
              <button className="px-6 py-3 bg-accent-peach text-white font-medium rounded-lg hover:bg-accent-peach-dark transition-colors">
                {t.explore}
              </button>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
} 