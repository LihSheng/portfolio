import { createConsoleContactDeliveryAdapter } from './adapters/console.ts';
import { createFormspreeContactDeliveryAdapter } from './adapters/formspree.ts';
import { createNodemailerContactDeliveryAdapter } from './adapters/nodemailer.ts';
import type { ContactDeliveryAdapter } from './types.ts';

type ContactDeliveryProvider = 'console' | 'nodemailer' | 'formspree';

function getProviderFromEnv(): ContactDeliveryProvider {
  const provider = process.env.EMAIL_PROVIDER;

  if (provider === 'nodemailer' || provider === 'formspree' || provider === 'console') {
    return provider;
  }

  return 'console';
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
    default:
      return createConsoleContactDeliveryAdapter();
  }
}
