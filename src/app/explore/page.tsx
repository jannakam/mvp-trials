'use client';

import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
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
  },
  {
    id: '7',
    name: 'Vintage Leather Bag',
    price: 75,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    condition: 'good' as const,
    seller: {
      name: 'Sara',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
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

const categories = ['All', 'Furniture', 'Decor', 'Fashion', 'Collectibles', 'Art', 'Books'];
const brands = ['All', 'Vintage', 'Antique', 'Retro', 'Classic', 'Modern'];
const conditions = ['All', 'Excellent', 'Good', 'Fair'];
const priceRanges = ['All', 'Under 50 KWD', '50-100 KWD', '100-200 KWD', '200+ KWD'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' },
];

export default function ExplorePage() {
  const { language } = useAppContext();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleWishlist = (productId: string) => {
    setWishlistItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedPriceRange('All');
    setSelectedConditions([]);
  };

  const FilterDropdown = ({ 
    label, 
    value, 
    onChange, 
    options 
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-neutral-beige dark:border-accent-olive-dark rounded-lg bg-background-light dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige focus:outline-none focus:ring-2 focus:ring-accent-peach focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const FilterCheckbox = ({ 
    label, 
    checked, 
    onChange 
  }: {
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer py-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="text-accent-peach focus:ring-accent-peach rounded"
      />
      <span className="text-sm text-accent-olive-dark dark:text-neutral-beige">
        {label}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <main className="pb-20 md:pb-0 pt-4">
        {/* Mobile Header */}
        <div className="md:hidden px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige">
              {t.explore}
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex container mx-auto px-4">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0 mr-8">
            <div className="sticky top-24">
              <h1 className="text-2xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-6">
                {t.explore}
              </h1>
              
              <div className="bg-background-light dark:bg-background-dark rounded-lg border border-neutral-beige dark:border-accent-olive-dark p-6">
                {/* Sort */}
                <FilterDropdown
                  label={language === 'en' ? 'Sort By' : 'ترتيب حسب'}
                  value={selectedSort}
                  onChange={setSelectedSort}
                  options={sortOptions.map(opt => opt.label)}
                />

                <div className="border-t border-neutral-beige dark:border-accent-olive-dark pt-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                      {language === 'en' ? 'Filters' : 'المرشحات'}
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-accent-peach hover:text-accent-peach-dark transition-colors"
                    >
                      {language === 'en' ? 'Clear All' : 'مسح الكل'}
                    </button>
                  </div>
                </div>

                {/* Category */}
                <FilterDropdown
                  label={t.category}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories}
                />

                {/* Brand */}
                <FilterDropdown
                  label={t.brand}
                  value={selectedBrand}
                  onChange={setSelectedBrand}
                  options={brands}
                />

                {/* Price Range */}
                <FilterDropdown
                  label={language === 'en' ? 'Price Range' : 'نطاق السعر'}
                  value={selectedPriceRange}
                  onChange={setSelectedPriceRange}
                  options={priceRanges}
                />

                {/* Condition */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {t.condition}
                  </label>
                  <div className="space-y-1">
                    {conditions.slice(1).map((condition) => (
                      <FilterCheckbox
                        key={condition}
                        label={condition}
                        checked={selectedConditions.includes(condition)}
                        onChange={() => toggleCondition(condition)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Curated Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-accent-peach to-accent-peach-dark rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t.fitsWeStyled}</h3>
                <p className="text-sm opacity-90 mb-4">Discover our curated vintage looks</p>
                <button className="px-4 py-2 bg-white text-accent-peach-dark font-medium rounded-lg hover:bg-neutral-beige transition-colors">
                  {t.viewDetails}
                </button>
              </div>

              <div className="bg-gradient-to-br from-accent-olive to-accent-olive-dark rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{t.onSale}</h3>
                <p className="text-sm opacity-90 mb-4">Up to 50% off selected items</p>
                <button className="px-4 py-2 bg-white text-accent-olive-dark font-medium rounded-lg hover:bg-neutral-beige transition-colors">
                  {t.viewDetails}
                </button>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-accent-olive-dark dark:text-neutral-beige">
                {mockProducts.length} {language === 'en' ? 'items found' : 'عنصر تم العثور عليه'}
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-sm text-accent-olive-dark dark:text-neutral-beige">
                  {language === 'en' ? 'Sort by:' : 'ترتيب حسب:'}
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3 py-1 border border-neutral-beige dark:border-accent-olive-dark rounded bg-background-light dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-sm focus:outline-none focus:ring-2 focus:ring-accent-peach"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isWishlisted={wishlistItems.includes(product.id)}
                  onWishlistToggle={() => toggleWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="md:hidden px-4">
          {/* Curated Banners */}
          <div className="grid grid-cols-1 gap-4 mb-8">
            <div className="bg-gradient-to-br from-accent-peach to-accent-peach-dark rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{t.fitsWeStyled}</h3>
              <p className="text-sm opacity-90 mb-4">Discover our curated vintage looks</p>
              <button className="px-4 py-2 bg-white text-accent-peach-dark font-medium rounded-lg hover:bg-neutral-beige transition-colors">
                {t.viewDetails}
              </button>
            </div>

            <div className="bg-gradient-to-br from-accent-olive to-accent-olive-dark rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">{t.onSale}</h3>
              <p className="text-sm opacity-90 mb-4">Up to 50% off selected items</p>
              <button className="px-4 py-2 bg-white text-accent-olive-dark font-medium rounded-lg hover:bg-neutral-beige transition-colors">
                {t.viewDetails}
              </button>
            </div>
          </div>

          {/* Mobile Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-accent-olive-dark dark:text-neutral-beige">
              {mockProducts.length} {language === 'en' ? 'items' : 'عنصر'}
            </p>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="px-3 py-1 border border-neutral-beige dark:border-accent-olive-dark rounded bg-background-light dark:bg-background-dark text-accent-olive-dark dark:text-neutral-beige text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                isWishlisted={wishlistItems.includes(product.id)}
                onWishlistToggle={() => toggleWishlist(product.id)}
              />
            ))}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-background-light dark:bg-background-dark border-l border-neutral-beige dark:border-accent-olive-dark p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-accent-olive-dark dark:text-neutral-beige">
                  {language === 'en' ? 'Filters' : 'المرشحات'}
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Sort */}
              <FilterDropdown
                label={language === 'en' ? 'Sort By' : 'ترتيب حسب'}
                value={selectedSort}
                onChange={setSelectedSort}
                options={sortOptions.map(opt => opt.label)}
              />

              <div className="border-t border-neutral-beige dark:border-accent-olive-dark pt-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige">
                    {language === 'en' ? 'Filters' : 'المرشحات'}
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent-peach hover:text-accent-peach-dark transition-colors"
                  >
                    {language === 'en' ? 'Clear All' : 'مسح الكل'}
                  </button>
                </div>
              </div>

              {/* Mobile Filters */}
              <FilterDropdown
                label={t.category}
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
              />

              <FilterDropdown
                label={t.brand}
                value={selectedBrand}
                onChange={setSelectedBrand}
                options={brands}
              />

              <FilterDropdown
                label={language === 'en' ? 'Price Range' : 'نطاق السعر'}
                value={selectedPriceRange}
                onChange={setSelectedPriceRange}
                options={priceRanges}
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-accent-olive-dark dark:text-neutral-beige mb-2">
                  {t.condition}
                </label>
                <div className="space-y-1">
                  {conditions.slice(1).map((condition) => (
                    <FilterCheckbox
                      key={condition}
                      label={condition}
                      checked={selectedConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
} 