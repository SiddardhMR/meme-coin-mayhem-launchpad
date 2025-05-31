
import { useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ethers } from 'ethers';

// 1. Get projectId from WalletConnect Cloud
const projectId = 'YOUR_PROJECT_ID'; // Replace with your actual project ID

// 2. Set chains
const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  }
];

// 3. Create a metadata object
const metadata = {
  name: 'Meme of the Day',
  description: 'Your Daily Dose of Degeneracy',
  url: 'https://memeoftheday.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true
});

export const useWallet = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      // Web3Modal handles the connection
      const modal = document.querySelector('w3m-modal');
      if (modal) {
        modal.open();
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Web3Modal handles disconnection
      const modal = document.querySelector('w3m-modal');
      if (modal) {
        modal.close();
      }
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return {
    isConnected,
    address,
    isConnecting,
    connectWallet,
    disconnectWallet,
    formatAddress,
    chainId
  };
};
