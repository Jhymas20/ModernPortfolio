'use client';

import { Monitor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function MobilePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile-sized screens
    if (window.matchMedia('(max-width: 640px)').matches) {
      setVisible(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-x-4 bottom-6 z-50 sm:hidden"
        >
          <div className="relative flex flex-col items-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-900/90 px-5 py-4 shadow-lg backdrop-blur-xl dark:border-neutral-300 dark:bg-white/90">
            <Monitor className="h-5 w-5 shrink-0 text-blue-400 dark:text-[#0171E3]" />
            <p className="text-center text-sm font-medium leading-snug text-neutral-200 dark:text-neutral-700">
              For the best experience, visit this site on a desktop device.
            </p>
            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss"
              className="absolute top-3 right-3 rounded-full p-1 text-neutral-400 transition hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
