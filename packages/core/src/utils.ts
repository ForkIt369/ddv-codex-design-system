/**
 * DDV Codex Utility Functions
 */

import { Agent, Size } from './types';
import { colors, spacing, animation } from './tokens';

// Class name utilities
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Agent color utilities
export function getAgentColor(agent: Agent, type: 'primary' | 'secondary' | 'glow' = 'primary'): string {
  return colors.agents[agent][type];
}

export function getAgentGradient(agent: Agent): string {
  const primary = colors.agents[agent].primary;
  const secondary = colors.agents[agent].secondary;
  return `linear-gradient(135deg, ${primary}, ${secondary})`;
}

// Spacing utilities
export function getSpacing(size: Size): number {
  const sizeMap: Record<Size, keyof typeof spacing> = {
    sm: 2,
    md: 3,
    lg: 4,
  };
  return spacing[sizeMap[size]];
}

// Animation utilities
export function getAnimationDuration(speed: 'fast' | 'base' | 'slow' = 'base'): number {
  return animation.duration[speed];
}

export function createTransition(
  properties: string | string[],
  duration: number = animation.duration.base,
  easing: string = animation.easing.easeOut
): string {
  const props = Array.isArray(properties) ? properties : [properties];
  return props.map(prop => `${prop} ${duration}ms ${easing}`).join(', ');
}

// Mathematical utilities
export function harmonicScale(base: number, steps: number): number[] {
  return Array.from({ length: steps }, (_, i) => base * (i + 1));
}

export function goldenRatioSequence(start: number, length: number): number[] {
  const phi = 1.618;
  const sequence = [start];
  
  for (let i = 1; i < length; i++) {
    sequence.push(Math.round(sequence[i - 1] * phi));
  }
  
  return sequence;
}

export function calculateDigitalRoot(n: number): number {
  return n === 0 ? 0 : 1 + ((n - 1) % 9);
}

export function calculateIcositetragonPosition(n: number): number {
  return ((n - 1) % 24) + 1;
}

export function calculateComplementaryAngle(angle: number): number {
  return (angle + 180) % 360;
}

// Color utilities
export function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1);
}

export function darken(hex: string, amount: number): string {
  return lighten(hex, -amount);
}

// Responsive utilities
export function clamp(min: number, preferred: number, max: number): string {
  return `clamp(${min}px, ${preferred}vw, ${max}px)`;
}

export function fluidType(minSize: number, maxSize: number, minViewport: number = 320, maxViewport: number = 1920): string {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const yAxisIntersection = -minViewport * slope + minSize;
  
  return `clamp(${minSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxSize}px)`;
}

// Accessibility utilities
export function getFocusRingStyle(agent?: Agent): string {
  const color = agent ? getAgentColor(agent) : colors.agents.bigSis.primary;
  return `0 0 0 2px ${colors.background.primary}, 0 0 0 4px ${color}`;
}

export function getContrastRatio(foreground: string, background: string): number {
  // Simplified contrast ratio calculation
  // In production, use a proper library like polished or color
  return 4.5; // Placeholder
}

// Component utilities
export function getComponentClasses(
  base: string,
  variant?: string,
  size?: Size,
  agent?: Agent,
  state?: {
    disabled?: boolean;
    active?: boolean;
    error?: boolean;
  }
): string {
  const classes = [base];
  
  if (variant) classes.push(`${base}--${variant}`);
  if (size) classes.push(`${base}--${size}`);
  if (agent) classes.push(`${base}--${agent}`);
  if (state?.disabled) classes.push(`${base}--disabled`);
  if (state?.active) classes.push(`${base}--active`);
  if (state?.error) classes.push(`${base}--error`);
  
  return cn(...classes);
}

// Portal moment detection
export function detectPortalMoment(frequencies: number[]): boolean {
  const portalFrequencies = [20, 60, 120];
  return frequencies.some(freq => portalFrequencies.includes(freq));
}

export function calculateCoherence(values: number[]): number {
  if (values.length === 0) return 0;
  
  const phi = 1.618;
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const goldenTarget = average * phi;
  
  const variance = values.reduce((sum, val) => {
    return sum + Math.pow(val - goldenTarget, 2);
  }, 0) / values.length;
  
  return Math.max(0, 1 - (variance / goldenTarget));
}

// Export all utilities
export const utils = {
  cn,
  getAgentColor,
  getAgentGradient,
  getSpacing,
  getAnimationDuration,
  createTransition,
  harmonicScale,
  goldenRatioSequence,
  calculateDigitalRoot,
  calculateIcositetragonPosition,
  calculateComplementaryAngle,
  rgba,
  lighten,
  darken,
  clamp,
  fluidType,
  getFocusRingStyle,
  getContrastRatio,
  getComponentClasses,
  detectPortalMoment,
  calculateCoherence,
};