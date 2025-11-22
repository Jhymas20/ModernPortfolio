'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  BriefcaseBusiness,
  ChevronDown,
  ChevronUp,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const pageRoutes = {
  Me: '/me',
  Projects: '/projects',
  Skills: '/skills',
  Fun: '/fun',
  Contact: '/contact',
} as const;

type RouteKey = keyof typeof pageRoutes;

const navConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const satisfies { key: RouteKey; color: string; icon: typeof Laugh }[];

interface NavigationPromptProps {
  className?: string;
}

export function NavigationPrompt({ className = '' }: NavigationPromptProps) {
  const [input, setInput] = useState('');
  const [showQuick, setShowQuick] = useState(true);
  const router = useRouter();

  const handleSectionNavigation = (key: RouteKey) => {
    router.push(pageRoutes[key]);
  };

  const handleQueryNavigation = (query: string) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

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

  return (
    <div className={`flex w-full flex-col items-center justify-center ${className}`}>
      {/* toggle quick questions */}
      <div className="mb-2 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setShowQuick((prev) => !prev)}
          className="flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-neutral-300 dark:hover:text-neutral-300"
        >
          {showQuick ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showQuick ? 'Hide quick questions' : 'Show quick questions'}
        </button>
      </div>

      {showQuick && (
        <div className="flex w-full flex-wrap justify-center gap-2 sm:gap-3">
          {navConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => handleSectionNavigation(key)}
              variant="outline"
              className="border-border hover:bg-border/30 h-14 min-w-[92px] flex-shrink-0 rounded-2xl border bg-white/30 px-4 py-3 shadow-none backdrop-blur-lg active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50"
            >
              <div className="flex items-center gap-2 text-gray-700 dark:text-neutral-200">
                <Icon size={18} strokeWidth={2} color={color} />
                <span className="text-sm font-medium">{key}</span>
              </div>
            </Button>
          ))}
          <Button
            variant="outline"
            className="border-border hover:bg-border/30 h-14 min-w-[72px] flex-shrink-0 rounded-2xl border bg-white/30 px-3 py-3 shadow-none backdrop-blur-lg active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50"
            aria-label="More"
            onClick={() => handleSectionNavigation('Me')}
          >
            <div className="flex items-center justify-center text-gray-700 dark:text-neutral-200">
              <span className="text-lg">···</span>
            </div>
          </Button>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) handleQueryNavigation(input);
        }}
        className="relative mt-4 w-full max-w-4xl"
      >
        <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Submit"
            className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default NavigationPrompt;
