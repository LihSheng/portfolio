'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if the user prefers reduced motion
 * Returns true if the user has set prefers-reduced-motion: reduce
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Create media query for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Create listener for changes
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', listener);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns animation variants based on reduced motion preference
 * @param normalVariants - Animation variants for normal motion
 * @param reducedVariants - Simplified variants for reduced motion (optional)
 */
export function useMotionVariants<T>(
  normalVariants: T,
  reducedVariants?: T
): T {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion && reducedVariants) {
    return reducedVariants;
  }
  
  // If reduced motion is preferred but no reduced variants provided,
  // return a simplified version that only changes opacity
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    } as T;
  }
  
  return normalVariants;
}

/**
 * Hook that returns transition settings based on reduced motion preference
 * @param normalTransition - Normal transition settings
 * @param reducedTransition - Reduced motion transition settings (optional)
 */
export function useMotionTransition(
  normalTransition: any,
  reducedTransition?: any
) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return reducedTransition || { duration: 0.01 };
  }
  
  return normalTransition;
}