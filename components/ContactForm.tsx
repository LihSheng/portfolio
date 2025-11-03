'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import type { ContactFormResponse } from '@/types';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<ContactFormResponse>;
}

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

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
    
    // Clear submit status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
    
    // Validate field on change if it has been touched
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
    
    // Validate all fields
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
        // Default API call
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
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputStyles = (hasError: boolean = false) => ({
    backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: hasError 
      ? (isDarkMode ? 'rgb(239, 68, 68)' : 'rgb(239, 68, 68)')
      : (isDarkMode ? 'rgb(107, 114, 128)' : 'rgb(209, 213, 219)'),
    color: isDarkMode ? 'white' : 'rgb(17, 24, 39)'
  });

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium mb-2"
          style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)' }}
        >
          Name <span className="text-red-500" aria-label="required">*</span>
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
          className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={getInputStyles(!!errors.name)}
          placeholder="Your full name"
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm" style={{ color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }} role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium mb-2"
          style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)' }}
        >
          Email <span className="text-red-500" aria-label="required">*</span>
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
          className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={getInputStyles(!!errors.email)}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm" style={{ color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }} role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label 
          htmlFor="subject" 
          className="block text-sm font-medium mb-2"
          style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)' }}
        >
          Subject <span className="text-red-500" aria-label="required">*</span>
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
          className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={getInputStyles(!!errors.subject)}
          placeholder="What's this about?"
        />
        {errors.subject && (
          <p id="subject-error" className="mt-2 text-sm" style={{ color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }} role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium mb-2"
          style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)' }}
        >
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
          style={getInputStyles(!!errors.message)}
          placeholder="Tell me about your project, question, or how I can help..."
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm" style={{ color: isDarkMode ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }} role="alert">
            {errors.message}
          </p>
        )}
        <p 
          className="mt-2 text-sm"
          style={{ color: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
        >
          {formData.message.length}/2000 characters
        </p>
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
        >
          <p className="text-green-800 dark:text-green-200 text-sm font-medium">
            ✓ {submitMessage}
          </p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
        >
          <p className="text-red-800 dark:text-red-200 text-sm font-medium">
            ✗ {submitMessage}
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className={`
          w-full px-6 py-3 rounded-lg font-medium text-white
          transition-all duration-200
          ${isSubmitting || Object.keys(errors).length > 0
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 hover:shadow-lg dark:hover:shadow-blue-500/25'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2
          dark:focus:ring-offset-gray-800
        `}
        whileHover={!isSubmitting && Object.keys(errors).length === 0 ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting && Object.keys(errors).length === 0 ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      {/* Form Instructions */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        I'll get back to you as soon as possible, usually within 24 hours.
      </p>
    </motion.form>
  );
}