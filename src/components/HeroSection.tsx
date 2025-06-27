'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';

export const HeroSection = () => {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <section className="relative bg-gradient-to-br from-accent-peach to-accent-peach-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-white text-accent-peach-dark font-semibold rounded-lg hover:bg-neutral-beige transition-colors">
              {t.explore}
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-accent-peach-dark transition-colors">
              {t.viewDetails}
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-4 md:right-8 w-16 h-16 md:w-24 md:h-24 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 md:w-12 md:h-12 bg-white/30 rounded-full"></div>
      <div className="absolute top-1/2 left-8 md:left-16 w-12 h-12 md:w-16 md:h-16 bg-white/15 rounded-full"></div>
    </section>
  );
}; 