'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactCards } from '@/components/contact/contact-cards';
import { MobileContactLayout } from '@/components/contact/mobile-contact-layout';
import { useWindowsViewportDensity } from '@/hooks/useWindowsViewportDensity';

const FluidCursor = dynamic(() => import('@/components/FluidCursor'), {
  ssr: false,
  loading: () => null,
});

export default function ContactPage() {
  const { setTheme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousThemeRef = useRef<string | null>(null);
  const { density, isCompact, isTight } = useWindowsViewportDensity();
  const pageHeightClass = isCompact
    ? 'h-[100dvh] min-h-[100dvh] overflow-hidden'
    : 'min-h-screen overflow-x-hidden';
  const pagePaddingClass = isTight ? 'pt-20 pb-6' : isCompact ? 'pt-20 pb-8' : 'pt-20 pb-12';
  const spacerClass = isTight ? 'flex-[0.15]' : isCompact ? 'flex-[0.35]' : 'flex-1';
  const cardsMarginClass = isTight ? 'mb-3' : isCompact ? 'mb-4' : 'mb-6';

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
    <div className={`relative flex flex-col bg-gradient-to-b from-white to-neutral-50 px-4 dark:from-neutral-900 dark:to-neutral-950 ${pageHeightClass} ${pagePaddingClass}`}>
      <DesktopPageNav activePath="/contact" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* Hero Section with Big Background Text - Takes up top space */}
        <ContactHero density={density} />

        {/* Spacer to push content to bottom */}
        <div className={spacerClass} />

        {/* Contact Cards - Email + Social - At bottom */}
        <div className={cardsMarginClass}>
          <ContactCards density={density} />
        </div>
      </div>

      <FluidCursor />
    </div>
  );
}
