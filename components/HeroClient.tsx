'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { FeatureFlags } from '@/types';
import { ProfilePicture } from './ProfilePicture';
import { useMotionVariants, useMotionTransition } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, staggerSlow, reducedMotionVariants, defaultTransition } from '@/lib/animations';

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

  const containerVariants = useMotionVariants(staggerSlow, reducedMotionVariants.fadeIn);
  const itemVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
  const transition = useMotionTransition(defaultTransition);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Profile Picture */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <ProfilePicture
            size="large"
            priority={true}
            animate={true}
            className={`
              shadow-2xl transition-all duration-300 transform-gpu
              ${isDarkMode 
                ? 'ring-4 ring-white/20 hover:ring-blue-400/40 hover:shadow-blue-500/25' 
                : 'ring-4 ring-white/30 hover:ring-blue-500/40 hover:shadow-blue-500/20'
              }
              sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48
            `}
            ariaLabel={`Large profile picture of ${siteConfig.author.name}, featured prominently in the hero section`}
            includeScreenReaderText={true}
            screenReaderText={`This is the main profile picture of ${siteConfig.author.name}, a software developer focused on web applications, automation, and AI-driven workflows.`}
            onError={(error) => {
              console.error('Hero profile picture failed to load:', error);
            }}
            onLoadingComplete={() => {
              console.log('Hero profile picture loaded successfully');
            }}
          />
          {/* Subtle glow effect */}
          <div 
            className={`
              absolute inset-0 rounded-full blur-xl opacity-20 -z-10
              ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}
            `}
          />
        </div>
      </motion.div>

      {/* Greeting */}
      <motion.p
        variants={itemVariants}
        className="text-lg sm:text-xl font-medium"
        style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)' }}
      >
        Hi, I'm
      </motion.p>

      {/* Name */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
      >
        {siteConfig.author.name}
      </motion.h1>

      {/* Tagline */}
      <motion.h2
        variants={itemVariants}
        className="text-xl sm:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
      >
        Software Developer building{' '}
        <span
          className="font-semibold"
          style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
        >
          enterprise web applications
        </span>{' '}
        and automation workflows with TypeScript, React, Next.js, Laravel, AWS, and practical AI tooling.
      </motion.h2>

      {/* Bio */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
      >
        {siteConfig.author.bio}
      </motion.p>

      {/* CTA Buttons */}
      {(flags.projects || flags.contact) && (
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:flex-wrap"
        >
          {flags.projects && (
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 min-w-[160px] shadow-lg"
            >
              View My Work
            </Link>
          )}
          <a
            href="/Ng-Lih-Sheng-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-lg bg-gray-900 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors duration-200 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Download size={16} />
            Resume
          </a>
          <a
            href={siteConfig.author.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-lg border-2 border-blue-500 px-8 py-3 text-base font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-slate-800"
          >
            <Github size={16} />
            GitHub
          </a>
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
        variants={itemVariants}
        className="pt-12 hidden sm:block"
      >
        <motion.div
          animate={useMotionVariants({ y: [0, 8, 0] }, { y: 0 })}
          transition={useMotionTransition({ duration: 2, repeat: Infinity, ease: "easeInOut" }, { duration: 0 })}
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
