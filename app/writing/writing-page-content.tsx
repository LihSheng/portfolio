'use client';

import { useEffect, useState } from 'react';

interface WritingPageContentProps {
  children: React.ReactNode;
}

export function WritingPageContent({ children }: WritingPageContentProps) {
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

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: isDarkMode ? 'rgb(3, 7, 18)' : 'rgb(249, 250, 251)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            Writing
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)' }}
          >
            Technical articles, tutorials, and insights on web development, programming, and technology.
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}