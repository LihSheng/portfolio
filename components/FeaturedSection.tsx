'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedSectionProps {
  title: string;
  subtitle: string;
  viewAllHref: string;
  viewAllText: string;
  children: React.ReactNode;
}

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};



export function FeaturedSection({ 
  title, 
  subtitle, 
  viewAllHref, 
  viewAllText, 
  children 
}: FeaturedSectionProps) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="stagger-container max-w-6xl mx-auto">
          {children}
        </div>

        {/* View All Link */}
        <motion.div 
          variants={headerVariants}
          className="text-center mt-12"
        >
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 group"
          >
            {viewAllText}
            <ArrowRight 
              size={16} 
              className="group-hover:translate-x-1 transition-transform duration-200" 
            />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}