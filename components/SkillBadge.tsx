'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

const levelColors = {
  beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  intermediate: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  advanced: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  expert: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
};

const levelDots = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dots = levelDots[skill.level];

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        relative p-4 rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 hover:shadow-md transition-shadow
        group cursor-default
      `}
      style={{
        backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
        borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-lg" role="img" aria-label={skill.name}>
              {skill.icon}
            </span>
          )}
          <h3
            className="font-medium"
            style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
          >
            {skill.name}
          </h3>
        </div>
        <span
          className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${levelColors[skill.level]}
          `}
          style={{
            backgroundColor: isDarkMode ?
              (skill.level === 'beginner' ? 'rgb(30, 58, 138)' :
                skill.level === 'intermediate' ? 'rgb(20, 83, 45)' :
                  skill.level === 'advanced' ? 'rgb(154, 52, 18)' :
                    'rgb(88, 28, 135)') :
              (skill.level === 'beginner' ? 'rgb(219, 234, 254)' :
                skill.level === 'intermediate' ? 'rgb(220, 252, 231)' :
                  skill.level === 'advanced' ? 'rgb(254, 215, 170)' :
                    'rgb(243, 232, 255)'),
            color: isDarkMode ?
              (skill.level === 'beginner' ? 'rgb(191, 219, 254)' :
                skill.level === 'intermediate' ? 'rgb(134, 239, 172)' :
                  skill.level === 'advanced' ? 'rgb(251, 146, 60)' :
                    'rgb(196, 181, 253)') :
              (skill.level === 'beginner' ? 'rgb(30, 64, 175)' :
                skill.level === 'intermediate' ? 'rgb(22, 101, 52)' :
                  skill.level === 'advanced' ? 'rgb(154, 52, 18)' :
                    'rgb(107, 33, 168)')
          }}
        >
          {skill.level}
        </span>
      </div>

      {/* Proficiency dots */}
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full transition-colors
              ${i < dots
                ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-400')
                : (isDarkMode ? 'bg-gray-600' : 'bg-gray-200')
              }
            `}
          />
        ))}
      </div>

      {/* Hover tooltip */}
      <div
        className="
          absolute -top-8 left-1/2 transform -translate-x-1/2
          text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100
          transition-opacity pointer-events-none whitespace-nowrap
          z-10
        "
        style={{
          backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'rgb(17, 24, 39)',
          color: 'white'
        }}
      >
        {skill.level} level
      </div>
    </motion.div>
  );
}