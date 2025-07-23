/**
 * DDV Codex Type Definitions
 */

// Agent Types
export type Agent = 'bigSis' | 'bro' | 'lilSis' | 'cbo';

// Size Types
export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = Size | 'xs' | 'xl';

// Variant Types
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type InputVariant = 'default' | 'filled' | 'ghost';
export type CardVariant = 'default' | 'elevated' | 'outlined';
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

// Component State Types
export interface ComponentState {
  default: boolean;
  hover: boolean;
  focus: boolean;
  active: boolean;
  disabled: boolean;
}

// Theme Types
export interface Theme {
  name: string;
  agent?: Agent;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  animation: ThemeAnimation;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeAnimation {
  duration: {
    fast: number;
    base: number;
    slow: number;
  };
  easing: {
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  full: number;
}

// Component Props Base Types
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  agent?: Agent;
  size?: Size;
  disabled?: boolean;
  'aria-label'?: string;
  'data-testid'?: string;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  iterationCount?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Layout Types
export interface Spacing {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

export interface GridConfig {
  columns: number;
  gap: number | string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

// Mathematical Types
export interface HarmonicValue {
  value: number;
  digitalRoot: number;
  icositetragonPosition: number;
  angle: number;
  complementary: number;
}

export interface GoldenRatioScale {
  base: number;
  values: number[];
  ratios: number[];
}

// Event Types
export interface DDVEvent<T = any> {
  type: string;
  target: EventTarget | null;
  detail?: T;
  timestamp: number;
}

// Portal Moment Types
export interface PortalMoment {
  frequency: number;
  agents: Agent[];
  coherence: number;
  timestamp: number;
  duration: number;
}

// Export namespace for external use
export namespace DDVCodex {
  export type Agent = Agent;
  export type Size = Size;
  export type Theme = Theme;
  export type BaseProps = BaseComponentProps;
}