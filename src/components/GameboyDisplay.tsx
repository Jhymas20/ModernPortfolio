'use client';

import { useRef } from 'react';
import { TetrisGame, TetrisGameControls } from './TetrisGame';

interface GameboyDisplayProps {
  onGameOver?: () => void;
}

export function GameboyDisplay({ onGameOver }: GameboyDisplayProps) {
  const gameRef = useRef<TetrisGameControls>(null);
  return (
    <div className="flex items-center justify-center w-full h-full p-1 sm:p-2">
      {/* Gameboy Body */}
      <div className="relative bg-[#d4d4d4] dark:bg-[#a8a8a8] rounded-[2rem] shadow-2xl p-3 sm:p-4 md:p-5 lg:p-6 border-2 sm:border-[3px] border-[#b8b8b8] dark:border-[#8c8c8c] w-full max-w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto max-h-[95vh] select-none" style={{aspectRatio: '0.65'}}>
        {/* Cartridge Slot at Top */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-3 bg-[#a0a0a0] dark:bg-[#787878] rounded-sm shadow-inner border border-[#888888] dark:border-[#606060]">
          <div className="absolute inset-x-2 top-0.5 h-1 bg-[#888888] dark:bg-[#606060] rounded-sm" />
        </div>

        {/* Top Section with Power LED */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {/* Power LED with realistic housing */}
          <div className="flex items-center gap-1.5">
            <div className="relative">
              {/* LED housing/bezel */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] dark:bg-[#0a0a0a] flex items-center justify-center shadow-inner">
                {/* LED light */}
                <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse" />
              </div>
            </div>
            <div className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] font-bold text-neutral-600 tracking-wide">POWER</div>
          </div>

          {/* Battery indicator */}
          <div className="flex items-center gap-1 ml-2">
            <div className="w-4 h-2.5 border border-neutral-600 rounded-sm relative">
              <div className="absolute inset-0.5 bg-neutral-600 rounded-sm" />
            </div>
            <div className="w-0.5 h-1.5 bg-neutral-600 rounded-r-sm" />
            <div className="text-[0.375rem] sm:text-[0.4rem] md:text-[0.425rem] font-bold text-neutral-600">BATTERY</div>
          </div>
        </div>

        {/* Top Panel Division Line */}
        <div className="absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b0b0b0] dark:via-[#909090] to-transparent opacity-40" />

        {/* Screen Container - Indented */}
        <div className="bg-[#a0a0a0] dark:bg-[#808080] rounded-lg p-[3px] shadow-inner mb-2 mt-6">
          <div className="bg-[#2a2a2a] dark:bg-[#1a1a1a] rounded-lg p-2 shadow-inner">
            <div className="bg-[#0f380f] rounded-md p-1.5 shadow-inner">
              <div className="bg-[#9bbc0f] rounded-sm p-1">
                {/* Tetris Game */}
                <div className="h-[280px] sm:h-[320px] md:h-[360px] lg:h-[420px] xl:h-[480px]">
                  <TetrisGame ref={gameRef} onGameOver={onGameOver} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Bottom Border Line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b0b0b0] dark:via-[#909090] to-transparent opacity-30 mb-2" />

        {/* Jordan's Game Boy Text */}
        <div className="text-center mb-3 md:mb-4">
          <div className="text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem] font-bold text-neutral-600 tracking-[0.2em] mb-0.5">
            Jordan's
          </div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-neutral-700 tracking-[0.15em]" style={{ fontFamily: 'Arial Black, sans-serif', fontStyle: 'italic' }}>
            GAME BOY<sup className="text-[0.375rem] sm:text-[0.4rem] md:text-[0.425rem] ml-0.5">TM</sup>
          </div>
        </div>

        {/* Middle Panel Division Line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b0b0b0] dark:via-[#909090] to-transparent opacity-30 mb-3" />

        {/* Controls Section */}
        <div className="flex items-end justify-between px-3 md:px-6 pb-3">
          {/* D-Pad with circular background */}
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            {/* Circular background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#b8b8b8] to-[#a0a0a0] dark:from-[#888888] dark:to-[#707070] shadow-inner" />

            <div className="absolute inset-0 flex items-center justify-center">
              {/* Horizontal bar */}
              <div className="absolute w-20 h-8 md:w-24 md:h-10 bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a] rounded-sm shadow-lg border border-black/20" />
              {/* Vertical bar */}
              <div className="absolute h-20 w-8 md:h-24 md:w-10 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#0a0a0a] rounded-sm shadow-lg border border-black/20" />
              {/* Center circle */}
              <div className="absolute w-6 h-6 md:w-7 md:h-7 bg-[#3a3a3a] dark:bg-[#2a2a2a] rounded-full z-10 shadow-inner" />

              {/* Clickable D-Pad buttons */}
              {/* Up */}
              <button
                onClick={() => gameRef.current?.rotate()}
                className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 z-20 cursor-pointer active:scale-95 transition-transform"
                aria-label="Rotate (Up)"
              />
              {/* Down */}
              <button
                onClick={() => gameRef.current?.moveDown()}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 z-20 cursor-pointer active:scale-95 transition-transform"
                aria-label="Move Down"
              />
              {/* Left */}
              <button
                onClick={() => gameRef.current?.moveLeft()}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-20 cursor-pointer active:scale-95 transition-transform"
                aria-label="Move Left"
              />
              {/* Right */}
              <button
                onClick={() => gameRef.current?.moveRight()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 z-20 cursor-pointer active:scale-95 transition-transform"
                aria-label="Move Right"
              />
            </div>
          </div>

          {/* A/B Buttons with diagonal oval background */}
          <div className="relative w-32 h-28 md:w-36 md:h-32">
            {/* Diagonal oval background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full h-20 md:h-24 rounded-full bg-gradient-to-br from-[#b8b8b8] to-[#a0a0a0] dark:from-[#888888] dark:to-[#707070] shadow-inner -rotate-45"
                style={{ borderRadius: '50%' }}
              />
            </div>

            {/* B Button (lower left) */}
            <div className="absolute bottom-2 left-4 flex flex-col items-center gap-0.5">
              <button
                onClick={() => gameRef.current?.rotate()}
                className="cursor-pointer active:scale-95 transition-transform select-none"
                aria-label="Rotate (B Button)"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#E63946] via-[#D62828] to-[#C1121F] shadow-lg border-[3px] border-[#9D0208] flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-white select-none">B</span>
                </div>
              </button>
              <span className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] font-bold text-neutral-600 tracking-wider select-none">B</span>
            </div>
            {/* A Button (upper right) */}
            <div className="absolute top-1 right-4 flex flex-col items-center gap-0.5">
              <button
                onClick={() => gameRef.current?.hardDrop()}
                className="cursor-pointer active:scale-95 transition-transform select-none"
                aria-label="Hard Drop (A Button)"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#E63946] via-[#D62828] to-[#C1121F] shadow-lg border-[3px] border-[#9D0208] flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-white select-none">A</span>
                </div>
              </button>
              <span className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] font-bold text-neutral-600 tracking-wider select-none">A</span>
            </div>
          </div>
        </div>

        {/* Bottom Panel Division Line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b0b0b0] dark:via-[#909090] to-transparent opacity-30 mb-2" />

        {/* Start/Select Buttons and Speaker */}
        <div className="flex items-center px-3 md:px-6 pb-1">
          {/* Empty space left */}
          <div className="flex-1" />

          {/* Start/Select Buttons */}
          <div className="flex gap-3 items-center -rotate-[20deg]">
            <button
              onClick={onGameOver}
              className="flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-transform select-none"
              aria-label="Back to 3D View"
            >
              <div className="w-16 h-4 rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] shadow-inner border border-black/30" />
              <span className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] font-bold text-neutral-600 tracking-wider select-none">BACK</span>
            </button>
            <button
              onClick={() => gameRef.current?.reset()}
              className="flex flex-col items-center gap-0.5 cursor-pointer active:scale-95 transition-transform select-none"
              aria-label="Restart Game"
            >
              <div className="w-16 h-4 rounded-full bg-gradient-to-b from-[#2a2a2a] to-[#3a3a3a] dark:from-[#1a1a1a] dark:to-[#2a2a2a] shadow-inner border border-black/30" />
              <span className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] font-bold text-neutral-600 tracking-wider select-none">RESTART</span>
            </button>
          </div>

          {/* Empty space right */}
          <div className="flex-1" />

          {/* Speaker Grills */}
          <div className="flex gap-1 items-end pb-0.5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-[#2a2a2a] dark:bg-[#1a1a1a] rounded-full shadow-inner"
                style={{ height: `${16 + i * 4}px` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom edge detail */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#b0b0b0] dark:bg-[#808080] rounded-full opacity-40" />
      </div>
    </div>
  );
}
