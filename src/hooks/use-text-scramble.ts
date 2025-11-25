import { useState, useEffect, useRef, useMemo } from 'react';
import { CHARACTER_SETS } from '@/lib/animations';

export interface UseTextScrambleOptions {
  text: string;
  duration?: number; // Total decode duration (default: 800ms)
  scrambleSpeed?: number; // Char change speed (default: 50ms)
  characterSet?: string; // Characters to use for scrambling
  startDelay?: number; // Delay before starting (default: 0)
  trigger?: boolean; // Control when animation runs
}

export function useTextScramble({
  text,
  duration = 800,
  scrambleSpeed = 50,
  characterSet = CHARACTER_SETS.symbols,
  startDelay = 0,
  trigger = true,
}: UseTextScrambleOptions): string {
  const [displayText, setDisplayText] = useState(text);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const hasRunRef = useRef(false);

  // Memoize character array for performance
  const chars = useMemo(() => characterSet.split(''), [characterSet]);

  useEffect(() => {
    // Reset if text changes
    hasRunRef.current = false;
  }, [text]);

  useEffect(() => {
    if (!trigger || hasRunRef.current) {
      setDisplayText(text);
      return;
    }

    // Wait for start delay
    const delayTimeout = setTimeout(() => {
      hasRunRef.current = true;
      startTimeRef.current = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate how many characters should be decoded
        const decodedCount = Math.floor(progress * text.length);

        // Build the display string
        let result = '';
        for (let i = 0; i < text.length; i++) {
          if (i < decodedCount) {
            // Character is fully decoded
            result += text[i];
          } else {
            // Character is still scrambling
            // Add some randomness to make it look more chaotic
            const scrambleProgress = (elapsed % (scrambleSpeed * 2)) / scrambleSpeed;
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            result += randomChar;
          }
        }

        setDisplayText(result);

        // Continue animation if not complete
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final text is correct
          setDisplayText(text);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    }, startDelay);

    // Cleanup
    return () => {
      clearTimeout(delayTimeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, scrambleSpeed, chars, startDelay, trigger]);

  return displayText;
}
