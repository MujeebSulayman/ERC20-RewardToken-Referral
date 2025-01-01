async function main() {
	const [deployer] = await ethers.getSigners();

	console.log('Deploying contracts with the account:', deployer.address);

	const balance = await deployer.getBalance();
	console.log('Account balance:', balance.toString());

	const HemReward = await ethers.getContractFactory('HemReward');

	const initialSupply = ethers.utils.parseEther('1000000');
	console.log('Initial supply:', initialSupply.toString());

	const maxSupply = ethers.utils.parseEther('10000000');
	console.log('Max supply:', maxSupply.toString());

	const referrerReward = ethers.utils.parseEther('50', 'wei');
	console.log('Referrer reward:', referrerReward.toString());

	const hemReward = await HemReward.deploy(
		initialSupply,
		maxSupply,
		referrerReward
	);
	await hemReward.deployed();

	console.log('HemReward address:', hemReward.address);
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
