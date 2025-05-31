
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet } from 'wagmi/chains';

// 1. Get projectId from WalletConnect Cloud
const projectId = 'YOUR_PROJECT_ID'; // Replace with your actual project ID

// 2. Create wagmiConfig
const metadata = {
  name: 'Meme of the Day',
  description: 'Your Daily Dose of Degeneracy',
  url: 'https://memeoftheday.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true
});
