'use client';

import { useEffect, useState } from 'react';
import NavigationPrompt from '@/components/navigation-prompt';
import AllProjects from '@/components/projects/AllProjects';
import { MacOSDesktop } from '@/components/projects/macos-desktop/MacOSDesktop';

export default function ProjectsPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    checkScreenSize();

    // Debounced resize handler to reduce unnecessary state updates
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 150);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  // Show loading or nothing until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950" />
    );
  }

  // Desktop view - full macOS interface
  if (isDesktop) {
    return <MacOSDesktop />;
  }

  // Mobile view - carousel with header
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 pt-12 pb-24 sm:pb-12 dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto flex w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex-col gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400">
            Portfolio
          </p>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Projects
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            A collection of my projects spanning websites, mobile apps, networking, and cybersecurity.
          </p>
        </div>

        <AllProjects />
        <NavigationPrompt showQuick={showNav} onToggleQuick={() => setShowNav(!showNav)} />
      </div>
    </div>
  );
}
