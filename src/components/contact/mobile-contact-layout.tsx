'use client';

import { Anton } from 'next/font/google';
import { useMemo, type CSSProperties } from 'react';

const menuTitleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const email = 'jordanhymas24@gmail.com';

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/Jhymas20' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@node.io' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jordan-hymas/' },
  { label: 'Instagram', url: 'https://www.instagram.com/jordan.hymas/' },
];

const LINE_POSITIONS = [19, 39, 59, 79] as const;

type MobileContactLayoutProps = {
  desktopMode?: boolean;
};

export function MobileContactLayout({ desktopMode = false }: MobileContactLayoutProps = {}) {
  const lineBursts = useMemo(
    () =>
      LINE_POSITIONS.map((_, lineIndex) =>
        Array.from({ length: 2 }, (_, burstIndex) => ({
          id: `${lineIndex}-${burstIndex}`,
          duration: 9 + Math.random() * 4.5,
          delay: Math.random() * 7 + lineIndex * 0.8 + burstIndex * 3.2,
          opacity: 0.34 + Math.random() * 0.26,
          height: 30 + Math.random() * 28,
          blur: 0.2 + Math.random() * 0.8,
        }))
      ),
    []
  );

  return (
    <div
      className={`relative h-[100dvh] overflow-hidden text-white dark:text-[#f6f3ec] ${
        desktopMode ? 'bg-black' : ''
      }`}
    >
      {desktopMode ? (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/52 to-black/80" />
          <div className="absolute inset-x-0 top-0 h-[62vh] bg-gradient-to-b from-[#ff5a00]/98 via-[#db0000]/80 to-transparent" />
          <div className="absolute -top-[19vh] left-[-12vw] h-[52vh] w-[44vw] rounded-full bg-[#ff2f00]/78 blur-[112px]" />
          <div className="absolute -top-[22vh] right-[-8vw] h-[56vh] w-[48vw] rounded-full bg-[#ff7b00]/90 blur-[118px]" />
          <div className="absolute -top-[18vh] left-1/2 h-[52vh] w-[54vw] -translate-x-1/2 rounded-full bg-[#ff5a00]/36 blur-[130px]" />
        </div>
      ) : (
        <>
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background:
                'radial-gradient(120% 65% at 85% 58%, rgba(255, 205, 155, 0.72) 0%, rgba(255, 205, 155, 0) 58%), linear-gradient(180deg, #9f1200 0%, #f54800 27%, #ff6a00 47%, #6d2300 76%, #000000 100%)',
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background:
                'radial-gradient(110% 62% at 82% 54%, rgba(255, 145, 75, 0.3) 0%, rgba(255, 145, 75, 0) 58%), linear-gradient(180deg, #4a0900 0%, #812100 28%, #8d2a00 46%, #230d00 72%, #000000 100%)',
            }}
          />
        </>
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${
          desktopMode ? 'top-[76px]' : 'top-0'
        }`}
      >
        {LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-white/30 dark:bg-white/22" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="contact-fiber-burst absolute left-1/2 w-[2.6px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.94)_52%,rgba(255,255,255,0)_100%)]"
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
        className={`relative z-10 mx-auto flex h-full w-full flex-col ${
          desktopMode
            ? 'max-w-[1380px] px-4 pb-[clamp(0.75rem,2vh,2rem)] pt-[clamp(8rem,18dvh,12rem)] lg:px-8'
            : 'max-w-md px-3 pb-4 pt-20'
        }`}
      >
        <header className="shrink-0 text-center">
          <h1
            className={`${menuTitleFont.className} leading-[0.85] tracking-tight text-white dark:text-[#f6f3ec] ${
              desktopMode ? '' : 'text-[76px]'
            }`}
            style={
              desktopMode
                ? {
                    fontSize: 'clamp(84px, min(12vw, 20dvh), 176px)',
                    WebkitTextStroke: '2px rgba(0, 0, 0, 0.95)',
                    textShadow:
                      '-1px 0 0 rgba(0,0,0,0.9), 1px 0 0 rgba(0,0,0,0.9), 0 -1px 0 rgba(0,0,0,0.9), 0 1px 0 rgba(0,0,0,0.9)',
                  }
                : undefined
            }
          >
            Get in Touch
          </h1>

          <div
            className={`grid ${
              desktopMode
                ? 'mt-[clamp(0.75rem,1.5vh,1.1rem)] grid-cols-6 gap-2'
                : 'mt-2.5 grid-cols-4 gap-1.5'
            }`}
          >
            {Array.from({ length: desktopMode ? 6 : 4 }).map((_, index) => (
              <p
                key={index}
                className={`text-center font-mono text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  desktopMode ? 'text-black dark:text-black' : 'text-white dark:text-white/90'
                }`}
              >
                LET&apos;S CHAT
              </p>
            ))}
          </div>
        </header>

        <div
          className={`rounded-[32px] border border-white/35 bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] ${
            desktopMode ? 'mx-auto mt-[clamp(0.75rem,1.8vh,1.4rem)] w-full max-w-[760px]' : 'mt-8'
          }`}
        >
          <a
            href={`mailto:${email}`}
            className="group flex flex-col items-center rounded-[24px] border border-black/65 bg-[#ecebe7] px-4 py-4 text-center text-black shadow-[0_7px_0_rgba(0,0,0,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-[0_11px_0_rgba(0,0,0,0.3)]"
            aria-label="Send email"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/70 transition-colors duration-200 group-hover:text-[#ff5a00]">
              PRIMARY
            </p>
            <p
              className={`${menuTitleFont.className} mt-1 text-[34px] leading-[0.88] text-black transition-colors duration-200 group-hover:text-[#ff5a00]`}
            >
              [ EMAIL ]
            </p>
            <p className="mt-1.5 break-all font-mono text-[12px] leading-tight text-black/88 transition-colors duration-200 group-hover:text-[#ff5a00]">
              {email}
            </p>
          </a>
        </div>

        <div
          className={`grid gap-2.5 ${
            desktopMode
              ? 'mx-auto mt-[clamp(0.75rem,1.6vh,1.25rem)] w-full max-w-[1040px] grid-cols-4'
              : 'mt-4 grid-cols-2'
          }`}
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-center rounded-[14px] border border-black/65 bg-[#f5f4f0] px-3 text-center text-black shadow-[0_5px_0_rgba(0,0,0,0.24)] ${
                desktopMode ? 'h-[82px]' : 'h-[74px]'
              } transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_9px_0_rgba(0,0,0,0.28)]`}
              aria-label={social.label}
            >
              <span
                className={`font-mono font-bold uppercase tracking-[0.08em] transition-colors duration-200 group-hover:text-[#ff5a00] ${desktopMode ? 'text-[17px]' : 'text-[15px]'}`}
              >
                [ {social.label} ]
              </span>
            </a>
          ))}
        </div>

        <p className={`mt-auto px-1 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/82 dark:text-white/78 ${desktopMode ? 'pt-4' : 'pt-3'}`}>
          Tap any widget to connect
        </p>
      </div>

      <style jsx>{`
        .contact-fiber-burst {
          top: 0;
          opacity: 0;
          animation-name: contactFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes contactFiberDown {
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
