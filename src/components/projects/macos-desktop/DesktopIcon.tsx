'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { DesktopIconData } from './types';

interface DesktopIconProps {
  icon: DesktopIconData;
  onOpen: (position: { x: number; y: number }) => void;
  onPositionChange?: (id: string, x: number, y: number) => void;
}

export function DesktopIcon({ icon, onOpen, onPositionChange }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(icon.position);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartTime = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  // Default size if not specified
  const iconSize = icon.size || { width: 80, height: 80 };
  const maxDimension = Math.max(iconSize.width, iconSize.height);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onDragStart={(_, info) => {
        setIsDragging(true);
        dragStartPos.current = { x: info.point.x, y: info.point.y };
        dragStartTime.current = Date.now();
      }}
      onDrag={(_, info) => {
        // Update current position during drag
        setCurrentPosition({ x: info.point.x, y: info.point.y });
      }}
      onDragEnd={(_, info) => {
        const dragDistance = Math.sqrt(
          Math.pow(info.point.x - dragStartPos.current.x, 2) +
          Math.pow(info.point.y - dragStartPos.current.y, 2)
        );
        const dragDuration = Date.now() - dragStartTime.current;

        // Update final position
        const finalPos = { x: info.point.x, y: info.point.y };
        setCurrentPosition(finalPos);

        // Only open if it was a very short click-like action (not a real drag)
        if (dragDuration < 200 && dragDistance < 5) {
          onOpen(finalPos);
        }

        // Small delay before allowing clicks again
        setTimeout(() => setIsDragging(false), 100);
      }}
      onClick={(e) => {
        // Single click to open (only if not dragging)
        if (!isDragging) {
          e.stopPropagation();
          onOpen(currentPosition);
        }
      }}
      style={{
        position: 'absolute',
        left: icon.position.x - maxDimension / 2,
        top: icon.position.y - maxDimension / 2,
        width: `${maxDimension}px`
      }}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      className="flex flex-col items-center gap-1 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Icon Image */}
      <div
        className="overflow-hidden shadow-lg border-2 border-white/20 pointer-events-none"
        style={{ width: `${iconSize.width}px`, height: `${iconSize.height}px` }}
      >
        <Image
          src={icon.icon}
          alt={icon.title}
          width={iconSize.width}
          height={iconSize.height}
          sizes="80px"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Icon Label */}
      <span
        className="text-xs text-black dark:text-white font-medium text-center px-1 py-0.5 rounded break-words pointer-events-none leading-tight"
        style={{ maxWidth: `${Math.max(maxDimension + 20, 120)}px` }}
      >
        {icon.title}
      </span>
    </motion.div>
  );
}
