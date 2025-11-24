'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

const sections = {
  'About me': {
    count: 18,
    content: (
      <div className="space-y-4">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          Full Stack Developer, AI Enthusiast, and Creative Problem Solver. I bring ideas to life through code
          and design, creating experiences that make a difference.
        </p>
        <div className="space-y-2">
          <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">I can do...</p>
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Full Stack Development</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">AI & Machine Learning Integration</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">UI/UX Design</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Web & Mobile Applications</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Creative Direction</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">System Architecture</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  'Skills': {
    count: 48,
    content: (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">React, Next.js, TypeScript</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Node.js, Python, Go</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">AI/ML (TensorFlow, OpenAI, Claude)</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Database Design (SQL, NoSQL)</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Cloud Services (AWS, Vercel, Firebase)</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Design Tools (Figma, Adobe Suite)</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Animation & Motion Design</span>
          </div>
        </div>
      </div>
    ),
  },
  'Interests': {
    count: 12,
    content: (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Artificial Intelligence & Automation</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Creative Coding & Generative Art</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Open Source Contributions</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Photography & Visual Storytelling</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Music & Sound Design</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300">Building Tools & Products</span>
          </div>
        </div>
      </div>
    ),
  },
};

export function NotesContent() {
  const [activeSection, setActiveSection] = useState<keyof typeof sections>('About me');

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#f5f4f0] dark:bg-neutral-900">
      {/* Sidebar */}
      <div className="w-28 border-r border-neutral-300 bg-[#efede7] dark:border-neutral-700 dark:bg-neutral-800">
        <div className="p-2 space-y-0">
          {Object.entries(sections).map(([key, { count }], index) => (
            <div key={key}>
              <button
                onClick={() => setActiveSection(key as keyof typeof sections)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                  activeSection === key
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-200/70 hover:shadow-sm dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                }`}
              >
                <div className="font-medium">{key}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{count}</div>
              </button>
              {index < Object.entries(sections).length - 1 && (
                <div className="my-1 mx-2 border-b border-neutral-300 dark:border-neutral-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="mb-4 border-b border-neutral-300 pb-2 dark:border-neutral-700">
            <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
              Information about: Jordan Hymas
            </h2>
          </div>
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
}
