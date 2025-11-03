'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { TimelineItem } from '@/types';

interface TimelineProps {
  items: TimelineItem[];
  title: string;
}

const typeIcons = {
  work: '💼',
  education: '🎓',
  project: '🚀',
};

const typeColors = {
  work: 'bg-blue-500',
  education: 'bg-green-500',
  project: 'bg-purple-500',
};

export default function Timeline({ items, title }: TimelineProps) {
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
    <div className="space-y-6">
      <h3
        className="text-xl font-semibold"
        style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
      >
        {title}
      </h3>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ backgroundColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)' }}
        />

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start gap-6"
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${typeColors[item.type]} text-white text-sm
                `}>
                  <span role="img" aria-label={item.type}>
                    {typeIcons[item.type]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-8">
                <div
                  className="p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundColor: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
                    borderColor: isDarkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)'
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4
                      className="text-lg font-semibold"
                      style={{ color: isDarkMode ? 'white' : 'rgb(17, 24, 39)' }}
                    >
                      {item.title}
                    </h4>
                    <span
                      className="text-sm mt-1 sm:mt-0"
                      style={{ color: isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(107, 114, 128)' }}
                    >
                      {item.date}
                    </span>
                  </div>

                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(75, 85, 99)' }}
                  >
                    {item.organization}
                  </p>

                  <p
                    className="leading-relaxed"
                    style={{ color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)' }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}