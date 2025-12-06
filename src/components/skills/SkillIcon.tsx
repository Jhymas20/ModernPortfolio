'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface SkillIconProps {
  name: string;
  icon?: string;
  fallbackColor: string;
  index: number;
}

const SkillIcon = ({ name, icon, fallbackColor, index }: SkillIconProps) => {
  const [imageError, setImageError] = useState(false);

  // Get initials from skill name (first 2 letters or first letter of first 2 words)
  const getInitials = (text: string): string => {
    const words = text.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(name);

  // Random entrance animation
  const randomDelay = Math.random() * 0.6; // Random delay between 0 and 0.6 seconds
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: randomDelay,
        duration: 0.4,
        ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      custom={index}
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.08, y: -6 }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center gap-2 cursor-default"
    >
      {/* macOS-style App Icon Container */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24">
        {/* Outer glow - light shining out */}
        <div
          className="pointer-events-none absolute -inset-[4px] rounded-[22%] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-25"
          style={{
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
            animation: 'liquid-border 3s linear infinite',
          }}
        />

        {/* Mid glow layer */}
        <div
          className="pointer-events-none absolute -inset-[2px] rounded-[22%] opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40"
          style={{
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
            animation: 'liquid-border 3s linear infinite',
          }}
        />

        {/* Sharp border line */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[22%] opacity-0 transition-opacity duration-500 group-hover:opacity-70"
          style={{
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
            animation: 'liquid-border 3s linear infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
          }}
        />

        {/* Outer shadow layer (macOS-style depth) */}
        <div className="absolute inset-0 rounded-[22%] bg-gradient-to-b from-black/10 to-black/30 blur-md transform translate-y-1" />

        {/* Icon background container */}
        <div className="relative h-full w-full rounded-[22%] overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg">
          {icon && !imageError ? (
            <div className="relative h-full w-full p-3 sm:p-4 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
              <Image
                src={icon}
                alt={name}
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-contain p-2 drop-shadow-sm transition-all group-hover:drop-shadow-md"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-xl sm:text-2xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${fallbackColor} 0%, ${adjustBrightness(fallbackColor, -20)} 100%)`,
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Glossy overlay effect (macOS shine) */}
        <div className="absolute inset-0 rounded-[22%] bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* App Label (macOS style) */}
      <span className="w-20 sm:w-24 text-center text-[11px] sm:text-xs font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-tight drop-shadow-sm">
        {name}
      </span>

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
    </motion.div>
  );
};

// Helper function to adjust color brightness
function adjustBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}

export default SkillIcon;
