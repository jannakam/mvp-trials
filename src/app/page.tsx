'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';

// Mock data for products
const mockProducts = [
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
    id: '2',
    name: 'Antique Brass Lamp',
    price: 85,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    condition: 'good' as const,
    seller: {
      name: 'Fatima',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
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
    id: '4',
    name: 'Retro Coffee Table',
    price: 180,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'fair' as const,
    size: '120cm x 60cm',
    seller: {
      name: 'Noor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  },
  {
    id: '5',
    name: 'Vintage Wall Clock',
    price: 95,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    condition: 'good' as const,
    seller: {
      name: 'Zara',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
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
  }
];

export default function HomePage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 md:pb-0">
        <HeroSection />
        
        {/* New in: Vintage Decor Section */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {t.newIn}
              </h2>
              <button className="text-accent-peach hover:text-accent-peach-dark font-medium transition-colors">
                {language === 'en' ? 'View All' : 'عرض الكل'} →
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-4">
              {mockProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard
                    {...product}
                    isWishlisted={wishlistItems.includes(product.id)}
                    onWishlistToggle={() => toggleWishlist(product.id)}
                  />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isWishlisted={wishlistItems.includes(product.id)}
                  onWishlistToggle={() => toggleWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Top Sellers Section */}
        <section className="py-8 md:py-12 px-4 bg-neutral-beige dark:bg-accent-olive-dark">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {t.topSellers}
              </h2>
              <button className="text-accent-peach hover:text-accent-peach-dark font-medium transition-colors">
                {language === 'en' ? 'View All' : 'عرض الكل'} →
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-4">
              {mockProducts.slice(2, 6).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-64">
                  <ProductCard
                    {...product}
                    isWishlisted={wishlistItems.includes(product.id)}
                    onWishlistToggle={() => toggleWishlist(product.id)}
                  />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(2, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isWishlisted={wishlistItems.includes(product.id)}
                  onWishlistToggle={() => toggleWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6 md:mb-8">
              {t.fitsWeStyled}
            </h2>
            
            {/* Mobile: 2x2 Grid */}
            <div className="md:hidden grid grid-cols-2 gap-4">
              {['Furniture', 'Decor', 'Fashion', 'Collectibles'].map((category) => (
                <div key={category} className="aspect-square bg-gradient-to-br from-accent-peach to-accent-peach-dark rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                  {category}
                </div>
              ))}
            </div>
            
            {/* Desktop: 4x1 Grid */}
            <div className="hidden md:grid md:grid-cols-4 gap-6">
              {['Furniture', 'Decor', 'Fashion', 'Collectibles'].map((category) => (
                <div key={category} className="aspect-[4/3] bg-gradient-to-br from-accent-peach to-accent-peach-dark rounded-lg flex items-center justify-center text-white font-semibold text-xl hover:scale-105 transition-transform cursor-pointer">
                  {category}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section - Desktop Only */}
        <section className="hidden md:block py-12 px-4 bg-neutral-beige dark:bg-accent-olive">
          <div className="container mx-auto text-center">
            <h3 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4">
              {language === 'en' ? 'Stay Updated' : 'ابق على اطلاع'}
            </h3>
            <p className="text-accent-olive-dark dark:text-neutral-beige mb-6 max-w-md mx-auto">
              {language === 'en' 
                ? 'Get notified about new vintage treasures and exclusive offers' 
                : 'احصل على إشعارات حول الكنوز العتيقة الجديدة والعروض الحصرية'
              }
            </p>
            <div className="flex max-w-md mx-auto space-x-3 rtl:space-x-reverse">
              <input
                type="email"
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="flex-1 px-4 py-3 rounded-lg border border-neutral-beige-dark dark:border-accent-olive-dark bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach"
              />
              <button className="px-6 py-3 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors">
                {language === 'en' ? 'Subscribe' : 'اشتراك'}
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <BottomNav />
    </div>
  );
}
