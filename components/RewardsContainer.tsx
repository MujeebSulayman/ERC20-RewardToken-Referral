import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rewards from "./Rewards";
import {
  getMaxSupply,
  getTotalMinted,
  getTotalClaimed,
  getClaimedRewards,
  mintTokens,
} from "../services/blockchain";

interface RewardStats {
  maxSupply: string;
  totalMinted: string;
  totalClaimed: string;
  claimedRewards: string;
}

const initialStats: RewardStats = {
  maxSupply: "0",
  totalMinted: "0",
  totalClaimed: "0",
  claimedRewards: "0",
};

const RewardsContainer: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<RewardStats>(initialStats);

  const loadStats = async () => {
    try {
      const [maxSupply, totalMinted, totalClaimed, claimed] = await Promise.all([
        getMaxSupply(),
        getTotalMinted(),
        getTotalClaimed(),
        address ? getClaimedRewards(address) : "0",
      ]);

      setStats({
        maxSupply,
        totalMinted,
        totalClaimed,
        claimedRewards: claimed,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load HMR reward statistics");
    }
  };

  const handleMint = async (amount?: number) => {
    if (!address) {
      toast.warning("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      // Mint 100 tokens by default
      await mintTokens(amount || 100);
      toast.success("HMR tokens minted successfully!");
      await loadStats();
    } catch (error: any) {
      console.error("Minting error:", error);
      toast.error(error.message || "HMR token minting failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    const intervalId = setInterval(loadStats, 30000);
    return () => clearInterval(intervalId);
  }, [address]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Rewards {...stats} onMint={handleMint} loading={loading} />
      </div>
    </div>
  );
};

export default RewardsContainer;
