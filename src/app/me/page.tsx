'use client';

import { MobileMeLayout } from '@/components/me/mobile-me-layout';
import { DesktopPageNav } from '@/components/desktop-page-nav';
import { Download, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Anton } from 'next/font/google';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

const titleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const LINE_POSITIONS = [18, 38, 58, 78] as const;

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

const executionBlueprint = [
  {
    title: 'Discovery & Technical Planning',
    description:
      "I break down goals, workflows, and requirements to build a clear development plan. This ensures the project is realistic, scalable, and designed with purpose.",
  },
  {
    title: 'Design & User Experience',
    description:
      'I create clean, modern, and intuitive layouts that feel smooth to use. My UI approach focuses on clarity, speed, and user comfort.',
  },
  {
    title: 'Build, Integrate & Ship',
    description:
      'I build fast, maintainable code using modern frameworks. This includes API integrations, backend systems, databases, automations, and performance-focused engineering.',
  },
  {
    title: 'Deploy, Optimize & Support',
    description:
      'I handle deployment, bug fixes, upgrades, and long-term improvements. The goal is to keep every project stable, secure, and continuously improving after launch.',
  },
] as const;

export default function MePage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);

  const lineBursts = useMemo(
    () =>
      LINE_POSITIONS.map((_, lineIndex) =>
        Array.from({ length: 2 }, (_, burstIndex) => ({
          id: `${lineIndex}-${burstIndex}`,
          duration: 8.5 + Math.random() * 4.2,
          delay: Math.random() * 6 + lineIndex * 0.8 + burstIndex * 3,
          opacity: 0.44 + Math.random() * 0.25,
          height: 30 + Math.random() * 36,
          blur: 0.3 + Math.random() * 1,
        }))
      ),
    []
  );

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

    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !isDesktop) return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyOverflowX = body.style.overflowX;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.overflowX = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overflowX = prevBodyOverflowX;
    };
  }, [mounted, isDesktop]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#e7e7e7] dark:bg-[#030303]" />;
  }

  if (!isDesktop) {
    return <MobileMeLayout />;
  }

  return (
    <div
      ref={desktopScrollRef}
      className="me-desktop-scroll me-no-ibeam relative h-[100dvh] overflow-x-hidden overflow-y-auto scroll-smooth bg-[#e7e7e7] pb-8 pt-20 text-black dark:bg-[#030303] dark:text-[#f5f4ef]"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-x-0 bottom-0 h-[56vh] bg-gradient-to-t from-[#ff5a00]/92 via-[#db0000]/72 to-transparent" />
        <div className="absolute -bottom-[20vh] left-[-12vw] h-[52vh] w-[44vw] rounded-full bg-[#ff2f00]/72 blur-[120px]" />
        <div className="absolute -bottom-[24vh] right-[-8vw] h-[56vh] w-[48vw] rounded-full bg-[#ff7b00]/84 blur-[130px]" />
      </div>

      <DesktopPageNav activePath="/me" scrollContainerRef={desktopScrollRef} />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        {LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-black/22 dark:bg-white/20" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="me-desktop-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
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

      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-4 lg:px-8">
        <header className="mb-4">
          <h1 className={`${titleFont.className} text-[clamp(68px,8.6vw,138px)] leading-[0.84] tracking-tight`}>ME</h1>
        </header>

        <div className="grid gap-4 xl:grid-cols-[1.04fr_1.24fr]">
          <section className="rounded-[24px] border border-black/65 bg-[#f5f4f0] px-5 py-5 shadow-[0_8px_0_rgba(0,0,0,0.22)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_8px_0_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4">
              <div className="relative h-[156px] w-[136px] shrink-0 overflow-hidden rounded-[16px] border border-black/65 dark:border-white/28">
                <Image
                  src="/faceWithBackground.webp"
                  alt="Jordan Hymas"
                  fill
                  sizes="136px"
                  className="object-cover object-[center_72%]"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className={`${titleFont.className} text-[48px] leading-[0.9] tracking-tight`}>Jordan Hymas</p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-black/74 dark:text-white/76">
                  Full-Stack Developer + IT Engineer
                </p>

                <div className="mt-3 space-y-2">
                  <p className="flex items-center gap-2 font-mono text-[12px] text-black/78 dark:text-white/80">
                    <Mail className="h-4 w-4" />
                    jordanhymas24@gmail.com
                  </p>
                  <p className="flex items-center gap-2 font-mono text-[12px] text-black/78 dark:text-white/80">
                    <MapPin className="h-4 w-4" />
                    Idaho, USA
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 font-mono text-[13px] leading-[1.5] text-black/82 dark:text-white/84">
              I build real systems from interface to infrastructure. I combine software engineering,
              cybersecurity, and hands-on IT to deliver secure, practical, production-ready solutions.
            </p>

            <div className="mt-4 rounded-[18px] border border-black/22 bg-black/6 p-3 dark:border-white/20 dark:bg-black/26">
              <p className={`${titleFont.className} text-[38px] leading-none tracking-tight`}>About</p>
              <div className="mt-2 space-y-2 font-mono text-[13px] leading-[1.55] text-black/82 dark:text-white/82">
                <p>
                  I&apos;m a full-stack developer and IT technician with experience building web apps,
                  mobile apps, automation tools, and backend systems. I combine software engineering,
                  cybersecurity fundamentals, and hands-on IT work to create fast, reliable, and practical
                  solutions.
                </p>
                <p>
                  From building local AI assistants to designing modern websites and deploying
                  infrastructure for real clients, I love turning ideas into working systems.
                </p>
              </div>
            </div>

            <a
              href="/resume.pdf"
              download
              className="mt-4 inline-flex h-[42px] items-center justify-center gap-2 rounded-[11px] border border-black/65 bg-[#ecebe7] px-5 font-mono text-[12px] uppercase tracking-[0.08em] text-black shadow-[0_4px_0_rgba(0,0,0,0.2)] transition-transform hover:scale-[1.02] active:scale-95 dark:border-white/30 dark:bg-[#efeee9] dark:shadow-[0_4px_0_rgba(0,0,0,0.34)]"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </section>

          <section className="rounded-[24px] border border-black/65 bg-[#f5f4f0] px-5 py-5 shadow-[0_8px_0_rgba(0,0,0,0.22)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_8px_0_rgba(0,0,0,0.5)]">
            <p className={`${titleFont.className} text-[48px] leading-none tracking-tight`}>
              Highlights & Accomplishments
            </p>
            <div className="relative mt-5 pl-2" style={{ '--timeline-x': '14px' } as CSSProperties}>
              <span
                className="pointer-events-none absolute bottom-2 top-2 w-[3px] -translate-x-1/2 bg-[#e35400]/72 dark:bg-[#ff5a00]/74"
                style={{ left: 'calc(var(--timeline-x) + 10px)' }}
              />
              <ul className="m-0 list-none space-y-3.5 p-0">
                {highlights.map((item) => (
                  <li key={item} className="relative pl-10">
                    <span
                      className="absolute top-[0.28rem] h-5 w-5 rounded-full border-[2.5px] border-[#e35400] bg-[#f5f4f0] dark:border-[#ff5a00]/90 dark:bg-[#17191d]"
                      style={{ left: 'calc(var(--timeline-x) - 8px)' }}
                    />
                    <span className="font-mono text-[15px] leading-[1.45] text-black/84 dark:text-white/84">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-3 py-4 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.42)]">
            <p className={`${titleFont.className} text-[42px] leading-[0.9]`}>+3</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.11em] text-black/76 dark:text-white/76">Years</p>
          </div>
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-3 py-4 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.42)]">
            <p className={`${titleFont.className} text-[42px] leading-[0.9]`}>+10</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.11em] text-black/76 dark:text-white/76">Projects</p>
          </div>
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-3 py-4 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.42)]">
            <p className={`${titleFont.className} text-[42px] leading-[0.9]`}>+15,000</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.11em] text-black/76 dark:text-white/76">Community Followers</p>
          </div>
          <div className="rounded-[16px] border border-black/65 bg-[#f5f4f0] px-3 py-4 text-center shadow-[0_5px_0_rgba(0,0,0,0.2)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_5px_0_rgba(0,0,0,0.42)]">
            <p className={`${titleFont.className} text-[42px] leading-[0.9]`}>24/7</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.11em] text-black/76 dark:text-white/76">Builder</p>
          </div>
        </section>

        <section className="mt-4 rounded-[24px] border border-black/65 bg-[#f5f4f0] px-5 py-5 shadow-[0_8px_0_rgba(0,0,0,0.22)] dark:border-white/28 dark:bg-[#17191d] dark:shadow-[0_8px_0_rgba(0,0,0,0.5)]">
          <p className={`${titleFont.className} text-[48px] leading-none tracking-tight`}>
            Execution Blueprint
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {executionBlueprint.map((item) => (
              <article
                key={item.title}
                className="rounded-[16px] border border-black/20 bg-black/6 p-3 dark:border-white/18 dark:bg-black/25"
              >
                <h3 className="font-mono text-[14px] font-semibold uppercase tracking-[0.08em] text-[#e35400] dark:text-[#ff5a00]/90">
                  {item.title}
                </h3>
                <p className="mt-2 font-mono text-[13px] leading-[1.5] text-black/82 dark:text-white/82">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .me-no-ibeam,
        .me-no-ibeam * {
          user-select: none;
          cursor: default;
        }

        .me-no-ibeam a,
        .me-no-ibeam button,
        .me-no-ibeam [role='button'] {
          cursor: pointer;
        }

        .me-desktop-fiber-burst {
          top: -10%;
          opacity: 0;
          animation-name: meDesktopFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        .me-desktop-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .me-desktop-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        @keyframes meDesktopFiberDown {
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
