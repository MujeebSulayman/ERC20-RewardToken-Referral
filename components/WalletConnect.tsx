import React, { useState, useEffect } from "react";
import { shortenAddress, reportError } from "../utils/web3.utils";

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      reportError(error);
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            onConnect(accounts[0]);
          }
        })
        .catch(reportError);

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          onConnect(accounts[0]);
        } else {
          setAccount("");
          onConnect("");
        }
      });
    }
  }, [onConnect]);

  return (
    <div className="flex items-center justify-center">
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-all"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-700/50 text-purple-200">
          {shortenAddress(account)}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
