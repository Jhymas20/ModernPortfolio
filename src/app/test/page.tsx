'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'PROJECTS', href: '/projects' },
  { label: 'SKILLS', href: '/skills' },
  { label: 'ABOUT', href: '/me' },
  { label: 'CONTACT', href: '/contact' },
];

const MOBILE_BARS = 5;
const DESKTOP_BARS = 11;

export default function TestPage() {
  const [phase, setPhase] = useState<'start' | 'expanded' | 'image' | 'shrunk'>('start');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const barCount = isMobile ? MOBILE_BARS : DESKTOP_BARS;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('expanded'), 300);
    const t2 = setTimeout(() => setPhase('image'), 1200);
    const t3 = setTimeout(() => setPhase('shrunk'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const showImage = phase === 'image' || phase === 'shrunk';
  const isExpanded = phase !== 'start';

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#F1F0EB]">
      {/* Menu button — visible after shrink */}
      {phase === 'shrunk' && !menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute right-6 top-20 z-30 text-sm font-bold tracking-wider text-black"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          MENU
        </button>
      )}

      {/* Bars animation */}
      <div
        className="mx-auto flex h-full w-full items-center justify-center px-0 md:px-8 lg:max-w-[85%]"
        style={{
          transform: phase === 'shrunk' ? 'scale(var(--shrink))' : 'scale(1)',
          transition: phase === 'shrunk' ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
        }}
      >
        {Array.from({ length: barCount }, (_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              marginLeft: i === 0 ? 0 : '4%',
              height: isExpanded ? 'min(85vh, 120vw)' : '0px',
              backgroundColor: '#000',
              borderRadius: '6px 6px 0 0',
              transition: 'height 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
              overflow: 'hidden',
            }}
          >
            {showImage && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(/ThisIsAGreatOne.png)',
                  backgroundSize: `${isMobile ? barCount * 155 : 1600}% 100%`,
                  backgroundPosition: `${(i / (barCount - 1)) * (isMobile ? 70 : 100)}% center`,
                  backgroundRepeat: 'no-repeat',
                  animation: 'fadeIn 0.5s ease-in-out',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Full-screen menu overlay — z-40 so it's below the theme toggle (z-50) */}
      <div
        className="fixed inset-0 z-40 flex flex-col bg-[#F1F0EB]"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        {/* Menu header — pushed below the theme toggle / home button area */}
        <div className="flex items-center justify-between px-6 pt-20">
          <span
            className="text-sm font-bold tracking-wider text-black"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            [ MENU ]
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col justify-start px-6 pt-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-1 text-black no-underline"
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(48px, 12vw, 80px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        div {
          --shrink: 0.9;
        }
        @media (min-width: 768px) {
          div {
            --shrink: 0.35;
          }
        }
      `}</style>
    </div>
  );
}
