'use client';

import { motion } from 'framer-motion';
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
  const dots = levelDots[skill.level];
  
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
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {skill.icon && (
            <span className="text-lg" role="img" aria-label={skill.name}>
              {skill.icon}
            </span>
          )}
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {skill.name}
          </h3>
        </div>
        <span
          className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${levelColors[skill.level]}
          `}
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
              ${
                i < dots
                  ? 'bg-gray-400 dark:bg-gray-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }
            `}
          />
        ))}
      </div>
      
      {/* Hover tooltip */}
      <div className="
        absolute -top-8 left-1/2 transform -translate-x-1/2
        bg-gray-900 dark:bg-gray-700 text-white text-xs
        px-2 py-1 rounded opacity-0 group-hover:opacity-100
        transition-opacity pointer-events-none whitespace-nowrap
        z-10
      ">
        {skill.level} level
      </div>
    </motion.div>
  );
}