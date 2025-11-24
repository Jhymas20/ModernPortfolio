'use client';

import { Gameboy3D } from '@/components/Gameboy3D';
import { NavigationPrompt, NavigationPromptHandle } from '@/components/navigation-prompt';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameboyDisplay } from '@/components/GameboyDisplay';

export default function FunPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigationPromptRef = useRef<NavigationPromptHandle>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlay = () => {
    setShowTransition(true);
    // Start the zoom transition
    setIsPlaying(true);
    // Switch to 2D image almost immediately after fade starts
    setTimeout(() => {
      setShowTransition(false);
    }, 600); // Fast transition
  };

  const handleGameOver = () => {
    // Reset to 3D view after game over
    setIsPlaying(false);
    setShowTransition(false);
  };

  // Auto-focus navigation input on keypress
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only auto-focus if user is typing a letter/number and not already focused on an input
      if (
        e.target === document.body &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        e.key.length === 1
      ) {
        navigationPromptRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-black">
      <div className="flex flex-col">
        {/* Gameboy Section - 3D or 2D based on state */}
        <div className={`flex items-center justify-center ${
          isPlaying && !showTransition
            ? 'h-screen md:h-[85vh]' // Full screen on mobile when playing, 85vh on desktop
            : 'h-[65vh] md:h-[70vh]' // Normal height when not playing
        }`}>
          <AnimatePresence mode="wait">
            {!isPlaying || showTransition ? (
              <motion.div
                key="3d-gameboy"
                initial={{ opacity: 1, scale: 1 }}
                animate={isPlaying ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <Gameboy3D isPlaying={isPlaying} />
              </motion.div>
            ) : (
              <motion.div
                key="gameboy-display"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <GameboyDisplay onGameOver={handleGameOver} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Play Button - Only show when not playing */}
        {!isPlaying && (
          <div className="flex justify-center py-4">
            <Button
              onClick={handlePlay}
              variant="outline"
              className="group relative overflow-hidden rounded-full border-2 border-[#B95F9D] bg-white/30 px-8 py-6 shadow-lg backdrop-blur-lg transition-all hover:bg-[#B95F9D]/20 active:scale-95 dark:border-[#B95F9D] dark:bg-neutral-800/50 dark:hover:bg-[#B95F9D]/30"
            >
              <div className="flex items-center gap-3">
                <Play size={24} strokeWidth={2} fill="#B95F9D" color="#B95F9D" />
                <span className="text-lg font-semibold text-neutral-800 dark:text-white">Play Game</span>
              </div>
            </Button>
          </div>
        )}

        {/* Navigation Section - Hidden on mobile when playing */}
        {!(isPlaying && isMobile) && (
          <div className="mx-auto w-full max-w-6xl px-4 py-4 md:py-6 pb-12">
            <NavigationPrompt ref={navigationPromptRef} />
          </div>
        )}
      </div>
    </div>
  );
}
