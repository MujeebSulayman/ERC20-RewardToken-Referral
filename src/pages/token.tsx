import React, { useState, useEffect } from 'react';
import {
	getMaxSupply,
	getTotalMinted,
	burnTokens,
	getClaimedRewards,
} from '../../services/blockchain';
import { reportError } from '../../utils/web3.utils';
import { formatTokenAmount, parseTokenAmount } from '../../utils/web3.utils';
import WalletConnect from '../../components/WalletConnect';
import TokenStatCard from '../../components/TokenStatCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAccount } from 'wagmi';

const TokenPage = () => {
	const { address } = useAccount();
	const [maxSupply, setMaxSupply] = useState<string>('0');
	const [totalMinted, setTotalMinted] = useState<string>('0');
	const [claimedRewards, setClaimedRewards] = useState<string>('0');
	const [loading, setLoading] = useState<boolean>(true);
	const [burnAmount, setBurnAmount] = useState<string>('');

	const fetchTokenData = async () => {
		try {
			setLoading(true);
			const [max, minted, claimed] = await Promise.all([
				getMaxSupply(),
				getTotalMinted(),
				address ? getClaimedRewards(address) : '0',
			]);
			setMaxSupply(max);
			setTotalMinted(minted);
			setClaimedRewards(claimed);
		} catch (error) {
			toast.error('Failed to fetch token data', {
				position: 'top-right',
				autoClose: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTokenData();
	}, [address]);

	const handleBurn = async () => {
		if (!address) {
			toast.error('Please connect your wallet', {
				position: 'top-right',
				autoClose: 3000,
			});
			return;
		}

		const claimedTokens = parseFloat(claimedRewards);
		const mintedTokens = parseFloat(totalMinted);
		const totalTokensToBurn = claimedTokens + mintedTokens;

		if (totalTokensToBurn <= 0) {
			toast.error('No tokens available to burn', {
				position: 'top-right',
				autoClose: 3000,
			});
			return;
		}

		try {
			await burnTokens(totalTokensToBurn);

			toast.success(`Successfully burned ${totalTokensToBurn.toFixed(2)} HMR`, {
				position: 'top-right',
				autoClose: 3000,
			});

			await fetchTokenData();
		} catch (error: any) {
			toast.error(reportError(error), {
				position: 'top-right',
				autoClose: 3000,
			});
		}
	};

	return (
		<div className='min-h-screen pt-20 bg-gradient-to-b from-gray-900 to-black'>
			<ToastContainer theme='dark' />
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='flex justify-between items-center mb-8'>
					<h1 className='text-4xl font-bold text-white'>
						HemReward Token (HMR)
					</h1>
					<WalletConnect onConnect={(address) => address} />
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<div className='lg:col-span-2 space-y-6'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							<TokenStatCard
								title='Max Supply'
								value={formatTokenAmount(maxSupply)}
								loading={loading}
								icon={
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M13 10V3L4 14h7v7l9-11h-7z'
										/>
									</svg>
								}
								bgColor='from-purple-900/40 to-purple-800/20'
								textColor='text-purple-300'
								subtext='Total HMR Tokens'
							/>

							{/* Total Minted Card */}
							<TokenStatCard
								title='Total Minted'
								value={formatTokenAmount(totalMinted)}
								loading={loading}
								icon={
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
										/>
									</svg>
								}
								bgColor='from-blue-900/40 to-blue-800/20'
								textColor='text-blue-300'
								subtext='Minted HMR Tokens'
							/>

							{/* Claimed Rewards Card */}
							<TokenStatCard
								title='Claimed Rewards'
								value={formatTokenAmount(claimedRewards)}
								loading={loading}
								icon={
									<svg
										className='w-6 h-6'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								}
								bgColor='from-green-900/40 to-green-800/20'
								textColor='text-green-300'
								subtext='Total Rewards Claimed'
							/>
						</div>

						{/* Token Chart Placeholder */}
						<div className='p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 h-[300px] flex items-center justify-center'>
							<p className='text-gray-400'>
								Token Distribution Chart Coming Soon
							</p>
						</div>
					</div>

					{/* Token Actions */}
					<div className='space-y-6'>
						{/* Burn Card */}
						<div className='p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50'>
							<h3 className='text-xl font-semibold text-white mb-4'>
								Burn Tokens
							</h3>
							<p className='text-sm text-gray-400 mb-4'>
								Burning tokens permanently removes them from circulation,
								reducing the total supply.
							</p>
							<div className='space-y-4'>
								<button
									onClick={handleBurn}
									disabled={!address}
									className='w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
									Burn All Tokens
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TokenPage;
