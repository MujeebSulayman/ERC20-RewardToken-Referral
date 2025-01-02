import React from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { parseEther, formatEther } from 'viem';

const TokenPage = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">HemReward Token (HMR)</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Token Info</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Total Supply</p>
                  <p className="text-xl text-white">Loading...</p>
                </div>
                <div>
                  <p className="text-gray-400">Your Balance</p>
                  <p className="text-xl text-white">Loading...</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Token Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Transfer Tokens
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Burn Tokens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
