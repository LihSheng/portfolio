/**
 * Feature flag configuration system for controlling website module visibility
 */

import { FeatureFlags } from '@/types';

/**
 * Default feature flag values - all features enabled by default except RSS
 */
export const defaultFeatureFlags: FeatureFlags = {
  blog: true,
  projects: true,
  contact: true,
  about: true,
  analytics: true,
  rss: false,
};

/**
 * Get feature flags with environment variable overrides
 * Environment variables use NEXT_PUBLIC_FEATURE_* prefix
 * Set to 'false' to disable a feature, any other value (or undefined) enables it
 */
export const getFeatureFlags = (): FeatureFlags => {
  return {
    blog: process.env.NEXT_PUBLIC_FEATURE_BLOG !== 'false',
    projects: process.env.NEXT_PUBLIC_FEATURE_PROJECTS !== 'false',
    contact: process.env.NEXT_PUBLIC_FEATURE_CONTACT !== 'false',
    about: process.env.NEXT_PUBLIC_FEATURE_ABOUT !== 'false',
    analytics: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS !== 'false',
    rss: process.env.NEXT_PUBLIC_FEATURE_RSS === 'true',
  };
};

/**
 * Type guard to check if a string is a valid feature flag key
 */
export const isValidFeatureFlag = (flag: string): flag is keyof FeatureFlags => {
  return flag in defaultFeatureFlags;
};

/**
 * Get a specific feature flag value
 */
export const getFeatureFlag = (flag: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  return flags[flag];
};