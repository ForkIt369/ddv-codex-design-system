import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>🔮 DDV Codex</span>,
  project: {
    link: 'https://github.com/ForkIt369/ddv-codex-design-system',
  },
  chat: {
    link: 'https://discord.gg/ddvcodex',
  },
  docsRepositoryBase: 'https://github.com/ForkIt369/ddv-codex-design-system/tree/main/site',
  footer: {
    text: 'DDV Codex Design System - Mathematical Harmony for Web3',
  },
  primaryHue: 195, // Cyan hue for Big Sis
  darkMode: true,
  navigation: true,
  sidebar: {
    toggleButton: true,
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    float: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – DDV Codex'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="DDV Codex Design System" />
      <meta property="og:description" content="A mathematically-harmonious design system for Web3 interfaces" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
}

export default config