// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SensorData {
    struct Sensor {
        string id;            // ID of the sensor
        string temperature;
        string humidity;
        string waterLevel;
        string fireAlert;
        string smokeAlert;
    }

    // Store data in an array
    Sensor[] public sensorData;
    
    // Event to notify when data is added
    event SensorDataAdded(string id, string temperature, string humidity, string waterLevel, string fireAlert, string smokeAlert);
    
    // Event to notify when data is modified
    event SensorDataModified(string id, string temperature, string humidity, string waterLevel, string fireAlert, string smokeAlert);

    // Function to add sensor data with an ID
    function addSensorData(
        string memory _id,           // ID parameter added
        string memory _temperature,
        string memory _humidity,
        string memory _waterLevel,
        string memory _fireAlert,
        string memory _smokeAlert
    ) public {
        // Create new Sensor struct with ID and add to the sensorData array
        Sensor memory newSensor = Sensor({
            id: _id,                   // Set ID value
            temperature: _temperature,
            humidity: _humidity,
            waterLevel: _waterLevel,
            fireAlert: _fireAlert,
            smokeAlert: _smokeAlert
        });
        
        sensorData.push(newSensor);
        
        // Emit event to notify the addition of new data with the ID
        emit SensorDataAdded(_id, _temperature, _humidity, _waterLevel, _fireAlert, _smokeAlert);
    }

    // Function to retrieve all sensor data in JSON-like format
    function getSensorData() public view returns (string memory) {
        string memory result = "[";  // Start of the JSON array
        
        for (uint i = 0; i < sensorData.length; i++) {
            Sensor memory sensor = sensorData[i];
            
            // Concatenate each sensor data as a JSON object string
            result = string(abi.encodePacked(result, 
                '{"id":"', sensor.id, 
                '", "temperature":"', sensor.temperature,
                '", "humidity":"', sensor.humidity,
                '", "waterLevel":"', sensor.waterLevel,
                '", "fireAlert":"', sensor.fireAlert,
                '", "smokeAlert":"', sensor.smokeAlert, '"},'
            ));
        }
        
        // Remove trailing comma and close the JSON array
        if (bytes(result).length > 1) {
            result = substring(result, 0, bytes(result).length - 1); // Remove last comma
        }
        
        result = string(abi.encodePacked(result, "]"));
        
        return result; // Return the final JSON-like string
    }

    // Function to modify the sensor data based on a specific ID
    function modifySensorData(
        string memory _id,           // ID of the sensor to search for
        string memory _temperature,
        string memory _humidity,
        string memory _waterLevel,
        string memory _fireAlert,
        string memory _smokeAlert
    ) public returns (bool success) {
        // Loop through the sensorData array
        for (uint i = 0; i < sensorData.length; i++) {
            // Check if the ID matches
            if (keccak256(abi.encodePacked(sensorData[i].id)) == keccak256(abi.encodePacked(_id))) {
                // Modify the sensor data fields
                sensorData[i].temperature = _temperature;
                sensorData[i].humidity = _humidity;
                sensorData[i].waterLevel = _waterLevel;
                sensorData[i].fireAlert = _fireAlert;
                sensorData[i].smokeAlert = _smokeAlert;
                
                // Emit event to notify that the data has been modified
                emit SensorDataModified(_id, _temperature, _humidity, _waterLevel, _fireAlert, _smokeAlert);
                
                return true; // Return true indicating successful modification
            }
        }
        
        // If no sensor with the given ID is found, return false
        return false;
    }

    // Utility function to substring a string (Solidity does not have this natively)
    function substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        uint j = 0;
        for (uint i = startIndex; i < endIndex; i++) {
            result[j] = strBytes[i];
            j++;
        }
        return string(result);
    }
}
