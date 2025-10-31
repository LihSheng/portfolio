'use client';

import { motion } from 'framer-motion';
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
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
        
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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                      {item.date}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                    {item.organization}
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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