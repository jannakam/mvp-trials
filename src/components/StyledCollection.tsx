'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import Image from 'next/image';
import Link from 'next/link';

interface StyledCollectionProps {
  id: string;
  name: string;
  description: string;
  image: string;
  productsCount: number;
  totalPrice: number;
  tags: string[];
}

export const StyledCollection = ({
  id,
  name,
  description,
  image,
  productsCount,
  totalPrice,
  tags
}: StyledCollectionProps) => {
  const { language } = useAppContext();
  const t = translations[language];

  return (
    <Link href={`/collection/${id}`} className="block group">
      <div className="bg-background-light dark:bg-background-dark rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
        {/* Collection Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Products count badge */}
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-mobile-xs font-medium text-accent-olive-dark dark:text-neutral-beige">
              {productsCount} {language === 'en' ? 'items' : 'قطع'}
            </span>
          </div>
          
          {/* Collection info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-mobile-lg md:text-xl font-bold text-white mb-1">
              {name}
            </h3>
            <p className="text-mobile-sm text-white/90 mb-2 line-clamp-2">
              {description}
            </p>
            <p className="text-mobile-base font-semibold text-white">
              {language === 'en' ? 'From' : 'من'} {totalPrice} {t.currency}
            </p>
          </div>
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="p-3">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 border border-accent-peach text-accent-peach text-mobile-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-neutral-beige dark:bg-accent-olive text-accent-olive-dark dark:text-neutral-beige text-mobile-xs rounded-full">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}; 