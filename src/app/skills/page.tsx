'use client';

import NavigationPrompt from '@/components/navigation-prompt';
import Skills from '@/components/skills';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SkillsPage() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.8 },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-neutral-50 px-4 pt-12 pb-8 dark:from-neutral-900 dark:to-neutral-950 overflow-x-hidden">
      {/* Big blurred vertical text on left wall */}
      <motion.div
        className="pointer-events-none absolute left-4 bottom-24 z-0 overflow-visible"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="bg-gradient-to-b from-neutral-400/70 via-neutral-400/60 to-neutral-400/50 bg-clip-text text-[12vw] leading-none font-black text-transparent select-none sm:text-[13vw] md:text-[14vw] lg:text-[15vw] xl:text-[16vw] 2xl:text-[18vw] dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/5"
          style={{
            writingMode: 'vertical-rl',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Skills
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end">
        {/* Skills Icons */}
        <div className="mb-8">
          <Skills />
        </div>

        {/* Navigation - At bottom */}
        <div className="mb-4">
          <NavigationPrompt
            showQuick={showQuickQuestions}
            onToggleQuick={() => setShowQuickQuestions(prev => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
