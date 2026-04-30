import type { ContactDeliveryAdapter, ContactDeliveryMessage } from '../types.ts';

export function createConsoleContactDeliveryAdapter(): ContactDeliveryAdapter {
  return {
    async send(message: ContactDeliveryMessage): Promise<void> {
      console.log('Contact form submission received:', {
        timestamp: new Date().toISOString(),
        name: message.name,
        email: message.email,
        subject: message.subject,
        message: message.message,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    },
  };
}
