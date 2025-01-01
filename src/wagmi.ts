import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'Hem Rewards',
	projectId: process.env.NEXT_PUBLIC_YOUR_PROJECT_ID as string,
	chains: [sepolia],
	ssr: true,
});
