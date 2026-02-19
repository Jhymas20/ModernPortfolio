'use client';

import { Anton } from 'next/font/google';
import { useMemo, type CSSProperties } from 'react';

const LINE_POSITIONS = [18, 38, 58, 78] as const;
const titleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

type MobileHomeLayoutProps = {
  extendedBottom?: boolean;
};

export function MobileHomeLayout({ extendedBottom = false }: MobileHomeLayoutProps = {}) {
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
      className={`relative overflow-hidden bg-[#030303] text-[#f5f4ef] ${
        extendedBottom ? 'h-[112dvh]' : 'h-[100dvh]'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/36 to-white/10 dark:from-black/82 dark:via-black/54 dark:to-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-[56vh] bg-gradient-to-t from-[#ff5a00]/92 via-[#db0000]/72 to-transparent" />
        <div className="absolute -bottom-[24vh] left-[-24vw] h-[58vh] w-[72vw] rounded-full bg-[#ff2f00]/72 blur-[120px]" />
        <div className="absolute -bottom-[26vh] right-[-20vw] h-[62vh] w-[76vw] rounded-full bg-[#ff7b00]/84 blur-[130px]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        {LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-white/24" />
            <span className="absolute bottom-0 left-0 right-0 h-[52%] bg-gradient-to-b from-white/0 via-white/12 to-white/28" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col px-3 pb-6 pt-20">
        <h1
          className={`${titleFont.className} text-center text-[66px] leading-[0.82] tracking-tight text-white sm:text-[72px]`}
        >
          JORDAN HYMAS
        </h1>

        <div className="mt-[31vh] pb-5" style={{ fontFamily: '"Messina Sans Mono", sans-serif' }}>
          <p className="text-[50px] leading-[0.9] font-bold tracking-[-0.03em] text-white sm:text-[54px]">
            Building Secure Digital Systems
          </p>
          
          <p className="mt-3 max-w-[95%] text-[24px] leading-[1.08] font-semibold tracking-[-0.01em] text-white/92">
            From Cybersecurity, IT, to Networking and Full-stack development.
            <br />
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/86">
            <p className="text-left">©2026</p>
            <p className="text-center">Based in US</p>
            <p className="text-right">Developer</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fiber-burst {
          top: 0;
          opacity: 0;
          animation-name: fiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes fiberDown {
          0% {
            transform: translate(-50%, -8vh);
            opacity: 0;
          }
          8% {
            opacity: var(--burst-opacity);
          }
          78% {
            opacity: var(--burst-opacity);
          }
          100% {
            transform: translate(-50%, 104vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
