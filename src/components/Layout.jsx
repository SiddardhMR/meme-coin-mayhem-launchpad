
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold text-white">
              🪩 <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Meme of the Day</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-full transition-all ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                🏠 Home
              </Link>
              <Link 
                to="/submit" 
                className={`px-4 py-2 rounded-full transition-all ${
                  location.pathname === '/submit' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                📤 Submit
              </Link>
              <Link 
                to="/vote" 
                className={`px-4 py-2 rounded-full transition-all ${
                  location.pathname === '/vote' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                🗳️ Vote
              </Link>
            </div>

            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
              🔗 Connect Wallet
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              🚀 Powered by degeneracy and community chaos 🚀
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                <FaTwitter size={20} />
                <span>Twitter</span>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                <FaTelegram size={20} />
                <span>Telegram</span>
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 flex items-center space-x-2">
                <FaDiscord size={20} />
                <span>Discord</span>
              </a>
            </div>
            <p className="text-xs text-gray-500">
              ⚠️ Not financial advice. Memes may cause extreme portfolio volatility. ⚠️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
