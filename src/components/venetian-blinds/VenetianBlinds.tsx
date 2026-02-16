'use client';

import { useEffect, useRef, useState } from 'react';

import BlindPanel from './BlindPanel';

interface GridConfig {
  cols: number;
  rows: number;
}

function getGridConfig(width: number): GridConfig {
  if (width >= 1024) return { cols: 16, rows: 8 };
  if (width >= 640) return { cols: 10, rows: 6 };
  return { cols: 6, rows: 5 };
}

// Gap between panels (px)
const GAP = 4;
// Each column shifts down by this fraction of one panel height
const STEP_FRACTION = 0.2;

export default function VenetianBlinds() {
  const [grid, setGrid] = useState<GridConfig>({ cols: 16, rows: 8 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      setGrid(getGridConfig(window.innerWidth));
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const panelHeight =
    containerHeight > 0
      ? (containerHeight - (grid.rows - 1) * GAP) / grid.rows
      : 0;

  const stepPx = panelHeight * STEP_FRACTION;
  const maxOffset = (grid.cols - 1) * stepPx;
  const extraRows = Math.ceil(maxOffset / (panelHeight + GAP)) + 1;
  const totalRows = grid.rows + extraRows;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          width: '65vw',
          height: '50vh',
          backgroundColor: '#dddad6',
        }}
      >
        {containerHeight > 0 && (
          <div
            className="absolute inset-0 flex"
            style={{ gap: `${GAP}px` }}
          >
            {Array.from({ length: grid.cols }, (_, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-1 flex-col"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateY(${colIdx * stepPx}px)`,
                }}
              >
                {Array.from({ length: totalRows }, (_, rowIdx) => (
                  <BlindPanel key={rowIdx} height={panelHeight} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
