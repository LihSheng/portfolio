import nodemailer from 'nodemailer';
import type { ContactDeliveryAdapter } from '../types.ts';

interface NodemailerContactDeliveryAdapterOptions {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  from?: string;
  to?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateEmailHtml(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Portfolio Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; }
          .message { background: #f9f9f9; padding: 15px; border-left: 4px solid #007cba; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>Received: ${new Date().toLocaleString()}</p>
          </div>
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escapeHtml(message.name)}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${message.email}">${escapeHtml(message.email)}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${escapeHtml(message.subject)}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="message">${escapeHtml(message.message).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function createNodemailerContactDeliveryAdapter(
  options: NodemailerContactDeliveryAdapterOptions
): ContactDeliveryAdapter {
  return {
    async send(message): Promise<void> {
      const { smtp } = options;

      if (!smtp.host || !smtp.auth.user || !smtp.auth.pass) {
        throw new Error('SMTP configuration is required for Nodemailer');
      }

      const transporter = nodemailer.createTransport(smtp);

      try {
        await transporter.verify();
      } catch (error) {
        const error_message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`SMTP connection failed: ${error_message}`);
      }

      await transporter.sendMail({
        from: options.from || smtp.auth.user,
        to: options.to || smtp.auth.user,
        subject: `Portfolio Contact: ${message.subject}`,
        html: generateEmailHtml(message),
        replyTo: message.email,
      });
    },
  };
}
