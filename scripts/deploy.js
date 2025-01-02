const { ethers } = require("hardhat");
const { parseEther } = ethers;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  try {
    console.log(
      "Account balance:",
      (await ethers.provider.getBalance(deployer.address)).toString()
    );

    const HemReward = await ethers.getContractFactory("HemReward");

    const initialSupply = parseEther("100000");
    console.log("Initial supply:", initialSupply.toString());

    const maxSupply = parseEther("1000000");
    console.log("Max supply:", maxSupply.toString());

    console.log("Deploying HemReward contract...");
    const hemReward = await HemReward.deploy(initialSupply, maxSupply);

    console.log("Waiting for deployment...");
    await hemReward.waitForDeployment();

    const hemRewardAddress = await hemReward.getAddress();
    console.log("HemReward deployed to:", hemRewardAddress);

    const fs = require("fs");
    const contractsDir = __dirname + "/../contracts";

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
      contractsDir + "/contractAddress.json",
      JSON.stringify(
        {
          HemReward: hemRewardAddress,
        },
        undefined,
        2
      )
    );
  } catch (error) {
    console.log("Deployment failed");
    console.error("error:", error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
