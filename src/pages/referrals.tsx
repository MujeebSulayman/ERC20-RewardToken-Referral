import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  setReferral,
  claimReferralReward,
  fromWei,
} from "../../services/blockchain";
import { reportError } from "../../utils/web3.utils";
import WalletConnect from "../../components/WalletConnect";

const ReferralsPage = () => {
  const { address } = useAccount();
  const [referralAddress, setReferralAddress] = useState("");
  const [referralRewards, setReferralRewards] = useState<string>("0");
  const [loading, setLoading] = useState(false);

  const fetchReferralRewards = async () => {
    if (!address) return;

    try {
      const rewards = "0";
      setReferralRewards(fromWei(rewards));
    } catch (error) {
      console.error("Error fetching referral rewards:", error);
      toast.error("Failed to fetch referral rewards");
    }
  };

  useEffect(() => {
    if (address) {
      fetchReferralRewards();
    }
  }, [address]);

  const handleSetReferrer = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!referralAddress || referralAddress.trim() === "") {
      toast.error("Please enter a valid referrer address");
      return;
    }

    try {
      setLoading(true);
      await setReferral(referralAddress);
      toast.success("Referrer set successfully");
      setReferralAddress("");
    } catch (error) {
      toast.error(reportError(error), {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReferralRewards = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      setLoading(true);

      await claimReferralReward(address);
      toast.success(`Successfully claimed referral rewards`);

      await fetchReferralRewards();
    } catch (error) {
      toast.error(reportError(error), {
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Referral Program</h1>
          <WalletConnect onConnect={(address) => address} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Set Referrer
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter referrer address"
                value={referralAddress}
                onChange={(e) => setReferralAddress(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSetReferrer}
                disabled={loading || !address}
                className={`w-full py-2 rounded-lg transition-all duration-300 ${
                  loading || !address
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Setting Referrer..." : "Set Referrer"}
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your Referral Rewards
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Available Rewards</p>
                <p className="text-xl text-white">
                  {address
                    ? `${referralRewards} HMR`
                    : "Connect wallet to view rewards"}
                </p>
              </div>
              <button
                onClick={handleClaimReferralRewards}
                disabled={loading || !address}
                className={`w-full py-2 rounded-lg transition-all duration-300 ${
                  loading || !address
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {loading ? "Claiming Rewards..." : "Claim Referral Rewards"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;
