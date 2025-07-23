import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  WalletConnect,
  Tooltip,
  TooltipContent,
  MetricCard,
  MetricIcons,
} from '../packages/react/src/components';

/**
 * DDV Codex Design System - Component Showcase
 * 
 * This showcase demonstrates the mathematical harmony and agent-based theming
 * of the DDV Codex Design System. Each component follows:
 * 
 * - 8px harmonic grid spacing
 * - 280ms animation timing
 * - 40px minimum touch targets
 * - Agent-specific color theming
 * - Dark-first design principles
 */
export const Showcase = () => {
  const [selectedAgent, setSelectedAgent] = useState<'bigSis' | 'bro' | 'lilSis' | 'cbo'>('bigSis');

  // Mock wallet connection
  const handleWalletConnect = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f6BED7',
      balance: '4.2069',
      network: 'Ethereum Mainnet',
      ens: 'broverse.eth',
    };
  };

  // Mock sparkline data
  const sparklineData = [45, 52, 48, 62, 58, 71, 65, 78, 82, 88, 85, 92];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          DDV Codex Component Showcase
        </h1>
        <p className="text-xl text-gray-400">
          Mathematical harmony meets Web3 innovation
        </p>
      </div>

      {/* Agent Selector */}
      <div className="max-w-7xl mx-auto mb-12">
        <Card padding="sm">
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Select Agent Theme:</span>
              <div className="flex gap-2">
                <Button
                  agent="bigSis"
                  variant={selectedAgent === 'bigSis' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedAgent('bigSis')}
                >
                  Big Sis
                </Button>
                <Button
                  agent="bro"
                  variant={selectedAgent === 'bro' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedAgent('bro')}
                >
                  Bro
                </Button>
                <Button
                  agent="lilSis"
                  variant={selectedAgent === 'lilSis' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedAgent('lilSis')}
                >
                  Lil Sis
                </Button>
                <Button
                  agent="cbo"
                  variant={selectedAgent === 'cbo' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedAgent('cbo')}
                >
                  CBO
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Sections */}
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Prime Components */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Prime Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Button Examples */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Button</CardTitle>
                <CardDescription>
                  Atomic interaction element with agent theming
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button agent={selectedAgent} size="lg">
                  Primary Action
                </Button>
                <Button agent={selectedAgent} variant="secondary">
                  Secondary Action
                </Button>
                <div className="flex gap-2">
                  <Button agent={selectedAgent} size="sm" variant="tertiary">
                    Small
                  </Button>
                  <Button agent={selectedAgent} size="sm" variant="ghost">
                    Ghost
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500">
                  Sizes: 32px, 40px, 48px, 56px, 64px
                </p>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Composite Components */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Composite Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Variations */}
            <Card agent={selectedAgent} variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>
                  Container with shadow elevation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards support multiple variants including default, elevated, interactive, and glowing styles.</p>
              </CardContent>
            </Card>

            <Card agent={selectedAgent} variant="glowing" glowIntensity="medium">
              <CardHeader>
                <CardTitle>Glowing Card</CardTitle>
                <CardDescription>
                  Agent-themed glow effect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Perfect for highlighting important content or active states.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quasi-Prime Components */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Quasi-Prime Components</h2>
          <div className="flex gap-4 flex-wrap">
            <Tooltip
              content={<TooltipContent
                title="Tooltip Title"
                description="Additional context and information displayed on hover."
                shortcut="⌘K"
              />}
              agent={selectedAgent}
            >
              <Button agent={selectedAgent} variant="secondary">
                Hover for Tooltip
              </Button>
            </Tooltip>

            <Tooltip
              content="Simple tooltip content"
              agent={selectedAgent}
              placement="bottom"
            >
              <Button agent={selectedAgent} variant="secondary">
                Bottom Placement
              </Button>
            </Tooltip>

            <Tooltip
              content="Interactive tooltip - hover over me!"
              agent={selectedAgent}
              interactive
            >
              <Button agent={selectedAgent} variant="secondary">
                Interactive
              </Button>
            </Tooltip>
          </div>
        </section>

        {/* Feature Components */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Feature Components</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Wallet Connection</h3>
              <div className="flex gap-4 flex-wrap">
                <WalletConnect
                  agent={selectedAgent}
                  onConnect={handleWalletConnect}
                  onDisconnect={async () => {}}
                />
                <WalletConnect
                  agent={selectedAgent}
                  onConnect={handleWalletConnect}
                  onDisconnect={async () => {}}
                  compactMode
                />
              </div>
            </div>
          </div>
        </section>

        {/* Data Visualization */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Data Visualization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <MetricCard
              title="Total Revenue"
              value="$124.5K"
              change={12.5}
              changeLabel="vs last month"
              icon={<MetricIcons.Revenue />}
              agent={selectedAgent}
              tooltip={{
                title: "Revenue Metrics",
                description: "Total revenue across all products and services"
              }}
            />
            
            <MetricCard
              title="Active Users"
              value="8,429"
              change={-3.2}
              subtitle="2.4K new this week"
              icon={<MetricIcons.Users />}
              agent={selectedAgent}
              variant="compact"
            />
            
            <MetricCard
              title="Performance Score"
              value="94.2"
              change={8.7}
              icon={<MetricIcons.Performance />}
              agent={selectedAgent}
              variant="detailed"
              sparklineData={sparklineData}
            />
            
            <MetricCard
              title="Transactions"
              value="1.2M"
              change={0}
              trend="neutral"
              icon={<MetricIcons.Transactions />}
              agent={selectedAgent}
            />
          </div>
        </section>

        {/* Mathematical Principles */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Mathematical Foundation</h2>
          <Card variant="elevated">
            <CardContent className="space-y-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">8px Harmonic Grid</h3>
                  <div className="flex gap-2 items-end">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(multiplier => (
                      <div
                        key={multiplier}
                        className="bg-gradient-to-t from-cyan-500/50 to-transparent"
                        style={{
                          width: '24px',
                          height: `${multiplier * 8}px`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    All spacing follows 8px base unit
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">280ms Animation</h3>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Approaching 1/φ² seconds (0.382s)
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Golden Ratio Typography</h3>
                  <div className="space-y-1">
                    <div className="text-3xl">Heading</div>
                    <div className="text-xl">Subheading</div>
                    <div className="text-base">Body Text</div>
                    <div className="text-sm">Caption</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};