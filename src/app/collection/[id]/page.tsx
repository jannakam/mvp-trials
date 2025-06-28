'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock collection data with product overlays
const mockCollection = {
  id: 'vintage-chic-look',
  name: 'Vintage Chic Look',
  description: 'A sophisticated vintage ensemble perfect for evening occasions. Featuring carefully curated pieces that complement each other beautifully.',
  image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop',
  curator: {
    name: 'Sarah Al-Mansouri',
    title: 'Style Curator',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  tags: ['vintage', 'chic', 'evening', 'sophisticated'],
  products: [
    {
      id: '1',
      name: 'Vintage Silk Blouse',
      price: 85,
      image: 'https://images.unsplash.com/photo-1551803091-e20673f15e9c?w=400&h=400&fit=crop',
      condition: 'excellent' as const,
      position: { x: 45, y: 25 }, // Position on the styled image (percentage)
      size: { width: 25, height: 30 } // Size of clickable area (percentage)
    },
    {
      id: '2',
      name: 'High-Waisted Vintage Trousers',
      price: 120,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      condition: 'good' as const,
      position: { x: 40, y: 55 },
      size: { width: 30, height: 35 }
    },
    {
      id: '3',
      name: 'Vintage Pearl Necklace',
      price: 65,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      condition: 'excellent' as const,
      position: { x: 48, y: 15 },
      size: { width: 15, height: 15 }
    },
    {
      id: '4',
      name: 'Vintage Leather Handbag',
      price: 95,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      condition: 'good' as const,
      position: { x: 25, y: 45 },
      size: { width: 20, height: 25 }
    }
  ]
};

export default function CollectionDetailPage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const totalPrice = mockCollection.products.reduce((sum, product) => sum + product.price, 0);

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
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-7xl">
          {/* Collection Header */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4 text-mobile-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-accent-peach transition-colors">
                {t.home}
              </Link>
              <span>→</span>
              <span>{language === 'en' ? 'Styled Collections' : 'المجموعات المنسقة'}</span>
              <span>→</span>
              <span className="text-accent-olive-dark dark:text-neutral-beige">
                {mockCollection.name}
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-mobile-2xl md:text-4xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
                  {mockCollection.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-mobile-base md:text-lg max-w-2xl">
                  {mockCollection.description}
                </p>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={mockCollection.curator.avatar}
                    alt={mockCollection.curator.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-accent-olive-dark dark:text-neutral-beige text-mobile-sm">
                    {language === 'en' ? 'Curated by' : 'منسق بواسطة'}
                  </p>
                  <p className="text-mobile-base font-semibold text-accent-peach">
                    {mockCollection.curator.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Styled Image with Overlays */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-neutral-beige dark:bg-accent-olive">
                <Image
                  src={mockCollection.image}
                  alt={mockCollection.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Product Overlays */}
                {mockCollection.products.map((product) => (
                  <div
                    key={product.id}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${product.position.x}%`,
                      top: `${product.position.y}%`,
                      width: `${product.size.width}%`,
                      height: `${product.size.height}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => setSelectedProduct(product.id === selectedProduct ? null : product.id)}
                  >
                    {/* Clickable Area */}
                    <div className="w-full h-full bg-white/20 border-2 border-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    
                    {/* Product Dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-accent-peach rounded-full border-2 border-white animate-pulse">
                      <div className="w-full h-full bg-accent-peach rounded-full scale-75"></div>
                    </div>
                    
                    {/* Product Preview on Hover */}
                    {(hoveredProduct === product.id || selectedProduct === product.id) && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-background-dark p-3 z-10 min-w-48">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-accent-olive-dark dark:text-neutral-beige text-mobile-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-accent-peach font-semibold text-mobile-sm">
                              {product.price} {t.currency}
                            </p>
                          </div>
                        </div>
                        <Link
                          href={`/product/${product.id}`}
                          className="block mt-2 text-center bg-accent-peach text-white py-1 px-3 rounded text-mobile-xs hover:bg-accent-peach-dark transition-colors"
                        >
                          {language === 'en' ? 'View Product' : 'عرض المنتج'}
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Instructions overlay */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-2 rounded-lg text-mobile-xs">
                  {language === 'en' ? 'Click on the dots to explore products' : 'انقر على النقاط لاستكشاف المنتجات'}
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {mockCollection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-accent-peach text-accent-peach text-mobile-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Products List */}
            <div className="space-y-6">
              <div className="bg-neutral-beige dark:bg-accent-olive rounded-lg p-6">
                <h2 className="text-mobile-lg md:text-xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-4">
                  {language === 'en' ? 'Collection Items' : 'عناصر المجموعة'}
                </h2>
                
                <div className="space-y-4">
                  {mockCollection.products.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center space-x-4 rtl:space-x-reverse p-3 rounded-lg transition-colors cursor-pointer ${
                        selectedProduct === product.id
                          ? 'border border-accent-peach bg-accent-peach/5'
                          : 'hover:bg-neutral-beige-dark dark:hover:bg-accent-olive-dark'
                      }`}
                      onClick={() => setSelectedProduct(product.id === selectedProduct ? null : product.id)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-accent-olive-dark dark:text-neutral-beige text-mobile-base">
                          {product.name}
                        </h3>
                        <p className="text-accent-peach font-semibold text-mobile-sm">
                          {product.price} {t.currency}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-mobile-xs mt-1 ${getConditionColor(product.condition)}`}>
                          {getConditionText(product.condition)}
                        </span>
                      </div>
                      
                      <Link
                        href={`/product/${product.id}`}
                        className="mobile-button px-3 py-2 bg-accent-peach text-white rounded-lg hover:bg-accent-peach-dark transition-colors text-mobile-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {language === 'en' ? 'View' : 'عرض'}
                      </Link>
                    </div>
                  ))}
                </div>
                
                {/* Collection Summary */}
                <div className="border-t border-neutral-beige-dark dark:border-accent-olive-dark mt-6 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium text-accent-olive-dark dark:text-neutral-beige">
                      {language === 'en' ? 'Total Collection Price:' : 'إجمالي سعر المجموعة:'}
                    </span>
                    <span className="text-xl font-bold text-accent-peach">
                      {totalPrice} {t.currency}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 mobile-button px-6 py-3 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors">
                      {language === 'en' ? 'Add All to Cart' : 'إضافة الكل إلى السلة'}
                    </button>
                    <button className="mobile-button px-6 py-3 border-2 border-accent-peach text-accent-peach font-semibold rounded-lg hover:bg-accent-peach hover:text-white transition-colors">
                      {language === 'en' ? 'Save Collection' : 'حفظ المجموعة'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 