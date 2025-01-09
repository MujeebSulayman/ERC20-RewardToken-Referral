import React, { useState, useEffect } from "react";
import {
  distributeReward,
  getClaimedRewards,
  claimReferralReward,
} from "../../services/blockchain";
import { formatTokenAmount } from "../../utils/web3.utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import WalletConnect from "../../components/WalletConnect";
import TokenStatCard from "../../components/TokenStatCard";

const RewardsPage: React.FC = () => {
  const { address } = useAccount();
  const [claimedRewards, setClaimedRewards] = useState<string>("0");
  const [referralRewards, setReferralRewards] = useState<string>("0");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [rewardAmount, setRewardAmount] = useState<string>("100");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRewardData = async () => {
    if (!address) return;

    try {
      const claimed = await getClaimedRewards(address);
      setClaimedRewards(claimed);
    } catch (error) {
      toast.error("Failed to fetch reward data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchRewardData();
  }, [address]);

  const handleDistributeReward = async () => {
    if (!address) {
      toast.error("Please connect your wallet", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!recipientAddress) {
      toast.error("Please enter recipient address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const amount = parseFloat(rewardAmount);
      await distributeReward(recipientAddress, amount);

      toast.success(
        `Successfully distributed ${rewardAmount} HMR to ${recipientAddress}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );

      setRecipientAddress("");

      await fetchRewardData();
    } catch (error: any) {
      toast.error(`Distribution failed: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReferralReward = async () => {
    if (!address) {
      toast.error("Please connect your wallet", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      await claimReferralReward(address);

      toast.success("Referral rewards claimed successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      // Refresh reward data
      await fetchRewardData();
    } catch (error: any) {
      toast.error(`Claiming referral reward failed: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <ToastContainer theme="dark" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">HemReward Rewards</h1>
          <WalletConnect onConnect={(address) => address} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reward Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Claimed Rewards Card */}
              <TokenStatCard
                title="Claimed Rewards"
                value={formatTokenAmount(claimedRewards)}
                loading={loading}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                bgColor="from-green-900/40 to-green-800/20"
                textColor="text-green-300"
                subtext="Total Rewards Claimed"
              />

              {/* Referral Rewards Card */}
              <TokenStatCard
                title="Referral Rewards"
                value={formatTokenAmount(referralRewards)}
                loading={loading}
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
                bgColor="from-blue-900/40 to-blue-800/20"
                textColor="text-blue-300"
                subtext="Total Referral Rewards"
              />
            </div>

            {/* Rewards History Placeholder */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 h-[300px] flex items-center justify-center">
              <p className="text-gray-400">Rewards History Coming Soon</p>
            </div>
          </div>

          {/* Reward Actions */}
          <div className="space-y-6">
            {/* Distribute Reward Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Distribute Reward
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Send HMR tokens to another user as a reward.
              </p>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="recipientAddress"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Recipient Address
                  </label>
                  <input
                    id="recipientAddress"
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0x..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="rewardAmount"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Amount
                  </label>
                  <div className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white">
                    100 HMR
                  </div>
                </div>
                <button
                  onClick={handleDistributeReward}
                  disabled={loading || !address}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Distributing..." : "Distribute Reward"}
                </button>
              </div>
            </div>

            {/* Claim Referral Reward Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">
                Claim Referral Reward
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Claim rewards from your referral network.
              </p>
              <button
                onClick={handleClaimReferralReward}
                disabled={loading || !address}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-green-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Claiming..." : "Claim Referral Rewards"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
