'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Icon */}
          <motion.div
            className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Something went wrong!
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            An unexpected error occurred while loading this page.
          </motion.p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              className="mb-8 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                Error Details:
              </p>
              <p className="text-xs text-red-600 dark:text-red-300 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-secondary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Go Home
            </Link>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            className="mt-8 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              If this problem persists, please contact me:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/contact"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Contact Form
              </Link>
              <a
                href="mailto:your.email@example.com"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Email Me
              </a>
              <Link
                href="/projects"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                View Projects
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}