'use client';

import { Anton } from 'next/font/google';
import Image from 'next/image';
import { Download, Mail, MapPin } from 'lucide-react';
import { useMemo, type CSSProperties } from 'react';

const menuTitleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const LINE_POSITIONS = [19, 39, 59, 79] as const;
const highlights = [
  'Dual degrees in Cybersecurity & Computer Science',
  'CCNA Certified (Cisco networking)',
  '2+ years IT Network Technician experience',
  'IT Manager supporting 3 physical sites',
  'Provide technical support for 87+ locations nationwide',
  'Hands-on experience with networking, infrastructure, servers, and endpoints',
  'Full-stack developer building modern web and mobile applications',
  'Builder of custom AI systems and automation tools',
  'Former college basketball player (strong teamwork and discipline)',
  'Entrepreneurial mindset with active personal tech projects and platforms',
] as const;

type MobileMeLayoutProps = {
  addHomeScrollGap?: boolean;
};

export function MobileMeLayout({ addHomeScrollGap = false }: MobileMeLayoutProps = {}) {
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
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#e7e7e7] pb-6 pt-20 text-black dark:bg-[#0e1013] dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        {LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-black/24 dark:bg-white/18" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="me-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
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

      <div className="relative z-10 mx-auto w-full max-w-md px-3">
        <header className="mb-3">
          <h1 className={`${menuTitleFont.className} text-[56px] leading-[0.9] tracking-tight`}>ME</h1>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-black/72 dark:text-white/76">
            Jordan Hymas
          </p>
        </header>

        <section className="rounded-[24px] border border-black/65 bg-[#f5f4f0] px-3 py-3 shadow-[0_7px_0_rgba(0,0,0,0.22)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_7px_0_rgba(0,0,0,0.48)]">
          <div className="flex items-start gap-3">
            <div className="relative h-[106px] w-[92px] shrink-0 overflow-hidden rounded-[14px] border border-black/70 dark:border-white/30">
              <Image
                src="/faceWithBackground.webp"
                alt="Jordan Hymas"
                fill
                sizes="92px"
                className="object-cover object-[center_72%]"
                priority
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className={`${menuTitleFont.className} text-[34px] leading-[0.9] tracking-tight`}>Jordan Hymas</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-black/75 dark:text-white/78">
                Full-Stack Developer + IT Engineer
              </p>

              <div className="mt-2 space-y-1.5">
                <p className="flex items-center gap-2 font-mono text-[11px] text-black/78 dark:text-white/82">
                  <Mail className="h-3.5 w-3.5" />
                  jordanhymas24@gmail.com
                </p>
                <p className="flex items-center gap-2 font-mono text-[11px] text-black/78 dark:text-white/82">
                  <MapPin className="h-3.5 w-3.5" />
                  Idaho, USA
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 font-mono text-[12px] leading-[1.45] text-black/84 dark:text-white/84">
            I build real systems from interface to infrastructure. I combine software engineering,
            cybersecurity, and hands-on IT to deliver secure, practical, production-ready solutions.
          </p>

          <a
            href="/resume.pdf"
            download
            className="mt-3 inline-flex h-[40px] items-center justify-center gap-2 rounded-[11px] border border-black/65 bg-[#ecebe7] px-4 font-mono text-[12px] uppercase tracking-[0.08em] text-black shadow-[0_4px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#efeee9]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </section>

        <section className="mt-3 rounded-[22px] border border-black/65 bg-[#f5f4f0] px-3 py-3 shadow-[0_6px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_6px_0_rgba(0,0,0,0.44)]">
          <p className={`${menuTitleFont.className} text-[34px] leading-none tracking-tight`}>About</p>
          <div className="mt-2 space-y-2 font-mono text-[12px] leading-[1.5] text-black/82 dark:text-white/84">
            <p>
              I&apos;m a full-stack developer and IT technician with experience building web apps,
              mobile apps, automation tools, and backend systems. I combine software engineering,
              cybersecurity fundamentals, and hands-on IT work to create fast, reliable, and practical
              solutions.
            </p>
          </div>
        </section>

        <section className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-2 py-3 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.4)]">
            <p className={`${menuTitleFont.className} text-[30px] leading-[0.9]`}>+3</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.11em] text-black/75 dark:text-white/74">
              Years
            </p>
          </div>
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-2 py-3 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.4)]">
            <p className={`${menuTitleFont.className} text-[30px] leading-[0.9]`}>+10</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.11em] text-black/75 dark:text-white/74">
              Projects
            </p>
          </div>
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-2 py-3 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.4)]">
            <p className={`${menuTitleFont.className} text-[30px] leading-[0.9]`}>24/7</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.11em] text-black/75 dark:text-white/74">
              Builder
            </p>
          </div>
        </section>

        <section className="mt-3 rounded-[22px] border border-black/65 bg-[#f5f4f0] px-3 py-3 shadow-[0_6px_0_rgba(0,0,0,0.2)] dark:border-white/30 dark:bg-[#17191d] dark:shadow-[0_6px_0_rgba(0,0,0,0.44)]">
          <p className={`${menuTitleFont.className} text-[34px] leading-none tracking-tight`}>
            Highlights & Accomplishments
          </p>
          <div
            className="relative mt-2 pl-1"
            style={{ '--timeline-x': '12px' } as CSSProperties}
          >
            <span
              className="pointer-events-none absolute bottom-2 top-2 w-[2px] -translate-x-1/2 bg-[#f97316]/72 dark:bg-[#fb923c]/74"
              style={{ left: 'calc(var(--timeline-x) + 4px)' }}
            />
            <ul className="m-0 list-none space-y-2.5 p-0">
              {highlights.map((item) => (
                <li key={item} className="relative pl-7">
                  <span
                    className="absolute top-[0.34rem] h-4 w-4 rounded-full border-2 border-[#f97316] bg-[#f5f4f0] dark:border-[#fb923c] dark:bg-[#17191d]"
                    style={{ left: 'calc(var(--timeline-x) - 8px)' }}
                  />
                  <span className="font-mono text-[12px] leading-[1.45] text-black/84 dark:text-white/84">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {addHomeScrollGap ? <div aria-hidden="true" className="relative z-10 h-24" /> : null}

      <style jsx>{`
        .me-fiber-burst {
          top: -10%;
          opacity: 0;
          animation-name: meFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes meFiberDown {
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
