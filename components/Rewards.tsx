import React from 'react';
import { 
  HiCurrencyDollar, 
  HiChartBar, 
  HiGift, 
  HiCash 
} from 'react-icons/hi';

interface RewardsProps {
  maxSupply: string;
  totalMinted: string;
  totalClaimed: string;
  claimedRewards: string;
  onMint: () => void;
  loading: boolean;
}

const formatLargeNumber = (value: string) => {
  const parts = value.split('.');
  const integerPart = parts[0];
  const groups = [];
  
  for (let i = integerPart.length; i > 0; i -= 3) {
    groups.unshift(integerPart.slice(Math.max(0, i - 3), i));
  }
  
  return (
    <div className="font-mono tracking-tight flex items-baseline">
      {groups.map((group, index) => (
        <React.Fragment key={index}>
          <span className="text-white">{group}</span>
          {index !== groups.length - 1 && (
            <span className="text-purple-400 mx-0.5">,</span>
          )}
        </React.Fragment>
      ))}
      {parts[1] && (
        <>
          <span className="text-purple-400 mx-0.5">.</span>
          <span className="text-purple-300">{parts[1]}</span>
        </>
      )}
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ElementType;
  title: string;
  value: string;
  className?: string;
}> = ({ icon: Icon, title, value, className = '' }) => (
  <div className={`
    bg-gradient-to-br from-gray-800/40 to-gray-800/20 
    border border-gray-700/50 rounded-xl p-6 
    flex flex-col space-y-3
    ${className}
  `}>
    <div className="flex items-center justify-between">
      <div className="bg-purple-500/20 p-3 rounded-xl">
        <Icon className="text-2xl text-purple-400" />
      </div>
      <span className="text-sm font-medium text-gray-400 bg-gray-900/50 px-2 py-1 rounded-full">
        {title}
      </span>
    </div>
    <div>
      <div className="text-sm text-gray-400 mb-1">Total</div>
      {formatLargeNumber(value)}
      <div className="text-xs text-purple-400 mt-1">HMR Tokens</div>
    </div>
  </div>
);

const Rewards: React.FC<RewardsProps> = ({
  maxSupply,
  totalMinted,
  totalClaimed,
  claimedRewards,
  onMint,
  loading
}) => {
  const stats = [
    { 
      icon: HiChartBar, 
      title: 'Max Supply', 
      value: maxSupply 
    },
    { 
      icon: HiCurrencyDollar, 
      title: 'Total Minted', 
      value: totalMinted 
    },
    { 
      icon: HiGift, 
      title: 'Total Claimed', 
      value: totalClaimed 
    },
    { 
      icon: HiCash, 
      title: 'Your Rewards', 
      value: claimedRewards 
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">HMR Rewards Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 rounded-xl p-6">
          <button
            onClick={onMint}
            disabled={loading}
            className={`
              w-full py-4 rounded-lg text-lg font-semibold transition-all duration-300
              ${loading 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
              }
            `}
          >
            {loading ? 'Minting in Progress...' : 'Mint Tokens'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rewards;