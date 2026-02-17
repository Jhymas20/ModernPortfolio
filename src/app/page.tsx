'use client';

import FluidCursor from '@/components/FluidCursor';
import { MobileScrollLayout } from '@/components/home/mobile-scroll-layout';
import { Button } from '@/components/ui/button';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Manrope, Sora } from 'next/font/google';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

const pageRoutes = {
  Me: '/me',
  Projects: '/projects',
  Skills: '/skills',
  More: '/more',
  Contact: '/contact',
} as const;
type RouteKey = keyof typeof pageRoutes;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'More', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const satisfies { key: RouteKey; color: string; icon: typeof Laugh }[];

const MOBILE_BARS = 5;
const DESKTOP_BARS = 11;
const END_SCALE_BOOST = 1.6;
const heroTitleFont = Sora({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});
const heroSubtitleFont = Manrope({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

/* ---------- component ---------- */
export default function Home() {
  const { setTheme } = useTheme();
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previousThemeRef = useRef<string | null>(null);

  useEffect(() => {
    previousThemeRef.current = window.localStorage.getItem('theme');
    setTheme('dark');

    return () => {
      const previousTheme = previousThemeRef.current;
      if (previousTheme) {
        setTheme(previousTheme);
        return;
      }
      setTheme('system');
    };
  }, [setTheme]);

  useEffect(() => {
    setMounted(true);

    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkScreenSize, 120);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#f1f0eb] dark:bg-[#030303]" />;
  }

  if (!isDesktop) {
    return <MobileScrollLayout />;
  }

  return <DesktopHome />;
}

function DesktopHome() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const logoTargetRef = useRef<HTMLDivElement>(null);

  /* bar animation state */
  const [phase, setPhase] = useState<
    'start' | 'expanded' | 'image' | 'shrunk' | 'done'
  >('start');
  const [showFinalColumns, setShowFinalColumns] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [logoTarget, setLogoTarget] = useState({ x: 0, y: 0, height: 0 });

  const measureLogoTarget = useCallback(() => {
    const rect = logoTargetRef.current?.getBoundingClientRect();
    if (!rect) return;

    setLogoTarget({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
      measureLogoTarget();
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [measureLogoTarget]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(measureLogoTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [phase, measureLogoTarget]);

  const barCount = isMobile ? MOBILE_BARS : DESKTOP_BARS;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('expanded'), 300);
    const t2 = setTimeout(() => setPhase('image'), 1200);
    const t3 = setTimeout(() => setPhase('shrunk'), 2200);
    const t4 = setTimeout(() => setPhase('done'), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'done') {
      setShowFinalColumns(false);
      return;
    }
    const timer = setTimeout(() => setShowFinalColumns(true), 80);
    return () => clearTimeout(timer);
  }, [phase]);

  const showImage = phase === 'image' || phase === 'shrunk' || phase === 'done';
  const isExpanded = phase !== 'start';
  const shouldAnchorAnimation = phase === 'shrunk' || phase === 'done';
  const showFinalShowcase = phase === 'done';
  const activeBarGap = '4%';
  const barLayerZIndex = phase === 'done' ? 8 : 20;
  const isShortViewport = viewportSize.height > 0 && viewportSize.height < 920;
  const isVeryShortViewport =
    viewportSize.height > 0 && viewportSize.height < 820;
  const isUltraShortViewport =
    viewportSize.height > 0 && viewportSize.height < 760;
  const isExtremeShortViewport =
    viewportSize.height > 0 && viewportSize.height < 690;
  const isCompactDesktopUi =
    !isMobile &&
    ((viewportSize.height > 0 && viewportSize.height < 860) ||
      (viewportSize.width > 0 && viewportSize.width < 1500));
  const isTightDesktopUi =
    !isMobile &&
    ((viewportSize.height > 0 && viewportSize.height < 740) ||
      (viewportSize.width > 0 && viewportSize.width < 1280));
  const expandedPanelHeight =
    viewportSize.width > 0 && viewportSize.height > 0
      ? Math.min(viewportSize.height * 0.85, viewportSize.width * 1.2)
      : 1;
  const baseShrinkScale =
    logoTarget.height > 0
      ? logoTarget.height / expandedPanelHeight
      : isMobile
        ? 0.35
        : 0.2;
  const shrinkScale = Math.min(
    1,
    Math.max(0.1, baseShrinkScale * END_SCALE_BOOST)
  );
  const headerMarginTopPx = isMobile
    ? isVeryShortViewport
      ? -2
      : -14
    : isExtremeShortViewport
      ? 10
      : isUltraShortViewport
        ? 2
        : isVeryShortViewport
          ? -8
          : isShortViewport
            ? -24
            : -176;
  const headerMarginBottomPx = isMobile
    ? 30
    : isExtremeShortViewport
      ? 18
      : isUltraShortViewport
        ? 22
        : isVeryShortViewport
          ? 30
          : isShortViewport
            ? 36
            : 56;
  const logoSlotHeightPx = isMobile
    ? isVeryShortViewport
      ? 104
      : 120
    : isExtremeShortViewport
      ? 122
      : isUltraShortViewport
        ? 142
        : isVeryShortViewport
          ? 166
          : isShortViewport
            ? 196
            : 230;
  const logoSlotMarginTopPx = isMobile
    ? 10
    : isExtremeShortViewport
      ? 14
      : isUltraShortViewport
        ? 20
        : isVeryShortViewport
          ? 34
          : isShortViewport
            ? 28
            : 20;
  const logoSlotMarginBottomPx = isMobile
    ? 28
    : isExtremeShortViewport
      ? 20
      : isUltraShortViewport
        ? 26
        : isVeryShortViewport
          ? 58
          : isShortViewport
            ? 52
            : 40;
  const navMarginTopPx = isMobile
    ? 24
    : isExtremeShortViewport
      ? 10
      : isUltraShortViewport
        ? 18
        : isVeryShortViewport
          ? 42
      : isShortViewport
        ? 38
        : 56;
  const logoHeightBoostPx = isMobile
    ? isVeryShortViewport
      ? 8
      : 12
    : isExtremeShortViewport
      ? 8
      : isUltraShortViewport
        ? 12
        : isVeryShortViewport
          ? 16
          : isShortViewport
            ? 22
            : 30;
  const logoExtraTopSpacingPx = Math.round(logoHeightBoostPx * 0.28);
  const logoExtraBottomSpacingPx = Math.round(logoHeightBoostPx * 0.42);
  const logoExtraNavSpacingPx = Math.round(logoHeightBoostPx * 0.36);
  const compactDesktopOverlapFix =
    !isMobile && (isVeryShortViewport || isUltraShortViewport);
  const resolvedHeaderTopPx = compactDesktopOverlapFix
    ? Math.max(headerMarginTopPx, -2)
    : headerMarginTopPx;
  const resolvedHeaderBottomPx = compactDesktopOverlapFix
    ? headerMarginBottomPx + 14
    : headerMarginBottomPx;
  const resolvedLogoHeightPx = logoSlotHeightPx + logoHeightBoostPx;
  const resolvedLogoMarginTopPx = compactDesktopOverlapFix
    ? logoSlotMarginTopPx + 10 + logoExtraTopSpacingPx
    : logoSlotMarginTopPx + logoExtraTopSpacingPx;
  const resolvedLogoMarginBottomPx = compactDesktopOverlapFix
    ? logoSlotMarginBottomPx + 16 + logoExtraBottomSpacingPx
    : logoSlotMarginBottomPx + logoExtraBottomSpacingPx;
  const resolvedNavMarginTopPx = compactDesktopOverlapFix
    ? navMarginTopPx + 20 + logoExtraNavSpacingPx
    : navMarginTopPx + logoExtraNavSpacingPx;
  const searchWidthClass = isCompactDesktopUi ? 'max-w-md' : 'max-w-lg';
  const searchInputTextClass = isCompactDesktopUi
    ? 'text-sm'
    : 'text-sm sm:text-base';
  const searchRowDensityClass = isCompactDesktopUi
    ? 'py-2 pl-4 sm:pl-5'
    : 'py-2.5 pl-4 sm:pl-6';
  const navGridClass = isCompactDesktopUi
    ? 'mt-3 max-w-xl gap-2 sm:mt-3 sm:gap-2.5'
    : 'mt-3 max-w-2xl gap-2 sm:mt-4 sm:gap-3';
  const navButtonSizeClass = isTightDesktopUi
    ? 'h-11 sm:h-12 md:h-12 px-1 py-1.5 sm:px-1.5 sm:py-1.5 md:px-1.5 md:py-1.5'
    : isCompactDesktopUi
      ? 'h-12 sm:h-14 md:h-14 px-1 py-1.5 sm:px-2 sm:py-1.5 md:px-2 md:py-1.5'
      : 'h-14 sm:h-16 md:h-16 px-1 py-2 sm:px-2 sm:py-2 md:px-2 md:py-2';
  const navIconSize =
    isMobile || isTightDesktopUi ? 14 : isCompactDesktopUi ? 16 : 22;
  const navLabelClass = isTightDesktopUi
    ? 'text-[10px] font-medium sm:text-[11px] md:text-xs'
    : 'text-[10px] font-medium sm:text-xs md:text-sm';
  const finalColumnWeights = isMobile
    ? [1.4, 1.4, 3.12, 1.4, 1.4]
    : [1.44, 1.44, 3.24, 1.44, 1.44];
  const finalColumnGapPercent = isMobile ? 0.72 : 0.6;
  const morphStartGapPercent = 4;
  const morphStartWidthPercent =
    (100 - morphStartGapPercent * (barCount - 1)) / barCount;
  const finalWeightSum = finalColumnWeights.reduce(
    (total, weight) => total + weight,
    0
  );
  const finalColumnAvailableWidth = 100 - finalColumnGapPercent * 4;
  const finalColumnWidths = finalColumnWeights.map(
    (weight) => (weight / finalWeightSum) * finalColumnAvailableWidth
  );
  const finalColumnLefts: number[] = [];
  let runningLeft = 0;
  finalColumnWidths.forEach((width, index) => {
    finalColumnLefts.push(runningLeft);
    runningLeft +=
      width + (index < finalColumnWidths.length - 1 ? finalColumnGapPercent : 0);
  });
  const imageSpanWidth = finalColumnWidths.reduce((total, width) => total + width, 0);
  const panelSliceLeftsNoGap: number[] = [];
  let runningSliceLeft = 0;
  finalColumnWidths.forEach((width) => {
    panelSliceLeftsNoGap.push(runningSliceLeft);
    runningSliceLeft += width;
  });
  const panelSliceMetrics = finalColumnWidths.map((panelWidth, index) => ({
    innerWidthPercent: (imageSpanWidth / panelWidth) * 100,
    innerLeftPercent: -((panelSliceLeftsNoGap[index] / panelWidth) * 100),
  }));
  const finalImageLeftShiftPercent = isMobile ? 3.9 : 3.3;
  const columnGroupMap =
    barCount === 11
      ? [0, 0, 1, 1, 2, 2, 2, 3, 3, 4, 4]
      : barCount === 5
        ? [0, 1, 2, 3, 4]
        : Array.from({ length: barCount }, (_, index) =>
            Math.min(4, Math.floor((index * 5) / barCount))
          );
  const groupCounts = [0, 0, 0, 0, 0];
  columnGroupMap.forEach((groupIndex) => {
    groupCounts[groupIndex] += 1;
  });
  const groupSeen = [0, 0, 0, 0, 0];
  const barTargetStyles = Array.from({ length: barCount }, (_, index) => {
    const groupIndex = columnGroupMap[index];
    const order = groupSeen[groupIndex];
    groupSeen[groupIndex] += 1;
    const groupCount = groupCounts[groupIndex];
    const targetWidth = finalColumnWidths[groupIndex] * (isMobile ? 0.91 : 0.93);
    const spread =
      groupCount <= 1
        ? 0
        : ((order - (groupCount - 1) / 2) / Math.max(1, groupCount - 1)) *
          (isMobile ? 0.22 : 0.3);
    const startLeft = index * (morphStartWidthPercent + morphStartGapPercent);
    const targetLeft =
      finalColumnLefts[groupIndex] +
      (finalColumnWidths[groupIndex] - targetWidth) / 2 +
      spread;

    return {
      startLeft,
      targetLeft,
      startWidth: morphStartWidthPercent,
      targetWidth,
    };
  });

  const handleSectionNavigation = (key: RouteKey) => {
    router.push(pageRoutes[key]);
  };

  const handleQueryNavigation = (query: string) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    if (normalized.includes('home')) {
      router.push('/');
      return;
    }
    if (normalized.includes('project') || normalized.includes('portfolio')) {
      router.push(pageRoutes.Projects);
      return;
    }
    if (normalized.includes('skill')) {
      router.push(pageRoutes.Skills);
      return;
    }
    if (normalized.includes('contact') || normalized.includes('email')) {
      router.push(pageRoutes.Contact);
      return;
    }
    if (
      normalized.includes('more') ||
      normalized.includes('fun') ||
      normalized.includes('hobby')
    ) {
      router.push(pageRoutes.More);
      return;
    }
    router.push(pageRoutes.Me);
  };

  /* hero animations — triggered after bar animation completes */
  const topElementVariants: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween' as const,
        ease: 'easeOut' as const,
        duration: 0.8,
      },
    },
  };
  const bottomElementVariants: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween' as const,
        ease: 'easeOut' as const,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  // Auto-focus the input when animation completes (desktop only to avoid mobile keyboard)
  useEffect(() => {
    if (phase !== 'done') return;
    if (window.matchMedia('(min-width: 640px)').matches) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="relative flex h-[100dvh] min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4">
      {/* big blurred footer word — slides up after animation */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center overflow-visible"
        initial={{ opacity: 0, y: 60 }}
        animate={
          phase === 'done' ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
        }
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.8,
          delay: 0.1,
        }}
      >
        <div
          className="-mb-3 hidden bg-gradient-to-b from-neutral-400/70 via-neutral-400/55 to-neutral-400/0 bg-clip-text text-[10vw] leading-none font-black whitespace-nowrap text-transparent select-none sm:-mb-4 sm:block sm:text-[11vw] md:-mb-5 md:text-[12vw] lg:-mb-6 lg:text-[13vw] xl:-mb-7 xl:text-[14vw] 2xl:-mb-8 2xl:text-[15vw] dark:from-neutral-400/10 dark:via-neutral-400/8 dark:to-neutral-400/0"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
          }}
        >
          Jordan Hymas
        </div>
      </motion.div>

      {/* header — animates in after bars finish */}
      <motion.div
        className="z-20 flex flex-col items-center text-center"
        style={{
          marginTop: `${resolvedHeaderTopPx}px`,
          marginBottom: `${resolvedHeaderBottomPx}px`,
        }}
        variants={topElementVariants}
        initial="hidden"
        animate={phase === 'done' ? 'visible' : 'hidden'}
      >
        <h1
          className={`${heroTitleFont.className} text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl ${isUltraShortViewport ? 'md:text-4xl' : 'md:text-5xl'} dark:text-slate-100`}
        >
          Modern Systems Engineering
        </h1>
        <p
          className={`${heroSubtitleFont.className} mt-2 max-w-xl px-2 text-sm font-semibold tracking-[0.01em] text-slate-600 sm:text-base md:px-0 ${isUltraShortViewport ? 'md:text-base' : 'md:text-lg'} dark:text-slate-300`}
        >
          Cybersecurity • Systems • Computer Science
        </p>
      </motion.div>

      <div
        ref={logoTargetRef}
        aria-hidden="true"
        className="relative z-10 w-full max-w-2xl"
        style={{
          height: `${resolvedLogoHeightPx}px`,
          marginTop: `${resolvedLogoMarginTopPx}px`,
          marginBottom: `${resolvedLogoMarginBottomPx}px`,
        }}
      />

      {/* bar animation — one continuous movement into the logo slot */}
      <div
        className="pointer-events-none fixed inset-0 z-20 text-neutral-900 dark:text-neutral-100"
        style={{
          zIndex: barLayerZIndex,
          transform: shouldAnchorAnimation
            ? `translate3d(${logoTarget.x}px, ${logoTarget.y}px, 0)`
            : 'translate3d(0, 0, 0)',
          transition:
            phase === 'shrunk'
              ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
              : 'none',
          willChange: 'transform',
        }}
      >
        <div
          className="mx-auto flex h-full w-full items-center justify-center px-0 md:px-8 lg:max-w-[94%]"
          style={{
            transform: shouldAnchorAnimation
              ? `scale(${shrinkScale})`
              : 'scale(1)',
            transition:
              phase === 'shrunk'
                ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
                : 'none',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          {showFinalShowcase ? (
            <div
              className="relative w-full"
              style={{
                height: isExpanded ? 'min(85vh, 120vw)' : '0px',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  opacity: showFinalColumns ? 0 : 1,
                  transition: 'opacity 0.42s ease-out',
                }}
              >
                {Array.from({ length: barCount }, (_, i) => {
                  const target = barTargetStyles[i];
                  return (
                    <div
                      key={`morph-${i}`}
                      className="absolute top-0 overflow-hidden"
                      style={{
                        left: `${showFinalColumns ? target.targetLeft : target.startLeft}%`,
                        width: `${showFinalColumns ? target.targetWidth : target.startWidth}%`,
                        height: isExpanded ? 'min(85vh, 120vw)' : '0px',
                        borderRadius: '8px',
                        transition:
                          'left 0.55s cubic-bezier(0.22, 1, 0.36, 1), width 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-out',
                        opacity: showFinalColumns ? 0 : 1,
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: 'url(/ThisIsAGreatOne.png)',
                          backgroundSize: `${isMobile ? barCount * 155 : 1600}% 100%`,
                          backgroundPosition: `${(i / (barCount - 1)) * (isMobile ? 70 : 100)}% center`,
                          backgroundRepeat: 'no-repeat',
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: finalColumnWidths
                    .map((width) => `${width}%`)
                    .join(' '),
                  gap: `${finalColumnGapPercent}%`,
                  opacity: showFinalColumns ? 1 : 0,
                  transform: showFinalColumns ? 'scale(1)' : 'scale(1.015)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                }}
              >
                {Array.from({ length: 5 }, (_, columnIndex) => {
                  const isCenterColumn = columnIndex === 2;
                  const isInnerColumn = columnIndex === 1 || columnIndex === 3;
                  const isOuterColumn = columnIndex === 0 || columnIndex === 4;
                  const sliceMetric = panelSliceMetrics[columnIndex];
                  const blurPx = isOuterColumn
                    ? isMobile
                      ? 18
                      : 22
                    : isInnerColumn
                      ? isMobile
                        ? 4
                        : 6
                      : 0;
                  const tintOpacity = isOuterColumn
                    ? 0.16
                    : isInnerColumn
                      ? 0.1
                      : 0;
                  const edgeOverlayClass = isInnerColumn
                    ? columnIndex === 1
                      ? 'bg-gradient-to-r from-white/20 via-white/7 to-white/0 dark:from-black/20 dark:via-black/11 dark:to-black/0'
                      : 'bg-gradient-to-l from-white/20 via-white/7 to-white/0 dark:from-black/20 dark:via-black/11 dark:to-black/0'
                    : '';

                  const panel = (
                    <div
                      className="relative h-full overflow-hidden"
                    >
                      {!isCenterColumn && (
                        <div
                          className="absolute inset-y-0"
                          style={{
                            left: `${sliceMetric.innerLeftPercent}%`,
                            width: `${sliceMetric.innerWidthPercent}%`,
                            backgroundImage: 'url(/ThisIsAGreatOne.png)',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'left center',
                            backgroundRepeat: 'no-repeat',
                            filter: isOuterColumn ? 'blur(8px)' : undefined,
                            opacity: isOuterColumn ? 0.9 : 1,
                            transform: isOuterColumn
                              ? `scale(1.06) translateX(-${finalImageLeftShiftPercent}%)`
                              : `translateX(-${finalImageLeftShiftPercent}%)`,
                          }}
                        />
                      )}
                      {!isCenterColumn && (
                        <div
                          className="absolute inset-0 dark:bg-black/18"
                          style={{
                            backgroundColor: `rgba(255,255,255,${tintOpacity})`,
                            backdropFilter: `blur(${blurPx}px)`,
                            WebkitBackdropFilter: `blur(${blurPx}px)`,
                          }}
                        />
                      )}
                      {!isCenterColumn && (
                        <>
                          <div
                            className={`absolute inset-0 ${edgeOverlayClass}`}
                            style={{
                              filter: 'none',
                            }}
                          />
                        </>
                      )}
                    </div>
                  );

                  if (isCenterColumn) {
                    return (
                      <motion.div
                        key={`final-col-${columnIndex}`}
                        className="relative h-full overflow-hidden"
                        initial={false}
                        animate={{
                          scale: showFinalColumns ? 1 : 1.05,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                      >
                        <div
                          className="absolute inset-y-0"
                          style={{
                            left: `${sliceMetric.innerLeftPercent}%`,
                            width: `${sliceMetric.innerWidthPercent}%`,
                            backgroundImage: 'url(/ThisIsAGreatOne.png)',
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'left center',
                            backgroundRepeat: 'no-repeat',
                            transform: `translateX(-${finalImageLeftShiftPercent}%)`,
                          }}
                        />
                      </motion.div>
                    );
                  }

                  return (
                    <div key={`final-col-${columnIndex}`} className="h-full">
                      {panel}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            Array.from({ length: barCount }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  marginLeft: i === 0 ? 0 : activeBarGap,
                  height: isExpanded ? 'min(85vh, 120vw)' : '0px',
                  backgroundColor: 'currentColor',
                  borderRadius: '8px',
                  transition:
                    'height 0.8s cubic-bezier(0.65, 0, 0.35, 1), margin-left 0.35s ease-out',
                  overflow: 'hidden',
                }}
              >
                {showImage && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'url(/ThisIsAGreatOne.png)',
                      backgroundSize: `${isMobile ? barCount * 155 : 1600}% 100%`,
                      backgroundPosition: `${(i / (barCount - 1)) * (isMobile ? 70 : 100)}% center`,
                      backgroundRepeat: 'no-repeat',
                      animation:
                        phase === 'done' ? 'none' : 'fadeIn 0.5s ease-in-out',
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* input + quick buttons — animates in after bars finish */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate={phase === 'done' ? 'visible' : 'hidden'}
        className="z-20 mb-10 flex w-full flex-col items-center justify-center sm:mb-16 md:mb-22 md:px-0 lg:mb-24 xl:mb-28"
        style={{ marginTop: `${resolvedNavMarginTopPx}px` }}
      >
        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) handleQueryNavigation(input);
          }}
          className={`relative w-full ${searchWidthClass}`}
        >
          <div
            className={`mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 pr-2 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600 ${searchRowDensityClass}`}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Jump to portfolio, skills, contact…"
              className={`w-full border-none bg-transparent text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500 ${searchInputTextClass}`}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className={`flex items-center justify-center rounded-full bg-[#0171E3] text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700 ${isCompactDesktopUi ? 'p-2' : 'p-2.5'}`}
            >
              <ArrowRight
                className={isCompactDesktopUi ? 'h-4 w-4' : 'h-5 w-5'}
              />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className={`grid w-full grid-cols-5 ${navGridClass}`}>
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => handleSectionNavigation(key)}
              variant="outline"
              className={`border-border hover:bg-border/30 w-full cursor-pointer rounded-2xl border bg-white/30 shadow-none backdrop-blur-lg active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-700/50 ${navButtonSizeClass}`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700 dark:text-neutral-200">
                <Icon size={navIconSize} strokeWidth={2} color={color} />
                <span className={navLabelClass}>{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>

      <FluidCursor />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
