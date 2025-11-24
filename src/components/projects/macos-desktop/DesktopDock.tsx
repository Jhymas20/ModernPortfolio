'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { DOCK_ICONS } from './constants';

// App icon components
const AppIcon = ({ icon, label }: { icon: string; label: string }) => {
  // GitHub - dark theme
  if (label === 'GitHub') {
    return (
      <div className="w-full h-full bg-[#181717] rounded-xl flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white" style={{ shapeRendering: 'geometricPrecision' }}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </div>
    );
  }

  // TikTok - black background
  if (label === 'TikTok') {
    return (
      <div className="w-full h-full bg-black rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white" style={{ shapeRendering: 'geometricPrecision' }}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </div>
    );
  }

  // Apple Notes - custom image
  if (label === 'Notes') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/notesPortfolio.avif"
          alt="Notes"
          width={96}
          height={96}
          quality={100}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  // Instagram - custom image
  if (label === 'Instagram') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/instagramPortfolio.webp"
          alt="Instagram"
          width={96}
          height={96}
          quality={100}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Photos - custom image
  if (label === 'Photos') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/photoPortfolio.avif"
          alt="Photos"
          width={96}
          height={96}
          quality={100}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  // Mail - custom image
  if (label === 'Mail') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/emailPortfolio.avif"
          alt="Mail"
          width={96}
          height={96}
          quality={100}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
    );
  }

  // Default emoji fallback (includes Trash)
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl flex items-center justify-center shadow-lg text-2xl">
      {icon}
    </div>
  );
};

interface DesktopDockProps {
  showQuickQuestions?: boolean;
  onNotesClick?: () => void;
  onPhotosClick?: () => void;
}

export function DesktopDock({ showQuickQuestions = true, onNotesClick, onPhotosClick }: DesktopDockProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Adjust position based on whether quick questions are shown
  const bottomPosition = showQuickQuestions ? 'bottom-[260px]' : 'bottom-[140px]';

  return (
    <div className={`fixed ${bottomPosition} left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out`}>
      <div className="bg-white/20 dark:bg-neutral-800/80 backdrop-blur-2xl border border-white/30 dark:border-neutral-700/50 rounded-2xl px-3 py-2.5 shadow-2xl">
        <div className="flex items-end gap-2.5">
          {DOCK_ICONS.map((dockIcon, index) => (
            <div key={dockIcon.id} className="flex items-end gap-2">
              {/* Separator/Divider */}
              {dockIcon.separator && (
                <div className="h-12 w-[1px] bg-white/30 mx-1" />
              )}

              {/* Icon with tooltip */}
              <div className="relative">
                <motion.div
                  onClick={(e) => {
                    e.preventDefault();
                    if (dockIcon.id === 'notes' && onNotesClick) {
                      onNotesClick();
                    } else if (dockIcon.id === 'photos' && onPhotosClick) {
                      onPhotosClick();
                    } else if (dockIcon.href && dockIcon.href !== '#') {
                      if (dockIcon.href.startsWith('mailto:')) {
                        window.location.href = dockIcon.href;
                      } else {
                        window.open(dockIcon.href, '_blank', 'noopener,noreferrer');
                      }
                    }
                  }}
                  onHoverStart={() => setHoveredIcon(dockIcon.id)}
                  onHoverEnd={() => setHoveredIcon(null)}
                  whileHover={{ scale: 1.3, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 flex items-center justify-center cursor-pointer transition-transform"
                >
                  <AppIcon icon={dockIcon.icon} label={dockIcon.label} />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIcon === dockIcon.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    >
                      <div className="bg-gray-800/95 text-white text-xs px-2 py-1 rounded shadow-lg">
                        {dockIcon.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
