import assert from 'node:assert/strict';
import test from 'node:test';
import { createInMemoryContactRateLimiter } from '../../lib/contact/rate-limit.ts';
import { submitContactMessage } from '../../lib/contact/submit-contact-message.ts';
import type { ContactDeliveryAdapter, ContactSubmissionInput } from '../../lib/contact/types.ts';

const valid_input: ContactSubmissionInput = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Need a portfolio project',
  message: 'I would like to discuss a project with you.',
  website: '',
};

test('accepts a valid contact message and calls delivery', async () => {
  const delivered: string[] = [];
  const delivery: ContactDeliveryAdapter = {
    async send(message) {
      delivered.push(message.email);
    },
  };

  const result = await submitContactMessage(
    valid_input,
    {
      ip: '127.0.0.1',
      user_agent: 'node-test',
      origin: 'http://localhost:3000',
    },
    {
      delivery,
      rate_limiter: createInMemoryContactRateLimiter(),
    }
  );

  assert.equal(result.status, 'accepted');
  assert.deepEqual(delivered, ['jane@example.com']);
});

test('treats a filled honeypot field as spam without delivery', async () => {
  let delivered = false;
  const delivery: ContactDeliveryAdapter = {
    async send() {
      delivered = true;
    },
  };

  const result = await submitContactMessage(
    {
      ...valid_input,
      website: 'https://spam.example.com',
    },
    { ip: '10.0.0.1' },
    {
      delivery,
      rate_limiter: createInMemoryContactRateLimiter(),
    }
  );

  assert.equal(result.status, 'spam');
  assert.equal(delivered, false);
});

test('returns invalid with field errors for bad input', async () => {
  const result = await submitContactMessage(
    {
      name: 'A',
      email: 'bad-email',
      subject: 'hey',
      message: 'short',
      website: '',
    },
    { ip: '10.0.0.2' },
    {
      delivery: { async send() {} },
      rate_limiter: createInMemoryContactRateLimiter(),
    }
  );

  assert.equal(result.status, 'invalid');
  if (result.status === 'invalid') {
    assert.equal(result.errors.email, 'Please enter a valid email address');
  }
});

test('returns delivery_failed when adapter throws', async () => {
  const original_console_error = console.error;
  console.error = () => {};

  try {
    const result = await submitContactMessage(
      valid_input,
      { ip: '10.0.0.3' },
      {
        delivery: {
          async send() {
            throw new Error('smtp down');
          },
        },
        rate_limiter: createInMemoryContactRateLimiter(),
      }
    );

    assert.equal(result.status, 'delivery_failed');
  } finally {
    console.error = original_console_error;
  }
});

test('returns rate_limited after the request limit is exceeded', async () => {
  const rate_limiter = createInMemoryContactRateLimiter({ max_requests: 1 });
  const delivery: ContactDeliveryAdapter = { async send() {} };

  const first = await submitContactMessage(valid_input, { ip: '10.0.0.4' }, { delivery, rate_limiter });
  const second = await submitContactMessage(valid_input, { ip: '10.0.0.4' }, { delivery, rate_limiter });

  assert.equal(first.status, 'accepted');
  assert.equal(second.status, 'rate_limited');
});
