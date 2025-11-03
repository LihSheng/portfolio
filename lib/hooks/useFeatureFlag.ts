'use client';

import { useContext } from 'react';
import { FeatureFlagContext } from '@/components/FeatureFlagProvider';
import { FeatureFlags } from '@/types';

/**
 * Custom hook to access a specific feature flag
 * 
 * @param flag - The feature flag key to check
 * @returns boolean - Whether the feature flag is enabled
 * @throws Error if used outside of FeatureFlagProvider
 * 
 * @example
 * ```tsx
 * const isBlogEnabled = useFeatureFlag('blog');
 * 
 * return (
 *   <div>
 *     {isBlogEnabled && <BlogSection />}
 *   </div>
 * );
 * ```
 */
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  const context = useContext(FeatureFlagContext);
  
  if (!context) {
    throw new Error(
      'useFeatureFlag must be used within a FeatureFlagProvider. ' +
      'Make sure to wrap your component tree with <FeatureFlagProvider>.'
    );
  }
  
  return context.isEnabled(flag);
}

/**
 * Custom hook to access all feature flags
 * 
 * @returns FeatureFlags - Object containing all feature flag values
 * @throws Error if used outside of FeatureFlagProvider
 * 
 * @example
 * ```tsx
 * const flags = useFeatureFlags();
 * 
 * return (
 *   <div>
 *     {flags.blog && <BlogSection />}
 *     {flags.projects && <ProjectsSection />}
 *   </div>
 * );
 * ```
 */
export function useFeatureFlags(): FeatureFlags {
  const context = useContext(FeatureFlagContext);
  
  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagProvider. ' +
      'Make sure to wrap your component tree with <FeatureFlagProvider>.'
    );
  }
  
  return context.flags;
}

/**
 * Custom hook to access the feature flag checking utility function
 * 
 * @returns Function to check if a feature flag is enabled
 * @throws Error if used outside of FeatureFlagProvider
 * 
 * @example
 * ```tsx
 * const isEnabled = useFeatureFlagChecker();
 * 
 * return (
 *   <div>
 *     {isEnabled('blog') && <BlogSection />}
 *     {isEnabled('projects') && <ProjectsSection />}
 *   </div>
 * );
 * ```
 */
export function useFeatureFlagChecker(): (flag: keyof FeatureFlags) => boolean {
  const context = useContext(FeatureFlagContext);
  
  if (!context) {
    throw new Error(
      'useFeatureFlagChecker must be used within a FeatureFlagProvider. ' +
      'Make sure to wrap your component tree with <FeatureFlagProvider>.'
    );
  }
  
  return context.isEnabled;
}