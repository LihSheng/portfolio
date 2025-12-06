'use client';

import { motion } from 'framer-motion';
import { useMotionVariants, useMotionTransition } from '@/lib/hooks/useReducedMotion';
import { pageTransition, reducedMotionVariants, defaultTransition } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const variants = useMotionVariants(pageTransition, reducedMotionVariants.pageTransition);
  const transition = useMotionTransition(defaultTransition);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;