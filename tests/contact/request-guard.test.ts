import assert from 'node:assert/strict';
import test from 'node:test';
import { checkContactRequest } from '../../lib/contact/request-guard.ts';
import { createContactDeliveryAdapterFromEnv } from '../../lib/contact/delivery.ts';
import { createInMemoryContactRateLimiter } from '../../lib/contact/rate-limit.ts';
import { serializeJsonLd } from '../../lib/json-ld.ts';

const same_origin = { content_type: 'application/json', origin: 'https://lihsheng.dev', host: 'lihsheng.dev' };

test('accepts a same-origin JSON request', () => {
  assert.equal(checkContactRequest(same_origin), null);
});

test('accepts JSON with a charset parameter', () => {
  assert.equal(checkContactRequest({ ...same_origin, content_type: 'Application/JSON; charset=utf-8' }), null);
});

test('accepts a request without Origin (non-browser client)', () => {
  assert.equal(checkContactRequest({ ...same_origin, origin: null }), null);
});

test('rejects text/plain, which skips the CORS preflight', () => {
  assert.equal(checkContactRequest({ ...same_origin, content_type: 'text/plain' })?.status, 415);
});

test('rejects a missing Content-Type', () => {
  assert.equal(checkContactRequest({ ...same_origin, content_type: null })?.status, 415);
});

test('rejects a cross-site Origin', () => {
  assert.equal(checkContactRequest({ ...same_origin, origin: 'https://evil.example' })?.status, 403);
});

test('rejects the opaque "null" Origin', () => {
  assert.equal(checkContactRequest({ ...same_origin, origin: 'null' })?.status, 403);
});

test('rejects a look-alike host', () => {
  assert.equal(checkContactRequest({ ...same_origin, origin: 'https://lihsheng.dev.evil.example' })?.status, 403);
});

test('accepts an explicitly allowed origin on another host', () => {
  const headers = { ...same_origin, host: 'portfolio-abc.vercel.app' };
  assert.equal(checkContactRequest(headers, ['https://lihsheng.dev']), null);
  assert.equal(checkContactRequest(headers, [])?.status, 403);
});

test('rate limiter keeps at most max_keys entries and still limits', () => {
  const limiter = createInMemoryContactRateLimiter({ max_requests: 1, max_keys: 3 });

  for (let i = 0; i < 100; i++) {
    assert.equal(limiter.check(`10.0.0.${i}`).allowed, true);
  }

  // The newest key is kept, so a repeat is still limited.
  assert.equal(limiter.check('10.0.0.99').allowed, false);
});

test('delivery fails closed in production when EMAIL_PROVIDER is unset', async () => {
  const saved = { provider: process.env.EMAIL_PROVIDER, node_env: process.env.NODE_ENV };
  delete process.env.EMAIL_PROVIDER;
  (process.env as Record<string, string>).NODE_ENV = 'production';

  try {
    await assert.rejects(
      createContactDeliveryAdapterFromEnv().send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Hello there',
        message: 'This should not be accepted.',
      }),
      /not configured/
    );
  } finally {
    if (saved.provider === undefined) delete process.env.EMAIL_PROVIDER;
    else process.env.EMAIL_PROVIDER = saved.provider;
    (process.env as Record<string, string | undefined>).NODE_ENV = saved.node_env;
  }
});

test('serializeJsonLd escapes < so a value cannot close the script tag', () => {
  const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
  assert.equal(out.includes('<'), false);
  assert.deepEqual(JSON.parse(out), { name: '</script><script>alert(1)</script>' });
});
