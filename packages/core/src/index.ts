/**
 * DDV Codex Core
 * Design tokens and utilities for mathematically-harmonious interfaces
 */

export * from './tokens';
export * from './types';
export * from './utils';

// Version
export const version = '1.0.0';

// Core configuration
export const config = {
  theme: 'dark',
  agent: 'bigSis',
  respectMotionPreference: true,
  enableGlassmorphism: true,
  enableAgentThemes: true,
} as const;