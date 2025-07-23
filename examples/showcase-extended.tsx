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
  Input,
  Select,
  Modal,
  ModalActions,
  ConfirmModal,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ProgressBar,
  CircularProgress,
} from '../packages/react/src/components';

/**
 * DDV Codex Design System - Extended Component Showcase
 * 
 * This expanded showcase demonstrates all 10 implemented components
 * following the mathematical harmony and agent-based theming of the
 * DDV Codex Design System.
 */
export const ExtendedShowcase = () => {
  const [selectedAgent, setSelectedAgent] = useState<'bigSis' | 'bro' | 'lilSis' | 'cbo'>('bigSis');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(65);

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

  // Select options
  const networkOptions = [
    { value: 'eth', label: 'Ethereum', icon: '🔷' },
    { value: 'polygon', label: 'Polygon', icon: '🟣' },
    { value: 'arbitrum', label: 'Arbitrum', icon: '🔵' },
    { value: 'optimism', label: 'Optimism', icon: '🔴' },
    { value: 'base', label: 'Base', icon: '🟦', description: 'Coinbase L2' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          DDV Codex Extended Showcase
        </h1>
        <p className="text-xl text-gray-400">
          10 components demonstrating mathematical harmony in Web3
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
            {/* Input Examples */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>
                  Form input with validation states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Username"
                  placeholder="Enter username"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  agent={selectedAgent}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  helper="Choose a unique username"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  agent={selectedAgent}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  agent={selectedAgent}
                  error="Invalid email address"
                  onClear={() => {}}
                />
              </CardContent>
            </Card>

            {/* Select Examples */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>
                  Dropdown selection with search
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  label="Network"
                  options={networkOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Choose network"
                  agent={selectedAgent}
                />
                <Select
                  label="Searchable"
                  options={networkOptions}
                  placeholder="Search networks..."
                  agent={selectedAgent}
                  searchable
                  helper="Type to search"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Composite Components */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Composite Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Modal Example */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Modal</CardTitle>
                <CardDescription>
                  Dialog windows with focus management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  agent={selectedAgent}
                  onClick={() => setModalOpen(true)}
                >
                  Open Modal
                </Button>
                <Button
                  agent={selectedAgent}
                  variant="secondary"
                  onClick={() => setConfirmModalOpen(true)}
                >
                  Open Confirm Modal
                </Button>
              </CardContent>
            </Card>

            {/* Tabs Example */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Tabs</CardTitle>
                <CardDescription>
                  Tabbed interface with multiple variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" agent={selectedAgent}>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <p className="text-sm text-gray-400">
                      Overview content with general information.
                    </p>
                  </TabsContent>
                  <TabsContent value="analytics">
                    <p className="text-sm text-gray-400">
                      Analytics and performance metrics.
                    </p>
                  </TabsContent>
                  <TabsContent value="settings">
                    <p className="text-sm text-gray-400">
                      Configuration and preferences.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Visualization */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Data Visualization</h2>
          <div className="space-y-8">
            {/* Progress Bars */}
            <Card agent={selectedAgent}>
              <CardHeader>
                <CardTitle>Progress Indicators</CardTitle>
                <CardDescription>
                  Linear and circular progress visualization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ProgressBar
                  value={progress}
                  label="Upload Progress"
                  showValue
                  agent={selectedAgent}
                />
                
                <ProgressBar
                  value={75}
                  label="Striped & Animated"
                  showValue
                  striped
                  animated
                  agent={selectedAgent}
                />

                <ProgressBar
                  value={100}
                  segments={[
                    { value: 30, color: '#00D4FF', label: 'Completed' },
                    { value: 45, color: '#FF9500', label: 'In Progress' },
                    { value: 25, color: '#D946EF', label: 'Pending' },
                  ]}
                  label="Multi-segment Progress"
                  showValue
                />

                <div className="flex items-center gap-8 mt-6">
                  <CircularProgress
                    value={progress}
                    agent={selectedAgent}
                    label="CPU Usage"
                    animated
                  />
                  <CircularProgress
                    value={88}
                    agent="bro"
                    label="Memory"
                    size={80}
                  />
                  <CircularProgress
                    value={42}
                    agent="lilSis"
                    label="Storage"
                    size={96}
                    strokeWidth={6}
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    agent={selectedAgent}
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    agent={selectedAgent}
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Component Count Summary */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Implementation Progress</h2>
          <Card variant="elevated">
            <CardContent className="py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-cyan-500">3</div>
                  <div className="text-sm text-gray-400 mt-2">Prime Components</div>
                  <div className="text-xs text-gray-500 mt-1">Button, Input, Select</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-500">2</div>
                  <div className="text-sm text-gray-400 mt-2">Composite Components</div>
                  <div className="text-xs text-gray-500 mt-1">Card, Modal</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-500">2</div>
                  <div className="text-sm text-gray-400 mt-2">Quasi-Prime Components</div>
                  <div className="text-xs text-gray-500 mt-1">Tooltip, Tabs</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-500">3</div>
                  <div className="text-sm text-gray-400 mt-2">Feature & Data Viz</div>
                  <div className="text-xs text-gray-500 mt-1">WalletConnect, MetricCard, ProgressBar</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <ProgressBar
                  value={10}
                  max={120}
                  label="Overall Progress"
                  showValue
                  size="lg"
                  agent={selectedAgent}
                />
                <p className="text-sm text-gray-400 mt-2">
                  10 of 120 components implemented (8.3%)
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Component Details"
        description="Explore the DDV Codex Design System"
        agent={selectedAgent}
        footer={
          <ModalActions>
            <Button
              variant="ghost"
              agent={selectedAgent}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              agent={selectedAgent}
              onClick={() => setModalOpen(false)}
            >
              Continue
            </Button>
          </ModalActions>
        }
      >
        <div className="space-y-4">
          <p>
            The DDV Codex Design System implements mathematical harmony through:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
            <li>8px base unit for all spacing</li>
            <li>280ms animation timing (approaching 1/φ²)</li>
            <li>40px minimum touch targets (WCAG AA)</li>
            <li>Agent-based color theming</li>
            <li>24-point Icositetragon mathematical foundation</li>
          </ul>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Delete Component?"
        message="Are you sure you want to delete this component? This action cannot be undone."
        onConfirm={() => console.log('Confirmed!')}
        variant="danger"
        agent={selectedAgent}
      />
    </div>
  );
};