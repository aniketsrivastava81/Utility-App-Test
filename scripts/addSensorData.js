//addSensorData.js

//const { ethers, network } = require("hardhat");

import hardhat from "hardhat";
const { ethers, network } = hardhat;

// Contract ABI and Address
const contractAddress = '0xEd701c2Ff586857b1A5D8C024b67309fA40C1490'; // Replace with your contract's address
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
        "inputs": [],
        "name": "getSensorData",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
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

// Sample data to be uploaded with IDs
const sampleData = [
    { id: 'Building 1', temperature: '95.0F', humidity: '75%', waterLevel: 'OK', fireAlert: 'NO', smokeAlert: 'NO' },
    { id: 'Building 2', temperature: '110.0F', humidity: '60%', waterLevel: 'Low', fireAlert: 'YES', smokeAlert: 'YES' },
    { id: 'Building 3', temperature: '80.0F', humidity: '85%', waterLevel: 'High', fireAlert: 'NO', smokeAlert: 'NO' }
];

// Function to upload sensor data to the blockchain
async function addSensorData(id, temperature, humidity, waterLevel, fireAlert, smokeAlert) {
    try {
        // Get the signer (account to interact with the blockchain)
        const [account] = await ethers.getSigners();  // Get the first signer from Hardhat

        // Get the contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, account);

        // Call the addSensorData function with id and other parameters
        const tx = await contract.addSensorData(id, temperature, humidity, waterLevel, fireAlert, smokeAlert);
        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log('Sensor data successfully added to the blockchain.');
    } catch (error) {
        console.error("Error uploading sensor data:", error);
    }
}

// Upload sample data to the blockchain
async function uploadData() {
    for (const data of sampleData) {
        await addSensorData(data.id, data.temperature, data.humidity, data.waterLevel, data.fireAlert, data.smokeAlert);
        console.log(`Data uploaded: ${JSON.stringify(data)}`);
    }
}

// Function to retrieve all sensor data in JSON format
async function getAllSensorData() {
    try {
        const [account] = await ethers.getSigners();  // Get the first signer from Hardhat
        const contract = new ethers.Contract(contractAddress, contractABI, account);

        // Call the getSensorData function to retrieve all sensor data as a string
        const sensorData = await contract.getSensorData();
        console.log('Sensor data retrieved: ', sensorData);
    } catch (error) {
        console.error("Error retrieving sensor data:", error);
    }
}

// Execute the upload and retrieve process
async function execute() {
    await uploadData();
    await getAllSensorData();  // Retrieve and display the sensor data in JSON format
}

execute()
    .then(() => console.log("Data upload and retrieval complete"))
    .catch(error => console.error("Error in data upload and retrieval", error));
