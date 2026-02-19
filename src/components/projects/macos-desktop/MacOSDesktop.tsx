'use client';

import { useState, useCallback, useEffect, useMemo, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { DesktopIcon } from './DesktopIcon';
import { MacOSWindow } from './MacOSWindow';
import { DesktopDock } from './DesktopDock';
import {
  INITIAL_DESKTOP_ICONS,
  WINDOW_Z_INDEX_START,
  calculateIconPositions,
} from './constants';
import { DesktopIconData, OpenWindow } from './types';
import { data as projectsData } from '../Data';
import { NotesContent } from './NotesContent';
import { PhotosContent } from './PhotosContent';
import { useTrashInteraction } from './useTrashInteraction';
import { TrashConfirmModal } from './TrashConfirmModal';
import { TrashErrorScreen } from './TrashErrorScreen';

const PROJECT_LINE_POSITIONS = [20, 40, 60, 80] as const;
const WINDOW_BASE_WIDTH = 900;
const WINDOW_BASE_HEIGHT = 700;
const WINDOW_STAGGER_OFFSETS = [
  { x: 0, y: 0 },
  { x: 28, y: 24 },
  { x: -28, y: 24 },
  { x: 28, y: -24 },
  { x: -28, y: -24 },
  { x: 52, y: 0 },
  { x: -52, y: 0 },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function MacOSDesktop() {
  // Icons with responsive positions
  const [icons, setIcons] = useState<DesktopIconData[]>(INITIAL_DESKTOP_ICONS);
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  const [isWindowsDevice, setIsWindowsDevice] = useState(false);
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(WINDOW_Z_INDEX_START);
  const isCompactDesktop =
    isWindowsDevice &&
    (viewport.height <= 840 ||
      (viewport.height <= 900 && viewport.width <= 1440));
  const isTightDesktop =
    isWindowsDevice &&
    (viewport.height <= 760 ||
      (viewport.height <= 820 && viewport.width <= 1366));
  const dockDensity: 'default' | 'compact' | 'tight' = isTightDesktop
    ? 'tight'
    : isCompactDesktop
      ? 'compact'
      : 'default';
  const desktopIconScale = isTightDesktop ? 0.78 : isCompactDesktop ? 0.9 : 1;
  const lineBursts = useMemo(
    () =>
      PROJECT_LINE_POSITIONS.map((_, lineIndex) =>
        Array.from({ length: 2 }, (_, burstIndex) => ({
          id: `${lineIndex}-${burstIndex}`,
          duration: 8.4 + Math.random() * 4,
          delay: Math.random() * 6 + lineIndex * 0.8 + burstIndex * 2.8,
          opacity: 0.42 + Math.random() * 0.24,
          height: 28 + Math.random() * 34,
          blur: 0.3 + Math.random(),
        }))
      ),
    []
  );
  const getCenteredWindowPosition = useCallback(
    (openCount: number) => {
      const viewportWidth =
        typeof window !== 'undefined' ? window.innerWidth : viewport.width;
      const viewportHeight =
        typeof window !== 'undefined' ? window.innerHeight : viewport.height;
      const windowWidth = Math.min(WINDOW_BASE_WIDTH, viewportWidth * 0.9);
      const windowHeight = Math.min(WINDOW_BASE_HEIGHT, viewportHeight * 0.85);
      const baseX = (viewportWidth - windowWidth) / 2;
      const baseY = (viewportHeight - windowHeight) / 2;
      const offset = WINDOW_STAGGER_OFFSETS[openCount % WINDOW_STAGGER_OFFSETS.length];
      const minX = 8;
      const maxX = Math.max(minX, viewportWidth - windowWidth - 8);
      const minY = 62;
      const maxY = Math.max(minY, viewportHeight - windowHeight - 8);

      return {
        x: Math.round(clamp(baseX + offset.x, minX, maxX)),
        y: Math.round(clamp(baseY + offset.y, minY, maxY)),
      };
    },
    [viewport.height, viewport.width]
  );

  // Trash interaction state machine
  const {
    trashState,
    desktopVisible,
    trashDisabled,
    triggerTrash,
    cancelEmpty,
    confirmEmpty,
    restoreFromConfirm,
    confirmDelete,
  } = useTrashInteraction();

  // Calculate icon positions based on viewport size, handle resize, and quick questions state
  useEffect(() => {
    const updateIconPositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const windowsDevice = /Windows/i.test(window.navigator.userAgent);
      const compact =
        windowsDevice && (height <= 840 || (height <= 900 && width <= 1440));
      const tight =
        windowsDevice && (height <= 760 || (height <= 820 && width <= 1366));

      setViewport({ width, height });
      setIsWindowsDevice(windowsDevice);
      const newPositions = calculateIconPositions(
        width,
        height
      );
      const maxIconY = height - (tight ? 280 : compact ? 255 : 220);
      const spreadX = tight ? 1.16 : compact ? 1.09 : 1;
      const spreadY = tight ? 1.12 : compact ? 1.06 : 1;
      const centerX = width / 2;
      const topOffset = tight ? 10 : compact ? 6 : 0;
      setIcons(
        newPositions.map((icon) => ({
          ...icon,
          // On compact Windows viewports, gently spread icon centers so
          // spacing matches the larger-screen composition.
          ...(() => {
            const iconWidth = icon.size?.width ?? 80;
            const iconHeight = icon.size?.height ?? 80;
            const maxDimension = Math.max(iconWidth, iconHeight);

            const spreadXPos = centerX + (icon.position.x - centerX) * spreadX;
            const spreadYPos = icon.position.y * spreadY + topOffset;

            const minX = maxDimension / 2 + 8;
            const maxX = width - maxDimension / 2 - 8;
            const minY = maxDimension / 2 + 8;

            return {
              position: {
                x: Math.max(minX, Math.min(spreadXPos, maxX)),
                y: Math.max(minY, Math.min(spreadYPos, maxIconY)),
              },
            };
          })(),
        }))
      );
    };

    // Set initial positions
    updateIconPositions();

    // Add resize listener
    window.addEventListener('resize', updateIconPositions);

    return () => {
      window.removeEventListener('resize', updateIconPositions);
    };
  }, []);

  const handleIconOpen = useCallback(
    (icon: DesktopIconData) => {
      // Check if window is already open
      const existingWindow = openWindows.find((w) => w.id === icon.id);

      if (existingWindow) {
        // Bring to front
        setOpenWindows((prev) =>
          prev.map((w) => (w.id === icon.id ? { ...w, zIndex: nextZIndex } : w))
        );
        setNextZIndex((prev) => prev + 1);
      } else {
        // Open centered and stagger each additional window slightly.
        const spawnPosition = getCenteredWindowPosition(openWindows.length);
        setOpenWindows((prev) => [
          ...prev,
          {
            id: icon.id,
            title: icon.title,
            projectIndex: icon.projectIndex,
            zIndex: nextZIndex,
            position: spawnPosition,
          },
        ]);
        setNextZIndex((prev) => prev + 1);
      }
    },
    [getCenteredWindowPosition, openWindows, nextZIndex]
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
        prev.map((w) => (w.id === 'notes' ? { ...w, zIndex: nextZIndex } : w))
      );
      setNextZIndex((prev) => prev + 1);
    } else {
      // Open new Notes window
      const spawnPosition = getCenteredWindowPosition(openWindows.length);
      setOpenWindows((prev) => [
        ...prev,
        {
          id: 'notes',
          title: 'Notes',
          projectIndex: -1, // Special value for non-project windows
          zIndex: nextZIndex,
          position: spawnPosition,
        },
      ]);
      setNextZIndex((prev) => prev + 1);
    }
  }, [getCenteredWindowPosition, openWindows, nextZIndex]);

  const handlePhotosClick = useCallback(() => {
    // Check if Photos window is already open
    const existingWindow = openWindows.find((w) => w.id === 'photos');

    if (existingWindow) {
      // Bring to front
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === 'photos' ? { ...w, zIndex: nextZIndex } : w))
      );
      setNextZIndex((prev) => prev + 1);
    } else {
      // Open new Photos window
      const spawnPosition = getCenteredWindowPosition(openWindows.length);
      setOpenWindows((prev) => [
        ...prev,
        {
          id: 'photos',
          title: 'Photos',
          projectIndex: -1, // Special value for non-project windows
          zIndex: nextZIndex,
          position: spawnPosition,
        },
      ]);
      setNextZIndex((prev) => prev + 1);
    }
  }, [getCenteredWindowPosition, openWindows, nextZIndex]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white dark:bg-black">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-white/36 to-white/92 dark:from-black/10 dark:via-black/52 dark:to-black/80" />
        <div className="absolute inset-x-0 top-0 h-[62vh] bg-gradient-to-b from-[#ff5a00]/98 via-[#db0000]/80 to-transparent" />
        <div className="absolute -top-[19vh] left-[-12vw] h-[52vh] w-[44vw] rounded-full bg-[#ff2f00]/78 blur-[112px]" />
        <div className="absolute -top-[22vh] right-[-8vw] h-[56vh] w-[48vw] rounded-full bg-[#ff7b00]/90 blur-[118px]" />
        <div className="absolute -top-[18vh] left-1/2 h-[52vh] w-[54vw] -translate-x-1/2 rounded-full bg-[#ff5a00]/36 blur-[130px]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[76px] z-[1]">
        {PROJECT_LINE_POSITIONS.map((left, index) => (
          <div key={left} className="absolute bottom-0 top-0 w-px" style={{ left: `${left}%` }}>
            <span className="absolute inset-0 bg-black/20 dark:bg-white/20" />
            {lineBursts[index].map((burst) => (
              <span
                key={burst.id}
                className="projects-desktop-fiber-burst absolute left-1/2 w-[2.8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,118,22,0)_0%,rgba(255,126,34,0.98)_52%,rgba(255,118,22,0)_100%)]"
                style={
                  {
                    height: `${burst.height}px`,
                    animationDuration: `${burst.duration}s`,
                    animationDelay: `${burst.delay}s`,
                    filter: `blur(${burst.blur}px)`,
                    '--burst-opacity': `${burst.opacity}`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Background */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <Image
          src="/sidewaysBlackWhite.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center dark:brightness-[0.82]"
        />
      </div>

      {/* Desktop Icons */}
      {icons.map((icon, index) => (
        <motion.div
          key={icon.id}
          animate={{
            opacity: desktopVisible ? 1 : 0,
            scale: desktopVisible ? desktopIconScale : desktopIconScale * 0.8,
            filter: desktopVisible ? 'blur(0px)' : 'blur(4px)',
          }}
          transition={{
            duration: 0.3,
            delay: desktopVisible ? index * 0.06 : index * 0.08,
          }}
          style={{ pointerEvents: desktopVisible ? 'auto' : 'none' }}
        >
          <DesktopIcon
            icon={icon}
            onOpen={() => handleIconOpen(icon)}
            onPositionChange={handleIconPositionChange}
          />
        </motion.div>
      ))}

      {/* Open Windows */}
      <motion.div
        animate={{
          opacity: desktopVisible ? 1 : 0,
          scale: desktopVisible ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: desktopVisible ? 'auto' : 'none' }}
      >
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
      </motion.div>

      {/* Dock */}
      <DesktopDock
        onNotesClick={handleNotesClick}
        onPhotosClick={handlePhotosClick}
        onTrashClick={triggerTrash}
        trashVisible={desktopVisible}
        trashDisabled={trashDisabled}
        density={dockDensity}
      />

      {/* Trash Error Screen (below modals) */}
      <TrashErrorScreen
        visible={trashState === 'confirmDelete' || trashState === 'deletedTemp'}
        fullScreen={trashState === 'deletedTemp'}
      />

      {/* Trash Confirm Modals */}
      <AnimatePresence mode="wait">
        {trashState === 'confirmEmpty' && (
          <TrashConfirmModal
            variant="empty"
            onCancel={cancelEmpty}
            onConfirm={confirmEmpty}
          />
        )}
        {trashState === 'confirmDelete' && (
          <TrashConfirmModal
            variant="delete"
            onCancel={restoreFromConfirm}
            onConfirm={confirmDelete}
          />
        )}
      </AnimatePresence>

      <style jsx>{`
        .projects-desktop-fiber-burst {
          top: -10%;
          opacity: 0;
          animation-name: projectsDesktopFiberDown;
          animation-timing-function: cubic-bezier(0.28, 0.08, 0.26, 1);
          animation-iteration-count: infinite;
        }

        @keyframes projectsDesktopFiberDown {
          0% {
            top: -10%;
            opacity: 0;
          }
          8% {
            opacity: var(--burst-opacity);
          }
          78% {
            opacity: var(--burst-opacity);
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
