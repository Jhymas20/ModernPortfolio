'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { MobileContactLayout } from '@/components/contact/mobile-contact-layout';

export default function ContactPage() {
  const { setTheme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousThemeRef = useRef<string | null>(null);

  useEffect(() => {
    previousThemeRef.current = window.localStorage.getItem('theme');
    setTheme('dark');

    return () => {
      const previousTheme = previousThemeRef.current;
      if (previousTheme) {
        setTheme(previousTheme);
        return;
      }
      setTheme('system');
    };
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 120);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950" />;
  }

  if (!isDesktop) {
    return <MobileContactLayout />;
  }

  return (
    <div className="relative">
      <DesktopPageNav
        activePath="/contact"
        showThemeToggle={false}
        styleVariant="home"
        enableScrollScrim={false}
      />
      <MobileContactLayout desktopMode={true} />
    </div>
  );
}
