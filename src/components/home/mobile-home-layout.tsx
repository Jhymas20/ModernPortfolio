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

      <div className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-[49%] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-[-8%] blur-[2px]"
            style={{
              background:
                'radial-gradient(100% 92% at 68% 100%, rgba(239, 103, 8, 0.9) 0%, rgba(227, 84, 0, 0.88) 40%, rgba(168, 45, 0, 0.62) 66%, rgba(168, 45, 0, 0.2) 86%, rgba(168, 45, 0, 0) 100%)',
            }}
          />
          <div
            className="absolute inset-[-4%] blur-[30px]"
            style={{
              background:
                'radial-gradient(54% 48% at 26% 20%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.64) 44%, rgba(0, 0, 0, 0) 88%), radial-gradient(62% 52% at 78% 14%, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.62) 42%, rgba(0, 0, 0, 0) 86%)',
            }}
          />
          <div
            className="absolute inset-[-2%] blur-[22px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(227, 84, 0, 0) 0%, rgba(227, 84, 0, 0.12) 22%, rgba(227, 84, 0, 0.65) 58%, rgba(242, 136, 58, 0.56) 100%)',
            }}
          />
        </div>
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
