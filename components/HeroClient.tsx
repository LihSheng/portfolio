'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { FeatureFlags } from '@/types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface HeroClientProps {
  flags: FeatureFlags;
}

export default function HeroClient({ flags }: HeroClientProps) {
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
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Greeting */}
      <motion.p
        variants={fadeInUp}
        className="text-lg sm:text-xl font-medium"
        style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)' }}
      >
        Hi, I'm
      </motion.p>

      {/* Name */}
      <motion.h1
        variants={fadeInUp}
        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
      >
        {siteConfig.author.name}
      </motion.h1>

      {/* Tagline */}
      <motion.h2
        variants={fadeInUp}
        className="text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
      >
        Results-oriented Software Developer with{' '}
        <span
          className="font-semibold"
          style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
        >
          3+ years of experience
        </span>{' '}
        delivering robust web applications using TypeScript, React, Next.js, and Laravel.
      </motion.h2>

      {/* Bio */}
      <motion.p
        variants={fadeInUp}
        className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
      >
        {siteConfig.author.bio}
      </motion.p>

      {/* CTA Buttons */}
      {(flags.projects || flags.contact) && (
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          {flags.projects && (
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 min-w-[160px] shadow-lg"
            >
              View My Work
            </Link>
          )}
          {flags.contact && (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border-2 transition-colors duration-200 min-w-[160px]"
              style={{
                borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)',
                color: isDarkMode ? 'white' : 'rgb(55, 65, 81)',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (isDarkMode) {
                  e.currentTarget.style.backgroundColor = 'rgb(55, 65, 81)';
                  e.currentTarget.style.borderColor = 'rgb(107, 114, 128)';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgb(243, 244, 246)';
                  e.currentTarget.style.borderColor = 'rgb(156, 163, 175)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(209, 213, 219)';
              }}
            >
              Get In Touch
            </Link>
          )}
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        variants={fadeInUp}
        className="pt-12 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: isDarkMode ? 'rgb(75, 85, 81)' : 'rgb(209, 213, 219)' }}
        >
          <div
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: isDarkMode ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)' }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}