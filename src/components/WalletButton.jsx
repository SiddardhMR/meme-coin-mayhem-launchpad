
import React from 'react';
import { useAccount } from 'wagmi';

const WalletButton = () => {
  const { address, isConnected } = useAccount();

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
          <span className="text-green-300 text-sm font-semibold">
            🟢 {formatAddress(address)}
          </span>
        </div>
        <w3m-button />
      </div>
    );
  }

  return (
    <w3m-connect-button />
  );
};

export default WalletButton;
