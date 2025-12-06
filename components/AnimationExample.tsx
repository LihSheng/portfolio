'use client';

import { motion } from 'framer-motion';
import { useMotionVariants, useMotionTransition, useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { 
  fadeInUp, 
  scaleIn, 
  hoverLift, 
  staggerContainer,
  reducedMotionVariants,
  defaultTransition 
} from '@/lib/animations';

/**
 * Example component demonstrating how to use the animation system
 * with reduced motion support
 */
export function AnimationExample() {
  const prefersReducedMotion = useReducedMotion();
  
  // Use the animation variants with reduced motion fallbacks
  const containerVariants = useMotionVariants(staggerContainer, reducedMotionVariants.fadeIn);
  const itemVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
  const cardVariants = useMotionVariants(scaleIn, reducedMotionVariants.scaleIn);
  // Use transitions that respect reduced motion
  const transition = useMotionTransition(defaultTransition);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        Animation System Demo
        {prefersReducedMotion && (
          <span className="text-sm text-gray-500 ml-2">(Reduced Motion)</span>
        )}
      </h2>
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={prefersReducedMotion ? {} : { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
            transition={transition}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border"
          >
            <motion.div
              variants={cardVariants}
              className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Card {index + 1}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This card demonstrates the animation system with proper reduced motion support.
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-semibold mb-2">Animation Features:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Respects prefers-reduced-motion setting</li>
          <li>✅ Staggered container animations</li>
          <li>✅ Hover interactions (disabled in reduced motion)</li>
          <li>✅ Consistent timing and easing</li>
          <li>✅ Accessible by default</li>
        </ul>
      </div>
    </div>
  );
}

export default AnimationExample;