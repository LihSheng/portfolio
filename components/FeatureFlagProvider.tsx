'use client';

import React, { createContext, useMemo, useCallback } from 'react';
import { FeatureFlags, FeatureFlagContextType } from '@/types';
import { getFeatureFlags } from '@/lib';



/**
 * React Context for feature flags
 */
export const FeatureFlagContext = createContext<FeatureFlagContextType | null>(null);

/**
 * Props for FeatureFlagProvider component
 */
interface FeatureFlagProviderProps {
  children: React.ReactNode;
}

/**
 * Feature Flag Provider component that provides feature flag context to the application
 * 
 * This component:
 * - Loads feature flags from environment variables with memoization
 * - Provides a utility function to check if a flag is enabled
 * - Handles error cases when provider is missing
 */
export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  // Memoize flag values to prevent unnecessary re-renders
  const flags = useMemo(() => getFeatureFlags(), []);
  
  // Memoize the flag checking function
  const isEnabled = useCallback((flag: keyof FeatureFlags) => {
    return flags[flag];
  }, [flags]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    flags,
    isEnabled,
  }), [flags, isEnabled]);

  return (
    <FeatureFlagContext.Provider value={contextValue}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

// Re-export hooks for convenience
export { useFeatureFlag, useFeatureFlags, useFeatureFlagChecker } from '@/lib/feature-flags';