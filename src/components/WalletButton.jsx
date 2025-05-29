
import React from 'react';
import { useWallet } from '../hooks/useWallet';

const WalletButton = () => {
  const { isConnected, address, isConnecting, connectWallet, disconnectWallet, formatAddress } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
          <span className="text-green-300 text-sm font-semibold">
            🟢 {formatAddress(address)}
          </span>
        </div>
        <button 
          onClick={disconnectWallet}
          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 px-3 py-2 rounded-full text-sm font-semibold transition-all"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={connectWallet}
      disabled={isConnecting}
      className={`bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold transition-transform ${
        isConnecting 
          ? 'opacity-70 cursor-not-allowed' 
          : 'hover:scale-105'
      }`}
    >
      {isConnecting ? '🔄 Connecting...' : '🔗 Connect Wallet'}
    </button>
  );
};

export default WalletButton;
