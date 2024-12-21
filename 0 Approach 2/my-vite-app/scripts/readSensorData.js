//const { ethers } = require("hardhat");

import hardhat from "hardhat";
const { ethers } = hardhat;


async function main() {
    // Get the deployer's signer (useful for interacting with the contract)
    const deployer = await hre.ethers.provider.getSigner();
    console.log("Using account:", deployer.address);

    // Replace with the actual deployed contract address
    const contractAddress = "0x9B1095149c917C488328A9D5306Bf66b783c87ea";

    // Get the contract ABI
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_temperature",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_humidity",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_waterLevel",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_fireAlert",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_smokeAlert",
                    "type": "string"
                }
            ],
            "name": "addSensorData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "temperature",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "humidity",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "waterLevel",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "fireAlert",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "smokeAlert",
                    "type": "string"
                }
            ],
            "name": "SensorDataAdded",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "sensorData",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "temperature",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "humidity",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "waterLevel",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fireAlert",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "smokeAlert",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Get the contract instance
    const contract = await ethers.getContractAt(contractABI, contractAddress);

    let index = 0; // Start at the first entry
    let done = false;

    while (!done) {
        try {
            const sensorData = await contract.sensorData(index); // Fetch data for the current index

            // Structure and display the data as JSON
            console.log(`Sensor Data ${index}:`, JSON.stringify({
                id: sensorData.id,
                temperature: sensorData.temperature,
                humidity: sensorData.humidity,
                waterLevel: sensorData.waterLevel,
                fireAlert: sensorData.fireAlert,
                smokeAlert: sensorData.smokeAlert
            }, null, 2));

            index++; // Move to the next entry
        } catch (error) {
            console.error(`No data at index ${index}. Stopping.`);
            done = true; // Stop when no more data is found
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });