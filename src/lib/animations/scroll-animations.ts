import { Variants } from 'framer-motion';
import { ANIMATION_TIMING } from './constants';

// Section title animation variants - clean fade with Y-slide
export const titleScrollVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_TIMING.duration.normal,
      ease: ANIMATION_TIMING.easing.easeOut,
    },
  },
};

// Minimalist card variants - simple fade with subtle Y-slide
export const minimalistCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_TIMING.duration.normal,
      delay: index * ANIMATION_TIMING.stagger.normal,
      ease: ANIMATION_TIMING.easing.easeOut,
    },
  }),
};

// Container animation variants
export const containerScrollVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_TIMING.duration.fast,
      ease: ANIMATION_TIMING.easing.easeOut,
    },
  },
};
