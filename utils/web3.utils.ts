import { ethers } from "ethers";

export const toWei = (num: number): bigint => {
  return ethers.parseEther(num.toString());
};

export const fromWei = (num: bigint | string | null): string => {
  if (num === null) return "0";
  return ethers.formatEther(num.toString());
};

export const truncateAddress = (address: string): string => {
  if (!address) return ''
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString()
}

export const reportError = (error: any): void => {
  console.error('An error occurred:', error)
}

export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const handleError = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.reason) return error.reason;
  if (error?.message) return error.message;
  return "An unknown error occurred";
};
