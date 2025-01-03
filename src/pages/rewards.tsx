import React from 'react';
import Rewards from '../../components/Rewards';
import { useAccount } from 'wagmi';

const RewardsPage: React.FC = () => {
  const { address } = useAccount();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">HemReward Rewards</h1>
          <p className="mt-2 text-gray-400">Claim your rewards and manage referrals</p>
        </div>
      
      </div>
    </div>
  );
};

export default RewardsPage;
