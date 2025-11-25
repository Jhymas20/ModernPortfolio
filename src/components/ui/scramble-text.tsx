'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTextScramble, UseTextScrambleOptions } from '@/hooks/use-text-scramble';

interface ScrambleTextProps {
  children: string;
  className?: string;
  trigger?: 'mount' | 'scroll' | 'hover';
  scrambleOptions?: Partial<Omit<UseTextScrambleOptions, 'text' | 'trigger'>>;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
}

export function ScrambleText({
  children,
  className = '',
  trigger = 'scroll',
  scrambleOptions = {},
  as: Component = 'span',
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Determine if animation should trigger
  const shouldTrigger =
    trigger === 'mount' ? true : trigger === 'scroll' ? isInView : false;

  // Use the text scramble hook
  const displayText = useTextScramble({
    text: children,
    trigger: shouldTrigger,
    ...scrambleOptions,
  });

  return (
    <Component
      ref={ref as any}
      className={className}
      aria-label={children} // Ensure screen readers get the correct text
    >
      {displayText}
    </Component>
  );
}
