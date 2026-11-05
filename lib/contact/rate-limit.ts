import type { ContactRateLimiter, ContactRateLimitResult } from './types.ts';

interface ContactRateLimitRecord {
  count: number;
  reset_time: number;
}

interface CreateInMemoryContactRateLimiterOptions {
  window_ms?: number;
  max_requests?: number;
  max_keys?: number;
}

const DEFAULT_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;
const DEFAULT_MAX_KEYS = 10_000;

export function createInMemoryContactRateLimiter(
  options: CreateInMemoryContactRateLimiterOptions = {}
): ContactRateLimiter {
  const window_ms = options.window_ms ?? DEFAULT_WINDOW_MS;
  const max_requests = options.max_requests ?? DEFAULT_MAX_REQUESTS;
  const max_keys = options.max_keys ?? DEFAULT_MAX_KEYS;
  const records = new Map<string, ContactRateLimitRecord>();

  // Keeps memory bounded: drop expired windows first, then the oldest keys
  // (Map iterates in insertion order) if many distinct IPs are still active.
  function makeRoom(now: number) {
    if (records.size < max_keys) return;

    for (const [key, record] of records) {
      if (now > record.reset_time) records.delete(key);
    }

    for (const key of records.keys()) {
      if (records.size < max_keys) break;
      records.delete(key);
    }
  }

  return {
    check(key: string): ContactRateLimitResult {
      const now = Date.now();
      const record = records.get(key);

      if (!record || now > record.reset_time) {
        if (record) records.delete(key);
        makeRoom(now);
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

      return { allowed: true };
    },
  };
}

export const defaultContactRateLimiter = createInMemoryContactRateLimiter();
