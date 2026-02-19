'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Anton, Oswald } from 'next/font/google';
import { Github, Instagram, Linkedin } from 'lucide-react';

const NAV_LINKS = [
  { label: 'ME', href: '/me' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'MORE', href: '/more' },
  { label: 'SKILLS', href: '/skills' },
  { label: 'CONTACT', href: '/contact' },
];

const socialLinks = [
  { href: 'https://github.com/Jhymas20', icon: Github, label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/jordan-hymas/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/jordan.hymas/',
    icon: Instagram,
    label: 'Instagram',
  },
];

const menuFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const chromeFont = Oswald({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
});

const DESKTOP_CUSTOM_NAV_ROUTES = new Set([
  '/me',
  '/projects',
  '/skills',
  '/more',
  '/contact',
]);

export function SiteNav() {
  const pathname = usePathname();
  const forceLightMenuPanel = pathname === '/';
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [hoverBounds, setHoverBounds] = useState({ top: 0, height: 0 });
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const openHighlightIndexRef = useRef(0);
  const menuTitleId = 'site-menu-title';

  useEffect(() => {
    const update = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const hidden =
    pathname === '/chat' ||
    (pathname === '/' && !isMobileViewport) ||
    (DESKTOP_CUSTOM_NAV_ROUTES.has(pathname) && !isMobileViewport);

  const updateHoverBounds = useCallback((index: number) => {
    const container = navContainerRef.current;
    const link = linkRefs.current[index];
    if (!container || !link) return;
    setHoverBounds({
      top: link.offsetTop,
      height: link.offsetHeight,
    });
  }, []);

  useEffect(() => {
    if (hidden || !menuOpen) return;
    const timer = window.setTimeout(() => {
      updateHoverBounds(hoveredIndex);
    }, 20);
    return () => window.clearTimeout(timer);
  }, [hidden, menuOpen, hoveredIndex, updateHoverBounds]);

  useEffect(() => {
    if (hidden || !menuOpen) return;
    const onResize = () => updateHoverBounds(hoveredIndex);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [hidden, menuOpen, hoveredIndex, updateHoverBounds]);

  useEffect(() => {
    if (hidden || !menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex =
          (hoveredIndex + direction + NAV_LINKS.length) % NAV_LINKS.length;
        setHoveredIndex(nextIndex);
        updateHoverBounds(nextIndex);
        linkRefs.current[nextIndex]?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hidden, menuOpen, hoveredIndex, updateHoverBounds]);

  useEffect(() => {
    if (hidden || !menuOpen) return;

    const timer = window.setTimeout(() => {
      const openIndex = openHighlightIndexRef.current;
      linkRefs.current[openIndex]?.focus();
      updateHoverBounds(openIndex);
    }, 40);

    return () => window.clearTimeout(timer);
  }, [hidden, menuOpen, updateHoverBounds]);

  useEffect(() => {
    if (hidden) return;
    const originalOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [hidden, menuOpen]);

  if (hidden) return null;

  return (
    <>
      {!menuOpen && (
        <button
          aria-label="Open menu"
          aria-controls="site-menu-panel"
          aria-expanded={menuOpen}
          type="button"
          onClick={() => {
            const currentPageIndex = NAV_LINKS.findIndex((link) => link.href === pathname);
            const isHomePage = pathname === '/';
            const projectsIndex = NAV_LINKS.findIndex((link) => link.href === '/projects');
            const openIndex =
              currentPageIndex >= 0 ? currentPageIndex : isHomePage ? projectsIndex : 0;
            openHighlightIndexRef.current = openIndex;
            setHoveredIndex(openIndex);
            if (openIndex < 0) {
              setHoverBounds({ top: 0, height: 0 });
            }
            setMenuOpen(true);
          }}
          className={`${chromeFont.className} fixed right-6 top-6 z-30 inline-flex h-[38px] min-w-[108px] items-center justify-center rounded-full border border-black/60 bg-[#f3f2ec]/95 px-4 text-sm font-bold uppercase leading-none tracking-[0.08em] text-black shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)] dark:border-white/35 dark:bg-[#0f1014]/90 dark:text-white dark:shadow-[0_14px_36px_rgba(0,0,0,0.55)] max-sm:left-[calc(50%+56px)] max-sm:right-auto max-sm:top-4 max-sm:min-w-0 max-sm:w-[100px] max-sm:px-3`}
        >
          [ MENU ]
        </button>
      )}

      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[65] cursor-default bg-transparent"
        />
      )}

      <div
        id="site-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuTitleId}
        aria-hidden={!menuOpen}
        className={`${chromeFont.className} fixed bottom-2 right-2 top-2 z-[70] flex w-[clamp(330px,40vw,640px)] max-w-[96vw] flex-col overflow-hidden rounded-[26px] border border-black/70 bg-[#f3f2ec] text-black shadow-2xl ${forceLightMenuPanel ? '' : 'dark:border-white/25 dark:bg-[#111214] dark:text-white'} md:bottom-3 md:right-3 md:top-3 lg:w-[clamp(360px,39vw,680px)] max-md:inset-0 max-md:h-[100dvh] max-md:w-screen max-md:max-w-none max-md:rounded-none max-md:border-0`}
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(calc(100% + 18px))',
          opacity: menuOpen ? 1 : 0.96,
          transition: `transform 0.34s ease-out, opacity 0.25s ease-out, visibility 0s linear ${
            menuOpen ? '0s' : '0.34s'
          }`,
          visibility: menuOpen ? 'visible' : 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 py-3 sm:px-6 sm:py-4 lg:px-7">
          <span
            id={menuTitleId}
            className="text-[clamp(24px,3.1vh,40px)] font-bold leading-none tracking-tight"
          >
            [ MENU ]
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg sm:h-11 sm:w-11 ${forceLightMenuPanel ? 'bg-black text-white' : 'bg-black text-white dark:bg-white dark:text-black'}`}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav ref={navContainerRef} className="relative flex flex-1 flex-col justify-start px-0 pb-2">
          <div
            className={`pointer-events-none absolute left-0 right-0 bg-black transition-[top,height] duration-300 ease-out ${forceLightMenuPanel ? '' : 'dark:bg-white'}`}
            style={{
              top: `${hoverBounds.top}px`,
              height: `${hoverBounds.height}px`,
            }}
          />
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              ref={(el) => {
                linkRefs.current[index] = el;
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
                updateHoverBounds(index);
              }}
              onFocus={() => {
                setHoveredIndex(index);
                updateHoverBounds(index);
              }}
              className={`${menuFont.className} relative z-10 mt-[clamp(4px,0.7vh,12px)] block px-5 py-1.5 text-[clamp(52px,7.1vh,102px)] leading-[0.88] tracking-[0.01em] no-underline transition-colors duration-150 first:mt-0 sm:px-6 lg:px-7 ${
                hoveredIndex === index
                  ? forceLightMenuPanel
                    ? 'text-[#f3f2ec]'
                    : 'text-[#f3f2ec] dark:text-black'
                  : forceLightMenuPanel
                    ? 'text-black'
                    : 'text-black dark:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-7">
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label={social.label}
                  className={`flex h-[clamp(44px,6.8vh,64px)] w-[clamp(44px,6.8vh,64px)] items-center justify-center rounded-full bg-black text-white transition-colors duration-200 hover:bg-white hover:text-black ${forceLightMenuPanel ? '' : 'dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white'}`}
                >
                  <Icon className="h-[clamp(22px,3.5vh,32px)] w-[clamp(22px,3.5vh,32px)]" />
                </a>
              );
            })}
          </div>
          <p className={`mt-4 text-[clamp(10px,1.5vh,14px)] font-medium uppercase tracking-wide sm:mt-5 ${forceLightMenuPanel ? 'text-black/80' : 'text-black/80 dark:text-white/75'}`}>
            Copyright &copy; 2026 Jordan Hymas | All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
