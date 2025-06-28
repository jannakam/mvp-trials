'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { HeroSection } from '@/components/HeroSection';
import { ProductCard } from '@/components/ProductCard';
import { SellerCard } from '@/components/SellerCard';
import { StyledCollection } from '@/components/StyledCollection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';

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

// Mock data for top sellers
const mockTopSellers = [
  {
    id: 'amina-123',
    name: 'Amina Al-Zahra',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    verified: true,
    rating: 4.9,
    totalReviews: 234,
    totalSales: 89,
    location: 'Kuwait City',
    badges: ['Top Seller', 'Verified']
  },
  {
    id: 'fatima-456',
    name: 'Fatima Al-Rashid',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    verified: true,
    rating: 4.8,
    totalReviews: 189,
    totalSales: 67,
    location: 'Hawalli',
    badges: ['Rising Star', 'Verified']
  },
  {
    id: 'layla-789',
    name: 'Layla Al-Sabah',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    verified: false,
    rating: 4.7,
    totalReviews: 156,
    totalSales: 45,
    location: 'Salmiya',
    badges: ['Quality Seller']
  },
  {
    id: 'noor-012',
    name: 'Noor Al-Ahmad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    verified: true,
    rating: 4.9,
    totalReviews: 298,
    totalSales: 123,
    location: 'Ahmadi',
    badges: ['Expert Seller', 'Verified']
  }
];

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
  }
];

export default function HomePage() {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-0">
        <HeroSection />
        
        {/* New in: Vintage Decor Section */}
        <section className="mobile-py md:py-12 mobile-px">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {t.newIn}
              </h2>
              <button className="mobile-button text-accent-peach hover:text-accent-peach-dark font-medium transition-colors text-mobile-sm md:text-base">
                {language === 'en' ? 'View All' : 'عرض الكل'} 
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 mobile-scroll -mx-4 px-4">
              {mockProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="flex-shrink-0 w-56">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Sellers Section */}
        <section className="mobile-py md:py-12 mobile-px bg-neutral-beige dark:bg-accent-olive-dark">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {t.topSellers}
              </h2>
              <button className="mobile-button text-accent-peach hover:text-accent-peach-dark font-medium transition-colors text-mobile-sm md:text-base">
                {language === 'en' ? 'View All' : 'عرض الكل'} 
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 mobile-scroll -mx-4 px-4">
              {mockTopSellers.map((seller) => (
                <div key={seller.id} className="flex-shrink-0 w-64">
                  <SellerCard {...seller} />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockTopSellers.map((seller) => (
                <SellerCard key={seller.id} {...seller} />
              ))}
            </div>
          </div>
        </section>

        {/* Fits We Styled Collections */}
        <section className="mobile-py md:py-12 mobile-px">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-8">
              <h2 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {t.fitsWeStyled}
              </h2>
              <button className="mobile-button text-accent-peach hover:text-accent-peach-dark font-medium transition-colors text-mobile-sm md:text-base">
                {language === 'en' ? 'View All Collections' : 'عرض جميع المجموعات'}
              </button>
            </div>
            
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden flex space-x-3 rtl:space-x-reverse overflow-x-auto pb-4 mobile-scroll -mx-4 px-4">
              {mockStyledCollections.map((collection) => (
                <div key={collection.id} className="flex-shrink-0 w-64">
                  <StyledCollection {...collection} />
                </div>
              ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockStyledCollections.map((collection) => (
                <StyledCollection key={collection.id} {...collection} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
