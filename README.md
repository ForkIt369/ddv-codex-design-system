# 🔮 DDV Codex Design System

> A mathematically-harmonious design system for Web3 interfaces, based on sacred geometry and natural mathematical patterns.

[![Version](https://img.shields.io/npm/v/@ddv-codex/core)](https://www.npmjs.com/package/@ddv-codex/core)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Documentation](https://img.shields.io/badge/docs-live-brightgreen)](https://ddv-codex-docs.vercel.app)
[![Deploy Documentation](https://github.com/ForkIt369/ddv-codex-design-system/actions/workflows/deploy.yml/badge.svg)](https://github.com/ForkIt369/ddv-codex-design-system/actions/workflows/deploy.yml)

## 🌟 Overview

DDV Codex is a revolutionary design system that combines mathematical precision with intuitive user experience. Built on an 8px harmonic grid and the 24-point Icositetragon structure, it creates interfaces that feel naturally balanced and visually coherent.

### Key Features

- 📐 **Mathematical Foundation**: Based on sacred geometry and harmonic proportions
- 🎨 **Agent-Themed Colors**: Four distinct color themes for different AI personalities
- 🌙 **Dark-First Design**: Optimized for modern dark interfaces
- ♿ **Accessible by Default**: WCAG 2.2 AA compliant with AAA options
- 🚀 **Performance Optimized**: Lightweight tokens and efficient animations
- 📱 **Touch-First**: Designed for mobile and touch interfaces
- 🔧 **Framework Agnostic**: Works with React, Vue, Angular, and vanilla JS

## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@ddv-codex/core](./packages/core) | Core design tokens and utilities | ![npm](https://img.shields.io/npm/v/@ddv-codex/core) |
| [@ddv-codex/react](./packages/react) | React component library | ![npm](https://img.shields.io/npm/v/@ddv-codex/react) |
| [@ddv-codex/css](./packages/css) | Pure CSS implementation | ![npm](https://img.shields.io/npm/v/@ddv-codex/css) |
| [@ddv-codex/tailwind](./packages/tailwind) | Tailwind CSS plugin | ![npm](https://img.shields.io/npm/v/@ddv-codex/tailwind) |
| [@ddv-codex/figma](./packages/figma) | Figma design tokens | ![npm](https://img.shields.io/npm/v/@ddv-codex/figma) |

## 🚀 Quick Start

### Installation

```bash
# Core tokens
npm install @ddv-codex/core

# React components
npm install @ddv-codex/react

# Tailwind plugin
npm install @ddv-codex/tailwind
```

### Basic Usage

```jsx
import { Button, Input, Card } from '@ddv-codex/react';
import { tokens } from '@ddv-codex/core';

function App() {
  return (
    <Card agent="bigSis">
      <h1>Welcome to DDV Codex</h1>
      <Input 
        label="Enter your name" 
        placeholder="John Doe"
        agent="bigSis"
      />
      <Button variant="primary" agent="bigSis">
        Get Started
      </Button>
    </Card>
  );
}
```

## 📐 Core Principles

### 1. Mathematical Harmony

Everything in DDV Codex is based on mathematical relationships:

- **Base Unit**: 8px (Digital Root 8, 105° on the 24-point wheel)
- **Spacing Scale**: Harmonic progression (8, 16, 24, 32, 40, 48, 56, 64, 80, 96)
- **Typography**: Golden ratio scaling (φ = 1.618)
- **Animation**: 280ms base (approaching 1/φ² seconds)

### 2. Agent Color System

Four AI agents with distinct personalities and color themes:

| Agent | Color | Hex | Position | Personality |
|-------|-------|-----|----------|-------------|
| Big Sis | Cyan | `#00D4FF` | 6 (90°) | Analytics & Insights |
| Bro | Orange | `#FF9500` | 16 (240°) | Action & Energy |
| Lil Sis | Purple | `#D946EF` | 20 (300°) | Creativity & Innovation |
| CBO | Green | `#30D158` | 8 (120°) | Growth & Optimization |

### 3. Component Hierarchy

- **Prime Components**: Atomic elements (Button, Input, Badge)
- **Quasi-Prime**: Special properties (Tabs, Accordion)  
- **Composite**: Complex containers (Cards, Modals)
- **Features**: Full experiences (AgentChat, Dashboard)

## 📖 Documentation

- [Getting Started](./docs/getting-started.md)
- [Design Principles](./docs/principles.md)
- [Component Library](./docs/components.md)
- [Design Tokens](./docs/tokens.md)
- [Accessibility Guide](./docs/accessibility.md)
- [Migration Guide](./docs/migration.md)

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/ForkIt369/ddv-codex-design-system.git
cd ddv-codex-design-system

# Install dependencies
npm install

# Start development
npm run dev

# Build all packages
npm run build

# Run tests
npm test

# Start documentation site
npm run docs:dev
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Inspired by sacred geometry and mathematical harmony
- Built for the BroVerse ecosystem
- Special thanks to all contributors

---

<p align="center">
  <a href="https://ddv-codex-docs.vercel.app">Documentation</a> •
  <a href="https://github.com/ForkIt369/ddv-codex-design-system">GitHub</a> •
  <a href="https://twitter.com/ddvcodex">Twitter</a> •
  <a href="https://discord.gg/ddvcodex">Discord</a>
</p>