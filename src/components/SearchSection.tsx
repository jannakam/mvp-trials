'use client';

import { SearchBar } from './SearchBar';

export const SearchSection = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark border-b border-neutral-beige dark:border-accent-olive-dark">
      <div className="container mx-auto mobile-px py-3 md:py-4">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}; 