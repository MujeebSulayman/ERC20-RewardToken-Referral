import React, { useState, useEffect } from 'react';
import { getMaxSupply, getTotalMinted } from '../../services/blockchain';
import { reportError } from '../../utils/web3.utils';
import WalletConnect from '../../components/WalletConnect';

const TokenPage = () => {
  const [maxSupply, setMaxSupply] = useState<string>("0");
  const [totalMinted, setTotalMinted] = useState<string>("0");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");

  const fetchTokenData = async () => {
    try {
      setLoading(true);
      const [max, minted] = await Promise.all([
        getMaxSupply(),
        getTotalMinted()
      ]);
      setMaxSupply(max);
      setTotalMinted(minted);
    } catch (error) {
      reportError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  const handleTransfer = async () => {
    // To be implemented
    console.log("Transfer", transferAmount, "to", recipientAddress);
  };

  const handleBurn = async () => {
    // To be implemented
    console.log("Burn tokens");
  };

  const formatLargeNumber = (value: string) => {
    const parts = value.split('.');
    const integerPart = parts[0];
    const groups = [];
    
    for (let i = integerPart.length; i > 0; i -= 3) {
      groups.unshift(integerPart.slice(Math.max(0, i - 3), i));
    }
    
    return (
      <div className="font-mono tracking-tight">
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
            <span className="text-purple-400">.</span>
            <span className="text-purple-300">{parts[1]}</span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">HemReward Token (HMR)</h1>
          <WalletConnect onConnect={setWalletAddress} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Max Supply Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-sm font-medium text-purple-300">Max Supply</h3>
                </div>
                <div>
                  {loading ? (
                    <div className="animate-pulse bg-purple-800/50 h-6 rounded w-3/4"></div>
                  ) : (
                    formatLargeNumber(maxSupply)
                  )}
                  <div className="text-xs text-purple-400 mt-1">Total HMR Tokens</div>
                </div>
              </div>

              {/* Total Minted Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-sm font-medium text-blue-300">Total Minted</h3>
                </div>
                <div>
                  {loading ? (
                    <div className="animate-pulse bg-blue-800/50 h-6 rounded w-3/4"></div>
                  ) : (
                    formatLargeNumber(totalMinted)
                  )}
                  <div className="text-xs text-blue-400 mt-1">Minted HMR Tokens</div>
                </div>
              </div>
            </div>

            {/* Token Chart Placeholder */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 h-[300px] flex items-center justify-center">
              <p className="text-gray-400">Token Distribution Chart Coming Soon</p>
            </div>
          </div>

          {/* Token Actions */}
          <div className="space-y-6">
            {/* Transfer Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Transfer Tokens</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0x..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="0.0"
                  />
                </div>
                <button
                  onClick={handleTransfer}
                  disabled={!walletAddress}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Burn Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Burn Tokens</h3>
              <p className="text-sm text-gray-400 mb-4">
                Burning tokens permanently removes them from circulation, reducing the total supply.
              </p>
              <button
                onClick={handleBurn}
                disabled={!walletAddress}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Burn Tokens
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenPage;
