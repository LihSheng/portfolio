# Animation System Documentation

## Overview

The animation system provides a comprehensive set of reusable animation variants and utilities built on top of Framer Motion, with full support for reduced motion preferences. This ensures animations are accessible and respect user preferences.

## Key Features

- ✅ **Reduced Motion Support**: Automatically respects `prefers-reduced-motion` setting
- ✅ **Reusable Variants**: Pre-built animation variants for common patterns
- ✅ **Consistent Timing**: Standardized transition durations and easing
- ✅ **Accessibility First**: Animations are disabled or simplified for users who prefer reduced motion
- ✅ **TypeScript Support**: Full type safety with Framer Motion

## Core Files

- `lib/animations.ts` - Animation variants and configurations
- `lib/hooks/useReducedMotion.ts` - Hooks for motion preference detection
- `components/PageTransition.tsx` - Page-level transition wrapper
- `components/AnimationExample.tsx` - Example usage component

## Basic Usage

### 1. Import the Required Utilities

```tsx
import { motion } from 'framer-motion';
import { useMotionVariants, useMotionTransition } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, reducedMotionVariants, defaultTransition } from '@/lib/animations';
```

### 2. Use Motion Variants with Reduced Motion Support

```tsx
function MyComponent() {
  const variants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
  const transition = useMotionTransition(defaultTransition);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={transition}
    >
      Content here
    </motion.div>
  );
}
```

### 3. Staggered Container Animations

```tsx
function StaggeredList({ items }) {
  const containerVariants = useMotionVariants(staggerContainer, reducedMotionVariants.fadeIn);
  const itemVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Available Animation Variants

### Basic Animations
- `fadeIn` - Simple opacity transition
- `fadeInUp` - Fade in with upward movement
- `fadeInDown` - Fade in with downward movement
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale and fade in
- `slideInUp` - Slide in from bottom
- `slideInDown` - Slide in from top

### Container Animations
- `staggerContainer` - Standard stagger timing
- `staggerFast` - Fast stagger timing
- `staggerSlow` - Slow stagger timing

### Interaction Animations
- `hoverScale` - Scale on hover
- `hoverLift` - Lift with shadow on hover
- `hoverGlow` - Glow effect on hover

### Page Transitions
- `pageTransition` - Standard page transition
- `slidePageTransition` - Sliding page transition

### Navigation Animations
- `mobileMenuVariants` - Mobile menu open/close
- `menuItemVariants` - Menu item stagger

### Loading Animations
- `pulseVariants` - Pulsing animation
- `spinVariants` - Spinning animation

## Transition Configurations

### Standard Transitions
- `defaultTransition` - Standard timing (0.3s ease-out)
- `fastTransition` - Quick timing (0.15s ease-out)
- `slowTransition` - Slow timing (0.6s ease-out)

### Spring Transitions
- `springTransition` - Natural spring animation
- `bounceTransition` - Bouncy spring animation

## Hooks

### useReducedMotion()

Detects if the user prefers reduced motion.

```tsx
function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div>
      {prefersReducedMotion ? (
        <span>Reduced motion enabled</span>
      ) : (
        <span>Full animations enabled</span>
      )}
    </div>
  );
}
```

### useMotionVariants(normalVariants, reducedVariants)

Returns appropriate variants based on motion preference.

```tsx
const variants = useMotionVariants(
  fadeInUp,                    // Normal animation
  reducedMotionVariants.fadeIn // Reduced motion fallback
);
```

### useMotionTransition(normalTransition, reducedTransition)

Returns appropriate transition based on motion preference.

```tsx
const transition = useMotionTransition(
  { duration: 0.5, ease: 'easeOut' }, // Normal transition
  { duration: 0.01 }                  // Reduced motion (nearly instant)
);
```

## Page Transitions

Use the `PageTransition` component to wrap page content:

```tsx
import PageTransition from '@/components/PageTransition';

export default function MyPage() {
  return (
    <PageTransition>
      <h1>Page Content</h1>
      <p>This content will animate in when the page loads.</p>
    </PageTransition>
  );
}
```

## Best Practices

### 1. Always Provide Reduced Motion Fallbacks

```tsx
// ✅ Good - Provides fallback
const variants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);

// ❌ Bad - No fallback provided
const variants = fadeInUp;
```

### 2. Use Semantic Animation Names

```tsx
// ✅ Good - Clear intent
const cardEntrance = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);

// ❌ Bad - Unclear purpose
const animation1 = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
```

### 3. Respect Animation Hierarchy

```tsx
// ✅ Good - Container controls children
<motion.div variants={containerVariants}>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

### 4. Use Appropriate Timing

```tsx
// ✅ Good - Fast for UI feedback
const buttonVariants = useMotionVariants(scaleIn, reducedMotionVariants.scaleIn);
const buttonTransition = useMotionTransition(fastTransition);

// ✅ Good - Slow for page entrances
const pageVariants = useMotionVariants(pageTransition, reducedMotionVariants.pageTransition);
const pageTransitionTiming = useMotionTransition(slowTransition);
```

## Accessibility Considerations

### Reduced Motion Support

The system automatically detects and respects the `prefers-reduced-motion` CSS media query:

- **Normal motion**: Full animations with movement, scaling, and complex transitions
- **Reduced motion**: Simple opacity transitions only, or animations disabled entirely

### Implementation Details

1. **Detection**: Uses `window.matchMedia('(prefers-reduced-motion: reduce)')`
2. **Fallbacks**: All animation variants have reduced motion alternatives
3. **Transitions**: Reduced motion uses minimal duration (0.01s) or no animation
4. **Hover Effects**: Disabled in reduced motion mode

### Testing Reduced Motion

To test reduced motion support:

1. **macOS**: System Preferences → Accessibility → Display → Reduce motion
2. **Windows**: Settings → Ease of Access → Display → Show animations
3. **Browser DevTools**: Can simulate the media query

## Migration Guide

### Updating Existing Components

1. **Import the new utilities**:
```tsx
import { useMotionVariants, useMotionTransition } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, reducedMotionVariants, defaultTransition } from '@/lib/animations';
```

2. **Replace inline variants**:
```tsx
// Before
const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// After
const variants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
```

3. **Update transitions**:
```tsx
// Before
transition={{ duration: 0.3, ease: 'easeOut' }}

// After
transition={useMotionTransition(defaultTransition)}
```

### Common Patterns

#### Card Hover Effects
```tsx
const cardVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);
const hoverEffect = prefersReducedMotion ? {} : { y: -4, scale: 1.02 };

<motion.div
  variants={cardVariants}
  whileHover={hoverEffect}
  transition={useMotionTransition(defaultTransition)}
>
```

#### Staggered Lists
```tsx
const containerVariants = useMotionVariants(staggerContainer, reducedMotionVariants.fadeIn);
const itemVariants = useMotionVariants(fadeInUp, reducedMotionVariants.fadeIn);

<motion.div variants={containerVariants} initial="initial" animate="animate">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Performance Considerations

1. **Use `will-change` sparingly**: Only apply to actively animating elements
2. **Prefer transforms**: Use `transform` properties over layout-affecting properties
3. **Optimize stagger timing**: Don't stagger too many items at once
4. **Use `AnimatePresence`**: For enter/exit animations
5. **Consider `layoutId`**: For shared element transitions

## Examples

See `components/AnimationExample.tsx` for a comprehensive demonstration of the animation system in action.