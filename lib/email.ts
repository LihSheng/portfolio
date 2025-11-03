import type { ContactFormData } from '@/lib/validation';

export interface EmailConfig {
  provider: 'console' | 'nodemailer' | 'formspree';
  // Nodemailer config
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  // Formspree config
  formspree?: {
    endpoint: string;
  };
  // Email addresses
  from?: string;
  to?: string;
}

export class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  async sendContactEmail(data: ContactFormData): Promise<void> {
    switch (this.config.provider) {
      case 'console':
        return this.sendConsoleEmail(data);
      case 'nodemailer':
        return this.sendNodemailerEmail(data);
      case 'formspree':
        return this.sendFormspreeEmail(data);
      default:
        throw new Error(`Unsupported email provider: ${this.config.provider}`);
    }
  }

  private async sendConsoleEmail(data: ContactFormData): Promise<void> {
    console.log('📧 Contact form submission received:', {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private async sendNodemailerEmail(data: ContactFormData): Promise<void> {
    const nodemailer = require('nodemailer');
    
    if (!this.config.smtp) {
      throw new Error('SMTP configuration is required for Nodemailer');
    }

    console.log('📧 SMTP Configuration:', {
      host: this.config.smtp.host,
      port: this.config.smtp.port,
      secure: this.config.smtp.secure,
      user: this.config.smtp.auth.user,
      from: this.config.from,
      to: this.config.to,
    });

    const transporter = nodemailer.createTransport(this.config.smtp);

    // Verify connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`SMTP connection failed: ${errorMessage}`);
    }

    const mailOptions = {
      from: this.config.from || this.config.smtp.auth.user,
      to: this.config.to || this.config.smtp.auth.user,
      subject: `Portfolio Contact: ${data.subject}`,
      html: this.generateEmailHTML(data),
      replyTo: data.email,
    };

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
  }

  private async sendFormspreeEmail(data: ContactFormData): Promise<void> {
    if (!this.config.formspree?.endpoint) {
      throw new Error('Formspree endpoint is required');
    }

    const response = await fetch(this.config.formspree.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        _replyto: data.email,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Formspree error: ${response.status} ${errorText}`);
    }
  }

  private generateEmailHTML(data: ContactFormData): string {
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
              <div class="value">${this.escapeHtml(data.name)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${data.email}">${this.escapeHtml(data.email)}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${this.escapeHtml(data.subject)}</div>
            </div>
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message">${this.escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

// Factory function to create email service based on environment
export function createEmailService(): EmailService {
  const provider = (process.env.EMAIL_PROVIDER as EmailConfig['provider']) || 'console';
  
  console.log('🔧 Creating email service with provider:', provider);
  console.log('🔧 Environment variables:', {
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER ? '***' : 'undefined',
    SMTP_PASS: process.env.SMTP_PASS ? '***' : 'undefined',
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  });
  
  const config: EmailConfig = {
    provider,
  };

  switch (provider) {
    case 'nodemailer':
      config.smtp = {
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465', // Use secure for port 465
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      };
      config.from = process.env.SMTP_USER;
      config.to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL;
      break;
      
    case 'formspree':
      config.formspree = {
        endpoint: process.env.FORMSPREE_ENDPOINT || '',
      };
      break;
      
    case 'console':
    default:
      // Console logging - no additional config needed
      break;
  }

  console.log('🔧 Final config:', {
    provider: config.provider,
    smtp: config.smtp ? {
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      user: config.smtp.auth.user ? '***' : 'undefined',
    } : undefined,
    from: config.from,
    to: config.to,
  });

  return new EmailService(config);
}