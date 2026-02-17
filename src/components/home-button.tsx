'use client';

import { Home } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { chromeFont } from '@/components/site-nav';
import { useEffect, useState } from 'react';

export function HomeButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Keep hidden on desktop home and chat page; show on mobile home
  if (pathname === '/chat' || (pathname === '/' && !isMobileViewport)) {
    return null;
  }

  return (
    <motion.div
      className="fixed left-6 top-6 z-50 max-sm:left-[calc(50%-156px)] max-sm:top-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
    >
      <button
        onClick={() => {
          if (pathname === '/' && isMobileViewport) {
            window.history.replaceState(null, '', '/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          router.push('/');
        }}
        className={`${chromeFont.className} flex h-[38px] min-w-[108px] items-center gap-2 rounded-full border border-black/60 bg-[#f3f2ec]/95 px-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)] dark:border-white/35 dark:bg-[#0f1014]/90 dark:shadow-[0_14px_36px_rgba(0,0,0,0.55)] max-sm:min-w-0 max-sm:w-[100px] max-sm:justify-center max-sm:px-3`}
        aria-label="Go to home"
      >
        <Home className="h-[17px] w-[17px] text-[#0b0b0b] dark:text-white max-sm:hidden" />
        <span className="text-sm font-bold uppercase leading-none tracking-[0.08em] text-[#0b0b0b] dark:text-white">
          [ HOME ]
        </span>
      </button>
    </motion.div>
  );
}
