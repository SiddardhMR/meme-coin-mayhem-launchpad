
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Submit from './pages/Submit';
import Vote from './pages/Vote';

const App = () => {
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

export default App;
