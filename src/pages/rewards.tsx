import React from 'react';
import { useAccount } from 'wagmi';

const RewardsPage = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">HemReward Rewards</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rewards</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Available Rewards</p>
                  <p className="text-xl text-white">Loading...</p>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Claim Rewards
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Reward History</h2>
              <div className="space-y-4">
                <p className="text-gray-400">Recent Rewards</p>
                <div className="space-y-2">
                  {/* Will be populated with reward history */}
                  <p className="text-white">No reward history available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
