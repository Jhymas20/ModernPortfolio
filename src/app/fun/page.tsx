'use client';

import { NavigationPrompt, NavigationPromptHandle } from '@/components/navigation-prompt';
import { useRef, useEffect } from 'react';

export default function FunPage() {
  const navigationPromptRef = useRef<NavigationPromptHandle>(null);

  // Auto-focus navigation input on keypress
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only auto-focus if user is typing a letter/number and not already focused on an input
      if (
        e.target === document.body &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key.length === 1
      ) {
        navigationPromptRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-black">
      <div className="flex flex-col">
        {/* Main content area - empty for now */}
        <div className="flex items-center justify-center h-[70vh]">
          {/* Empty for now */}
        </div>

        {/* Navigation Section */}
        <div className="mx-auto w-full max-w-6xl px-4 py-4 md:py-6 pb-12">
          <NavigationPrompt ref={navigationPromptRef} />
        </div>
      </div>
    </div>
  );
}
