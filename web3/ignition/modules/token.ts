import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer account

  console.log("Deploying contract with account:", deployer.address);

  // Get the ContractFactory and attach a signer
  const Alttoken = await ethers.getContractFactory("AltTokens", deployer);
  const AltToken = await Alttoken.deploy();

  console.log("Deploying AltToken...");

  // Wait for the deployment to complete
  await AltToken.waitForDeployment();

  const contractAddress = await AltToken.getAddress();
  console.log("AltToken deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
