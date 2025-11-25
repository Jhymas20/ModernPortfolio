'use client';

import { ReactNode } from 'react';

interface CRTMonitorProps {
  children: ReactNode;
  className?: string;
}

export default function CRTMonitor({ children, className = '' }: CRTMonitorProps) {
  return (
    <div className={`relative mx-auto w-full max-w-5xl ${className}`}>
      {/* CRT Monitor Frame */}
      <div className="relative rounded-3xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-8 shadow-2xl md:p-12">
        {/* Monitor Top Bezel */}
        <div className="absolute left-1/2 top-4 h-2 w-32 -translate-x-1/2 rounded-full bg-neutral-700" />

        {/* Power LED */}
        <div className="absolute right-8 top-6 h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />

        {/* Screen Container */}
        <div className="relative overflow-hidden rounded-2xl bg-black shadow-inner">
          {/* CRT Screen with Effects */}
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            {/* Screen Content */}
            <div className="relative z-10 h-full w-full">
              {children}
            </div>

            {/* Scanlines Overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-20 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
              }}
            />

            {/* Screen Glow */}
            <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-radial from-transparent via-transparent to-black/30" />

            {/* Subtle Screen Curvature Effect */}
            <div
              className="pointer-events-none absolute inset-0 z-40"
              style={{
                boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)',
              }}
            />

            {/* Green CRT Glow */}
            <div className="pointer-events-none absolute inset-0 z-50 opacity-5 mix-blend-screen bg-green-400" />
          </div>
        </div>

        {/* Monitor Bottom Details */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="h-1 w-12 rounded-full bg-neutral-700" />
          <div className="rounded-lg bg-neutral-800 px-6 py-1.5 text-xs font-mono text-neutral-500">
            RETRO ARCADE
          </div>
          <div className="h-1 w-12 rounded-full bg-neutral-700" />
        </div>
      </div>

      {/* Monitor Stand */}
      <div className="mx-auto mt-4 h-6 w-40 rounded-b-xl bg-gradient-to-b from-neutral-800 to-neutral-900" />
      <div className="mx-auto h-2 w-48 rounded-b-lg bg-gradient-to-b from-neutral-900 to-black" />
    </div>
  );
}
