import type { ContactRateLimiter, ContactRateLimitResult } from './types.ts';

interface ContactRateLimitRecord {
  count: number;
  reset_time: number;
}

interface CreateInMemoryContactRateLimiterOptions {
  window_ms?: number;
  max_requests?: number;
}

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;

export function createInMemoryContactRateLimiter(
  options: CreateInMemoryContactRateLimiterOptions = {}
): ContactRateLimiter {
  const window_ms = options.window_ms ?? DEFAULT_WINDOW_MS;
  const max_requests = options.max_requests ?? DEFAULT_MAX_REQUESTS;
  const records = new Map<string, ContactRateLimitRecord>();

  return {
    check(key: string): ContactRateLimitResult {
      const now = Date.now();
      const record = records.get(key);

      if (!record || now > record.reset_time) {
        records.set(key, {
          count: 1,
          reset_time: now + window_ms,
        });

        return { allowed: true };
      }

      if (record.count >= max_requests) {
        return {
          allowed: false,
          retry_after_seconds: Math.max(1, Math.ceil((record.reset_time - now) / 1000)),
        };
      }

      record.count += 1;
      records.set(key, record);

      return { allowed: true };
    },
  };
}

export const defaultContactRateLimiter = createInMemoryContactRateLimiter();
