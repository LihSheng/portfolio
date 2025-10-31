/**
 * Contact utilities for consistent email handling across the application
 */

/**
 * Get the contact email from environment variables
 * Falls back to a default if not set
 */
export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'your.email@example.com';
}

/**
 * Generate a mailto link with the contact email
 * @param subject - Optional email subject
 * @param body - Optional email body
 */
export function getMailtoLink(subject?: string, body?: string): string {
  const email = getContactEmail();
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Check if contact email is configured (not using default)
 */
export function isContactEmailConfigured(): boolean {
  const email = getContactEmail();
  return email !== 'your.email@example.com' && email.includes('@');
}