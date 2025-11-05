'use client';

import { motion } from 'framer-motion';
import { useMotionVariants } from '@/lib/hooks/useReducedMotion';
import { staggerContainer, fadeInUp, reducedMotionVariants } from '@/lib/animations';

interface AnimatedGridProps {
  children: React.ReactNode;
  className?: string;
}

// Export item variants for backward compatibility
export const itemVariants = fadeInUp;

export function AnimatedGrid({ children, className }: AnimatedGridProps) {
  const containerMotion = useMotionVariants(
    staggerContainer,
    reducedMotionVariants.fadeIn
  );

  return (
    <motion.div
      variants={containerMotion}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "0px", amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}