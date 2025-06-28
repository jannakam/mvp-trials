'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { translations } from '@/context/translations';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icons } from '@/components/ui/Icons';
import { IconButton } from '@/components/ui/Button';
import { ProductCard } from '@/components/ProductCard';

// Mock search results
const mockSearchResults = [
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

export default function SearchPage() {
  const { language } = useAppContext();
  const { saveSearch } = useWatchlist();
  const t = translations[language];
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const condition = searchParams.get('condition');
  const category = searchParams.get('category');
  const size = searchParams.get('size');

  const [results, setResults] = useState(mockSearchResults);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    condition: condition || '',
    category: category || '',
    size: size || ''
  });

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate search
      setTimeout(() => {
        // Filter results based on query and filters
        let filteredResults = mockSearchResults.filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filters.minPrice !== undefined) {
          filteredResults = filteredResults.filter(item => item.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
          filteredResults = filteredResults.filter(item => item.price <= filters.maxPrice!);
        }
        if (filters.condition) {
          filteredResults = filteredResults.filter(item => item.condition === filters.condition);
        }
        if (filters.size) {
          filteredResults = filteredResults.filter(item => item.size?.includes(filters.size));
        }

        setResults(filteredResults);
        setIsLoading(false);

        // Save search to watchlist context
        const searchFilters = {
          category: filters.category || undefined,
          condition: filters.condition || undefined,
          priceRange: filters.minPrice && filters.maxPrice ? { min: filters.minPrice, max: filters.maxPrice } : undefined,
          size: filters.size || undefined
        };
        saveSearch(query, searchFilters);
      }, 500);
    }
  }, [query, filters, saveSearch]);

  const applyFilters = () => {
    // Update URL with new filters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.condition) params.set('condition', filters.condition);
    if (filters.category) params.set('category', filters.category);
    if (filters.size) params.set('size', filters.size);
    
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: undefined,
      maxPrice: undefined,
      condition: '',
      category: '',
      size: ''
    });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
              {language === 'en' ? 'Search Results' : 'نتائج البحث'}
            </h1>
            {query && (
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'en' ? 'Results for' : 'نتائج لـ'} &ldquo;{query}&rdquo;
                {results.length > 0 && (
                  <span className="ml-2 text-accent-peach font-medium">
                    ({results.length} {language === 'en' ? 'items' : 'عنصر'})
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Filters and Results */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                    {language === 'en' ? 'Filters' : 'المرشحات'}
                  </h3>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={<Icons.Close size="sm" />}
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden"
                    aria-label="Close filters"
                  />
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Price Range' : 'نطاق السعر'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder={language === 'en' ? 'Min' : 'الحد الأدنى'}
                      value={filters.minPrice || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="flex-1 px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                    />
                    <input
                      type="number"
                      placeholder={language === 'en' ? 'Max' : 'الحد الأقصى'}
                      value={filters.maxPrice || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="flex-1 px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                    />
                  </div>
                </div>

                {/* Condition */}
                <div className="mb-4">
                  <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Condition' : 'الحالة'}
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                  >
                    <option value="">{language === 'en' ? 'All Conditions' : 'جميع الحالات'}</option>
                    <option value="excellent">{t.excellent}</option>
                    <option value="good">{t.good}</option>
                    <option value="fair">{t.fair}</option>
                  </select>
                </div>

                {/* Size */}
                <div className="mb-4">
                  <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'Size' : 'الحجم'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Enter size' : 'أدخل الحجم'}
                    value={filters.size}
                    onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                  />
                </div>

                {/* Filter Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={applyFilters}
                    className="flex-1 mobile-button px-4 py-2 bg-accent-peach text-white font-medium rounded-lg hover:bg-accent-peach-dark transition-colors text-mobile-sm"
                  >
                    {language === 'en' ? 'Apply' : 'تطبيق'}
                  </button>
                  <button
                    onClick={clearFilters}
                    className="mobile-button px-4 py-2 border border-accent-peach text-accent-peach font-medium rounded-lg hover:bg-accent-peach hover:text-white transition-colors text-mobile-sm"
                  >
                    {language === 'en' ? 'Clear' : 'مسح'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="mobile-button w-full px-4 py-3 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige flex items-center justify-between"
                >
                  <span className="font-medium">{language === 'en' ? 'Filters' : 'المرشحات'}</span>
                  <Icons.Search size="sm" />
                </button>
              </div>

              {/* Mobile Filters Overlay */}
              {showFilters && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
                  <div className="w-full bg-background-light dark:bg-background-dark rounded-t-lg p-4 max-h-[80vh] overflow-y-auto">
                    <div className="bg-background-light dark:bg-background-dark border border-neutral-beige dark:border-accent-olive-dark rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                          {language === 'en' ? 'Filters' : 'المرشحات'}
                        </h3>
                        <IconButton
                          variant="ghost"
                          size="sm"
                          icon={<Icons.Close size="sm" />}
                          onClick={() => setShowFilters(false)}
                          aria-label="Close filters"
                        />
                      </div>

                      {/* Price Range */}
                      <div className="mb-4">
                        <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                          {language === 'en' ? 'Price Range' : 'نطاق السعر'}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder={language === 'en' ? 'Min' : 'الحد الأدنى'}
                            value={filters.minPrice || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value ? parseInt(e.target.value) : undefined }))}
                            className="flex-1 px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                          />
                          <input
                            type="number"
                            placeholder={language === 'en' ? 'Max' : 'الحد الأقصى'}
                            value={filters.maxPrice || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value ? parseInt(e.target.value) : undefined }))}
                            className="flex-1 px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                          />
                        </div>
                      </div>

                      {/* Condition */}
                      <div className="mb-4">
                        <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                          {language === 'en' ? 'Condition' : 'الحالة'}
                        </label>
                        <select
                          value={filters.condition}
                          onChange={(e) => setFilters(prev => ({ ...prev, condition: e.target.value }))}
                          className="w-full px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                        >
                          <option value="">{language === 'en' ? 'All Conditions' : 'جميع الحالات'}</option>
                          <option value="excellent">{t.excellent}</option>
                          <option value="good">{t.good}</option>
                          <option value="fair">{t.fair}</option>
                        </select>
                      </div>

                      {/* Size */}
                      <div className="mb-4">
                        <label className="block text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                          {language === 'en' ? 'Size' : 'الحجم'}
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'en' ? 'Enter size' : 'أدخل الحجم'}
                          value={filters.size}
                          onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
                          className="w-full px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-white dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-mobile-sm"
                        />
                      </div>

                      {/* Filter Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            applyFilters();
                            setShowFilters(false);
                          }}
                          className="flex-1 mobile-button px-4 py-2 bg-accent-peach text-white font-medium rounded-lg hover:bg-accent-peach-dark transition-colors text-mobile-sm"
                        >
                          {language === 'en' ? 'Apply' : 'تطبيق'}
                        </button>
                        <button
                          onClick={() => {
                            clearFilters();
                            setShowFilters(false);
                          }}
                          className="mobile-button px-4 py-2 border border-accent-peach text-accent-peach font-medium rounded-lg hover:bg-accent-peach hover:text-white transition-colors text-mobile-sm"
                        >
                          {language === 'en' ? 'Clear' : 'مسح'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results Grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 mx-auto mb-4 border-2 border-accent-peach border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'en' ? 'Searching...' : 'جاري البحث...'}
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-12">
                  <Icons.Empty size="xl" className="mx-auto mb-4 text-gray-400" />
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'No results found' : 'لم يتم العثور على نتائج'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'en' 
                      ? 'Try adjusting your search terms or filters'
                      : 'جرب تعديل مصطلحات البحث أو المرشحات'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {results.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 