import { ethers } from "ethers";
import address from "../contracts/contractAddress.json";
import abi from "../artifacts/contracts/HemReward.sol/HemReward.json";

const toWei = (num: number) => ethers.parseEther(num.toString());
const fromWei = (num: string | number | null): string => {
  if (num === null || num === undefined) {
    return "0";
  }
  return ethers.formatEther(num.toString());
};

let ethereum: any;
let tx: any;

if (typeof window !== "undefined") ethereum = (window as any).ethereum;

const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: "eth_accounts" });

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address.HemReward, abi.abi, signer);
    return contract;
  } else {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_RPC_URL
    );
    const contract = new ethers.Contract(address.HemReward, abi.abi, provider);
    return contract;
  }
};

const distributeReward = async (user: string, amount: number): Promise<any> => {
  if (!ethereum) {
    return Promise.reject(new Error("Please install a wallet provider"));
  }

  try {
    const contract = await getEthereumContract();
    tx = await contract.distributeReward(user, toWei(amount));
    await tx.wait();
    return Promise.resolve(tx);
  } catch (error) {
    return Promise.reject(error);
  }
};

const setReferral = async (referrer: string): Promise<any> => {
  if (!ethereum) {
    return Promise.reject(new Error("Please install a wallet provider"));
  }

  try {
    const contract = await getEthereumContract();
    tx = await contract.setReferral(referrer);
    await tx.wait();
    return Promise.resolve(tx);
  } catch (error) {
    return Promise.reject(error);
  }
};

const claimReferralReward = async (referredUser: string): Promise<any> => {
  if (!ethereum) {
    return Promise.reject(new Error("Please install a wallet provider"));
  }

  try {
    const contract = await getEthereumContract();
    tx = await contract.claimReferralReward(referredUser);
    await tx.wait();
    return Promise.resolve(tx);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getMaxSupply = async (): Promise<string> => {
  try {
    const contract = await getEthereumContract();
    const maxSupply = await contract.getMaxSupply();
    return fromWei(maxSupply);
  } catch (error) {
    console.error("Error getting max supply:", error);
    return "0";
  }
};

const getTotalMinted = async (): Promise<string> => {
  try {
    const contract = await getEthereumContract();
    const totalMinted = await contract.getTotalMinted();
    return fromWei(totalMinted);
  } catch (error) {
    console.error("Error getting total minted:", error);
    return "0";
  }
};

const getTotalClaimed = async (): Promise<string> => {
  try {
    const contract = await getEthereumContract();
    const totalClaimed = await contract.getTotalClaimed();
    return fromWei(totalClaimed);
  } catch (error) {
    console.error("Error getting total claimed:", error);
    return "0";
  }
};

const getClaimedRewards = async (address: string): Promise<string> => {
  try {
    const contract = await getEthereumContract();
    const claimed = await contract.getClaimedRewards(address);
    return fromWei(claimed);
  } catch (error) {
    console.error("Error getting claimed rewards:", error);
    return "0";
  }
};

const mintTokens = async (amount?: number): Promise<any> => {
  if (!ethereum) {
    return Promise.reject(new Error("Please install a wallet provider"));
  }

  try {
    const contract = await getEthereumContract();

    const mintAmount = toWei(amount || 100);

    tx = await contract.mint(mintAmount);
    await tx.wait();
    return Promise.resolve(tx);
  } catch (error: any) {
    console.error("Minting error:", error);
    return Promise.reject(error.message || "Minting failed");
  }
};

const burnTokens = async (amount: number): Promise<any> => {
  if (!ethereum) {
    return Promise.reject(new Error("Please install a wallet provider"));
  }

  try {
    const contract = await getEthereumContract();
    tx = await contract.burn(toWei(amount));
    await tx.wait();
    return Promise.resolve(tx);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  distributeReward,
  setReferral,
  claimReferralReward,
  getMaxSupply,
  getTotalMinted,
  getTotalClaimed,
  getClaimedRewards,
  mintTokens,
  burnTokens,
  toWei,
  fromWei,
};
