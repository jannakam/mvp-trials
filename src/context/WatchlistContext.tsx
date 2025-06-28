'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
export interface WatchlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  condition: 'excellent' | 'good' | 'fair';
  size?: string;
  seller: {
    name: string;
    avatar: string;
  };
  addedAt: number;
  originalPrice?: number;
  priceHistory?: { date: number; price: number }[];
}

export interface SavedSearch {
  id: string;
  query: string;
  filters?: {
    category?: string;
    condition?: string;
    priceRange?: { min: number; max: number };
    size?: string;
  };
  createdAt: number;
  lastUsed: number;
}

interface WatchlistContextType {
  // Watchlist items
  watchlistItems: WatchlistItem[];
  addToWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeFromWatchlist: (itemId: string) => void;
  isInWatchlist: (itemId: string) => boolean;
  toggleWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  clearWatchlist: () => void;
  
  // Saved searches
  savedSearches: SavedSearch[];
  saveSearch: (query: string, filters?: SavedSearch['filters']) => void;
  removeSavedSearch: (searchId: string) => void;
  updateSearchUsage: (searchId: string) => void;
  clearSavedSearches: () => void;
  
  // Price tracking
  updatePriceHistory: (itemId: string, newPrice: number) => void;
  getPriceChange: (itemId: string) => { change: number; percentage: number } | null;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

interface WatchlistProviderProps {
  children: React.ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedWatchlist = localStorage.getItem('dustwatchlist');
      const storedSearches = localStorage.getItem('dustsavedsearches');
      
      if (storedWatchlist) {
        setWatchlistItems(JSON.parse(storedWatchlist));
      }
      
      if (storedSearches) {
        setSavedSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error('Error loading watchlist data from localStorage:', error);
    }
  }, []);

  // Save watchlist items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('dustwatchlist', JSON.stringify(watchlistItems));
    } catch (error) {
      console.error('Error saving watchlist to localStorage:', error);
    }
  }, [watchlistItems]);

  // Save searches to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('dustsavedsearches', JSON.stringify(savedSearches));
    } catch (error) {
      console.error('Error saving searches to localStorage:', error);
    }
  }, [savedSearches]);

  // Watchlist functions
  const addToWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    const newItem: WatchlistItem = {
      ...item,
      addedAt: Date.now(),
      priceHistory: [{ date: Date.now(), price: item.price }]
    };
    
    setWatchlistItems(prev => {
      const exists = prev.find(existing => existing.id === item.id);
      if (exists) return prev;
      return [...prev, newItem];
    });
  };

  const removeFromWatchlist = (itemId: string) => {
    setWatchlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const isInWatchlist = (itemId: string) => {
    return watchlistItems.some(item => item.id === itemId);
  };

  const toggleWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  const clearWatchlist = () => {
    setWatchlistItems([]);
  };

  // Price tracking functions
  const updatePriceHistory = (itemId: string, newPrice: number) => {
    setWatchlistItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const priceHistory = item.priceHistory || [];
          return {
            ...item,
            price: newPrice,
            priceHistory: [...priceHistory, { date: Date.now(), price: newPrice }]
          };
        }
        return item;
      })
    );
  };

  const getPriceChange = (itemId: string) => {
    const item = watchlistItems.find(item => item.id === itemId);
    if (!item || !item.priceHistory || item.priceHistory.length < 2) {
      return null;
    }

    const originalPrice = item.priceHistory[0].price;
    const currentPrice = item.price;
    const change = currentPrice - originalPrice;
    const percentage = (change / originalPrice) * 100;

    return { change, percentage };
  };

  // Saved search functions
  const saveSearch = (query: string, filters?: SavedSearch['filters']) => {
    const searchId = `${query}-${Date.now()}`;
    const newSearch: SavedSearch = {
      id: searchId,
      query,
      filters,
      createdAt: Date.now(),
      lastUsed: Date.now()
    };

    setSavedSearches(prev => {
      // Remove duplicate searches with same query and filters
      const filtered = prev.filter(search => 
        !(search.query === query && JSON.stringify(search.filters) === JSON.stringify(filters))
      );
      return [newSearch, ...filtered].slice(0, 10); // Keep only 10 most recent
    });
  };

  const removeSavedSearch = (searchId: string) => {
    setSavedSearches(prev => prev.filter(search => search.id !== searchId));
  };

  const updateSearchUsage = (searchId: string) => {
    setSavedSearches(prev => 
      prev.map(search => 
        search.id === searchId 
          ? { ...search, lastUsed: Date.now() }
          : search
      )
    );
  };

  const clearSavedSearches = () => {
    setSavedSearches([]);
  };

  const value: WatchlistContextType = {
    watchlistItems,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    clearWatchlist,
    savedSearches,
    saveSearch,
    removeSavedSearch,
    updateSearchUsage,
    clearSavedSearches,
    updatePriceHistory,
    getPriceChange
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}; 