'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import NavigationPrompt from '@/components/navigation-prompt';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactCards } from '@/components/contact/contact-cards';
import { useIsMobile } from '@/hooks/useIsMobile';

const FluidCursor = dynamic(() => import('@/components/FluidCursor'), {
  ssr: false,
  loading: () => null,
});

export default function ContactPage() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-b from-white to-neutral-50 px-4 py-12 dark:from-neutral-900 dark:to-neutral-950 overflow-x-hidden">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col">
        {/* Hero Section with Big Background Text - Takes up top space */}
        <ContactHero />

        {/* Spacer to push content to bottom */}
        <div className="flex-1" />

        {/* Contact Cards - Email + Social - At bottom */}
        <div className="mb-6">
          <ContactCards />
        </div>

        {/* Navigation - At very bottom */}
        <NavigationPrompt
          showQuick={showQuickQuestions}
          onToggleQuick={() => setShowQuickQuestions((prev) => !prev)}
        />
      </div>

      {/* FluidCursor Effect - Desktop only */}
      {!isMobile && <FluidCursor />}
    </div>
  );
}
