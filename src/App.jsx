
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWallet } from './hooks/useWallet';
import Layout from './components/Layout';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Vote from './pages/Vote';

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/vote" element={<Vote />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const App = () => {
  const { config } = useWallet();
  
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
