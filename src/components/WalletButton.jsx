
import React from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletButton = () => {
  const { isConnected, address, isConnecting, formatAddress } = useWallet();

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
