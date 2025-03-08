import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer account

  console.log("Deploying contract with account:", deployer.address);

  // Get the ContractFactory and attach a signer
  const AccessControl = await ethers.getContractFactory("AccessControl", deployer);
  const accessControl = await AccessControl.deploy();

  console.log("Deploying AccessControl...");

  // Wait for the deployment to complete
  await accessControl.waitForDeployment();

  const contractAddress = await accessControl.getAddress();
  console.log("AccessControl deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
