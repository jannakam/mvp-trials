'use client';

import { Header } from '@/components/Header';
import { SearchSection } from '@/components/SearchSection';
import { useAppContext } from '@/context/AppContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { translations } from '@/context/translations';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import { IconButton } from '@/components/ui/Button';

export default function WatchlistPage() {
  const { language } = useAppContext();
  const { 
    watchlistItems, 
    removeFromWatchlist, 
    savedSearches, 
    removeSavedSearch, 
    updateSearchUsage 
  } = useWatchlist();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'items' | 'searches'>('items');

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

  const getPriceChangeDisplay = (itemId: string) => {
    const item = watchlistItems.find(item => item.id === itemId);
    if (!item || !item.priceHistory || item.priceHistory.length < 2) {
      return {
        text: t.noChange || 'No change',
        color: 'text-gray-500',
        icon: '→'
      };
    }

    const originalPrice = item.priceHistory[0].price;
    const currentPrice = item.price;
    const change = currentPrice - originalPrice;
    const percentage = (change / originalPrice) * 100;

    if (change === 0) {
      return {
        text: t.noChange || 'No change',
        color: 'text-gray-500',
        icon: '→'
      };
    } else if (change > 0) {
      return {
        text: `+${change} KWD (+${percentage.toFixed(1)}%)`,
        color: 'text-red-500',
        icon: '↗'
      };
    } else {
      return {
        text: `${change} KWD (${percentage.toFixed(1)}%)`,
        color: 'text-green-500',
        icon: '↘'
      };
    }
  };

  const runSavedSearch = (searchId: string) => {
    const search = savedSearches.find(s => s.id === searchId);
    if (search) {
      updateSearchUsage(searchId);
      const params = new URLSearchParams({ q: search.query });
      if (search.filters) {
        Object.entries(search.filters).forEach(([key, value]) => {
          if (value) {
            if (typeof value === 'object' && 'min' in value && 'max' in value) {
              params.set('minPrice', value.min.toString());
              params.set('maxPrice', value.max.toString());
            } else {
              params.set(key, value.toString());
            }
          }
        });
      }
      window.location.href = `/search?${params.toString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <SearchSection />
      
      <main className="pb-24 md:pb-8 pt-4 md:pt-8">
        <div className="container mx-auto mobile-px max-w-4xl">
          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-mobile-2xl md:text-3xl font-bold text-accent-olive-dark dark:text-neutral-beige mb-2">
              {t.watchlist}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-mobile-base">
              {language === 'en' 
                ? 'Track price changes and save searches for your favorite vintage finds'
                : 'تتبع تغيرات الأسعار واحفظ البحثات للعثور على الكنوز المفضلة لديك'
              }
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-beige dark:border-accent-olive-dark mb-6">
            <button
              onClick={() => setActiveTab('items')}
              className={`flex-1 pb-3 px-1 text-center font-medium transition-colors border-b-2 ${
                activeTab === 'items'
                  ? 'border-accent-peach text-accent-peach'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-accent-peach'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Icons.Watchlist size="sm" />
                <span>{t.priceTracking || 'Price Tracking'}</span>
                {watchlistItems.length > 0 && (
                  <span className="bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {watchlistItems.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('searches')}
              className={`flex-1 pb-3 px-1 text-center font-medium transition-colors border-b-2 ${
                activeTab === 'searches'
                  ? 'border-accent-peach text-accent-peach'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-accent-peach'
              }`}
            >
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Icons.Search size="sm" />
                <span>{t.savedSearches || 'Saved Searches'}</span>
                {savedSearches.length > 0 && (
                  <span className="bg-accent-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {savedSearches.length}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Price Tracking Tab */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              {watchlistItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                    <Icons.Watchlist size="xl" className="text-gray-400" />
                  </div>
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'No items being watched' : 'لا توجد عناصر قيد المراقبة'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'en' 
                      ? 'Start watching items to track their price changes'
                      : 'ابدأ بمراقبة العناصر لتتبع تغيرات أسعارها'
                    }
                  </p>
                  <Link
                    href="/explore"
                    className="inline-block mobile-button px-6 py-3 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors"
                  >
                    {language === 'en' ? 'Explore Products' : 'استكشف المنتجات'}
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {watchlistItems.map((item) => {
                    const priceDisplay = getPriceChangeDisplay(item.id);
                    const originalPrice = item.priceHistory?.[0]?.price || item.price;
                    
                    return (
                      <div key={item.id} className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                        <div className="flex items-start space-x-4 rtl:space-x-reverse">
                          {/* Product Image */}
                          <Link href={`/product/${item.id}`} className="flex-shrink-0">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={96}
                                height={96}
                                className="object-cover w-full h-full hover:scale-105 transition-transform"
                              />
                            </div>
                          </Link>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <Link href={`/product/${item.id}`} className="block hover:text-accent-peach transition-colors">
                              <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-base md:text-lg line-clamp-2 mb-1">
                                {item.name}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                              <span className={`px-2 py-1 rounded-full text-mobile-xs ${getConditionColor(item.condition)}`}>
                                {getConditionText(item.condition)}
                              </span>
                              {item.size && (
                                <span className="text-mobile-xs text-gray-500 bg-neutral-beige dark:bg-accent-olive px-2 py-1 rounded">
                                  {item.size}
                                </span>
                              )}
                              <span className="text-mobile-xs text-gray-500">
                                {language === 'en' ? 'Added' : 'تمت الإضافة'} {new Date(item.addedAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            {/* Price Tracking */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-mobile-sm text-gray-600 dark:text-gray-400">
                                    {t.originalPrice || 'Original'}: <span className="line-through">{originalPrice} {t.currency}</span>
                                  </p>
                                  <p className="text-mobile-base md:text-lg font-bold text-accent-peach">
                                    {t.currentPrice || 'Current'}: {item.price} {t.currency}
                                  </p>
                                </div>
                                
                                <div className="text-right">
                                  <div className={`flex items-center space-x-1 rtl:space-x-reverse ${priceDisplay.color} font-medium`}>
                                    <span>{priceDisplay.icon}</span>
                                    <span className="text-mobile-sm">{priceDisplay.text}</span>
                                  </div>
                                  {item.priceHistory && item.priceHistory.length > 1 && (
                                    <p className="text-mobile-xs text-gray-500 mt-1">
                                      {language === 'en' ? 'Updated' : 'محدث'} {new Date(item.priceHistory[item.priceHistory.length - 1].date).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Seller Info */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <div className="w-6 h-6 rounded-full overflow-hidden">
                                  <Image
                                    src={item.seller.avatar}
                                    alt={item.seller.name}
                                    width={24}
                                    height={24}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <span className="text-mobile-sm text-gray-600 dark:text-gray-400">
                                  {item.seller.name}
                                </span>
                              </div>
                              
                              <IconButton
                                variant="ghost"
                                size="sm"
                                icon={<Icons.Close size="sm" />}
                                onClick={() => removeFromWatchlist(item.id)}
                                aria-label="Remove from watchlist"
                                className="text-gray-500 hover:text-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Saved Searches Tab */}
          {activeTab === 'searches' && (
            <div className="space-y-4">
              {savedSearches.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-neutral-beige dark:bg-accent-olive rounded-full flex items-center justify-center">
                    <Icons.Search size="xl" className="text-gray-400" />
                  </div>
                  <h3 className="text-mobile-lg font-semibold text-accent-olive-dark dark:text-neutral-beige mb-2">
                    {language === 'en' ? 'No saved searches' : 'لا توجد بحثات محفوظة'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {language === 'en' 
                      ? 'Save your searches to quickly find new items that match your interests'
                      : 'احفظ بحثاتك للعثور بسرعة على عناصر جديدة تتطابق مع اهتماماتك'
                    }
                  </p>
                  <Link
                    href="/explore"
                    className="inline-block mobile-button px-6 py-3 bg-accent-peach text-white font-semibold rounded-lg hover:bg-accent-peach-dark transition-colors"
                  >
                    {language === 'en' ? 'Start Searching' : 'ابدأ البحث'}
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {savedSearches.map((search) => (
                    <div key={search.id} className="bg-background-light dark:bg-background-dark rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-accent-olive-dark dark:text-neutral-beige text-mobile-base md:text-lg mb-1">
                            &ldquo;{search.query}&rdquo;
                          </h3>
                          
                          {/* Search Filters */}
                          {search.filters && Object.keys(search.filters).length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {Object.entries(search.filters).map(([key, value]) => {
                                if (!value) return null;
                                if (typeof value === 'object' && 'min' in value && 'max' in value) {
                                  return (
                                    <span key={key} className="text-mobile-xs bg-neutral-beige dark:bg-accent-olive px-2 py-1 rounded">
                                      {value.min}-{value.max} KWD
                                    </span>
                                  );
                                }
                                return (
                                  <span key={key} className="text-mobile-xs bg-neutral-beige dark:bg-accent-olive px-2 py-1 rounded">
                                    {value}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Search Stats */}
                          <div className="flex items-center space-x-4 rtl:space-x-reverse text-mobile-sm text-gray-500">
                            <span>
                              {language === 'en' ? 'Created:' : 'تم الإنشاء:'} {new Date(search.createdAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>
                              {language === 'en' ? 'Last used:' : 'آخر استخدام:'} {new Date(search.lastUsed).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <IconButton
                          variant="ghost"
                          size="sm"
                          icon={<Icons.Close size="sm" />}
                          onClick={() => removeSavedSearch(search.id)}
                          aria-label="Delete saved search"
                          className="text-gray-500 hover:text-red-500"
                        />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => runSavedSearch(search.id)}
                          className="flex-1 mobile-button px-4 py-2 bg-accent-peach text-white font-medium rounded-lg hover:bg-accent-peach-dark transition-colors text-mobile-sm"
                        >
                          {t.runSearch || 'Run Search'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 