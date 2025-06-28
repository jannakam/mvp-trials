'use client';

import { useAppContext } from '@/context/AppContext';
import { useWatchlist } from '@/context/WatchlistContext';
import { translations } from '@/context/translations';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icons } from './ui/Icons';
import { IconButton } from './ui/Button';

// Type definitions for search suggestions
interface SearchSuggestion {
  id: string;
  name: string;
  type: 'product' | 'seller' | 'collection';
  image?: string;
  avatar?: string;
}

// Mock search suggestions data
const mockSuggestions = {
  products: [
    { id: '1', name: 'Vintage Persian Rug', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop', type: 'product' as const },
    { id: '2', name: 'Antique Brass Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop', type: 'product' as const },
    { id: '3', name: 'Vintage Ceramic Vase', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop', type: 'product' as const }
  ],
  sellers: [
    { id: 'amina-123', name: 'Amina Al-Zahra', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', type: 'seller' as const },
    { id: 'fatima-456', name: 'Fatima Al-Rashid', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', type: 'seller' as const }
  ],
  collections: [
    { id: 'vintage-chic', name: 'Vintage Chic Look', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=100&h=100&fit=crop', type: 'collection' as const },
    { id: 'retro-office', name: 'Retro Home Office', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop', type: 'collection' as const }
  ]
};

const popularSearches = [
  'vintage rugs', 'antique lamps', 'persian carpet', 'brass items', 'ceramic vases', 'retro furniture'
];

interface SearchBarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export const SearchBar = ({ isMobile = false, onClose }: SearchBarProps) => {
  const { language } = useAppContext();
  const { savedSearches, saveSearch, updateSearchUsage } = useWatchlist();
  const t = translations[language];
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get recent searches from saved searches
  const recentSearches = savedSearches
    .sort((a, b) => b.lastUsed - a.lastUsed)
    .slice(0, 5)
    .map(search => search.query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.length > 1) {
      // Filter suggestions based on query
      const filteredSuggestions = [
        ...mockSuggestions.products.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase())
        ),
        ...mockSuggestions.sellers.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase())
        ),
        ...mockSuggestions.collections.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      ].slice(0, 6);
      
      setSuggestions(filteredSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (query.trim()) {
        handleSearch(query);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'product') {
      router.push(`/product/${suggestion.id}`);
    } else if (suggestion.type === 'seller') {
      router.push(`/seller/${suggestion.id}`);
    } else if (suggestion.type === 'collection') {
      router.push(`/collection/${suggestion.id}`);
    }
    
    setQuery('');
    setIsOpen(false);
    onClose?.();
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save search to watchlist context
      saveSearch(searchQuery.trim());
      
      // Navigate to search results
      const params = new URLSearchParams({ q: searchQuery.trim() });
      router.push(`/search?${params.toString()}`);
      setQuery('');
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    // Find the saved search and update its usage
    const savedSearch = savedSearches.find(search => search.query === searchTerm);
    if (savedSearch) {
      updateSearchUsage(savedSearch.id);
    }
    
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <Icons.Package size="sm" className="text-gray-400" />;
      case 'seller':
        return <Icons.Profile size="sm" className="text-gray-400" />;
      case 'collection':
        return <Icons.Collection size="sm" className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-2xl'}`} ref={dropdownRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 rtl:left-auto rtl:right-3 flex items-center pointer-events-none">
          <Icons.Search size="md" className="text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length > 1) setIsOpen(true);
            else if (recentSearches.length > 0 || popularSearches.length > 0) setIsOpen(true);
          }}
          placeholder={t.searchPlaceholder}
          className={`w-full ${isMobile ? 'h-12' : 'h-10 md:h-12'} pl-10 pr-10 rtl:pl-10 rtl:pr-10 bg-neutral-beige dark:bg-accent-olive border border-transparent focus:border-accent-peach focus:bg-white dark:focus:bg-background-dark text-accent-olive-dark dark:text-neutral-beige placeholder-gray-500 rounded-lg transition-all duration-200 text-mobile-base focus:outline-none focus:ring-2 focus:ring-accent-peach/20`}
        />
        
        {query && (
          <IconButton
            variant="ghost"
            size="sm"
            icon={<Icons.Close size="sm" />}
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 rtl:right-auto rtl:left-3"
            aria-label="Clear search"
          />
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-1 bg-white dark:bg-background-dark z-50 max-h-96 overflow-y-auto ${isMobile ? 'max-h-80' : ''}`}>
          
          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-mobile-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
                {t.searchSuggestions}
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-2 transition-colors mobile-button ${
                    selectedIndex === index ? 'border border-accent-peach bg-accent-peach/5' : 'hover:bg-neutral-beige dark:hover:bg-accent-olive'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-neutral-beige dark:bg-accent-olive flex items-center justify-center">
                    {(suggestion.image || suggestion.avatar) ? (
                      <Image
                        src={suggestion.image || suggestion.avatar || ''}
                        alt={suggestion.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      getTypeIcon(suggestion.type)
                    )}
                  </div>
                  <div className="flex-1 text-left rtl:text-right">
                    <p className="text-mobile-sm font-medium text-accent-olive-dark dark:text-neutral-beige">
                      {suggestion.name}
                    </p>
                    <p className="text-mobile-xs text-gray-500 capitalize">
                      {suggestion.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Recent & Popular Searches when no query */}
          {!query && (recentSearches.length > 0 || popularSearches.length > 0) && (
            <div className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="text-mobile-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
                    {t.recentSearches}
                  </div>
                  {recentSearches.map((search, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-neutral-beige dark:hover:bg-accent-olive transition-colors mobile-button"
                    >
                      <Icons.Clock size="sm" className="text-gray-400 flex-shrink-0" />
                      <span className="text-mobile-sm text-accent-olive-dark dark:text-neutral-beige">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {popularSearches.length > 0 && (
                <div>
                  <div className="text-mobile-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">
                    {t.popularSearches}
                  </div>
                  {popularSearches.map((search, index) => (
                    <button
                      key={`popular-${index}`}
                      onClick={() => handleRecentSearchClick(search)}
                      className="w-full flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-neutral-beige dark:hover:bg-accent-olive transition-colors mobile-button"
                    >
                      <Icons.Trending size="sm" className="text-gray-400 flex-shrink-0" />
                      <span className="text-mobile-sm text-accent-olive-dark dark:text-neutral-beige">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results */}
          {query.length > 1 && suggestions.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-mobile-sm text-gray-500 mb-2">{t.noResults}</p>
              <button
                onClick={() => handleSearch(query)}
                className="mobile-button px-4 py-2 bg-accent-peach text-white rounded-lg hover:bg-accent-peach-dark transition-colors text-mobile-sm"
              >
                {t.searchFor} &ldquo;{query}&rdquo;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 