'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import Skills from '@/components/skills';
import { motion } from 'framer-motion';
import { useWindowsViewportDensity } from '@/hooks/useWindowsViewportDensity';
import { useEffect } from 'react';

export default function SkillsPage() {
  const { density, isCompact, isTight } = useWindowsViewportDensity();
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehaviorY;
    const prevBodyOverscroll = body.style.overscrollBehaviorY;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    html.style.overscrollBehaviorY = 'none';
    body.style.overscrollBehaviorY = 'none';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.overscrollBehaviorY = prevHtmlOverscroll;
      body.style.overscrollBehaviorY = prevBodyOverscroll;
    };
  }, []);

  const skillsSectionClassBase = isTight
    ? 'relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start pt-20'
    : isCompact
      ? 'relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start pt-20'
      : 'relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center';
  const skillsSectionClass = `${skillsSectionClassBase} max-sm:justify-center max-sm:pt-20 max-sm:pb-36`;

  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.8 },
    },
  };

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-gradient-to-b from-white to-neutral-50 px-4 dark:from-neutral-900 dark:to-neutral-950">
      <div className="pointer-events-none absolute inset-0 z-0 sm:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/36 to-white/10 dark:from-black/82 dark:via-black/54 dark:to-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-[56vh] bg-gradient-to-t from-[#ff5a00]/92 via-[#db0000]/72 to-transparent" />
        <div className="absolute -bottom-[24vh] left-[-24vw] h-[58vh] w-[72vw] rounded-full bg-[#ff2f00]/72 blur-[120px]" />
        <div className="absolute -bottom-[26vh] right-[-20vw] h-[62vh] w-[76vw] rounded-full bg-[#ff7b00]/84 blur-[130px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/36 to-white/10 dark:from-black/82 dark:via-black/54 dark:to-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-[56vh] bg-gradient-to-t from-[#ff5a00]/92 via-[#db0000]/72 to-transparent" />
        <div className="absolute -bottom-[20vh] left-[-12vw] h-[52vh] w-[44vw] rounded-full bg-[#ff2f00]/72 blur-[120px]" />
        <div className="absolute -bottom-[24vh] right-[-8vw] h-[56vh] w-[48vw] rounded-full bg-[#ff7b00]/84 blur-[130px]" />
      </div>

      <DesktopPageNav activePath="/skills" />

      {/* Desktop/tablet: big vertical text on left wall */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-4 top-0 z-0 hidden items-center overflow-visible sm:flex"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="select-none text-[9vw] font-black leading-none text-black md:text-[10vw] lg:text-[11vw] xl:text-[12vw] 2xl:text-[13vw] dark:text-white"
          style={{
            writingMode: 'vertical-rl',
            WebkitTextStroke: '2px #e35400',
          }}
        >
          Skills
        </div>
      </motion.div>

      {/* Skills Icons - vertically centered */}
      <div className={skillsSectionClass}>
        <Skills density={density} />
        <motion.div
          className="pointer-events-none mt-2 flex justify-center sm:hidden"
          variants={topElementVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            className="select-none uppercase text-[56px] font-black leading-[0.9] tracking-[-0.08em] text-black dark:text-white"
            style={{
              WebkitTextStroke: '1.5px #e35400',
            }}
          >
            Skills
          </div>
        </motion.div>
      </div>
    </div>
  );
}
