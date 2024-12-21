import React, { useState } from 'react';
import { ethers } from 'ethers';
import './checkdatapage.css'; // Import the external CSS file

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [cardData, setCardData] = useState({
    temperature: 'Loading...',
    humidity: 'Loading...',
    waterLevel: 'Loading...',
    fireAlert: 'Loading...',
    smokeAlert: 'Loading...',
  });
  const [cardColors, setCardColors] = useState({
    temperature: 'white',
    humidity: 'white',
    waterLevel: 'white',
    fireAlert: 'white',
    smokeAlert: 'white',
  });

  const [activeCard, setActiveCard] = useState(null); // Tracks which card is active (to show only one at a time)

  // Replace with your actual contract address and ABI
  const contractAddress = "0x9B1095149c917C488328A9D5306Bf66b783c87ea";
  const contractABI = [
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

  const fetchSensorData = async () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        let i = 0;
        let data = [];
        while (true) {
          try {
            const sensor = await contract.sensorData(i);
            data.push(sensor);
            i++;
          } catch (error) {
            break;
          }
        }
        setSensorData(data);
        updateDataCards(data[0]);
      } catch (error) {
        console.error("Error fetching data from the blockchain:", error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask.');
    }
  };

  const updateDataCards = (data) => {
    setCardData({
      temperature: data.temperature,
      humidity: data.humidity,
      waterLevel: data.waterLevel,
      fireAlert: data.fireAlert,
      smokeAlert: data.smokeAlert,
    });

    setCardColors({
      temperature: parseFloat(data.temperature) < 75 || parseFloat(data.temperature) > 105 ? 'red' : 'green',
      humidity: parseFloat(data.humidity) > 80 ? 'green' : 'red',
      waterLevel: data.waterLevel === 'High' ? 'green' : data.waterLevel === 'OK' ? 'yellow' : 'red',
      fireAlert: data.fireAlert === 'YES' ? 'red' : 'green',
      smokeAlert: data.smokeAlert === 'YES' ? 'red' : 'green',
    });
  };

  const clearFields = () => {
    setCardData({
      temperature: 'Loading...',
      humidity: 'Loading...',
      waterLevel: 'Loading...',
      fireAlert: 'Loading...',
      smokeAlert: 'Loading...',
    });
    setCardColors({
      temperature: 'white',
      humidity: 'white',
      waterLevel: 'white',
      fireAlert: 'white',
      smokeAlert: 'white',
    });
    setSensorData([]);
    setActiveCard(null);
  };

  const handleCardClick = (cardType) => {
    const data = sensorData[sensorData.length - 1] || {}; // Use last row data
    setCardData({
      temperature: data.temperature,
      humidity: data.humidity,
      waterLevel: data.waterLevel,
      fireAlert: data.fireAlert,
      smokeAlert: data.smokeAlert,
    });

    // Update card colors based on the latest data
    setCardColors({
      temperature: parseFloat(data.temperature) < 75 || parseFloat(data.temperature) > 105 ? 'red' : 'green',
      humidity: parseFloat(data.humidity) > 80 ? 'green' : 'red',
      waterLevel: data.waterLevel === 'High' ? 'green' : data.waterLevel === 'OK' ? 'yellow' : 'red',
      fireAlert: data.fireAlert === 'YES' ? 'red' : 'green',
      smokeAlert: data.smokeAlert === 'YES' ? 'red' : 'green',
    });

    // Set active card based on which card button is clicked
    setActiveCard(cardType);
  };

  return (
    <div className="container">
      <div className="data-container">
        {activeCard === 'temperature' && (
          <div
            id="temperature-card"
            className="data-card"
            style={{
              backgroundColor: cardColors.temperature,
              width: '100%', // Takes up the full width (as 4 cards)
            }}
          >
            <h3>Temperature</h3>
            <p>{cardData.temperature}</p>
          </div>
        )}

        {activeCard === 'humidity' && (
          <div
            id="humidity-card"
            className="data-card"
            style={{
              backgroundColor: cardColors.humidity,
              width: '100%', // Takes up the full width (as 4 cards)
            }}
          >
            <h3>Humidity</h3>
            <p>{cardData.humidity}</p>
          </div>
        )}

        {activeCard === 'waterLevel' && (
          <div
            id="water-level-card"
            className="data-card"
            style={{
              backgroundColor: cardColors.waterLevel,
              width: '100%', // Takes up the full width (as 4 cards)
            }}
          >
            <h3>Water Level</h3>
            <p>{cardData.waterLevel}</p>
          </div>
        )}

        {activeCard === 'fireAlert' && (
          <div
            id="fire-alert-card"
            className="data-card"
            style={{
              backgroundColor: cardColors.fireAlert,
              width: '100%', // Takes up the full width (as 4 cards)
            }}
          >
            <h3>Fire Alert</h3>
            <p>{cardData.fireAlert}</p>
          </div>
        )}

        {activeCard === 'smokeAlert' && (
          <div
            id="smoke-alert-card"
            className="data-card"
            style={{
              backgroundColor: cardColors.smokeAlert,
              width: '100%', // Takes up the full width (as 4 cards)
            }}
          >
            <h3>Smoke Alert</h3>
            <p>{cardData.smokeAlert}</p>
          </div>
        )}
      </div>

      <table id="data-table">
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Water Level</th>
            <th>Fire Alert</th>
            <th>Smoke Alert</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((sensor, index) => (
            <tr key={index}>
              <td>{sensor.temperature}</td>
              <td>{sensor.humidity}</td>
              <td>{sensor.waterLevel}</td>
              <td>{sensor.fireAlert}</td>
              <td>{sensor.smokeAlert}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={fetchSensorData}>Retrieve Sensor Data</button>
        <button onClick={clearFields}>Clear Screen</button>
        <button onClick={() => handleCardClick('temperature')}>Temperature</button>
        <button onClick={() => handleCardClick('humidity')}>Humidity</button>
        <button onClick={() => handleCardClick('waterLevel')}>Water Level</button>
        <button onClick={() => handleCardClick('fireAlert')}>Fire Alert</button>
        <button onClick={() => handleCardClick('smokeAlert')}>Smoke Alert</button>
      </div>
    </div>
  );
};

export default SensorDashboard;
