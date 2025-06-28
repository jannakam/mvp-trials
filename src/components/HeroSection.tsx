'use client';

import { useAppContext } from '@/context/AppContext';
import { translations } from '@/context/translations';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Type definitions for carousel slides
interface ButtonConfig {
  labelKey?: string;
  label?: { en: string; ar: string };
  href: string;
}

interface DecorativeElement {
  position: string;
  size: string;
  opacity: string;
}

interface CarouselSlide {
  id: string;
  type: 'hero' | 'featured' | 'promotion';
  backgroundClass?: string;
  backgroundImage?: string;
  titleKey?: string;
  title?: { en: string; ar: string };
  subtitleKey?: string;
  subtitle?: { en: string; ar: string };
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  badge?: { en: string; ar: string };
  decorativeElements?: DecorativeElement[];
}

// Carousel slides data
const carouselSlides: CarouselSlide[] = [
  {
    id: 'hero',
    type: 'hero',
    backgroundClass: 'bg-gradient-to-br from-accent-peach to-accent-peach-dark',
    titleKey: 'heroTitle',
    subtitleKey: 'heroSubtitle',
    primaryButton: { labelKey: 'explore', href: '/explore' },
    secondaryButton: { labelKey: 'viewDetails', href: '/explore' },
    decorativeElements: [
      { position: 'top-1/4 right-2 md:right-8', size: 'w-12 h-12 md:w-24 md:h-24', opacity: 'bg-white/20' },
      { position: 'bottom-1/4 right-1/4', size: 'w-6 h-6 md:w-12 md:h-12', opacity: 'bg-white/30' },
      { position: 'top-1/2 left-4 md:left-16', size: 'w-8 h-8 md:w-16 md:h-16', opacity: 'bg-white/15' }
    ]
  },
  {
    id: 'collections',
    type: 'featured',
    backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    title: { en: 'Curated Collections', ar: 'مجموعات منتقاة' },
    subtitle: { en: 'Discover handpicked vintage treasures styled by our experts', ar: 'اكتشف الكنوز العتيقة المنتقاة بعناية من قبل خبرائنا' },
    primaryButton: { labelKey: 'fitsWeStyled', href: '/collections' },
    badge: { en: '50+ Collections', ar: '50+ مجموعة' }
  },
  {
    id: 'offers',
    type: 'promotion',
    backgroundClass: 'bg-gradient-to-br from-accent-olive to-accent-olive-dark',
    title: { en: 'Special Offers', ar: 'عروض خاصة' },
    subtitle: { en: 'Up to 40% off on selected vintage items this week', ar: 'خصم يصل إلى 40% على المنتجات العتيقة المختارة هذا الأسبوع' },
    primaryButton: { label: { en: 'Shop Deals', ar: 'تسوق العروض' }, href: '/explore?sale=true' },
    badge: { en: 'Limited Time', ar: 'وقت محدود' },
    decorativeElements: [
      { position: 'top-1/3 right-4 md:right-12', size: 'w-16 h-16 md:w-32 md:h-32', opacity: 'bg-white/10' },
      { position: 'bottom-1/3 left-8 md:left-20', size: 'w-10 h-10 md:w-20 md:h-20', opacity: 'bg-white/20' }
    ]
  },
  {
    id: 'sellers',
    type: 'featured',
    backgroundImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&h=600&fit=crop',
    title: { en: 'Top Sellers', ar: 'أفضل البائعين' },
    subtitle: { en: 'Meet our verified sellers with the highest ratings', ar: 'تعرف على البائعين المعتمدين ذوي التقييمات الأعلى' },
    primaryButton: { labelKey: 'topSellers', href: '/sellers' },
    badge: { en: 'Verified Sellers', ar: 'بائعون معتمدون' }
  }
];

export const HeroSection = () => {
  const { language } = useAppContext();
  const t = translations[language];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlay && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
    setIsAutoPlay(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = dragStart - currentX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setDragOffset(0);
    
    // Determine if we should change slides based on drag distance
    const threshold = 100; // Minimum drag distance to trigger slide change
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    } else {
      setIsAutoPlay(true);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlay(true), 3000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const getSlideContent = (slide: CarouselSlide) => {
    const title = slide.titleKey ? t[slide.titleKey as keyof typeof t] : slide.title?.[language] || '';
    const subtitle = slide.subtitleKey ? t[slide.subtitleKey as keyof typeof t] : slide.subtitle?.[language] || '';
    
    return { title, subtitle };
  };

  // Calculate slide transform for smooth infinite carousel
  const getSlideTransform = (index: number) => {
    const totalSlides = carouselSlides.length;
    let slideIndex = index - currentSlide;
    
    // Handle wrapping for infinite carousel - ensure smooth transitions at edges
    if (slideIndex > totalSlides / 2) {
      slideIndex -= totalSlides;
    } else if (slideIndex <= -totalSlides / 2) {
      slideIndex += totalSlides;
    }
    
    // Calculate position with drag offset
    let transform = slideIndex * 100;
    
    if (isDragging && index === currentSlide) {
      transform -= dragOffset / 10; // Scale drag offset for smoother feel
    }
    
    return transform;
  };

  // Create extended slides array for seamless infinite scrolling
  const getExtendedSlides = () => {
    const totalSlides = carouselSlides.length;
    const extendedSlides = [];
    
    // Add slides before current for seamless backward transition
    for (let i = -2; i < totalSlides + 2; i++) {
      const actualIndex = ((i % totalSlides) + totalSlides) % totalSlides;
      extendedSlides.push({
        ...carouselSlides[actualIndex],
        originalIndex: actualIndex,
        displayIndex: i
      });
    }
    
    return extendedSlides;
  };

  const extendedSlides = getExtendedSlides();

  return (
    <section 
      ref={sectionRef}
      className="relative text-white overflow-hidden h-[60vh] md:h-[70vh] min-h-[400px] cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsAutoPlay(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {extendedSlides.map((slide) => {
          const transform = getSlideTransform(slide.displayIndex);
          const isVisible = Math.abs(transform) <= 120; // Show slides within 120% of viewport
          
          return (
            <div
              key={`${slide.id}-${slide.displayIndex}`}
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `translateX(${transform}%)`,
                zIndex: isVisible ? 1 : 0
              }}
            >
              {/* Background */}
              {slide.backgroundImage ? (
                <div className="absolute inset-0">
                  <Image
                    src={slide.backgroundImage}
                    alt={`Slide ${slide.originalIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={slide.originalIndex === 0}
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              ) : (
                <div className={`absolute inset-0 ${slide.backgroundClass}`}>
      <div className="absolute inset-0 bg-black/10"></div>
                </div>
              )}

              {/* Decorative Elements */}
              {slide.decorativeElements?.map((element, elemIndex) => (
                <div
                  key={elemIndex}
                  className={`absolute ${element.position} ${element.size} ${element.opacity} rounded-full animate-pulse`}
                  style={{
                    animationDelay: `${elemIndex * 0.5}s`,
                    animationDuration: '3s'
                  }}
                ></div>
              ))}

              {/* Content */}
              <div className="relative container mx-auto mobile-px h-full flex items-center">
                <div className="max-w-3xl z-10">
                  {/* Badge */}
                  {slide.badge && (
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 md:mb-6">
                      <span className="text-mobile-sm md:text-base font-medium">
                        {slide.badge[language]}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-mobile-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                    {getSlideContent(slide).title}
          </h1>

                  {/* Subtitle */}
                  <p className="text-mobile-lg md:text-2xl lg:text-3xl mb-6 md:mb-8 opacity-90 leading-relaxed max-w-2xl">
                    {getSlideContent(slide).subtitle}
          </p>
          
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {slide.primaryButton && (
                      <Link
                        href={slide.primaryButton.href}
                        className="mobile-button px-6 md:px-8 py-3 md:py-4 bg-white text-accent-peach-dark font-semibold rounded-lg hover:bg-neutral-beige transition-all duration-300 text-mobile-base md:text-base text-center transform hover:scale-105"
                      >
                        {slide.primaryButton.labelKey 
                          ? t[slide.primaryButton.labelKey as keyof typeof t]
                          : slide.primaryButton.label?.[language]
                        }
                      </Link>
                    )}
                    
                    {slide.secondaryButton && (
                      <Link
                        href={slide.secondaryButton.href}
                        className="mobile-button px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-accent-peach-dark transition-all duration-300 text-mobile-base md:text-base text-center transform hover:scale-105"
                      >
                        {slide.secondaryButton.labelKey 
                          ? t[slide.secondaryButton.labelKey as keyof typeof t]
                          : slide.secondaryButton.label?.[language]
                        }
                      </Link>
                    )}
                  </div>
                </div>
          </div>
        </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / carouselSlides.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
}; 