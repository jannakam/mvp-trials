'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { ProductCard } from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import Image from 'next/image';

// Mock seller data
const mockSeller = {
  id: 'amina-123',
  name: 'Amina Al-Rashid',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=300&fit=crop',
  bio: 'Passionate collector and curator of vintage Middle Eastern artifacts and home decor. I have been collecting rare pieces for over 15 years and love sharing these treasures with fellow enthusiasts.',
  location: 'Kuwait City, Kuwait',
  joinedDate: '2019-03-15',
  rating: 4.8,
  totalReviews: 127,
  totalSales: 340,
  responseTime: '< 2 hours',
  verified: true,
  badges: ['Top Seller', 'Fast Shipping', 'Excellent Service'],
  socialMedia: {
    instagram: '@amina_vintage_kw',
    whatsapp: '+965-9999-8888'
  },
  stats: {
    products: 45,
    sales: 340
  }
};

// Mock products from this seller
const sellerProducts = [
  {
    id: '1',
    name: 'Vintage Persian Rug',
    price: 250,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    size: '2.5m x 1.8m',
    seller: mockSeller
  },
  {
    id: '7',
    name: 'Vintage Brass Incense Burner',
    price: 75,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    condition: 'good' as const,
    seller: mockSeller
  },
  {
    id: '8',
    name: 'Antique Silver Teapot',
    price: 200,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    condition: 'excellent' as const,
    seller: mockSeller
  },
  {
    id: '9',
    name: 'Vintage Ceramic Bowl Set',
    price: 120,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'good' as const,
    seller: mockSeller
  }
];

// Mock reviews
const mockReviews = [
  {
    id: '1',
    buyer: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Amazing quality and fast shipping! The rug is exactly as described.',
    date: '2024-01-15',
    product: 'Vintage Persian Rug'
  },
  {
    id: '2',
    buyer: 'Mohammed A.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Excellent seller, very responsive and professional.',
    date: '2024-01-10',
    product: 'Antique Silver Teapot'
  },
  {
    id: '3',
    buyer: 'Layla M.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment: 'Good quality, but took a bit longer to ship than expected.',
    date: '2024-01-05',
    product: 'Vintage Brass Incense Burner'
  }
];

export default function SellerDetailPage() {
  const { language } = useAppContext();
  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products');

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-0">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image
            src={mockSeller.coverImage}
            alt={`${mockSeller.name} cover`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="container mx-auto mobile-px">
          {/* Seller Profile Header */}
          <div className="relative -mt-16 md:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-background-dark">
                  <Image
                    src={mockSeller.avatar}
                    alt={mockSeller.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                {mockSeller.verified && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent-peach rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-white sm:text-accent-olive-dark sm:dark:text-neutral-beige">
                <h1 className="text-mobile-2xl md:text-3xl font-bold mb-2">{mockSeller.name}</h1>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <div className="flex">
                    {renderStars(mockSeller.rating)}
                  </div>
                  <span className="text-mobile-sm font-medium">
                    {mockSeller.rating} ({mockSeller.totalReviews} {language === 'en' ? 'reviews' : 'تقييم'})
                  </span>
                </div>
                <p className="text-mobile-sm opacity-90 sm:opacity-70">
                  📍 {mockSeller.location}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 bg-neutral-beige dark:bg-accent-olive rounded-lg p-4">
            <div className="text-center">
              <p className="text-mobile-lg md:text-xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {mockSeller.stats.products}
              </p>
              <p className="text-mobile-xs text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Products' : 'منتجات'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-mobile-lg md:text-xl font-bold text-accent-olive-dark dark:text-neutral-beige">
                {mockSeller.stats.sales}
              </p>
              <p className="text-mobile-xs text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Sales' : 'مبيعات'}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockSeller.badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1 border border-accent-peach text-accent-peach text-mobile-xs font-medium rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Tabs - Simple bottom border style */}
          <div className="border-b border-neutral-beige dark:border-accent-olive-dark mb-6">
            <nav className="flex">
              {[
                { id: 'products', label: language === 'en' ? 'Products' : 'المنتجات' },
                { id: 'about', label: language === 'en' ? 'About' : 'حول' },
                { id: 'reviews', label: language === 'en' ? 'Reviews' : 'التقييمات' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'products' | 'about' | 'reviews')}
                  className={`mobile-button py-3 px-6 font-medium text-mobile-sm transition-colors ${
                    activeTab === tab.id
                      ? 'text-accent-peach'
                      : 'text-gray-600 dark:text-gray-400 hover:text-accent-peach'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === 'products' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige">
                    {language === 'en' ? 'All Products' : 'جميع المنتجات'} ({sellerProducts.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sellerProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                    {language === 'en' ? 'About' : 'حول'} {mockSeller.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-mobile-base">
                    {mockSeller.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-mobile-base font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                      {language === 'en' ? 'Seller Info' : 'معلومات البائع'}
                    </h4>
                    <div className="space-y-2">
                      <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                        <strong>{language === 'en' ? 'Joined:' : 'انضم:'}</strong> {new Date(mockSeller.joinedDate).toLocaleDateString()}
                      </p>
                      <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                        <strong>{language === 'en' ? 'Response time:' : 'وقت الاستجابة:'}</strong> {mockSeller.responseTime}
                      </p>
                      <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                        <strong>{language === 'en' ? 'Total sales:' : 'إجمالي المبيعات:'}</strong> {mockSeller.totalSales}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-mobile-base font-semibold text-accent-olive-dark dark:text-neutral-beige mb-3">
                      {language === 'en' ? 'Contact' : 'التواصل'}
                    </h4>
                    <div className="space-y-3">
                      <a
                        href={`https://instagram.com/${mockSeller.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 rtl:space-x-reverse text-accent-peach hover:text-accent-peach-dark transition-colors"
                      >
                        <span className="text-mobile-sm">📱 {mockSeller.socialMedia.instagram}</span>
                      </a>
                      <a
                        href={`https://wa.me/${mockSeller.socialMedia.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 rtl:space-x-reverse text-accent-peach hover:text-accent-peach-dark transition-colors"
                      >
                        <span className="text-mobile-sm">📲 {mockSeller.socialMedia.whatsapp}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige">
                    {language === 'en' ? 'Customer Reviews' : 'تقييمات العملاء'}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="flex">
                      {renderStars(mockSeller.rating)}
                    </div>
                    <span className="text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige">
                      {mockSeller.rating}/5
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-4">
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.buyer}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-accent-olive-dark dark:text-neutral-beige text-mobile-sm">
                                {review.buyer}
                              </p>
                              <p className="text-mobile-xs text-gray-600 dark:text-gray-400">
                                {review.product}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-mobile-xs text-gray-600 dark:text-gray-400">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-mobile-sm">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}