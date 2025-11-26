'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  VIEWPORT_CONFIG,
  titleScrollVariants,
  minimalistCardVariants,
} from '@/lib/animations';
import { motion } from 'framer-motion';
import { Code, Cpu, PenTool, Users } from 'lucide-react';

const Skills = () => {
  const skillsData = [
    {
      category: 'JavaScript Frameworks',
      icon: Code,
      skills: [
        'React',
        'Next.js 15.2.3',
        'TypeScript',
        'Vercel AI SDK',
      ],
      iconColor: '#329696', // Cyan
    },
    {
      category: 'UI Frameworks & Styling',
      icon: PenTool,
      skills: [
        'Tailwind CSS',
        'Radix UI',
        'Framer Motion',
        'Lucide Icons',
      ],
      iconColor: '#856ED9', // Purple
    },
    {
      category: 'Backend & Tools',
      icon: Cpu,
      skills: [
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Git',
        'Docker',
        'Webpack',
      ],
      iconColor: '#3E9858', // Emerald
    },
    {
      category: 'AI & Machine Learning',
      icon: Cpu,
      skills: [
        'OpenAI (ChatGPT, Whisper)',
        'Claude',
        'Groq',
        'AI Agents',
        'RAG (Retrieval-Augmented Generation)',
        'Vector Databases',
        'Prompt Engineering',
      ],
      iconColor: '#C19433', // Gold
    },
    {
      category: 'Design & Creative',
      icon: PenTool,
      skills: ['Figma', 'Illustrator', 'DaVinci Resolve', 'Three.js'],
      iconColor: '#B95F9D', // Pink
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <Card className="w-full border-none bg-transparent shadow-none">
        {/* Header Section */}
        <CardHeader className="px-0 pb-8">
          <motion.div
            whileInView="visible"
            initial="hidden"
            viewport={VIEWPORT_CONFIG.title}
            variants={titleScrollVariants}
          >
            <h2 className="text-primary text-4xl font-bold">
              Skills & Expertise
            </h2>
          </motion.div>
        </CardHeader>

        {/* Skills Categories */}
        <CardContent className="space-y-6 px-0">
          {skillsData.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                whileInView="visible"
                initial="hidden"
                viewport={VIEWPORT_CONFIG.default}
                variants={minimalistCardVariants}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-shadow dark:border-neutral-800 dark:bg-neutral-900"
              >
                {/* Category Header */}
                <div className="mb-4 flex items-center gap-3">
                  <motion.div
                    whileHover={{
                      rotate: 5,
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: section.iconColor }}
                    />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {section.category}
                  </h3>
                </div>

                {/* Skills List with Bullets */}
                <div className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {section.skills.map((skill, idx) => (
                    <span key={idx}>
                      {skill}
                      {idx < section.skills.length - 1 && (
                        <span className="px-2 text-neutral-400 dark:text-neutral-600">
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
