# DDV Codex Style Guide

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Animation & Motion](#animation--motion)
7. [Accessibility](#accessibility)
8. [Code Standards](#code-standards)
9. [Implementation Examples](#implementation-examples)

---

## Design Philosophy

DDV Codex is built on mathematical harmony and natural patterns. Every design decision is rooted in:

- **Sacred Geometry**: 24-point Icositetragon structure
- **Golden Ratio**: φ = 1.618 for proportions
- **Digital Roots**: Mathematical relationships between values
- **Harmonic Frequencies**: Agent colors based on √10 Hz progression

### Core Principles

1. **Mathematical Coherence**: All values relate harmonically
2. **Agent Personalities**: Four distinct AI themes
3. **Dark-First Design**: Optimized for modern interfaces
4. **Touch-First Interaction**: Mobile-optimized targets
5. **Accessibility by Default**: WCAG 2.2 AA compliance

---

## Color System

### Agent Colors

Each agent has a specific color mapped to the 24-point wheel:

```css
/* Big Sis - Analytics & Insights */
--color-bigsis-primary: #00D4FF;    /* Cyan - Position 6 (90°) */
--color-bigsis-secondary: #0051D5;   /* Deep Blue */
--color-bigsis-glow: rgba(0, 212, 255, 0.3);

/* Bro - Action & Energy */
--color-bro-primary: #FF9500;       /* Orange - Position 16 (240°) */
--color-bro-secondary: #FF6B00;     /* Deep Orange */
--color-bro-glow: rgba(255, 149, 0, 0.3);

/* Lil Sis - Creativity & Innovation */
--color-lilsis-primary: #D946EF;    /* Purple - Position 20 (300°) */
--color-lilsis-secondary: #7B2CBF;  /* Deep Purple */
--color-lilsis-glow: rgba(217, 70, 239, 0.3);

/* CBO - Growth & Optimization */
--color-cbo-primary: #30D158;       /* Green - Position 8 (120°) */
--color-cbo-secondary: #00C851;     /* Deep Green */
--color-cbo-glow: rgba(48, 209, 88, 0.3);
```

### Background Hierarchy

```css
--bg-primary: #0a0a0a;     /* Main background */
--bg-secondary: #1a1a1a;   /* Elevated surfaces */
--bg-tertiary: #2a2a2a;    /* Modal/dropdown backgrounds */
```

### Text Colors

```css
--text-primary: rgba(255, 255, 255, 0.9);    /* Main text */
--text-secondary: rgba(255, 255, 255, 0.7);  /* Secondary text */
--text-muted: rgba(255, 255, 255, 0.5);      /* Muted/disabled */
```

### Semantic Colors

```css
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

### Usage Examples

```jsx
// React
<Button agent="bigSis">Analytics</Button>
<Card className="border-bigsis-primary/20">Content</Card>

// CSS
.custom-element {
  color: var(--color-bigsis-primary);
  background: var(--bg-secondary);
  box-shadow: 0 0 24px var(--color-bigsis-glow);
}
```

---

## Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
--font-mono: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
```

### Type Scale (Golden Ratio)

| Name | Size | Line Height | Letter Spacing | Usage |
|------|------|-------------|----------------|-------|
| micro | 10px | 16px | 0.1px | Tiny labels |
| tiny | 12px | 19px | 0px | Captions |
| small | 14px | 23px | -0.1px | Secondary text |
| body | 16px | 26px | -0.2px | Main content |
| body-lg | 20px | 32px | -0.3px | Emphasized text |
| h4 | 26px | 42px | -0.67px | Section headers |
| h3 | 32px | 52px | -0.9px | Page sections |
| h2 | 42px | 68px | -1.2px | Major headers |
| h1 | 52px | 84px | -1.5px | Page titles |
| display | 68px | 110px | -2px | Hero text |

### Font Weights

```css
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;
```

### Usage Examples

```jsx
// React with Tailwind
<h1 className="text-h1 font-bold">Page Title</h1>
<p className="text-body text-secondary">Body content</p>

// CSS
.heading {
  font-size: var(--font-size-h2);
  font-weight: var(--font-semibold);
  line-height: 1.618;
  letter-spacing: -0.9px;
}
```

---

## Spacing & Layout

### 8px Harmonic Grid

All spacing follows multiples of 8px:

```css
--space-0: 0px;
--space-0.5: 4px;    /* Half unit */
--space-1: 8px;      /* Base unit */
--space-1.5: 12px;
--space-2: 16px;     /* Standard gap */
--space-3: 24px;     /* Section spacing */
--space-4: 32px;
--space-5: 40px;     /* Touch target */
--space-6: 48px;     /* Accessibility */
--space-8: 64px;     /* Major sections */
--space-10: 80px;
--space-12: 96px;
--space-16: 128px;
```

### Layout Patterns

#### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-3);
}
```

#### Grid System
```css
.grid {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(24, 1fr); /* 24-column base */
}

/* Responsive columns */
.col-12 { grid-column: span 12; } /* Half width */
.col-8 { grid-column: span 8; }   /* One third */
.col-6 { grid-column: span 6; }   /* One quarter */
```

#### Stack (Vertical spacing)
```jsx
<div className="space-y-2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Cluster (Horizontal spacing)
```jsx
<div className="flex gap-2">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</div>
```

---

## Components

### Component Anatomy

Every component follows this structure:

```jsx
// 1. Imports
import { forwardRef } from 'react';
import { cn } from '@ddv-codex/core';
import type { ComponentProps } from './types';

// 2. Component
export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, agent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'base-styles',
          // Variant styles
          variant && variantStyles[variant],
          // Size styles
          size && sizeStyles[size],
          // Agent styles
          agent && agentStyles[agent],
          // Custom classes
          className
        )}
        {...props}
      />
    );
  }
);

// 3. Display name
Component.displayName = 'Component';
```

### Component States

All interactive components support these states:

```css
/* Default */
.component {
  transition: all 280ms ease-out;
}

/* Hover */
.component:hover {
  transform: scale(1.01);
  background: rgba(255, 255, 255, 0.02);
}

/* Focus */
.component:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg-primary), 
              0 0 0 4px var(--color-primary);
}

/* Active */
.component:active {
  transform: scale(0.99);
}

/* Disabled */
.component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Animation & Motion

### Duration Scale

```css
--duration-instant: 140ms;   /* Micro interactions */
--duration-fast: 210ms;      /* Prime components */
--duration-base: 280ms;      /* Standard animations */
--duration-smooth: 350ms;    /* Composite components */
--duration-slow: 420ms;      /* Complex transitions */
--duration-deliberate: 560ms; /* Page transitions */
```

### Easing Functions

```css
/* Standard easings */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Golden ratio easings */
--ease-out-golden: cubic-bezier(0.382, 0, 0.618, 1);
--ease-in-golden: cubic-bezier(0.618, 0, 0.382, 1);
--ease-overshoot: cubic-bezier(0.382, 0, 1, 0.618);
```

### Animation Patterns

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Scale In */
@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide In */
@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(8px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Usage Examples

```jsx
// React
<div className="animate-in fade-in duration-base">
  Content fades in
</div>

<Button className="hover-scale transition-base">
  Scales on hover
</Button>

// CSS
.custom-animation {
  animation: fadeIn var(--duration-base) var(--ease-out);
}
```

---

## Accessibility

### Touch Targets

- **Minimum**: 40px × 40px (5 × 8px units)
- **Preferred**: 48px × 48px (6 × 8px units)

```css
.touch-target {
  min-height: 40px;
  min-width: 40px;
}

.touch-target-lg {
  min-height: 48px;
  min-width: 48px;
}
```

### Focus Management

```css
/* Visible focus indicators */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  left: -9999px;
}

.skip-link:focus {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
```

### ARIA Patterns

```jsx
// Button with loading state
<Button
  aria-label="Save changes"
  aria-busy={isLoading}
  aria-disabled={isDisabled}
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>

// Form field with error
<Input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : 'helper-text'}
/>
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Code Standards

### File Structure

```
component/
├── Component.tsx        # Main component
├── Component.types.ts   # TypeScript types
├── Component.styles.ts  # Styled components (if used)
├── Component.test.tsx   # Tests
├── Component.stories.tsx # Storybook stories
└── index.ts            # Exports
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `InputField`)
- **Props**: camelCase (`isDisabled`, `onChange`)
- **CSS Classes**: kebab-case (`button-primary`, `input-error`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LENGTH`, `DEFAULT_VALUE`)

### TypeScript

```typescript
// Always define props interface
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  agent?: Agent;
  children: React.ReactNode;
}

// Use const assertions for constants
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48,
} as const;

// Prefer type over interface for unions
type Status = 'idle' | 'loading' | 'success' | 'error';
```

### CSS-in-JS

```typescript
// Use design tokens
const buttonStyles = {
  padding: `${tokens.spacing[2]}px ${tokens.spacing[3]}px`,
  fontSize: tokens.typography.fontSize.base,
  transition: `all ${tokens.animation.duration.base}ms ${tokens.animation.easing.easeOut}`,
};

// Prefer composition
const primaryButton = {
  ...buttonStyles,
  background: tokens.colors.agents.bigSis.primary,
  color: tokens.colors.text.primary,
};
```

---

## Implementation Examples

### Complete Button Component

```tsx
import { forwardRef } from 'react';
import { cn } from '@ddv-codex/core';
import type { ButtonProps } from './Button.types';

const variantStyles = {
  primary: 'bg-agent-primary text-white hover:bg-agent-primary/90',
  secondary: 'bg-glass-2 text-agent-primary hover:bg-glass-3',
  ghost: 'bg-transparent hover:bg-glass-1',
  danger: 'bg-error text-white hover:bg-error/90',
};

const sizeStyles = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
};

const agentStyles = {
  bigSis: '[--agent-primary:theme(colors.bigsis.primary)]',
  bro: '[--agent-primary:theme(colors.bro.primary)]',
  lilSis: '[--agent-primary:theme(colors.lilsis.primary)]',
  cbo: '[--agent-primary:theme(colors.cbo.primary)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className,
    variant = 'primary',
    size = 'md',
    agent = 'bigSis',
    disabled,
    loading,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-md',
          'transition-all duration-base',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Agent styles
          agentStyles[agent],
          // Loading state
          loading && 'cursor-wait',
          // Custom classes
          className
        )}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span className="animate-spin">⟳</span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Using the Design System

```tsx
import { Button, Card, Input } from '@ddv-codex/react';
import { tokens } from '@ddv-codex/core';

function LoginForm() {
  return (
    <Card agent="bigSis" className="max-w-md mx-auto">
      <form className="space-y-4">
        <Input
          label="Username"
          placeholder="Enter your username"
          agent="bigSis"
          required
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          agent="bigSis"
          required
        />
        
        <div className="flex gap-2">
          <Button 
            type="submit" 
            agent="bigSis"
            fullWidth
          >
            Sign In
          </Button>
          
          <Button 
            type="button"
            variant="ghost"
            agent="bigSis"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
```

---

## Conclusion

The DDV Codex Style Guide provides a mathematically-grounded approach to creating harmonious, accessible, and beautiful interfaces. By following these principles and patterns, you'll create experiences that feel natural and inevitable.

Remember: Great design emerges from the intersection of mathematical precision and human intuition.