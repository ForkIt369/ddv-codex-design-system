#!/bin/bash

# DDV Codex Design System - Worktree Setup Script
# This creates separate worktrees for different development streams

echo "🔮 Setting up DDV Codex worktrees..."

# Create worktrees directory
mkdir -p ../ddv-codex-worktrees

# Create feature development worktree
echo "📦 Creating components worktree..."
git worktree add ../ddv-codex-worktrees/components -b feature/components

# Create documentation worktree
echo "📚 Creating documentation worktree..."
git worktree add ../ddv-codex-worktrees/docs -b feature/documentation

# Create design tokens worktree
echo "🎨 Creating design tokens worktree..."
git worktree add ../ddv-codex-worktrees/tokens -b feature/tokens

# List all worktrees
echo -e "\n✅ Worktrees created successfully!\n"
git worktree list

echo -e "\n📁 Directory structure:"
echo "ddv-codex-design-system/     # Main branch (production)"
echo "ddv-codex-worktrees/"
echo "  ├── components/            # Component development"
echo "  ├── docs/                  # Documentation updates"
echo "  └── tokens/                # Design token updates"

echo -e "\n🚀 Usage:"
echo "cd ../ddv-codex-worktrees/components  # Work on components"
echo "cd ../ddv-codex-worktrees/docs        # Work on documentation"
echo "cd ../ddv-codex-worktrees/tokens      # Work on design tokens"