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

// Icon configurations - arranged in macOS desktop grid style
// All icons have standardized height of 80px, width varies by aspect ratio
export const ICON_CONFIGS: IconConfig[] = [
  // LEFT SIDE - Column 1 (Row 1)
  {
    id: 'homelab',
    title: 'Home-Lab',
    projectIndex: 3,
    icon: '/Projects/HomeLab/Main.webp',
    size: { width: 65, height: 80 },
    positions: {
      mobile: { x: 14, y: 20 },
      tablet: { x: 14, y: 20 },
      laptop: { x: 14, y: 20 },
      desktop: { x: 14, y: 20 },
      ultrawide: { x: 14, y: 20 }
    }
  },
  // LEFT SIDE - Column 2 (Row 1)
  {
    id: 'liquidportfolio',
    title: 'Liquid Portfolio',
    projectIndex: 0,
    icon: '/Projects/LiquidPortfolio/projects.webp',
    size: { width: 75, height: 80 },
    positions: {
      mobile: { x: 21, y: 20 },
      tablet: { x: 21, y: 20 },
      laptop: { x: 21, y: 20 },
      desktop: { x: 21, y: 20 },
      ultrawide: { x: 21, y: 20 }
    }
  },
  // LEFT SIDE - Column 3 (Row 1)
  {
    id: 'firstportfolio',
    title: 'First Portfolio',
    projectIndex: 2,
    icon: '/Projects/OldPortfolio/home.webp',
    size: { width: 55, height: 80 },
    positions: {
      mobile: { x: 28, y: 20 },
      tablet: { x: 28, y: 20 },
      laptop: { x: 28, y: 20 },
      desktop: { x: 28, y: 20 },
      ultrawide: { x: 28, y: 20 }
    }
  },
  // LEFT SIDE - Column 1 (Row 2)
  {
    id: 'cybercodex',
    title: 'CyberCodex.io',
    projectIndex: 1,
    icon: '/Projects/Cybercodex.io/courses.webp',
    size: { width: 55, height: 80 },
    positions: {
      mobile: { x: 14, y: 42 },
      tablet: { x: 14, y: 42 },
      laptop: { x: 14, y: 42 },
      desktop: { x: 14, y: 42 },
      ultrawide: { x: 14, y: 42 }
    }
  },
  // RIGHT SIDE - Column 1 (Row 1)
  {
    id: 'modernportfolio',
    title: 'Modern Portfolio',
    projectIndex: 6,
    icon: '/Projects/ModernPortfolio/home_page.webp',
    size: { width: 80, height: 80 },
    positions: {
      mobile: { x: 71, y: 20 },
      tablet: { x: 71, y: 20 },
      laptop: { x: 71, y: 20 },
      desktop: { x: 71, y: 20 },
      ultrawide: { x: 71, y: 20 }
    }
  },
  // RIGHT SIDE - Column 2 (Row 1)
  {
    id: 'ubiquitiunifi',
    title: 'Ubiquiti UniFi',
    projectIndex: 5,
    icon: '/Projects/Ubiquiti/unifi_main.webp',
    size: { width: 80, height: 80 },
    positions: {
      mobile: { x: 78, y: 20 },
      tablet: { x: 78, y: 20 },
      laptop: { x: 78, y: 20 },
      desktop: { x: 78, y: 20 },
      ultrawide: { x: 78, y: 20 }
    }
  },
  // RIGHT SIDE - Column 3 (Row 1)
  {
    id: 'retrosnake',
    title: 'Retro Snake',
    projectIndex: 7,
    icon: '/Projects/Snake/snake.webp',
    size: { width: 90, height: 80 },
    positions: {
      mobile: { x: 85, y: 20 },
      tablet: { x: 85, y: 20 },
      laptop: { x: 85, y: 20 },
      desktop: { x: 85, y: 20 },
      ultrawide: { x: 85, y: 20 }
    }
  },
  // RIGHT SIDE - Column 1 (Row 2)
  {
    id: 'proxmoxcluster',
    title: 'Proxmox Cluster',
    projectIndex: 8,
    icon: '/Projects/Proxmox/mainProxmox.webp',
    size: { width: 100, height: 80 },
    positions: {
      mobile: { x: 71, y: 42 },
      tablet: { x: 71, y: 42 },
      laptop: { x: 71, y: 42 },
      desktop: { x: 71, y: 42 },
      ultrawide: { x: 71, y: 42 }
    }
  },
  // RIGHT SIDE - Column 2 (Row 2)
  {
    id: 'serverRoom',
    title: 'Server Room (NPCE)',
    projectIndex: 4,
    icon: '/projects/BGCLCV/teenCenterPc.webp',
    size: { width: 80, height: 80 },
    positions: {
      mobile: { x: 80, y: 42 },
      tablet: { x: 80, y: 42 },
      laptop: { x: 80, y: 42 },
      desktop: { x: 80, y: 42 },
      ultrawide: { x: 80, y: 42 }
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
export const calculateIconPositions = (viewportWidth: number, viewportHeight: number): DesktopIconData[] => {
  // Calculate reserved bottom space as percentage of viewport height
  // Dock: ~5vh, Navigation: ~10vh
  const dockHeightVh = 5;
  const navHeightVh = 10;
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
        // Ensure icons stay within bounds and below the fixed nav bar (buttons end at ~62px + padding)
        x: Math.max(10, Math.min(xPos, viewportWidth - config.size.width - 10)),
        y: Math.max(80, Math.min(yPos, usableHeight - config.size.height - 10)),
      },
    };
  });
};

// Initial positions (fallback for SSR)
export const INITIAL_DESKTOP_ICONS: DesktopIconData[] = calculateIconPositions(1200, 800);

// Legacy fallback (kept for backwards compatibility)
export const DEFAULT_ICON_POSITIONS: DesktopIconData[] = INITIAL_DESKTOP_ICONS;

// Dock icons configuration
export const DOCK_ICONS: DockIcon[] = [
  { id: 'github', icon: '', label: 'GitHub', href: 'https://github.com/Jhymas20' },
  { id: 'tiktok', icon: '', label: 'TikTok', href: 'https://www.tiktok.com/@node.io' },
  { id: 'instagram', icon: '', label: 'Instagram', href: 'https://www.instagram.com/jordan.hymas/' },
  { id: 'linkedin', icon: '', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jordan-hymas/' },
  { id: 'notes', icon: '', label: 'Notes', href: '#', separator: true },
  { id: 'photos', icon: '', label: 'Photos', href: '#' },
  { id: 'email', icon: '', label: 'Mail', href: 'mailto:jordanhymas24@gmail.com' },
  { id: 'trash', icon: '🗑️', label: 'Trash', href: '#', separator: true },
];

export const WINDOW_INITIAL_POSITION = { x: 100, y: 50 };
export const WINDOW_Z_INDEX_START = 100; // Higher than dock (z-50) so windows appear on top
