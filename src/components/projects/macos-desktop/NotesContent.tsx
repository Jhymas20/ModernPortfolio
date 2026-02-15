'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { notesSections } from './notes-content-data';

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2">
    <div className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 border-orange-500 flex items-center justify-center">
      <Check className="w-2.5 h-2.5 text-orange-500" strokeWidth={3} />
    </div>
    <span className="text-sm text-neutral-700 dark:text-neutral-300">{text}</span>
  </div>
);

const SectionHeading = ({ text }: { text: string }) => (
  <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200 mt-3 first:mt-0">{text}</p>
);

function renderSectionContent(section: (typeof notesSections)[keyof typeof notesSections]) {
  const content: React.ReactNode[] = [];

  if ('paragraphs' in section && section.paragraphs?.length) {
    content.push(
      ...section.paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-neutral-700 dark:text-neutral-300">
          {p}
        </p>
      ))
    );
  }

  if (section.subsections?.length) {
    content.push(
      <div key="subsections" className="space-y-2">
        {section.subsections.map((sub, i) => (
          <div key={i}>
            <SectionHeading text={sub.heading} />
            <div className="space-y-1.5">
              {sub.items.map((item, j) => (
                <CheckItem key={j} text={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return <div className="space-y-4">{content}</div>;
}

export function NotesContent() {
  const [activeSection, setActiveSection] = useState<keyof typeof notesSections>('About me');

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#f5f4f0] dark:bg-neutral-900">
      {/* Sidebar */}
      <div className="w-28 border-r border-neutral-300 bg-[#efede7] dark:border-neutral-700 dark:bg-neutral-800">
        <div className="p-2 space-y-0">
          {Object.entries(notesSections).map(([key, section], index) => (
            <div key={key}>
              <button
                onClick={() => setActiveSection(key as keyof typeof notesSections)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                  activeSection === key
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 shadow-sm'
                    : 'text-neutral-700 hover:bg-neutral-200/70 hover:shadow-sm dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                }`}
              >
                <div className="font-medium">{key}</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">{section.count}</div>
              </button>
              {index < Object.entries(notesSections).length - 1 && (
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
          {renderSectionContent(notesSections[activeSection])}
        </div>
      </div>
    </div>
  );
}
