'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { StyledCollection } from '@/components/StyledCollection';
import Image from 'next/image';
import Link from 'next/link';

// Mock styled collections data
const mockStyledCollections = [
  {
    id: 'vintage-chic-look',
    name: 'Vintage Chic Look',
    description: 'A sophisticated vintage ensemble perfect for evening occasions',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=750&fit=crop',
    productsCount: 4,
    totalPrice: 365,
    tags: ['vintage', 'chic', 'evening']
  },
  {
    id: 'retro-home-office',
    name: 'Retro Home Office',
    description: 'Create a productive workspace with vintage charm and character',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=750&fit=crop',
    productsCount: 5,
    totalPrice: 420,
    tags: ['retro', 'office', 'furniture']
  },
  {
    id: 'bohemian-living-room',
    name: 'Bohemian Living Room',
    description: 'Mix textures and patterns for an eclectic, artistic living space',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=750&fit=crop',
    productsCount: 6,
    totalPrice: 580,
    tags: ['bohemian', 'decor', 'artistic']
  },
  {
    id: 'classic-dinner-party',
    name: 'Classic Dinner Party',
    description: 'Elegant tableware and decor for memorable dinner gatherings',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop',
    productsCount: 7,
    totalPrice: 295,
    tags: ['classic', 'dining', 'elegant']
  },
  {
    id: 'coastal-vintage',
    name: 'Coastal Vintage',
    description: 'Bring the beach home with vintage coastal-inspired pieces',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=750&fit=crop',
    productsCount: 4,
    totalPrice: 320,
    tags: ['coastal', 'beach', 'relaxed']
  },
  {
    id: 'industrial-chic',
    name: 'Industrial Chic',
    description: 'Raw materials and vintage industrial elements for urban style',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=750&fit=crop',
    productsCount: 5,
    totalPrice: 450,
    tags: ['industrial', 'urban', 'modern']
  }
];

const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Office', 'Outdoor', 'Dining'];

export default function CollectionsPage() {
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
              {language === 'en' ? 'Styled Collections' : 'المجموعات المنسقة'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base">
              {language === 'en' 
                ? 'Discover curated vintage looks and styled collections'
                : 'اكتشف المظاهر العتيقة المنسقة والمجموعات المصممة'
              }
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="mobile-button px-4 py-2 rounded-full border border-neutral-beige dark:border-accent-olive-dark text-accent-olive-dark dark:text-neutral-beige hover:bg-accent-peach hover:text-white hover:border-accent-peach transition-colors text-mobile-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStyledCollections.map((collection) => (
              <StyledCollection key={collection.id} {...collection} />
            ))}
          </div>

          {/* Empty State */}
          {mockStyledCollections.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                {language === 'en' ? 'No collections available' : 'لا توجد مجموعات متاحة'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' 
                  ? 'Check back later for new styled collections'
                  : 'تحقق لاحقاً من المجموعات المنسقة الجديدة'
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 