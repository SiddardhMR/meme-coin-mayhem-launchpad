
import React, { useState } from 'react';

const Vote = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [votes, setVotes] = useState({});

  // Mock data for memes
  const memes = [
    {
      id: 1,
      name: "Pepe's Moon Mission",
      ticker: "PEPE",
      description: "The rarest Pepe is going interstellar. Diamond hands only! 💎🙌",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=300&fit=crop",
      votes: 420,
      trending: true
    },
    {
      id: 2,
      name: "Doge's Revenge",
      ticker: "DOGE2",
      description: "Much wow, very moon, such gains. The OG meme coin's spiritual successor.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
      votes: 350,
      trending: true
    },
    {
      id: 3,
      name: "Chad Bull Market",
      ticker: "CHAD",
      description: "For the alphas who buy high and sell higher. No paper hands allowed.",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=300&fit=crop",
      votes: 280,
      trending: false
    },
    {
      id: 4,
      name: "Ape Together Strong",
      ticker: "APE",
      description: "Monkeys united in degeneracy. Banana-powered rocket fuel included.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
      votes: 195,
      trending: false
    },
    {
      id: 5,
      name: "Diamond Hands Cat",
      ticker: "HODL",
      description: "This cat never sells. Currently holding since 2017 and still purring.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
      votes: 167,
      trending: false
    },
    {
      id: 6,
      name: "Rocket Ship Emoji",
      ticker: "MOON",
      description: "Sometimes the simplest memes hit the hardest. Destination: Andromeda.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=300&fit=crop",
      votes: 134,
      trending: false
    }
  ];

  const handleVote = (memeId) => {
    if (!votes[memeId]) {
      setVotes(prev => ({
        ...prev,
        [memeId]: true
      }));
      console.log(`Voted for meme ${memeId}`);
    }
  };

  const filteredMemes = memes.filter(meme => {
    if (activeTab === 'trending') return meme.trending;
    if (activeTab === 'top') return meme.votes >= 200;
    return true; // 'new' shows all
  }).sort((a, b) => b.votes - a.votes);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Vote for the Next Moon Mission
          </span>
        </h1>
        <p className="text-xl text-gray-300">
          🗳️ Your vote decides which meme gets launched into the stratosphere! 🚀
        </p>
      </div>

      {/* Voting Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">1,337</div>
            <div className="text-purple-300 text-sm">Total Votes Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">69</div>
            <div className="text-purple-300 text-sm">Memes Competing</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">04:20</div>
            <div className="text-purple-300 text-sm">Hours Left</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">420</div>
            <div className="text-purple-300 text-sm">Your Votes Left</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/30 rounded-full p-1 backdrop-blur-lg border border-white/20">
          {['trending', 'new', 'top'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {tab === 'trending' && '🔥 Trending'}
              {tab === 'new' && '🆕 New'}
              {tab === 'top' && '🏆 Top'}
            </button>
          ))}
        </div>
      </div>

      {/* Meme Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
          >
            <div className="relative mb-4">
              <img
                src={meme.image}
                alt={meme.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              {meme.trending && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  🔥 Trending
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">{meme.name}</h3>
              <p className="text-purple-300 font-semibold mb-2">${meme.ticker}</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {meme.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="text-2xl font-bold">{meme.votes}</span>
                <span className="text-gray-400 ml-1">votes</span>
              </div>
              
              <button
                onClick={() => handleVote(meme.id)}
                disabled={votes[meme.id]}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  votes[meme.id]
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {votes[meme.id] ? '✅ Voted' : '🗳️ Vote'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          🏆 Live Leaderboard 🏆
        </h2>
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="space-y-4">
            {filteredMemes.slice(0, 5).map((meme, index) => (
              <div
                key={meme.id}
                className="flex items-center justify-between p-4 bg-white/10 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-400' :
                    index === 1 ? 'text-gray-300' :
                    index === 2 ? 'text-orange-400' :
                    'text-gray-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <img
                    src={meme.image}
                    alt={meme.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <div className="text-white font-semibold">{meme.name}</div>
                    <div className="text-purple-300 text-sm">${meme.ticker}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{meme.votes}</div>
                  <div className="text-gray-400 text-sm">votes</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wallet Connection CTA */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            🔗 Connect Your Wallet for More Power!
          </h3>
          <p className="text-gray-300 mb-6">
            Get verified voter status, earn reputation points, and unlock exclusive voting perks!
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
