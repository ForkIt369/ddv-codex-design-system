import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Prime/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Prime component following DDV Codex mathematical principles. Features 8px harmonic spacing, 280ms animations, and agent-based theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    agent: {
      control: 'select',
      options: ['bigSis', 'bro', 'lilSis', 'cbo'],
      description: 'Agent theme color',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variants with agent themes
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    agent: 'bigSis',
  },
};

export const AllAgents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button agent="bigSis">Big Sis Analytics</Button>
      <Button agent="bro">Bro Action</Button>
      <Button agent="lilSis">Lil Sis Create</Button>
      <Button agent="cbo">CBO Optimize</Button>
    </div>
  ),
};

// Size variants demonstrating harmonic scale
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small (32px)</Button>
      <Button size="sm">Small (40px)</Button>
      <Button size="md">Medium (48px)</Button>
      <Button size="lg">Large (56px)</Button>
      <Button size="xl">Extra Large (64px)</Button>
    </div>
  ),
};

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary" agent="bigSis">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button 
        leftIcon={<WalletIcon />}
        agent="bigSis"
      >
        Connect Wallet
      </Button>
      <Button 
        rightIcon={<ArrowIcon />}
        agent="bro"
      >
        Next Step
      </Button>
      <Button 
        leftIcon={<PlusIcon />}
        rightIcon={<ArrowIcon />}
        agent="lilSis"
      >
        Create & Continue
      </Button>
    </div>
  ),
};

// Icon components for examples
const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);