'use client';

import { ProfileSidebar } from '@/components/profile-sidebar';
import { ProfileCardMobile } from '@/components/profile-card-mobile';
import { Milestones } from '@/components/milestones';
import { StrategicPathway } from '@/components/strategic-pathway';
import NavigationPrompt from '@/components/navigation-prompt';
import { SiriBorderCard } from '@/components/siri-border-card';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MePage() {
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Also scroll to top after a brief delay to override any auto-focus scrolling
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 py-8 dark:from-neutral-950 dark:to-neutral-950 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl gap-8 pb-32">
        {/* Left Sidebar - Hidden on mobile, shown on larger screens */}
        <aside className="hidden w-80 shrink-0 lg:block">
          <ProfileSidebar />
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-8">
          {/* Mobile Profile Card */}
          <ProfileCardMobile />

          {/* About Me Section */}
          <SiriBorderCard>
            <section className="rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-8 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 dark:shadow-none">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">About Me</h1>
                <div className="mt-2 h-1 w-16 rounded-full bg-cyan-500" />
              </div>
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                <p className="leading-relaxed">
                  I'm a Mobile & Web Application developer with 3+ years of experience; I develop software using extraordinary abilities, strategy, and design to meet any obstacle.
                </p>
                <p className="leading-relaxed">
                  I have worked on a wide range of projects, from simple apps to complex enterprise-level solutions. I am constantly amazed by the power and flexibility of modern frameworks, and I believe that they are the future of software development.
                </p>
              </div>

              {/* Download Resume Button */}
              <div className="mt-6 flex justify-start">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-cyan-600 hover:shadow-xl active:scale-95"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              </div>
            </section>
          </SiriBorderCard>

          {/* Milestones & Achievements */}
          <Milestones />

          {/* Strategic Implementation Pathway */}
          <StrategicPathway />
        </main>
      </div>

      {/* Sticky Navigation Prompt - Fixed at bottom with blur */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-neutral-950/70 border-t border-neutral-200/50 dark:border-neutral-800/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 lg:px-8">
          <NavigationPrompt
            showQuick={showQuickQuestions}
            onToggleQuick={() => setShowQuickQuestions(prev => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
