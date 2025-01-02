import React, { useState } from 'react';
import { useAccount } from 'wagmi';

const ReferralsPage = () => {
  const { address } = useAccount();
  const [referralAddress, setReferralAddress] = useState('');

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Referral Program</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Set Referrer</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter referrer address"
                  value={referralAddress}
                  onChange={(e) => setReferralAddress(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Set Referrer
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Referral Rewards</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Available Rewards</p>
                  <p className="text-xl text-white">Loading...</p>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Claim Referral Rewards
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
