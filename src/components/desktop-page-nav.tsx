'use client';

import Link from 'next/link';
import { Anton } from 'next/font/google';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, type RefObject } from 'react';

const navFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const DESKTOP_NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'ME', href: '/me' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'MORE', href: '/more' },
  { label: 'SKILLS', href: '/skills' },
  { label: 'CONTACT', href: '/contact' },
] as const;

type DesktopPageNavProps = {
  activePath: string;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  showThemeToggle?: boolean;
  styleVariant?: 'default' | 'home';
  enableScrollScrim?: boolean;
};

export function DesktopPageNav({
  activePath,
  scrollContainerRef,
  showThemeToggle = true,
  styleVariant = 'default',
  enableScrollScrim = true,
}: DesktopPageNavProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [showNavScrim, setShowNavScrim] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const isDarkTheme = resolvedTheme === 'dark';
  const useLightNavText = styleVariant === 'home' ? true : isDarkTheme;

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktopViewport(window.innerWidth >= 768);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!isDesktopViewport || !enableScrollScrim) return;

    const container = scrollContainerRef?.current;
    const onScroll = () => {
      const scrollTop = container
        ? container.scrollTop
        : window.scrollY || document.documentElement.scrollTop || 0;
      setShowNavScrim(scrollTop > 12);
    };

    onScroll();

    if (container) {
      container.addEventListener('scroll', onScroll, { passive: true });
      return () => container.removeEventListener('scroll', onScroll);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enableScrollScrim, isDesktopViewport, scrollContainerRef]);

  if (!isDesktopViewport) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-3 z-[120]">
      <div className="mx-auto w-full px-4 lg:px-8">
        <div
          className={`rounded-[14px] px-1.5 py-0.5 transition-all duration-200 ${
            showNavScrim && enableScrollScrim
              ? isDarkTheme
                ? 'border border-white/18 bg-black/45 shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur-md'
                : 'border border-black/16 bg-white/62 shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md'
              : 'border border-transparent bg-transparent shadow-none'
          }`}
        >
          <nav
            className={`${navFont.className} grid select-none ${showThemeToggle ? 'grid-cols-7' : 'grid-cols-6'} items-center text-[clamp(17px,1.05vw,24px)] uppercase tracking-[0.055em] ${
              styleVariant === 'home'
                ? 'text-[#e6e4dc]'
                : useLightNavText
                  ? 'text-[#e6e4dc]'
                  : 'text-[#131313]'
            }`}
          >
            {DESKTOP_NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`pointer-events-auto justify-self-center rounded-md px-3 py-1 no-underline transition-transform duration-200 ease-out hover:scale-125 cursor-pointer select-none ${
                  styleVariant === 'home'
                    ? item.href === activePath
                      ? 'text-white'
                      : 'text-[#e6e4dc]'
                    : item.href === activePath
                      ? useLightNavText
                        ? 'text-white'
                        : 'text-black'
                      : useLightNavText
                        ? 'text-[#e6e4dc]'
                        : 'text-[#131313]'
                } ${
                  styleVariant === 'home'
                    ? 'hover:text-white'
                    : useLightNavText
                      ? 'hover:text-white'
                      : 'hover:text-black'
                }`}
              >
                {`[ ${item.label} ]`}
              </Link>
            ))}
            {showThemeToggle && (
              <button
                type="button"
                onClick={() => setTheme(isDarkTheme ? 'light' : 'dark')}
                className="pointer-events-auto relative flex h-[32px] w-[88px] items-center justify-center justify-self-center gap-1.5 rounded-full border border-black/60 bg-[#f3f2ec]/95 px-2 shadow-[0_10px_26px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.22)] dark:border-white/35 dark:bg-[#0f1014]/90 dark:shadow-[0_12px_30px_rgba(0,0,0,0.55)] cursor-pointer select-none"
                aria-label="Toggle theme"
              >
                <Sun
                  className={`relative z-10 h-4 w-4 transition-colors ${
                    isDarkTheme ? 'text-[#ff5a00]/65' : 'text-[#ff5a00]'
                  }`}
                />
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{
                    width: '34px',
                    height: '16px',
                    background: isDarkTheme
                      ? 'rgba(255, 255, 255, 0.22)'
                      : 'rgba(0, 0, 0, 0.18)',
                  }}
                >
                  <span
                    className="absolute rounded-full transition-transform duration-300"
                    style={{
                      top: '2px',
                      width: '12px',
                      height: '12px',
                      transform: `translateX(${isDarkTheme ? '20px' : '2px'})`,
                      background: '#ffffff',
                    }}
                  />
                </div>
                <Moon
                  className={`relative z-10 h-4 w-4 transition-colors ${
                    isDarkTheme ? 'text-white' : 'text-black/55'
                  }`}
                />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
