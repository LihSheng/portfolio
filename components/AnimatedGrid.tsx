'use client';

import { motion } from 'framer-motion';

interface AnimatedGridProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export function AnimatedGrid({ children, className }: AnimatedGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "0px", amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}