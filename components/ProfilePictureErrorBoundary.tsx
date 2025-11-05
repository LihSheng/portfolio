'use client';

import React, { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary specifically for ProfilePicture component failures
 */
export class ProfilePictureErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ProfilePicture Error Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className="flex items-center justify-center w-full h-full bg-muted rounded-full border-2 border-destructive/20"
          role="img"
          aria-label="Profile picture failed to load"
        >
          <AlertCircle 
            className="w-6 h-6 text-destructive" 
            aria-hidden="true"
          />
          <span className="sr-only">
            Profile picture could not be loaded due to an error
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook version of the error boundary for functional components
 */
export function useProfilePictureErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    console.error('ProfilePicture error:', error);
  }, []);

  return {
    error,
    resetError,
    handleError,
    hasError: error !== null,
  };
}