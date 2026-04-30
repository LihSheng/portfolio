import type { ZodIssue } from 'zod';
import { createContactDeliveryAdapterFromEnv } from './delivery.ts';
import { defaultContactRateLimiter } from './rate-limit.ts';
import { contactSubmissionSchema } from './schema.ts';
import { isSpamSubmission } from './spam-policy.ts';
import type {
  ContactSubmissionContext,
  ContactSubmissionResult,
  SubmitContactMessageDependencies,
} from './types.ts';

const SUCCESS_MESSAGE = 'Thank you for your message! I\'ll get back to you soon.';
const INVALID_MESSAGE = 'Please check your input and try again';
const DELIVERY_FAILURE_MESSAGE = 'Failed to send message. Please try again later or contact me directly.';

function mapZodIssues(issues: ZodIssue[]): Record<string, string> {
  const errors: Record<string, string> = {};

  issues.forEach((issue) => {
    const field = issue.path[0];

    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  });

  return errors;
}

function buildDefaultDependencies(): SubmitContactMessageDependencies {
  return {
    delivery: createContactDeliveryAdapterFromEnv(),
    rate_limiter: defaultContactRateLimiter,
  };
}

export async function submitContactMessage(
  input: unknown,
  context: ContactSubmissionContext,
  dependencies: SubmitContactMessageDependencies = buildDefaultDependencies()
): Promise<ContactSubmissionResult> {
  const parsed = contactSubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'invalid',
      message: INVALID_MESSAGE,
      errors: mapZodIssues(parsed.error.issues),
    };
  }

  if (isSpamSubmission(parsed.data)) {
    return {
      status: 'spam',
      message: SUCCESS_MESSAGE,
    };
  }

  const rate_limit = dependencies.rate_limiter.check(context.ip);

  if (!rate_limit.allowed) {
    const retry_after_seconds = rate_limit.retry_after_seconds ?? 60;
    const wait_minutes = Math.max(1, Math.ceil(retry_after_seconds / 60));

    return {
      status: 'rate_limited',
      message: `Too many requests. Please try again in ${wait_minutes} minutes.`,
      retry_after_seconds,
    };
  }

  try {
    await dependencies.delivery.send({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
  } catch (error) {
    console.error('Contact delivery failed:', error);

    return {
      status: 'delivery_failed',
      message: DELIVERY_FAILURE_MESSAGE,
    };
  }

  return {
    status: 'accepted',
    message: SUCCESS_MESSAGE,
  };
}
