import { DockIcon, DesktopIconData } from './types';

// Icon data with percentage-based positioning for perfect scaling
interface IconConfig {
  id: string;
  title: string;
  projectIndex: number;
  icon: string;
  size: { width: number; height: number };
  // Position configurations for different screen sizes (percentage of viewport)
  positions: {
    mobile: { x: number; y: number };      // < 768px
    tablet: { x: number; y: number };      // 768px - 1024px
    laptop: { x: number; y: number };      // 1024px - 1440px
    desktop: { x: number; y: number };     // 1440px - 1920px
    ultrawide: { x: number; y: number };   // > 1920px
  };
}

// Icon configurations - positioned exactly as shown in user's screenshot
// Maintains layout across screen sizes with progressive spreading on larger displays
export const ICON_CONFIGS: IconConfig[] = [
  {
    id: 'synto',
    title: 'Synto',
    projectIndex: 0,
    icon: '/syntopreview.png',
    size: { width: 85, height: 85 },
    positions: {
      mobile: { x: 12, y: 20 },
      tablet: { x: 11, y: 20 },
      laptop: { x: 10, y: 20 },
      desktop: { x: 9, y: 20 },
      ultrawide: { x: 8, y: 20 }
    }
  },
  {
    id: 'defai',
    title: 'Defai',
    projectIndex: 2,
    icon: '/defaipreview.png',
    size: { width: 75, height: 75 },
    positions: {
      mobile: { x: 44, y: 17 },
      tablet: { x: 44, y: 17 },
      laptop: { x: 44, y: 17 },
      desktop: { x: 44, y: 17 },
      ultrawide: { x: 44, y: 17 }
    }
  },
  {
    id: 'serverRoom',
    title: 'Server Room (NPCE)',
    projectIndex: 4,
    icon: '/projects/BGCLCV/teenCenterPc.webp',
    size: { width: 80, height: 95 },
    positions: {
      mobile: { x: 76, y: 20 },
      tablet: { x: 78, y: 20 },
      laptop: { x: 80, y: 20 },
      desktop: { x: 82, y: 20 },
      ultrawide: { x: 84, y: 20 }
    }
  },
  {
    id: 'cybercodex',
    title: 'CyberCodex.io',
    projectIndex: 1,
    icon: '/Projects/Cybercodex.io/courses.webp',
    size: { width: 70, height: 90 },
    positions: {
      mobile: { x: 22, y: 44 },
      tablet: { x: 21, y: 44 },
      laptop: { x: 20, y: 44 },
      desktop: { x: 19, y: 44 },
      ultrawide: { x: 18, y: 44 }
    }
  },
  {
    id: 'fitgear',
    title: 'Frigear',
    projectIndex: 3,
    icon: '/fitgearpreview.png',
    size: { width: 95, height: 70 },
    positions: {
      mobile: { x: 64, y: 37 },
      tablet: { x: 65, y: 37 },
      laptop: { x: 66, y: 37 },
      desktop: { x: 67, y: 37 },
      ultrawide: { x: 68, y: 37 }
    }
  },
  {
    id: 'youbot',
    title: 'YouBot',
    projectIndex: 7,
    icon: '/youbotpreview.png',
    size: { width: 70, height: 85 },
    positions: {
      mobile: { x: 80, y: 43 },
      tablet: { x: 82, y: 43 },
      laptop: { x: 83, y: 43 },
      desktop: { x: 84, y: 43 },
      ultrawide: { x: 85, y: 43 }
    }
  },
  {
    id: '3dpong',
    title: '3D Pong',
    projectIndex: 5,
    icon: '/transcendancepreview.png',
    size: { width: 65, height: 65 },
    positions: {
      mobile: { x: 10, y: 69 },
      tablet: { x: 9, y: 69 },
      laptop: { x: 8, y: 69 },
      desktop: { x: 7, y: 69 },
      ultrawide: { x: 6, y: 69 }
    }
  },
  {
    id: 'minishell',
    title: 'Minishell',
    projectIndex: 6,
    icon: '/minishellpreview.png',
    size: { width: 90, height: 75 },
    positions: {
      mobile: { x: 35, y: 61 },
      tablet: { x: 35, y: 61 },
      laptop: { x: 35, y: 61 },
      desktop: { x: 35, y: 61 },
      ultrawide: { x: 35, y: 61 }
    }
  },
  {
    id: 'oldportfolio',
    title: 'Old Portfo...',
    projectIndex: 8,
    icon: '/oldportfoliopreview.png',
    size: { width: 80, height: 80 },
    positions: {
      mobile: { x: 78, y: 73 },
      tablet: { x: 80, y: 73 },
      laptop: { x: 81, y: 73 },
      desktop: { x: 82, y: 73 },
      ultrawide: { x: 83, y: 73 }
    }
  },
];

// Helper function to get position based on screen width using media query logic
const getPositionForScreenSize = (config: IconConfig, viewportWidth: number) => {
  if (viewportWidth < 768) {
    return config.positions.mobile;
  } else if (viewportWidth < 1024) {
    return config.positions.tablet;
  } else if (viewportWidth < 1440) {
    return config.positions.laptop;
  } else if (viewportWidth < 1920) {
    return config.positions.desktop;
  } else {
    return config.positions.ultrawide;
  }
};

// Helper function to calculate icon positions based on current viewport
// Uses percentage-based positioning with media query breakpoints
export const calculateIconPositions = (viewportWidth: number, viewportHeight: number, showQuickQuestions: boolean = false): DesktopIconData[] => {
  // Calculate reserved bottom space as percentage of viewport height
  // Dock: ~5vh, Navigation: ~8vh base, ~18vh with quick questions
  const dockHeightVh = 5;
  const navHeightVh = showQuickQuestions ? 18 : 10;
  const totalReservedVh = dockHeightVh + navHeightVh;

  // Convert vh to pixels
  const reservedBottomSpace = (viewportHeight * totalReservedVh) / 100;

  // Calculate usable viewport area (excluding reserved bottom space)
  const usableHeight = viewportHeight - reservedBottomSpace;

  return ICON_CONFIGS.map((config) => {
    // Get position based on screen size (media query logic)
    const positionPercent = getPositionForScreenSize(config, viewportWidth);

    // Convert percentage position to actual pixels
    const xPos = (viewportWidth * positionPercent.x) / 100;
    const yPos = (usableHeight * positionPercent.y) / 100;

    return {
      id: config.id,
      title: config.title,
      projectIndex: config.projectIndex,
      icon: config.icon,
      size: config.size,
      position: {
        // Ensure icons stay within bounds with 10px margins
        x: Math.max(10, Math.min(xPos, viewportWidth - config.size.width - 10)),
        y: Math.max(10, Math.min(yPos, usableHeight - config.size.height - 10)),
      },
    };
  });
};

// Initial positions (fallback for SSR)
export const INITIAL_DESKTOP_ICONS: DesktopIconData[] = calculateIconPositions(1200, 800, true);

// Legacy fallback (kept for backwards compatibility)
export const DEFAULT_ICON_POSITIONS: DesktopIconData[] = INITIAL_DESKTOP_ICONS;

// Dock icons configuration
export const DOCK_ICONS: DockIcon[] = [
  { id: 'github', icon: '', label: 'GitHub', href: 'https://github.com/Jhymas20' },
  { id: 'tiktok', icon: '', label: 'TikTok', href: 'https://www.tiktok.com/@node.io' },
  { id: 'instagram', icon: '', label: 'Instagram', href: 'https://www.instagram.com/jordan.hymas/' },
  { id: 'notes', icon: '', label: 'Notes', href: '#', separator: true },
  { id: 'photos', icon: '', label: 'Photos', href: '#' },
  { id: 'email', icon: '', label: 'Mail', href: 'mailto:jordanhymas24@gmail.com' },
  { id: 'trash', icon: '🗑️', label: 'Trash', href: '#', separator: true },
];

export const WINDOW_INITIAL_POSITION = { x: 100, y: 50 };
export const WINDOW_Z_INDEX_START = 100; // Higher than dock (z-50) so windows appear on top
