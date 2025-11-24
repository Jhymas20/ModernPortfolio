'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const pageRoutes = {
  Me: '/me',
  Projects: '/projects',
  Skills: '/skills',
  Fun: '/fun',
  Contact: '/contact',
} as const;
type RouteKey = keyof typeof pageRoutes;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const satisfies { key: RouteKey; color: string; icon: typeof Laugh }[];

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSectionNavigation = (key: RouteKey) => {
    router.push(pageRoutes[key]);
  };

  const handleQueryNavigation = (query: string) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    if (normalized.includes('home')) {
      router.push('/');
      return;
    }
    if (normalized.includes('project') || normalized.includes('portfolio')) {
      router.push(pageRoutes.Projects);
      return;
    }
    if (normalized.includes('skill')) {
      router.push(pageRoutes.Skills);
      return;
    }
    if (normalized.includes('contact') || normalized.includes('email')) {
      router.push(pageRoutes.Contact);
      return;
    }
    if (normalized.includes('fun') || normalized.includes('hobby')) {
      router.push(pageRoutes.Fun);
      return;
    }
    router.push(pageRoutes.Me);
  };

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.8, delay: 0.2 },
    },
  };

  useEffect(() => {
    // Précharger les assets visuels en arrière-plan
    const img = new window.Image();
    img.src = '/landing-memojis.png';

    const linkWebm = document.createElement('link');
    linkWebm.rel = 'preload'; // Note: prefetch au lieu de preload
    linkWebm.as = 'video';
    linkWebm.href = '/final_memojis.webm';
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = '/final_memojis_ios.mp4';
    document.head.appendChild(linkMp4);
  }, []);

  // Auto-focus the input when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center overflow-visible">
      <div
          className="hidden whitespace-nowrap bg-gradient-to-b from-neutral-400/70 via-neutral-400/55 to-neutral-400/0 bg-clip-text text-[12vw] leading-none font-black text-transparent select-none -mb-4 sm:block sm:text-[14vw] sm:-mb-6 md:text-[16vw] md:-mb-8 lg:text-[18vw] lg:-mb-10 xl:text-[20vw] xl:-mb-16 2xl:text-[22vw] 2xl:-mb-20 dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/0"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Jordan Hymas
        </div>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
        variants={topElementVariants as any}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl dark:text-neutral-300">
          Hey, I'm Jordan 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
          AI Portfolio
        </h1>
      </motion.div>

      {/* centre memoji */}
      <div className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
        <Image
          src="/landing-memojis.png"
          alt="Hero memoji"
          width={2000}
          height={2000}
          priority
          className="translate-y-14 scale-[2] object-cover"
        />
      </div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants as any}
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) handleQueryNavigation(input);
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Jump to portfolio, skills, contact…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight  className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => handleSectionNavigation(key)}
              variant="outline"
              className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700 dark:text-neutral-200">
                <Icon size={22} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
      <FluidCursor />
    </div>
  );
}
