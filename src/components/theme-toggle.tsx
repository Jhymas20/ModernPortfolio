'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="relative flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30"
        aria-label="Toggle theme"
      >
        {/* Sun Icon */}
        <Sun
          className={`h-5 w-5 transition-all ${
            isDark ? 'text-gray-400' : 'text-yellow-500'
          }`}
        />

        {/* Slider Track */}
        <div className="relative h-6 w-12 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900">
          {/* Slider Thumb */}
          <motion.div
            className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md dark:bg-gray-800"
            initial={false}
            animate={{
              x: isDark ? 26 : 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </div>

        {/* Moon Icon */}
        <Moon
          className={`h-5 w-5 transition-all ${
            isDark ? 'text-blue-400' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  );
}
