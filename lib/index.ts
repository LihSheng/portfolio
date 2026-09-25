/**
 * Main Library Barrel Exports
 *
 * This module provides convenient access to server-side utilities.
 * Client-side hooks should be imported directly from their modules.
 *
 * @example
 * ```tsx
 * // Server-side utilities
 * import { getFeatureFlags } from '@/lib';
 *
 * // Client-side hooks (import directly)
 * import { useFeatureFlag, useFeatureFlags } from '@/lib/feature-flags';
 * ```
 */

// Server-side Feature Flag utilities
export { getFeatureFlags, getFeatureFlag } from './feature-flags';
