'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  VIEWPORT_CONFIG,
  titleScrollVariants,
} from '@/lib/animations';
import { motion } from 'framer-motion';
import SkillIcon from './skills/SkillIcon';

// Skill interface
interface Skill {
  name: string;
  icon?: string;
  fallbackColor: string;
}

const Skills = () => {
  // Flat array of all skills matching the exact icons in public/icons/skills
  const skillsData: Skill[] = [
    // Programming Languages
    { name: 'Python', icon: '/icons/skills/python.svg', fallbackColor: '#3776AB' },
    { name: 'C', icon: '/icons/skills/c.svg', fallbackColor: '#A8B9CC' },
    { name: 'C++', icon: '/icons/skills/c++.svg', fallbackColor: '#00599C' },
    { name: 'C#', icon: '/icons/skills/cSharp.svg', fallbackColor: '#239120' },
    { name: 'Bash', icon: '/icons/skills/bash.svg', fallbackColor: '#4EAA25' },

    // Web Languages
    { name: 'HTML', icon: '/icons/skills/httml.svg', fallbackColor: '#E34F26' },
    { name: 'CSS', icon: '/icons/skills/css.svg', fallbackColor: '#1572B6' },
    { name: 'JavaScript', icon: '/icons/skills/javascript.svg', fallbackColor: '#F7DF1E' },
    { name: 'TypeScript', icon: '/icons/skills/typescript.svg', fallbackColor: '#3178C6' },
    { name: 'Tailwind', icon: '/icons/skills/tailwind.svg', fallbackColor: '#06B6D4' },

    // Operating Systems
    { name: 'macOS', icon: '/icons/skills/mac.svg', fallbackColor: '#000000' },
    { name: 'Linux', icon: '/icons/skills/linux.svg', fallbackColor: '#FCC624' },
    { name: 'Windows', icon: '/icons/skills/windows.svg', fallbackColor: '#0078D6' },
    { name: 'Kali', icon: '/icons/skills/kali.svg', fallbackColor: '#557C94' },

    // Tools & Frameworks
    { name: 'Git', icon: '/icons/skills/git.svg', fallbackColor: '#F05032' },
    { name: 'NPM', icon: '/icons/skills/npm.svg', fallbackColor: '#CB3837' },
    { name: 'React', icon: '/icons/skills/react.svg', fallbackColor: '#61DAFB' },
    { name: 'Docker', icon: '/icons/skills/docker.svg', fallbackColor: '#2496ED' },
    { name: 'Node.js', icon: '/icons/skills/nodeJS.svg', fallbackColor: '#339933' },

    // Databases
    { name: 'SQLite', icon: '/icons/skills/sqlLight.svg', fallbackColor: '#003B57' },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4">
      <Card className="w-full border-none bg-transparent shadow-none">
        {/* Launchpad Grid - Single Continuous Grid */}
        <CardContent className="px-0">
          <div className="grid grid-cols-5 gap-6 sm:gap-8 lg:gap-10 px-2">
            {skillsData.map((skill, index) => (
              <SkillIcon
                key={index}
                name={skill.name}
                icon={skill.icon}
                fallbackColor={skill.fallbackColor}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
