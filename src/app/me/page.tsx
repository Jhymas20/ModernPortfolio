'use client';

import { ProfileSidebar } from '@/components/profile-sidebar';
import { ProfileCardMobile } from '@/components/profile-card-mobile';
import { Milestones } from '@/components/milestones';
import { StrategicPathway } from '@/components/strategic-pathway';
import Resume from '@/components/resume';
import NavigationPrompt from '@/components/navigation-prompt';
import { SiriBorderCard } from '@/components/siri-border-card';

export default function MePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 py-8 dark:from-neutral-950 dark:to-neutral-950 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl gap-8">
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
            </section>
          </SiriBorderCard>

          {/* Milestones & Achievements */}
          <Milestones />

          {/* Strategic Implementation Pathway */}
          <StrategicPathway />

          {/* Resume Section */}
          <SiriBorderCard>
            <section className="rounded-3xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-8 shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 dark:shadow-none">
              <h2 className="mb-6 text-2xl font-bold text-neutral-900 dark:text-white">Experience & Education</h2>
              <Resume />
            </section>
          </SiriBorderCard>

          {/* Navigation Prompt */}
          <NavigationPrompt />
        </main>
      </div>
    </div>
  );
}
