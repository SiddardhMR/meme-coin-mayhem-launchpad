
import React from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { useSupabase } from '../hooks/useSupabase';

const Home = () => {
  const { images, loading, error } = useSupabase();

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Meme of the Day
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-8 font-bold">
            🎭 Your Daily Dose of Degeneracy 🎭
          </p>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Submit. Vote. Launch. Repeat.<br/>
            Fair, fun, and fueled by community mayhem.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link 
              to="/vote" 
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/25"
            >
              🗳️ Vote Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Meme from Supabase */}
      <section className="py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            🎨 Featured Meme 🎨
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl inline-block mb-4">
                {loading ? (
                  <div className="w-64 h-64 bg-gray-300 rounded-xl animate-pulse flex items-center justify-center">
                    <span className="text-gray-500">Loading...</span>
                  </div>
                ) : error ? (
                  <div className="w-64 h-64 bg-red-200 rounded-xl flex items-center justify-center">
                    <span className="text-red-500">Error loading image</span>
                  </div>
                ) : images.length > 0 ? (
                  <img 
                    src={images[0].image} 
                    alt="Featured meme" 
                    className="w-64 h-64 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-500">No images available</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">🚀 Community Choice</h3>
              <p className="text-xl text-purple-300 mb-4">Fresh from the community!</p>
              <p className="text-gray-300 mb-6">
                "This meme represents the best of our community's creativity and humor. Get ready for some serious degeneracy! 🌙"
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/vote"
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  🗳️ Vote for This
                </Link>
                <button className="bg-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-colors">
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Winner */}
      <section className="py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            🏆 Today's Champion 🏆
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl inline-block mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop" 
                  alt="Winning meme" 
                  className="w-64 h-64 object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">🐱 CatCoin Supreme</h3>
              <p className="text-xl text-purple-300 mb-4">Ticker: $MEOW</p>
              <p className="text-gray-300 mb-6">
                "The purrfect blend of chaos and cuteness. This cat doesn't just land on its feet, it lands on the moon! 🌙"
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                  🚀 Launch on Pump.fun
                </button>
                <button className="bg-white/20 text-white px-6 py-3 rounded-full font-bold hover:bg-white/30 transition-colors">
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16">
        <div className="bg-black/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <CountdownTimer />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          🔥 How It Works 🔥
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-6xl mb-4">📤</div>
            <h3 className="text-2xl font-bold text-white mb-4">1. Submit</h3>
            <p className="text-gray-300">
              Upload your dankest meme and create the next viral coin. Include name, ticker, and why it'll moon!
            </p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-white mb-4">2. Vote</h3>
            <p className="text-gray-300">
              Community decides! Connect your wallet and vote for the meme that deserves to pump the hardest.
            </p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-colors">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-4">3. Launch</h3>
            <p className="text-gray-300">
              Daily winner gets launched on Pump.fun! Watch your favorite meme turn into the next moonshot.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-pink-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white">420</div>
              <div className="text-purple-300">Memes Launched</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">69K</div>
              <div className="text-purple-300">Votes Cast</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">$1.2M</div>
              <div className="text-purple-300">Market Cap</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">13.37K</div>
              <div className="text-purple-300">Degenerates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
