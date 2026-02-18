'use client';

import Skills from '@/components/skills';
import { useWindowsViewportDensity } from '@/hooks/useWindowsViewportDensity';
import { Anton } from 'next/font/google';
import { useMemo, type CSSProperties } from 'react';

const LINE_POSITIONS = [19, 39, 59, 79] as const;
const sectionTitleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

type MobileSkillsLayoutProps = {
  homeScrollOnlyStyle?: boolean;
};

export function MobileSkillsLayout({ homeScrollOnlyStyle = false }: MobileSkillsLayoutProps = {}) {
  const { density } = useWindowsViewportDensity();
  const lineBursts = useMemo(
    () =>
      LINE_POSITIONS.map((_, lineIndex) =>
        Array.from({ length: 2 }, (_, burstIndex) => ({
          id: `${lineIndex}-${burstIndex}`,
          duration: 8.5 + Math.random() * 4.2,
          delay: Math.random() * 7 + lineIndex * 0.8 + burstIndex * 3.1,
          opacity: 0.44 + Math.random() * 0.3,
          height: 28 + Math.random() * 30,
          blur: 0.3 + Math.random() * 1.0,
        }))
      ),
    []
  );

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-white to-neutral-50 px-4 dark:from-neutral-900 dark:to-neutral-950 ${
        homeScrollOnlyStyle
          ? 'min-h-[138dvh] supports-[height:1lvh]:min-h-[138lvh] pb-32 pt-28'
          : 'min-h-[100dvh] pb-20 pt-20'
      }`}
    >
      {homeScrollOnlyStyle ? (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-x-0 top-0 h-[15%] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage:
                'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
            }}
          >
            {LINE_POSITIONS.map((left, index) => (
              <div key={`skills-top-${left}`} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
                <span className="absolute inset-0 bg-black/24 dark:bg-white/18" />
                {lineBursts[index].map((burst) => (
                  <span
                    key={`skills-top-burst-${burst.id}`}
                    className="skills-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
                    style={
                      {
                        height: `${burst.height}px`,
                        animationDuration: `${burst.duration}s`,
                        animationDelay: `${burst.delay}s`,
                        filter: `blur(${burst.blur}px)`,
                        '--burst-opacity': `${burst.opacity}`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            ))}
          </div>

          <div
            className="absolute inset-x-0 bottom-0 top-[48%] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 100%)',
              WebkitMaskImage:
                'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 100%)',
            }}
          >
            {LINE_POSITIONS.map((left, index) => (
              <div key={`skills-bottom-${left}`} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
                <span className="absolute inset-0 bg-black/24 dark:bg-white/18" />
                {lineBursts[index].map((burst) => (
                  <span
                    key={`skills-bottom-burst-${burst.id}`}
                    className="skills-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
                    style={
                      {
                        height: `${burst.height}px`,
                        animationDuration: `${burst.duration}s`,
                        animationDelay: `${burst.delay}s`,
                        filter: `blur(${burst.blur}px)`,
                        '--burst-opacity': `${burst.opacity}`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`pointer-events-none absolute inset-x-0 z-0 flex items-end justify-center overflow-visible ${
          homeScrollOnlyStyle ? 'bottom-80' : 'bottom-20'
        }`}
      >
        <div
          className={`select-none uppercase tracking-tight ${
            homeScrollOnlyStyle
              ? `${sectionTitleFont.className} text-[56px] leading-[0.9] text-black dark:text-white`
              : 'bg-gradient-to-b from-neutral-400/70 via-neutral-400/60 to-neutral-400/50 bg-clip-text text-[18vw] font-black leading-none text-transparent dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/5'
          }`}
          style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)' }}
        >
          Skills
        </div>
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center ${
          homeScrollOnlyStyle ? 'py-14' : 'pt-4'
        }`}
      >
        <Skills density={density} />
      </div>

      <style jsx>{`
        .skills-fiber-burst {
          top: -10%;
          opacity: 0;
          animation-name: skillsFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes skillsFiberDown {
          0% {
            top: -10%;
            opacity: 0;
          }
          8% {
            opacity: var(--burst-opacity);
          }
          78% {
            opacity: var(--burst-opacity);
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
