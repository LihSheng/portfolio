export interface ContactSubmissionInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export interface ContactSubmissionContext {
  ip: string;
  user_agent?: string | null;
  origin?: string | null;
}

export interface ContactDeliveryMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactDeliveryAdapter {
  send(message: ContactDeliveryMessage): Promise<void>;
}

export interface ContactRateLimitResult {
  allowed: boolean;
  retry_after_seconds?: number;
}

export interface ContactRateLimiter {
  check(key: string): ContactRateLimitResult;
}

export type ContactSubmissionResult =
  | { status: 'accepted'; message: string }
  | { status: 'spam'; message: string }
  | { status: 'invalid'; message: string; errors: Record<string, string> }
  | { status: 'rate_limited'; message: string; retry_after_seconds: number }
  | { status: 'delivery_failed'; message: string };

export interface SubmitContactMessageDependencies {
  delivery: ContactDeliveryAdapter;
  rate_limiter: ContactRateLimiter;
}
