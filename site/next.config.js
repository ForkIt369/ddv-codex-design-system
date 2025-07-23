const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  reactStrictMode: true,
  transpilePackages: ['@ddv-codex/core', '@ddv-codex/react'],
})