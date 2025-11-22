import NavigationPrompt from '@/components/navigation-prompt';
import AllProjects from '@/components/projects/AllProjects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 px-4 py-12 dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase text-neutral-500 dark:text-neutral-400">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white sm:text-5xl">
            Projects
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Browse shipped products, hackathon wins, and experiments.
          </p>
        </div>

        <AllProjects />
        <NavigationPrompt />
      </div>
    </div>
  );
}
