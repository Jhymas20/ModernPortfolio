'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const DESKTOP_CUSTOM_NAV_ROUTES = new Set([
  '/me',
  '/projects',
  '/skills',
  '/more',
  '/contact',
]);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const pathname = usePathname();
  const isMobileViewport = viewport.width > 0 && viewport.width < 768;
  const isHomeMobile = pathname === '/' && isMobileViewport;
  const isNavPage = pathname !== '/chat' && (pathname !== '/' || isHomeMobile);
  const isThemeLockedPage = pathname === '/contact' || (pathname === '/' && !isHomeMobile);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) {
    return null;
  }

  if (pathname === '/' && viewport.width === 0) {
    return null;
  }

  if (DESKTOP_CUSTOM_NAV_ROUTES.has(pathname) && viewport.width >= 768) {
    return null;
  }

  if (pathname === '/' && !isHomeMobile) {
    return null;
  }

  const isDark = theme === 'dark';
  const isCompactLaptopViewport =
    viewport.height > 0 &&
    (viewport.height < 860 || (viewport.width > 0 && viewport.width < 1500));
  const isTightLaptopViewport =
    viewport.height > 0 &&
    (viewport.height < 740 || (viewport.width > 0 && viewport.width < 1280));

  const toggleTheme = () => {
    if (isThemeLockedPage) return;
    setTheme(isDark ? 'light' : 'dark');
  };

  // On nav pages: frosted-glass pill style repositioned to left side
  if (isNavPage) {
    const isMobile = viewport.width > 0 && viewport.width <= 640;
    const leftPos = 154;
    const topPos = isMobile ? 16 : 24;
    const iconClass = isMobile ? 'h-4 w-4' : 'h-5 w-5';
    const trackSize = isMobile ? { width: 34, height: 18 } : { width: 48, height: 24 };
    const thumbSize = isMobile ? 14 : 20;
    const thumbTop = (trackSize.height - thumbSize) / 2;
    const thumbStart = 2;
    const thumbEnd = trackSize.width - thumbSize - 2;

    return (
      <div
        className={`fixed z-50 ${isMobile ? 'left-[calc(50%-50px)] top-4' : ''}`}
        style={isMobile ? undefined : { left: `${leftPos}px`, top: `${topPos}px` }}
      >
        <button
          onClick={toggleTheme}
          disabled={isThemeLockedPage}
          className={`relative flex h-[38px] items-center rounded-full border border-black/60 bg-[#f3f2ec]/95 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)] dark:border-white/35 dark:bg-[#0f1014]/90 dark:shadow-[0_14px_36px_rgba(0,0,0,0.55)] ${
            isMobile
              ? 'w-[100px] justify-center gap-1.5 px-2.5'
              : 'min-w-[108px] gap-3 px-4'
          } disabled:cursor-default disabled:opacity-100`}
          aria-label="Toggle theme"
          aria-disabled={isThemeLockedPage}
        >
          <Sun
            className={`${iconClass} transition-all ${
              isDark ? 'text-gray-400' : 'text-[#0b0b0b]'
            }`}
          />

          <div
            className="relative rounded-full"
            style={{
              width: `${trackSize.width}px`,
              height: `${trackSize.height}px`,
              background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.14)',
            }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                top: `${thumbTop}px`,
                width: `${thumbSize}px`,
                height: `${thumbSize}px`,
                background: isDark ? '#0f1014' : '#ffffff',
              }}
              initial={false}
              animate={{
                x: isDark ? thumbEnd : thumbStart,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>

          <Moon
            className={`${iconClass} transition-all ${
              isDark ? 'text-[#ffffff]' : 'text-gray-400'
            }`}
          />
        </button>
      </div>
    );
  }

  // Default home/chat styling: top-right position
  const edgeOffsetPx = isTightLaptopViewport
    ? 8
    : isCompactLaptopViewport
      ? 12
      : 24;
  const wrapperClass = isTightLaptopViewport
    ? 'gap-2 px-2.5 py-1.5'
    : isCompactLaptopViewport
      ? 'gap-2.5 px-3 py-1.5'
      : 'gap-3 px-4 py-2';
  const iconClass = isTightLaptopViewport
    ? 'h-4 w-4'
    : isCompactLaptopViewport
      ? 'h-[18px] w-[18px]'
      : 'h-5 w-5';
  const trackSize = isTightLaptopViewport
    ? { width: 38, height: 20 }
    : isCompactLaptopViewport
      ? { width: 44, height: 22 }
      : { width: 48, height: 24 };
  const thumbSize = isTightLaptopViewport
    ? 14
    : isCompactLaptopViewport
      ? 16
      : 20;
  const thumbTop = (trackSize.height - thumbSize) / 2;
  const thumbStart = 2;
  const thumbEnd = trackSize.width - thumbSize - 2;

  return (
    <div
      className="fixed z-50"
      style={{ top: `${edgeOffsetPx}px`, right: `${edgeOffsetPx}px` }}
    >
      <button
        onClick={toggleTheme}
        disabled={isThemeLockedPage}
        className={`relative flex items-center rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all hover:bg-white/20 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/30 ${wrapperClass} disabled:cursor-default disabled:opacity-100`}
        aria-label="Toggle theme"
        aria-disabled={isThemeLockedPage}
      >
        <Sun
          className={`${iconClass} transition-all ${
            isDark ? 'text-gray-400' : 'text-yellow-500'
          }`}
        />

        <div
          className="relative rounded-full bg-gradient-to-r from-blue-200 to-purple-200 dark:from-indigo-900 dark:to-purple-900"
          style={{
            width: `${trackSize.width}px`,
            height: `${trackSize.height}px`,
          }}
        >
          <motion.div
            className="absolute rounded-full bg-white shadow-md dark:bg-gray-800"
            style={{
              top: `${thumbTop}px`,
              width: `${thumbSize}px`,
              height: `${thumbSize}px`,
            }}
            initial={false}
            animate={{
              x: isDark ? thumbEnd : thumbStart,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </div>

        <Moon
          className={`${iconClass} transition-all ${
            isDark ? 'text-blue-400' : 'text-gray-400'
          }`}
        />
      </button>
    </div>
  );
}
