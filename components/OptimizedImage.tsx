'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { shimmerPlaceholderDataUrl } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  fallbackSrc?: string;
  showFallback?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  showFallback = true,
  ...props 
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (showFallback && fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={shimmerPlaceholderDataUrl}
      onError={handleError}
      onLoad={handleLoad}
      className={`${props.className || ''} ${isLoading ? 'animate-pulse' : ''} ${hasError ? 'opacity-75' : ''}`}
    />
  );
}