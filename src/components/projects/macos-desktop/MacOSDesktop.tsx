'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DesktopIcon } from './DesktopIcon';
import { MacOSWindow } from './MacOSWindow';
import { DesktopDock } from './DesktopDock';
import { INITIAL_DESKTOP_ICONS, WINDOW_Z_INDEX_START, calculateIconPositions } from './constants';
import { DesktopIconData, OpenWindow } from './types';
import { data as projectsData } from '../Data';
import NavigationPrompt from '@/components/navigation-prompt';
import { NotesContent } from './NotesContent';
import { PhotosContent } from './PhotosContent';

export function MacOSDesktop() {
  // Icons with responsive positions
  const [icons, setIcons] = useState<DesktopIconData[]>(INITIAL_DESKTOP_ICONS);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(WINDOW_Z_INDEX_START);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true); // Default to shown

  // Animation variants for Projects title
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 0.8 },
    },
  };

  // Calculate icon positions based on viewport size, handle resize, and quick questions state
  useEffect(() => {
    const updateIconPositions = () => {
      const newPositions = calculateIconPositions(window.innerWidth, window.innerHeight, showQuickQuestions);
      setIcons(newPositions);
    };

    // Set initial positions
    updateIconPositions();

    // Add resize listener
    window.addEventListener('resize', updateIconPositions);

    return () => {
      window.removeEventListener('resize', updateIconPositions);
    };
  }, [showQuickQuestions]); // Re-calculate when quick questions toggle

  const handleIconOpen = useCallback(
    (icon: DesktopIconData, position: { x: number; y: number }) => {
      // Check if window is already open
      const existingWindow = openWindows.find((w) => w.id === icon.id);

      if (existingWindow) {
        // Bring to front
        setOpenWindows((prev) =>
          prev.map((w) =>
            w.id === icon.id ? { ...w, zIndex: nextZIndex } : w
          )
        );
        setNextZIndex((prev) => prev + 1);
      } else {
        // Open new window at icon position (offset slightly so it's not exactly on top)
        setOpenWindows((prev) => [
          ...prev,
          {
            id: icon.id,
            title: icon.title,
            projectIndex: icon.projectIndex,
            zIndex: nextZIndex,
            position: { x: position.x + 50, y: position.y - 50 }, // Offset from icon
          },
        ]);
        setNextZIndex((prev) => prev + 1);
      }
    },
    [openWindows, nextZIndex]
  );

  const handleWindowClose = useCallback((windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const handleWindowFocus = useCallback(
    (windowId: string) => {
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, zIndex: nextZIndex } : w))
      );
      setNextZIndex((prev) => prev + 1);
    },
    [nextZIndex]
  );

  const handleIconPositionChange = useCallback(
    (iconId: string, x: number, y: number) => {
      setIcons((prev) =>
        prev.map((icon) =>
          icon.id === iconId ? { ...icon, position: { x, y } } : icon
        )
      );
    },
    []
  );

  const handleNotesClick = useCallback(() => {
    // Check if Notes window is already open
    const existingWindow = openWindows.find((w) => w.id === 'notes');

    if (existingWindow) {
      // Bring to front
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === 'notes' ? { ...w, zIndex: nextZIndex } : w
        )
      );
      setNextZIndex((prev) => prev + 1);
    } else {
      // Open new Notes window
      setOpenWindows((prev) => [
        ...prev,
        {
          id: 'notes',
          title: 'Notes',
          projectIndex: -1, // Special value for non-project windows
          zIndex: nextZIndex,
          position: { x: 150, y: 100 },
        },
      ]);
      setNextZIndex((prev) => prev + 1);
    }
  }, [openWindows, nextZIndex]);

  const handlePhotosClick = useCallback(() => {
    // Check if Photos window is already open
    const existingWindow = openWindows.find((w) => w.id === 'photos');

    if (existingWindow) {
      // Bring to front
      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === 'photos' ? { ...w, zIndex: nextZIndex } : w
        )
      );
      setNextZIndex((prev) => prev + 1);
    } else {
      // Open new Photos window
      setOpenWindows((prev) => [
        ...prev,
        {
          id: 'photos',
          title: 'Photos',
          projectIndex: -1, // Special value for non-project windows
          zIndex: nextZIndex,
          position: { x: 200, y: 120 },
        },
      ]);
      setNextZIndex((prev) => prev + 1);
    }
  }, [openWindows, nextZIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white dark:bg-black">
      {/* Desktop Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat dark:opacity-80"
        style={{
          backgroundImage: 'url(/sidewaysBlackWhite.webp)',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
        }}
      />

      {/* Big blurred vertical text on left wall */}
      <motion.div
        className="pointer-events-none absolute left-4 bottom-8 z-0 overflow-visible"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="bg-gradient-to-b from-neutral-400/70 via-neutral-400/60 to-neutral-400/50 bg-clip-text text-[8vw] leading-none font-black text-transparent select-none sm:text-[9vw] md:text-[10vw] lg:text-[11vw] xl:text-[12vw] 2xl:text-[13vw] dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/5"
          style={{
            writingMode: 'vertical-rl',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Projects
        </div>
      </motion.div>

      {/* Desktop Icons */}
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          onOpen={(position) => handleIconOpen(icon, position)}
          onPositionChange={handleIconPositionChange}
        />
      ))}

      {/* Open Windows */}
      <AnimatePresence>
        {openWindows.map((window) => {
          // Handle special windows (like Notes and Photos)
          if (window.id === 'notes') {
            return (
              <MacOSWindow
                key={window.id}
                title={window.title}
                onClose={() => handleWindowClose(window.id)}
                onFocus={() => handleWindowFocus(window.id)}
                zIndex={window.zIndex}
                initialPosition={window.position}
              >
                <NotesContent />
              </MacOSWindow>
            );
          }

          if (window.id === 'photos') {
            return (
              <MacOSWindow
                key={window.id}
                title={window.title}
                onClose={() => handleWindowClose(window.id)}
                onFocus={() => handleWindowFocus(window.id)}
                zIndex={window.zIndex}
                initialPosition={window.position}
              >
                <PhotosContent />
              </MacOSWindow>
            );
          }

          // Handle project windows
          const project = projectsData[window.projectIndex];
          return (
            <MacOSWindow
              key={window.id}
              title={window.title}
              onClose={() => handleWindowClose(window.id)}
              onFocus={() => handleWindowFocus(window.id)}
              zIndex={window.zIndex}
              initialPosition={window.position}
            >
              {/* Project Content - Render the content from Data.tsx */}
              {project.content}
            </MacOSWindow>
          );
        })}
      </AnimatePresence>

      {/* Dock */}
      <DesktopDock
        showQuickQuestions={showQuickQuestions}
        onNotesClick={handleNotesClick}
        onPhotosClick={handlePhotosClick}
      />

      {/* Navigation Section - Positioned below dock with proper spacing */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-4 pb-4 sm:pb-6">
        <div className="mx-auto w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <NavigationPrompt
            showQuick={showQuickQuestions}
            onToggleQuick={() => setShowQuickQuestions(prev => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
