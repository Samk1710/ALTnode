import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer account

  console.log("Deploying contract with account:", deployer.address);

  // Get the ContractFactory and attach a signer
  const AltNode = await ethers.getContractFactory("Altnode", deployer);
  const altNode = await AltNode.deploy();

  console.log("Deploying AltNode...");

  // Wait for the deployment to complete
  await altNode.waitForDeployment();

  const contractAddress = await altNode.getAddress();
  console.log("AltNode deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
