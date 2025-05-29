
import React, { useState } from 'react';

const Submit = () => {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    description: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting meme:', formData);
    // Handle form submission here
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Submit Your Meme
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            🎨 Create the next viral sensation that'll send degens to the moon! 🚀
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                🖼️ Upload Your Meme
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-pink-500/50 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-gray-300 mb-4">
                      Drop your dankest meme here or click to browse
                    </p>
                    <p className="text-sm text-gray-400">
                      Supports JPG, PNG, GIF (Max 10MB)
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Meme Name */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                🏷️ Meme Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Doge to Mars Supreme"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
                maxLength={50}
              />
              <p className="text-sm text-gray-400 mt-1">
                {formData.name.length}/50 characters
              </p>
            </div>

            {/* Ticker */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                💰 Ticker Symbol
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-400 text-lg">$</span>
                <input
                  type="text"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleInputChange}
                  placeholder="DOGE"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none uppercase"
                  maxLength={5}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {formData.ticker.length}/5 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white text-lg font-semibold mb-3">
                📝 Why Will This Moon?
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell the degens why this meme will pump harder than a gym bro on pre-workout..."
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
                maxLength={280}
              />
              <p className="text-sm text-gray-400 mt-1">
                {formData.description.length}/280 characters
              </p>
            </div>

            {/* Wallet Connection Notice */}
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-yellow-200 text-sm">
                💡 <strong>Pro Tip:</strong> Connect your wallet to earn reputation points and get priority in future votes!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl text-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-pink-500/25"
            >
              🚀 Submit to the Meme Multiverse 🚀
            </button>
          </form>
        </div>

        {/* Guidelines */}
        <div className="mt-12 bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">📋 Submission Guidelines</h3>
          <ul className="space-y-2 text-gray-300">
            <li>✅ Original memes get bonus community love</li>
            <li>✅ Keep it fun, keep it degen, keep it memeable</li>
            <li>❌ No NSFW content (save that for your DMs)</li>
            <li>❌ No hate speech or harassment</li>
            <li>🎯 Best submissions have clear moonshot potential</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Submit;
