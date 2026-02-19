'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import { useEffect, useState } from 'react';
import { MacOSDesktop } from '@/components/projects/macos-desktop/MacOSDesktop';
import { MobileProjectsLayout } from '@/components/projects/mobile-projects-layout';

export default function ProjectsPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    return (
      <>
        <DesktopPageNav activePath="/projects" />
        <MacOSDesktop />
      </>
    );
  }

  // Mobile view - editorial cards layout
  return <MobileProjectsLayout />;
}
