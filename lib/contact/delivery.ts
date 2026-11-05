import { createConsoleContactDeliveryAdapter } from './adapters/console.ts';
import { createFormspreeContactDeliveryAdapter } from './adapters/formspree.ts';
import { createNodemailerContactDeliveryAdapter } from './adapters/nodemailer.ts';
import type { ContactDeliveryAdapter } from './types.ts';

type ContactDeliveryProvider = 'console' | 'nodemailer' | 'formspree' | 'unconfigured';

function getProviderFromEnv(): ContactDeliveryProvider {
  const provider = process.env.EMAIL_PROVIDER;

  if (provider === 'nodemailer' || provider === 'formspree' || provider === 'console') {
    return provider;
  }

  // Fail closed in production: without this, a missing EMAIL_PROVIDER would
  // silently "accept" messages and only write them to the server logs.
  return process.env.NODE_ENV === 'production' ? 'unconfigured' : 'console';
}

function createUnconfiguredContactDeliveryAdapter(): ContactDeliveryAdapter {
  return {
    async send(): Promise<void> {
      throw new Error(
        'Contact delivery is not configured. Set EMAIL_PROVIDER to nodemailer, formspree or console.'
      );
    },
  };
}

export function createContactDeliveryAdapterFromEnv(): ContactDeliveryAdapter {
  const provider = getProviderFromEnv();

  switch (provider) {
    case 'nodemailer':
      return createNodemailerContactDeliveryAdapter({
        smtp: {
          host: process.env.SMTP_HOST || '',
          port: parseInt(process.env.SMTP_PORT || '587', 10),
          secure: process.env.SMTP_PORT === '465',
          auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || '',
          },
        },
        from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
      });
    case 'formspree':
      return createFormspreeContactDeliveryAdapter({
        endpoint: process.env.FORMSPREE_ENDPOINT || '',
      });
    case 'console':
      return createConsoleContactDeliveryAdapter();
    case 'unconfigured':
    default:
      return createUnconfiguredContactDeliveryAdapter();
  }
}
