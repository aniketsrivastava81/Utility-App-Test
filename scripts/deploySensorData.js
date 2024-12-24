
import hardhat from "hardhat";
const { ethers } = hardhat;
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

/*
  // Importing hardhat and other necessary modules using ES Module syntax
import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Your contract deployment logic here
    const SensorData = await ethers.getContractFactory("SensorData");
    const sensorData = await SensorData.deploy();
    console.log("SensorData contract deployed to:", sensorData.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
*/

  /*
// Importing hardhat as a default package
import hardhat from "hardhat";

// Destructure ethers from the hardhat package
const { ethers } = hardhat;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Your contract deployment logic here
    const SensorData = await ethers.getContractFactory("SensorData");
    const sensorData = await SensorData.deploy();
    console.log("SensorData contract deployed to:", sensorData.address);
}


*/