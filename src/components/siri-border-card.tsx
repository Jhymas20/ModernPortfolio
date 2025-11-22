'use client';

import { ReactNode } from 'react';

interface SiriBorderCardProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
}

export function SiriBorderCard({
  children,
  className = '',
  borderRadius = '24px'
}: SiriBorderCardProps) {
  return (
    <div className={`group relative ${className}`}>
      {/* Outer glow - light shining out */}
      <div
        className="pointer-events-none absolute -inset-[4px] rounded-[inherit] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-25"
        style={{
          borderRadius,
          background: `linear-gradient(
            90deg,
            #6366f1,
            #a855f7,
            #ec4899,
            #f97316,
            #eab308,
            #22c55e,
            #06b6d4,
            #6366f1
          )`,
          backgroundSize: '400% 100%',
          animation: 'liquid-border 6s linear infinite',
        }}
      />

      {/* Mid glow layer */}
      <div
        className="pointer-events-none absolute -inset-[2px] rounded-[inherit] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40"
        style={{
          borderRadius,
          background: `linear-gradient(
            90deg,
            #6366f1,
            #a855f7,
            #ec4899,
            #f97316,
            #eab308,
            #22c55e,
            #06b6d4,
            #6366f1
          )`,
          backgroundSize: '400% 100%',
          animation: 'liquid-border 6s linear infinite',
        }}
      />

      {/* Sharp border line */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-70"
        style={{
          borderRadius,
          padding: '1px',
          background: `linear-gradient(
            90deg,
            #6366f1,
            #a855f7,
            #ec4899,
            #f97316,
            #eab308,
            #22c55e,
            #06b6d4,
            #6366f1
          )`,
          backgroundSize: '400% 100%',
          animation: 'liquid-border 6s linear infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      <style jsx>{`
        @keyframes liquid-border {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
