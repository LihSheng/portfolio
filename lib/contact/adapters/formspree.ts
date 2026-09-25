import type { ContactDeliveryAdapter } from '../types.ts';

interface FormspreeContactDeliveryAdapterOptions {
  endpoint: string;
}

export function createFormspreeContactDeliveryAdapter(
  options: FormspreeContactDeliveryAdapterOptions
): ContactDeliveryAdapter {
  return {
    async send(message): Promise<void> {
      if (!options.endpoint) {
        throw new Error('Formspree endpoint is required');
      }

      const response = await fetch(options.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message,
          _replyto: message.email,
        }),
      });

      if (!response.ok) {
        const error_text = await response.text();
        throw new Error(`Formspree error: ${response.status} ${error_text}`);
      }
    },
  };
}
