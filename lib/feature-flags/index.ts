/**
 * Feature Flag System - Barrel Exports
 * 
 * This module provides a clean API surface for the feature flag system,
 * allowing consumers to import everything they need from a single location.
 */

// Core feature flag configuration and utilities
export {
  defaultFeatureFlags,
  getFeatureFlags,
  isValidFeatureFlag,
  getFeatureFlag,
} from './config';

// React hooks for feature flag access
export {
  useFeatureFlag,
  useFeatureFlags,
  useFeatureFlagChecker,
} from '../hooks/useFeatureFlag';

// React provider component
export {
  FeatureFlagProvider,
  FeatureFlagContext,
} from '../../components/FeatureFlagProvider';

// TypeScript types (re-exported from main types file)
export type {
  FeatureFlags,
  NavigationItemWithFlag,
  FeatureFlagContextType,
} from '../../types';