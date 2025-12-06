// Animation timing constants - Apple minimalist style (slower, smoother)
export const ANIMATION_TIMING = {
  duration: {
    fast: 0.6,     // Increased from 0.3s
    normal: 0.8,   // Increased from 0.5s
    slow: 1.2,     // Increased from 0.8s
  },
  easing: {
    smooth: [0.19, 1, 0.22, 1] as const,
    easeOut: 'easeOut' as const,
  },
  stagger: {
    tight: 0.1,    // Increased from 0.05s
    normal: 0.15,  // Increased from 0.1s
    loose: 0.3,    // Increased from 0.2s
  },
};

// Viewport configuration for scroll animations
export const VIEWPORT_CONFIG = {
  default: {
    once: true,
    amount: 0.3 as const,
    margin: '-50px',
  },
  title: {
    once: true,
    amount: 0.5 as const,
    margin: '-50px',
  },
};
