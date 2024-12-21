const { ethers } = require("hardhat");
//require("@nomicfoundation/hardhat-toolbox");

async function main() {
  // Get the deployer's signer
  const deployer = await hre.ethers.provider.getSigner();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Deployer:", deployer);

  // Deploy contract
  const ContractFactory = await ethers.getContractFactory("SensorData");
  const contract = await ContractFactory.deploy();

  console.log("Contract deployed to:", contract.address);
 // console.log("Contract deployed to:", contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });