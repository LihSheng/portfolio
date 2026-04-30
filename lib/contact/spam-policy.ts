import type { ContactSubmissionInput } from './types.ts';

export function isSpamSubmission(input: ContactSubmissionInput): boolean {
  return typeof input.website === 'string' && input.website.trim().length > 0;
}
