'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';
import { SiriBorderCard } from './siri-border-card';

export function StrategicPathway() {
  const pathways = [
    {
      icon: Lightbulb,
      title: 'Discovery & Technical Planning',
      description:
        "I break down goals, workflows, and requirements to build a clear development plan. This ensures the project is realistic, scalable, and designed with purpose.",
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Palette,
      title: 'Interface Design & User Experience',
      description:
        'I create clean, modern, and intuitive layouts that feel smooth to use. My UI approach focuses on clarity, speed, and user comfort. No clutter or over-engineering.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-pink-400',
    },
    {
      icon: Code,
      title: 'Development, Integration & Automation',
      description:
        'I build fast, maintainable code using modern frameworks. This includes API integrations, backend systems, databases, automations, and performance-focused engineering.',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      icon: Rocket,
      title: 'Deployment, Optimization & Ongoing Support',
      description:
        'I handle deployment, bug fixes, upgrades, and long-term improvements. My goal is to keep every project stable, secure, and continuously improving after launch.',
      gradient: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-400',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Strategic Implementation Pathway</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pathways.map((pathway, index) => (
          <SiriBorderCard key={pathway.title} borderRadius="16px" className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`h-full rounded-2xl border border-neutral-200 bg-gradient-to-br ${pathway.gradient} p-6 shadow-md backdrop-blur-sm transition-all hover:border-neutral-300 dark:border-neutral-800 dark:shadow-none dark:hover:border-neutral-700`}
            >
              <div className="flex h-full items-start gap-4">
                <div className="shrink-0 rounded-xl bg-white/80 p-3 dark:bg-neutral-900/50">
                  <pathway.icon className={`h-6 w-6 ${pathway.iconColor}`} />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-2 font-semibold text-neutral-900 dark:text-white">{pathway.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {pathway.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </SiriBorderCard>
        ))}
      </div>
    </div>
  );
}
