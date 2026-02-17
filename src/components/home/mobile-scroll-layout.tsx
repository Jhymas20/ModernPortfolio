'use client';

import { useMemo, type CSSProperties } from 'react';
import MorePage from '@/app/more/page';
import { MobileContactLayout } from '@/components/contact/mobile-contact-layout';
import { MobileHomeLayout } from '@/components/home/mobile-home-layout';
import { MobileMeLayout } from '@/components/me/mobile-me-layout';
import { MobileProjectsLayout } from '@/components/projects/mobile-projects-layout';
import { MobileSkillsLayout } from '@/components/skills/mobile-skills-layout';

const GAP_LINE_POSITIONS = [19, 39, 59, 79] as const;

export function MobileScrollLayout() {
  return (
    <div className="relative">
      <section className="min-h-[100dvh]">
        <MobileHomeLayout extendedBottom />
      </section>

      <section className="relative -mt-20 min-h-[100dvh]">
        <MobileMeLayout addHomeScrollGap />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 dark:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 dark:hidden blur-[14px]"
          style={{
            background:
              'radial-gradient(120% 95% at 50% 0%, rgba(242, 136, 58, 0.5) 0%, rgba(227, 84, 0, 0.18) 52%, rgba(227, 84, 0, 0) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-24 dark:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(239, 103, 8, 0.44) 0%, rgba(227, 84, 0, 0.2) 48%, rgba(227, 84, 0, 0) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-24 dark:block blur-[14px]"
          style={{
            background:
              'radial-gradient(120% 95% at 50% 0%, rgba(242, 136, 58, 0.34) 0%, rgba(227, 84, 0, 0.15) 52%, rgba(227, 84, 0, 0) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-24 dark:block"
          style={{
            background:
              'linear-gradient(180deg, rgba(239, 103, 8, 0.34) 0%, rgba(227, 84, 0, 0.16) 48%, rgba(227, 84, 0, 0) 100%)',
          }}
        />
      </section>

      <section className="relative -mt-20 min-h-[100dvh] [mask-image:linear-gradient(to_bottom,transparent_0px,black_88px,black_100%)]">
        <MobileProjectsLayout embedded />
      </section>

      <ProjectsToMoreGap />

      <section className="relative -mt-20 min-h-[100dvh] [mask-image:linear-gradient(to_bottom,transparent_0px,black_88px,black_100%)]">
        <MorePage />
      </section>

      <section className="relative -mt-20 min-h-[100dvh] [mask-image:linear-gradient(to_bottom,transparent_0px,black_88px,black_100%)]">
        <MobileSkillsLayout homeScrollOnlyStyle />
      </section>

      <section className="relative -mt-20 min-h-[100dvh] [mask-image:linear-gradient(to_bottom,transparent_0px,black_88px,black_100%)]">
        <MobileContactLayout />
      </section>
    </div>
  );
}

function ProjectsToMoreGap() {
  const lineBursts = useMemo(
    () =>
      GAP_LINE_POSITIONS.map((_, lineIndex) =>
        Array.from({ length: 2 }, (_, burstIndex) => ({
          id: `${lineIndex}-${burstIndex}`,
          duration: 8.5 + lineIndex * 0.55 + burstIndex * 0.9,
          delay: lineIndex * 0.9 + burstIndex * 3.1,
          opacity: 0.46 + burstIndex * 0.08,
          height: 30 + lineIndex * 3 + burstIndex * 8,
          blur: 0.35 + burstIndex * 0.2,
        }))
      ),
    []
  );

  return (
    <div aria-hidden="true" className="relative h-32 overflow-hidden bg-[#e7e7e7] dark:bg-[#151515]">
      <div className="pointer-events-none absolute inset-0">
        {GAP_LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-black/24 dark:bg-white/18" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="projects-gap-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
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

      <style jsx>{`
        .projects-gap-fiber-burst {
          top: -10%;
          opacity: 0;
          animation-name: projectsGapFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes projectsGapFiberDown {
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
