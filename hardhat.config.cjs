// hardhat.config.cjs

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Default Ganache RPC URL
      accounts: [
        "0x1b15c6b11a706fc58cf62c8e1d36532f40ee0120e4b99e8cad1bf716a40e4b6e"  // Replace with your private key (if needed)
      ]
    }
  }
};
