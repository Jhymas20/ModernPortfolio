'use client';

import NavigationPrompt from '@/components/navigation-prompt';
import Skills from '@/components/skills';
import { useState } from 'react';

export default function SkillsPage() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 py-12 dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Skills />
        <NavigationPrompt
          showQuick={showQuickQuestions}
          onToggleQuick={() => setShowQuickQuestions(prev => !prev)}
        />
      </div>
    </div>
  );
}
