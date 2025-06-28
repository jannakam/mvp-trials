'use client';

import { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { Icons } from './Icons';

interface ImageProps extends Omit<NextImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackIcon?: React.ReactNode;
  showFallbackIcon?: boolean;
  className?: string;
}

export const Image = ({
  src,
  alt,
  fallbackSrc,
  fallbackIcon,
  showFallbackIcon = true,
  className = '',
  ...props
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Default fallback icon
  const defaultFallbackIcon = (
    <div className="flex items-center justify-center w-full h-full bg-neutral-beige dark:bg-accent-olive">
      <Icons.Image size="lg" className="text-gray-400" />
    </div>
  );

  // If there's an error and we should show fallback icon
  if (hasError && showFallbackIcon) {
    return (
      <div className={`relative ${className}`}>
        {fallbackIcon || defaultFallbackIcon}
        {alt && (
          <span className="sr-only">{alt}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-beige dark:bg-accent-olive animate-pulse flex items-center justify-center">
          <Icons.Loading size="md" className="text-gray-400 animate-spin" />
        </div>
      )}
      
      <NextImage
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        {...props}
      />
    </div>
  );
}; 