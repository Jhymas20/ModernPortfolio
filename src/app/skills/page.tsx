'use client';

import { DesktopPageNav } from '@/components/desktop-page-nav';
import Skills from '@/components/skills';
import { motion } from 'framer-motion';
import { useWindowsViewportDensity } from '@/hooks/useWindowsViewportDensity';

export default function SkillsPage() {
  const { density, isCompact, isTight } = useWindowsViewportDensity();
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
    <div className="relative flex h-screen flex-col bg-gradient-to-b from-white to-neutral-50 px-4 dark:from-neutral-900 dark:to-neutral-950 overflow-hidden">
      <DesktopPageNav activePath="/skills" />

      {/* Mobile: big text at bottom */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-20 z-0 flex items-end justify-center overflow-visible sm:hidden"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="select-none bg-gradient-to-b from-neutral-400/70 via-neutral-400/60 to-neutral-400/50 bg-clip-text text-[18vw] font-black leading-none text-transparent dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/5"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Skills
        </div>
      </motion.div>

      {/* Desktop/tablet: big vertical text on left wall */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-4 top-0 z-0 hidden items-center overflow-visible sm:flex"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="select-none bg-gradient-to-b from-neutral-400/70 via-neutral-400/60 to-neutral-400/50 bg-clip-text text-[9vw] font-black leading-none text-transparent md:text-[10vw] lg:text-[11vw] xl:text-[12vw] 2xl:text-[13vw] dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/5"
          style={{
            writingMode: 'vertical-rl',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Skills
        </div>
      </motion.div>

      {/* Skills Icons - vertically centered */}
      <div className={skillsSectionClass}>
        <Skills density={density} />
      </div>
    </div>
  );
}
