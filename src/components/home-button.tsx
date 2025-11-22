'use client';

import { Home } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show on home page or chat page
  if (pathname === '/' || pathname === '/chat') {
    return null;
  }

  return (
    <motion.div
      className="fixed top-6 left-6 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30"
        aria-label="Go to home"
      >
        <Home className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
          Home
        </span>
      </button>
    </motion.div>
  );
}
