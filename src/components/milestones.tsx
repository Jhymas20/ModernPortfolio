'use client';

import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import { SiriBorderCard } from './siri-border-card';

export function Milestones() {
  const stats = [
    {
      value: '+3',
      label: 'YEARS OF EXPERIENCE',
    },
    {
      value: '+15',
      label: 'PROJECTS COMPLETED',
    },
    {
      value: '+7',
      label: 'WORLDWIDE CLIENTS',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Rocket className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Milestones & Achievements</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <SiriBorderCard key={stat.label} borderRadius="16px">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 text-center shadow-md dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 dark:shadow-none"
            >
              <div className="text-4xl font-bold text-neutral-900 dark:text-white">{stat.value}</div>
              <div className="mt-2 text-xs font-medium tracking-wide text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          </SiriBorderCard>
        ))}
      </div>
    </div>
  );
}
