'use client';

import { startTransition, useEffect, useMemo, useRef, useState } from 'react';
import { Anton } from 'next/font/google';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { data } from '@/components/projects/Data';

type ProjectCard = {
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
};

const menuTitleFont = Anton({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const SUMMARY_BY_SRC: Record<string, string> = {
  '/Projects/LiquidPortfolio/projects.webp':
    'Liquid Portfolio is my Mark One personal portfolio with motion-driven UI, AI chat integration, and responsive sections for my work and background.',
  '/Projects/Cybercodex.io/courses.webp':
    'A cybersecurity learning platform with structured courses, practical labs, and an interactive experience built for real skill progression.',
  '/Projects/OldPortfolio/home.webp':
    'My first portfolio built with HTML, CSS, and JavaScript. It marks the start of my development journey and growth in interface design.',
  '/Projects/HomeLab/Main.webp':
    'A full home-lab infrastructure with virtualization, networking, Linux servers, and AI experiments designed like a small enterprise environment.',
  '/projects/BGCLCV/teenCenterPc.webp':
    'Enterprise-grade server room and esports network deployment with UniFi, firewall segmentation, structured cabling, and centralized management.',
  '/Projects/Ubiquiti/unifi_main.webp':
    'A collection of real-world UniFi networks I designed and deployed with performance, segmentation, security, and scalability across multiple environments.',
  '/Projects/ModernPortfolio/home_page.webp':
    'My current portfolio website with modern UI, responsive layouts, smooth motion, and a polished production-ready frontend architecture.',
  '/Projects/Snake/snake.webp':
    'A nostalgic C++ Snake project from my early programming years that reflects where my systems and game development path began.',
  '/Projects/Proxmox/mainProxmox.webp':
    'A multi-node Proxmox cluster with shared storage, remote access, and controlled VM environments for infrastructure and security testing.',
};

const TITLE_BY_SRC: Record<string, string> = {
  '/Projects/LiquidPortfolio/projects.webp': 'Liquid Portfolio',
  '/Projects/ModernPortfolio/home_page.webp': 'Modern Portfolio',
};

const MOBILE_PROJECT_ORDER = [
  '/projects/BGCLCV/teenCenterPc.webp', // Server Room (NPCE)
  '/Projects/LiquidPortfolio/projects.webp', // Liquid Portfolio
  '/Projects/Cybercodex.io/courses.webp', // cybercodex.io
  '/Projects/ModernPortfolio/home_page.webp', // Modern Portfolio
  '/Projects/HomeLab/Main.webp', // homelab
  '/Projects/Ubiquiti/unifi_main.webp', // ubiquiti unifi
  '/Projects/OldPortfolio/home.webp', // first portfolio
  '/Projects/Proxmox/mainProxmox.webp', // proxmox
  '/Projects/Snake/snake.webp', // retro snake
] as const;

type MobileProjectsLayoutProps = {
  embedded?: boolean;
};

export function MobileProjectsLayout({ embedded = false }: MobileProjectsLayoutProps = {}) {
  const projects = useMemo(() => {
    const source = data as ProjectCard[];
    const bySrc = new Map(source.map((project) => [project.src, project]));
    const prioritized = MOBILE_PROJECT_ORDER
      .map((src) => bySrc.get(src))
      .filter((project): project is ProjectCard => Boolean(project));

    const prioritizedSrc = new Set<string>(MOBILE_PROJECT_ORDER);
    const remaining = source.filter((project) => !prioritizedSrc.has(project.src));

    return [...prioritized, ...remaining];
  }, []);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const detailContentTimerRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [detailContentReady, setDetailContentReady] = useState(false);
  const openProject = openProjectIndex !== null ? projects[openProjectIndex] : null;

  useEffect(() => {
    if (embedded) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehaviorY;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehaviorY;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';
    document.documentElement.style.overscrollBehaviorY = 'none';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehaviorY = previousBodyOverscroll;
      document.documentElement.style.overscrollBehaviorY = previousHtmlOverscroll;
    };
  }, [embedded]);

  useEffect(() => {
    if (!embedded || openProjectIndex === null) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehaviorY;
    const previousHtmlOverscroll = document.documentElement.style.overscrollBehaviorY;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';
    document.documentElement.style.overscrollBehaviorY = 'none';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehaviorY = previousBodyOverscroll;
      document.documentElement.style.overscrollBehaviorY = previousHtmlOverscroll;
    };
  }, [embedded, openProjectIndex]);

  useEffect(() => {
    if (detailContentTimerRef.current !== null) {
      window.clearTimeout(detailContentTimerRef.current);
      detailContentTimerRef.current = null;
    }

    if (openProjectIndex === null) {
      setDetailContentReady(false);
      return;
    }

    setDetailContentReady(false);
    detailContentTimerRef.current = window.setTimeout(() => {
      setDetailContentReady(true);
      detailContentTimerRef.current = null;
    }, 120);

    return () => {
      if (detailContentTimerRef.current !== null) {
        window.clearTimeout(detailContentTimerRef.current);
        detailContentTimerRef.current = null;
      }
    };
  }, [openProjectIndex]);

  const handleOpenProject = (index: number) => {
    startTransition(() => {
      setOpenProjectIndex(index);
    });
  };

  const getCardStep = () => {
    const container = trackRef.current;
    if (!container) return 1;
    return container.clientWidth * 0.86 + 1;
  };

  const scrollToIndex = (index: number) => {
    const container = trackRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    const step = getCardStep();
    container.scrollTo({ left: step * clamped, behavior: 'smooth' });
    setCurrentIndex(clamped);
  };

  const onTrackScroll = () => {
    const container = trackRef.current;
    if (!container) return;
    const step = getCardStep();
    const next = Math.round(container.scrollLeft / step);
    const clamped = Math.max(0, Math.min(next, projects.length - 1));
    if (clamped !== currentIndex) {
      setCurrentIndex(clamped);
    }
  };

  return (
    <div className="h-[100dvh] overflow-hidden overscroll-y-none bg-[#e7e7e7] pt-20 pb-3 text-black dark:bg-[#151515] dark:text-white">
      <div className="mx-auto flex h-full w-full max-w-md flex-col px-0">
        <div className="px-4">
          <h1 className={`${menuTitleFont.className} text-[52px] leading-[0.9] tracking-tight`}>
            PROJECTS
          </h1>
        </div>

        <div className="mt-1.5 border-t border-black/65 dark:border-white/30" />

        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, index) => {
            const code = `${String(index + 1).padStart(2, '0')}.${String(new Date().getFullYear()).slice(-2)}`;
            const displayTitle = TITLE_BY_SRC[project.src] ?? project.title;
            const summary = SUMMARY_BY_SRC[project.src] ?? 'Tap to read the full project details, stack, links, and implementation breakdown.';

            return (
              <article
                key={`${project.src}-${index}`}
                className="flex h-full w-[86%] shrink-0 snap-start flex-col border-x border-b border-black/65 px-3.5 pb-2 pt-2.5 dark:border-white/30"
              >
                <p className={`${menuTitleFont.className} text-[62px] leading-[0.8] tracking-tight`}>
                  {code}
                </p>

                <h2 className="mt-2 max-w-[94%] text-[31px] leading-[0.94] tracking-[-0.02em]">
                  {displayTitle}
                </h2>

                <p className="mt-2 max-w-[95%] text-[17px] leading-[1.02] text-black/88 dark:text-white/82">
                  {project.category}
                </p>

                <p className="mt-2.5 line-clamp-4 max-w-[96%] font-mono text-[14px] leading-[1.28] text-black/82 dark:text-white/78">
                  {summary}
                </p>

                <button
                  type="button"
                  onClick={() => handleOpenProject(index)}
                  className="mt-auto flex w-full items-end justify-between pb-2 pt-4 text-left"
                  aria-label={`Read ${displayTitle}`}
                >
                  <div className="relative h-[128px] w-[104px] overflow-hidden rounded-[8px]">
                    <Image
                      src={project.src}
                      alt={displayTitle}
                      fill
                      sizes="104px"
                      className="object-cover"
                    />
                  </div>
                  <span className="pb-1 font-mono text-[20px] uppercase tracking-[0.08em] text-black/88 dark:text-white/86">
                    [ Read ]
                  </span>
                </button>
              </article>
            );
          })}
        </div>

        <div className="grid grid-cols-2 border-y border-black/65 dark:border-white/30">
          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex <= 0}
            className="flex h-[72px] items-center justify-center border-r border-black/65 text-black transition-opacity disabled:opacity-40 dark:border-white/30 dark:text-white"
            aria-label="Previous project"
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex >= projects.length - 1}
            className="flex h-[72px] items-center justify-center text-black transition-opacity disabled:opacity-40 dark:text-white"
            aria-label="Next project"
          >
            <ArrowRight className="h-7 w-7" />
          </button>
        </div>

        <div
          className={`${menuTitleFont.className} flex h-[76px] w-full items-center justify-center border-b border-black/65 text-[44px] leading-none tracking-tight text-black dark:border-white/30 dark:text-white`}
        >
          View all projects
        </div>
      </div>

      <AnimatePresence>
        {openProject !== null && (
          <motion.div
            className="fixed inset-0 z-[85] bg-black/55 backdrop-blur-[2px] will-change-[opacity]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!embedded) {
                setOpenProjectIndex(null);
              }
            }}
          >
            <motion.div
              className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-t-[24px] border border-black/70 bg-[#f5f4f0] text-black transform-gpu will-change-transform dark:border-white/25 dark:bg-[#121214] dark:text-white ${
                embedded ? 'top-[9dvh]' : 'top-[7dvh]'
              }`}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-black/60 px-4 py-3 dark:border-white/20">
                <p className={`${menuTitleFont.className} text-[34px] leading-none tracking-tight`}>
                  {openProject.title}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenProjectIndex(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black"
                  aria-label="Close project details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="h-[calc(93dvh-69px)] overflow-y-auto overscroll-y-contain">
                {detailContentReady ? openProject.content : <div className="h-full w-full" />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
