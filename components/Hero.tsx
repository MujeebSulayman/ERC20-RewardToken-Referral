import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { distributeReward, setReferral } from "../services/blockchain";
import { truncateAddress, reportError } from "../utils/web3.utils";
import { RewardParams } from "../types/contract.types";

const Hero = () => {
  const [account, setAccount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      reportError(error);
    }
  };

  const handleDistributeReward = async () => {
    try {
      setLoading(true);
      const rewardParams: RewardParams = {
        user: account,
        amount: 100 // Example amount
      };
      await distributeReward(rewardParams.user, rewardParams.amount);
      alert("Reward distributed successfully!");
    } catch (error) {
      reportError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        })
        .catch(reportError);
    }
  }, []);

  return (
    <main className="relative w-full px-4 sm:px-6 lg:px-32 pt-24 sm:pt-32 pb-12 sm:pb-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left lg:max-w-[640px] mx-auto lg:mx-0"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-900/30 border border-purple-700/50 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse mr-2"></span>
              <span className="text-purple-200 text-sm">
                Web3 Healthcare Revolution
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transform Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                Healthcare Journey
              </span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-[540px] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Join the future of healthcare rewards. Track appointments, earn
              tokens, and unlock exclusive benefits while prioritizing your
              well-being.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {!account ? (
                <button
                  onClick={connectWallet}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-all"
                >
                  Connect Wallet
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <span className="px-6 py-3 rounded-lg bg-purple-900/30 border border-purple-700/50 text-purple-200">
                    {truncateAddress(account)}
                  </span>
                  <button
                    onClick={handleDistributeReward}
                    disabled={loading}
                    className={`px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-all ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Processing..." : "Claim Rewards"}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex-1 max-w-[540px] lg:max-w-none"
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/hero-image.png"
                alt="Healthcare Rewards"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
