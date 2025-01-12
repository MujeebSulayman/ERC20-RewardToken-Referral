# HemReward

## Project Overview
HemReward is a blockchain-based reward system for blood donation activities, built on Ethereum using Next.js and Smart Contracts. The platform incentivizes blood donation through tokenized rewards and a referral system.

Live Demo: [erc-20-reward-token-referral.vercel.app](https://erc-20-reward-token-referral.vercel.app)

## Features
- ERC20 Token-based reward system
- Blood donation tracking and rewards distribution
- Referral program with automatic reward distribution
- Web3 wallet integration with RainbowKit
- Token minting and burning capabilities
- Real-time reward tracking and claiming

## Tech Stack
- Next.js 14
- TypeScript
- Solidity 0.8.28
- Ethers.js 6
- Wagmi & RainbowKit
- TailwindCSS
- Hardhat

## Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask or any Web3 wallet
- Git

## Installation

### Clone the Repository
```bash
git clone https://github.com/mujeebsulayman/HemReward.git
cd HemReward
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Environment Setup
Create a `.env` file in the project root:
```env
NEXT_PUBLIC_RPC_URL=your_ethereum_rpc_url
NEXT_PUBLIC_YOUR_PROJECT_ID=your_wallet_connect_project_id
```

## Smart Contract Deployment

### Deploy to Local Network
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
```

### Production Build
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Contract Interactions
The platform supports the following main functionalities:
- Token Distribution: Reward users with HMR tokens
- Referral System: Set referrers and claim referral rewards
- Token Management: Mint and burn tokens within supply limits
- Reward Claims: Track and claim accumulated rewards

## Testing
```bash
npx hardhat test
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/HemReward](https://github.com/mujeebsulayman/HemReward)
Live Demo: [erc-20-reward-token-referral.vercel.app](https://erc-20-reward-token-referral.vercel.app)
