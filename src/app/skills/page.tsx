import NavigationPrompt from '@/components/navigation-prompt';
import Skills from '@/components/skills';

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 py-12 dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400">
            Capabilities
          </p>
          <p className="text-neutral-600 dark:text-neutral-300">
            Tooling and experience across AI, fullstack, and beyond.
          </p>
        </div>

        <Skills />
        <NavigationPrompt />
      </div>
    </div>
  );
}
