'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationItems } from '@/lib/site-config';
import { useFeatureFlags } from '@/lib';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navigation({ className = '' }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const flags = useFeatureFlags();

  // Filter navigation items based on feature flags
  const visibleNavigationItems = useMemo(() => {
    return navigationItems.filter(item => {
      // If no flag is specified, always show the item
      if (!item.flag) return true;
      // Otherwise, check if the flag is enabled
      return flags[item.flag];
    });
  }, [flags]);

  useEffect(() => {
    setMounted(true);

    // Check for dark mode
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!mounted) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, mounted]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b backdrop-blur border-gray-200 dark:border-gray-800 ${className}`}
      style={{
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
      data-theme-nav="true"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-xl font-bold transition-colors font-inter"
            style={{
              color: isDark ? '#ffffff' : '#111827',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = isDark ? '#60a5fa' : '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? '#ffffff' : '#111827';
            }}
          >
            LS.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <ul className="flex items-center gap-6">
              {visibleNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    style={{
                      color: isActive(item.href)
                        ? (isDark ? '#60a5fa' : '#2563eb')
                        : (isDark ? 'white' : 'rgb(75, 85, 99)')
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="ml-4 flex items-center">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''
                  }`}
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="container mx-auto px-4 py-4 space-y-1"
            >
              {visibleNavigationItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-md text-base font-medium transition-colors"
                    style={{
                      backgroundColor: isActive(item.href)
                        ? (isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgb(239, 246, 255)')
                        : 'transparent',
                      color: isActive(item.href)
                        ? (isDark ? '#60a5fa' : '#2563eb')
                        : (isDark ? 'white' : 'rgb(75, 85, 99)')
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive(item.href)) {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgb(55, 65, 81)' : 'rgb(249, 250, 251)';
                        e.currentTarget.style.color = isDark ? 'white' : 'rgb(17, 24, 39)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive(item.href)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = isDark ? 'white' : 'rgb(75, 85, 99)';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
