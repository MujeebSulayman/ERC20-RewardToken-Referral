async function main() {
	const [deployer] = await ethers.getSigners();

	console.log('Deploying contracts with the account:', deployer.address);
}
