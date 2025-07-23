/**
 * DDV Codex Design Tokens
 * Mathematical harmony for Web3 interfaces
 */

// Mathematical Constants
export const GOLDEN_RATIO = 1.618;
export const BASE_UNIT = 8;
export const ICOSITETRAGON_POINTS = 24;

// Color System
export const colors = {
  // Agent Colors
  agents: {
    bigSis: {
      primary: '#00D4FF',
      secondary: '#0051D5',
      glow: 'rgba(0, 212, 255, 0.3)',
      position: 6,
      angle: 90,
      frequency: 3.16, // √10 Hz
    },
    bro: {
      primary: '#FF9500',
      secondary: '#FF6B00',
      glow: 'rgba(255, 149, 0, 0.3)',
      position: 16,
      angle: 240,
      frequency: 6.32, // 2√10 Hz
    },
    lilSis: {
      primary: '#D946EF',
      secondary: '#7B2CBF',
      glow: 'rgba(217, 70, 239, 0.3)',
      position: 20,
      angle: 300,
      frequency: 9.49, // 3√10 Hz
    },
    cbo: {
      primary: '#30D158',
      secondary: '#00C851',
      glow: 'rgba(48, 209, 88, 0.3)',
      position: 8,
      angle: 120,
      frequency: 12.65, // 4√10 Hz
    },
  },
  
  // Background Colors
  background: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text Colors
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.4)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Glass Effects
  glass: {
    background: {
      1: 'rgba(255, 255, 255, 0.01)',
      2: 'rgba(255, 255, 255, 0.02)',
      3: 'rgba(255, 255, 255, 0.04)',
    },
    border: {
      1: 'rgba(255, 255, 255, 0.05)',
      2: 'rgba(255, 255, 255, 0.08)',
      3: 'rgba(255, 255, 255, 0.12)',
    },
  },
  
  // Semantic Colors
  semantic: {
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
  },
} as const;

// Spacing System (8px base)
export const spacing = {
  0: 0,
  0.5: 4,
  1: BASE_UNIT,
  1.5: 12,
  2: 16,
  2.5: 20,
  3: 24,
  3.5: 28,
  4: 32,
  4.5: 36,
  5: 40, // Touch target minimum
  5.5: 44,
  6: 48, // Touch target preferred
  7: 56,
  8: 64,
  9: 72,
  10: 80,
  11: 88,
  12: 96,
  14: 112,
  16: 128,
  20: 160,
  24: 192,
  32: 256,
  40: 320,
  48: 384,
  56: 448,
  64: 512,
} as const;

// Typography System
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    mono: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
  },
  
  fontSize: {
    micro: 10,
    tiny: 12,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 26,
    '2xl': 32,
    '3xl': 42,
    '4xl': 52,
    display: 68,
    hero: 84,
  },
  
  lineHeight: {
    tight: 1.2,
    snug: 1.4,
    normal: GOLDEN_RATIO,
    relaxed: 1.8,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
  },
  
  fontWeight: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
} as const;

// Animation System
export const animation = {
  duration: {
    instant: 140,
    fast: 210,
    base: 280,
    smooth: 350,
    slow: 420,
    deliberate: 560,
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Golden ratio easings
    easeOutGolden: 'cubic-bezier(0.382, 0, 0.618, 1)',
    easeInGolden: 'cubic-bezier(0.618, 0, 0.382, 1)',
    easeOvershoot: 'cubic-bezier(0.382, 0, 1, 0.618)',
  },
} as const;

// Border Radius
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 16px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.16)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.20)',
  '2xl': '0 24px 64px rgba(0, 0, 0, 0.24)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

// Blur Values
export const blur = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

// Z-Index Scale (powers of 2)
export const zIndex = {
  base: 1,
  dropdown: 2,
  sticky: 4,
  fixed: 8,
  modal: 16,
  popover: 32,
  tooltip: 64,
  max: 128,
} as const;

// Breakpoints
export const breakpoints = {
  mobile: 320,
  mobileL: 425,
  tablet: 640,
  tabletL: 768,
  laptop: 1024,
  desktop: 1366,
  wide: 1920,
} as const;

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: spacing[4],
      md: spacing[5],
      lg: spacing[6],
    },
    padding: {
      sm: spacing[2],
      md: spacing[3],
      lg: spacing[4],
    },
  },
  
  input: {
    height: {
      sm: spacing[4],
      md: spacing[5],
      lg: spacing[6],
    },
  },
  
  card: {
    padding: {
      sm: spacing[2],
      md: spacing[3],
      lg: spacing[4],
    },
  },
  
  modal: {
    width: {
      sm: 384,
      md: 512,
      lg: 768,
      xl: 1024,
    },
  },
} as const;

// Utility functions
export function harmonicSpacing(multiplier: number): number {
  return BASE_UNIT * multiplier;
}

export function goldenRatio(base: number, power: number = 1): number {
  return Math.round(base * Math.pow(GOLDEN_RATIO, power));
}

export function digitalRoot(n: number): number {
  return n === 0 ? 0 : 1 + ((n - 1) % 9);
}

export function icositetragonPosition(n: number): number {
  return ((n - 1) % ICOSITETRAGON_POINTS) + 1;
}

export function angleFromPosition(position: number): number {
  return ((position - 1) * 360) / ICOSITETRAGON_POINTS;
}

// Export all tokens as a single object
export const tokens = {
  colors,
  spacing,
  typography,
  animation,
  borderRadius,
  shadows,
  blur,
  zIndex,
  breakpoints,
  components,
} as const;

export type Tokens = typeof tokens;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type Animation = typeof animation;