import React from "react";
import { FaCoins, FaTrophy, FaChartBar, FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";

interface RewardsProps {
  maxSupply: string;
  totalMinted: string;
  totalClaimed: string;
  claimedRewards: string;
  onMint: () => void;
  loading: boolean;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const StatCard = ({ title, value, icon: Icon, delay }: { title: string; value: string; icon: any; delay: number }) => (
  <motion.div
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5, delay }}
    className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
  >
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/20">
      <Icon className="text-2xl text-blue-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-blue-300/60 mb-1">{title}</p>
      <div className="flex items-baseline">
        <h3 className="text-2xl font-bold text-blue-100 truncate">{value}</h3>
        <span className="ml-2 text-sm text-blue-300/60">HEM</span>
      </div>
    </div>
  </motion.div>
);

const Rewards: React.FC<RewardsProps> = ({
  maxSupply,
  totalMinted,
  totalClaimed,
  claimedRewards,
  onMint,
  loading,
}) => {
  const stats = [
    { title: "Maximum Supply", value: maxSupply, icon: FaChartBar, delay: 0.1 },
    { title: "Total Minted", value: totalMinted, icon: FaCoins, delay: 0.2 },
    { title: "Total Claimed", value: totalClaimed, icon: FaTrophy, delay: 0.3 },
    { title: "Your Rewards", value: claimedRewards, icon: FaWallet, delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
        </div>
      </div>

      <div className="relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5"
          >
            <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
              <FaCoins className="text-3xl text-blue-400" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-blue-100 mb-4">HEM Rewards</h1>
          <p className="text-blue-300/60 max-w-md mx-auto">
            Earn and track your rewards in the HEM ecosystem
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={onMint}
            disabled={loading}
            className="group relative w-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5 rounded-xl overflow-hidden"
          >
            <div className={`
              relative px-8 py-4 rounded-xl transition-all duration-300
              ${loading ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-opacity-80'}
              flex items-center justify-center space-x-2
            `}>
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <FaCoins className="text-blue-300" />
                  <span className="text-lg font-semibold text-blue-100">
                    Mint Tokens
                  </span>
                </>
              )}
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Rewards;