import React, { useState, forwardRef } from 'react';
import { Button } from '../Button/Button';
import { Card, CardContent } from '../Card/Card';
import { cn } from '../../utils/cn';

interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  ens?: string;
}

export interface WalletConnectProps {
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
  onConnect?: () => Promise<WalletInfo>;
  onDisconnect?: () => Promise<void>;
  className?: string;
  showBalance?: boolean;
  showNetwork?: boolean;
  compactMode?: boolean;
}

export const WalletConnect = forwardRef<HTMLDivElement, WalletConnectProps>(
  ({ 
    agent = 'bigSis',
    onConnect,
    onDisconnect,
    className,
    showBalance = true,
    showNetwork = true,
    compactMode = false,
  }, ref) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleConnect = async () => {
      setIsConnecting(true);
      try {
        if (onConnect) {
          const info = await onConnect();
          setWalletInfo(info);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    };

    const handleDisconnect = async () => {
      try {
        if (onDisconnect) {
          await onDisconnect();
        }
        setWalletInfo(null);
        setIsConnected(false);
        setShowDropdown(false);
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    };

    const formatAddress = (address: string) => {
      if (address.length <= 10) return address;
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (!isConnected) {
      return (
        <Button
          ref={ref as any}
          agent={agent}
          onClick={handleConnect}
          loading={isConnecting}
          leftIcon={<WalletIcon />}
          className={className}
          size={compactMode ? 'sm' : 'md'}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      );
    }

    if (compactMode) {
      return (
        <div ref={ref} className={cn('relative', className)}>
          <Button
            agent={agent}
            variant="secondary"
            onClick={() => setShowDropdown(!showDropdown)}
            size="sm"
            className="min-w-[160px]"
          >
            <div className="flex items-center gap-2">
              <StatusDot agent={agent} />
              <span className="font-mono text-sm">
                {walletInfo?.ens || formatAddress(walletInfo?.address || '')}
              </span>
            </div>
          </Button>

          {showDropdown && (
            <DropdownMenu
              agent={agent}
              walletInfo={walletInfo}
              showBalance={showBalance}
              showNetwork={showNetwork}
              onDisconnect={handleDisconnect}
              onClose={() => setShowDropdown(false)}
            />
          )}
        </div>
      );
    }

    return (
      <Card
        ref={ref}
        agent={agent}
        variant="elevated"
        padding="sm"
        className={cn('min-w-[320px]', className)}
      >
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusDot agent={agent} size="lg" />
              <div>
                <p className="text-xs text-gray-400">Connected</p>
                <p className="font-mono text-sm font-medium">
                  {walletInfo?.ens || formatAddress(walletInfo?.address || '')}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="text-gray-400 hover:text-white"
            >
              Disconnect
            </Button>
          </div>

          {(showBalance || showNetwork) && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              {showBalance && (
                <div>
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="font-mono text-lg font-semibold">
                    {walletInfo?.balance || '0.00'} ETH
                  </p>
                </div>
              )}
              {showNetwork && (
                <div>
                  <p className="text-xs text-gray-400">Network</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <NetworkIcon network={walletInfo?.network} />
                    {walletInfo?.network || 'Unknown'}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

WalletConnect.displayName = 'WalletConnect';

// Status indicator component
const StatusDot = ({ agent, size = 'md' }: { agent: string; size?: 'md' | 'lg' }) => {
  const sizeClasses = size === 'lg' ? 'w-3 h-3' : 'w-2 h-2';
  const colorClasses = {
    bigSis: 'bg-cyan-500',
    bro: 'bg-orange-500',
    lilSis: 'bg-purple-500',
    cbo: 'bg-green-500',
  }[agent] || 'bg-gray-500';

  return (
    <div className={cn(
      sizeClasses,
      colorClasses,
      'rounded-full',
      'animate-pulse'
    )} />
  );
};

// Dropdown menu component
const DropdownMenu = ({ 
  agent, 
  walletInfo, 
  showBalance, 
  showNetwork, 
  onDisconnect,
  onClose 
}: any) => {
  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div className={cn(
        'absolute top-full right-0 mt-2 z-50',
        'min-w-[240px]',
        'bg-gray-900/95 backdrop-blur-lg',
        'border border-white/10 rounded-xl',
        'shadow-xl shadow-black/50',
        'animate-in fade-in slide-in-from-top-1',
        'p-2'
      )}>
        {showBalance && (
          <div className="p-3 hover:bg-white/5 rounded-lg transition-colors">
            <p className="text-xs text-gray-400">Balance</p>
            <p className="font-mono text-sm font-semibold">
              {walletInfo?.balance || '0.00'} ETH
            </p>
          </div>
        )}
        
        {showNetwork && (
          <div className="p-3 hover:bg-white/5 rounded-lg transition-colors">
            <p className="text-xs text-gray-400">Network</p>
            <p className="text-sm font-medium flex items-center gap-1">
              <NetworkIcon network={walletInfo?.network} />
              {walletInfo?.network || 'Unknown'}
            </p>
          </div>
        )}

        <div className="border-t border-white/10 mt-1 pt-1">
          <button
            onClick={onDisconnect}
            className={cn(
              'w-full p-3 text-left',
              'hover:bg-white/5 rounded-lg',
              'text-red-400 hover:text-red-300',
              'transition-colors',
              'text-sm font-medium'
            )}
          >
            Disconnect
          </button>
        </div>
      </div>
    </>
  );
};

// Icon components
const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const NetworkIcon = ({ network }: { network?: string }) => {
  const color = network?.toLowerCase().includes('mainnet') ? 'text-green-500' : 'text-yellow-500';
  return (
    <svg className={cn('w-3 h-3', color)} fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="5" />
    </svg>
  );
};