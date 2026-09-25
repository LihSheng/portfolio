'use client';

import { useState } from 'react';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import type { ContactFormResponse } from '@/types';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<ContactFormResponse>;
}

const labelClassName = 'font-mono text-xs uppercase tracking-[0.08em] text-muted';

const inputClassName =
  'w-full border-0 border-b border-hairline-strong bg-transparent py-2.5 text-ink outline-none placeholder:text-faint focus:border-ink disabled:opacity-50';

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateField = (name: keyof ContactFormData, value: string) => {
    const result = contactFormSchema.shape[name].safeParse(value);

    if (result.success) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } else {
      const errorMessage = result.error.issues[0]?.message;
      if (errorMessage) {
        setErrors(prev => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }

    if (errors[name]) {
      validateField(name as keyof ContactFormData, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactFormSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      let response: ContactFormResponse;

      if (onSubmit) {
        response = await onSubmit(formData);
      } else {
        const apiResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        response = await apiResponse.json();
      }

      if (response.success) {
        setSubmitStatus('success');
        setSubmitMessage(response.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.message || 'Failed to send message. Please try again.');
        if (response.errors) {
          setErrors(response.errors);
        }
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-8 gap-y-7 border-t border-hairline pt-10 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className={labelClassName}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
          className={inputClassName}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-ink" role="alert">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Error </span>
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          className={inputClassName}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-ink" role="alert">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Error </span>
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="subject" className={labelClassName}>
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          aria-invalid={!!errors.subject}
          className={inputClassName}
          placeholder="What is it about"
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-ink" role="alert">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Error </span>
            {errors.subject}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className={`${inputClassName} resize-y leading-relaxed`}
          placeholder="A few lines is fine"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-ink" role="alert">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Error </span>
            {errors.message}
          </p>
        )}
      </div>

      {submitStatus === 'success' && (
        <p className="text-sm text-ink sm:col-span-2" role="status">
          {submitMessage}
        </p>
      )}

      {submitStatus === 'error' && (
        <p className="text-sm text-ink sm:col-span-2" role="alert">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Error </span>
          {submitMessage}
        </p>
      )}

      <div className="flex items-center gap-5 pt-2 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="h-11 shrink-0 bg-ink px-6 text-[15px] font-medium text-paper disabled:opacity-50"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
        <span className="text-[13px] text-muted">
          Sent through the site&apos;s contact API. Nothing is stored.
        </span>
      </div>
    </form>
  );
}
