import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';

import { config } from '../wagmi';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowKitProvider
					theme={darkTheme({
						...darkTheme.accentColors.purple,
						accentColorForeground: 'white',
						borderRadius: 'medium',
						fontStack: 'system',
						overlayBlur: 'small',
					})}>
					<main className={`${spaceGrotesk.className}`}>
						<Header />
						<Component {...pageProps} />
						<ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="dark"
						/>
					</main>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}

export default MyApp;
