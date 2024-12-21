// hardhat.config.cjs

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Default Ganache RPC URL
      accounts: [
        "0x02532ae7d12f1022b38293a1d7c0ed7807da139082b99f8226299625b77141f5"  // Replace with your private key (if needed)
      ]
    }
  }
};
