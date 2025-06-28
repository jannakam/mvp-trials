'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Image from 'next/image';
import Link from 'next/link';

// Mock brands data
const mockBrands = [
  {
    id: 'vintage-collection',
    name: 'Vintage Collection',
    description: 'Curated vintage pieces from the 1950s-1980s',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    productCount: 45,
    followers: 1234
  },
  {
    id: 'antique-treasures',
    name: 'Antique Treasures',
    description: 'Rare antiques and collectibles from around the world',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    productCount: 32,
    followers: 856
  },
  {
    id: 'retro-modern',
    name: 'Retro Modern',
    description: 'Mid-century modern furniture and decor',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    productCount: 28,
    followers: 567
  },
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    description: 'Timeless pieces with sophisticated charm',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    productCount: 39,
    followers: 943
  }
];

export default function BrandsPage() {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
              {language === 'en' ? 'Brands' : 'العلامات التجارية'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base">
              {language === 'en' 
                ? 'Discover curated vintage brands and collections'
                : 'اكتشف العلامات التجارية والمجموعات العتيقة المختارة'
              }
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBrands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brand/${brand.id}`}
                className="group bg-background-light dark:bg-background-dark rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-lg mb-2 group-hover:text-accent-peach transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-mobile-sm mb-3 line-clamp-2">
                    {brand.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-mobile-sm text-gray-500">
                    <span>{brand.productCount} {language === 'en' ? 'products' : 'منتج'}</span>
                    <span>{brand.followers} {language === 'en' ? 'followers' : 'متابع'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {mockBrands.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                {language === 'en' ? 'No brands available' : 'لا توجد علامات تجارية متاحة'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Check back later for new brand collections'
                  : 'تحقق لاحقاً من مجموعات العلامات التجارية الجديدة'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 