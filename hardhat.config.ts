import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",  // Default Ganache RPC URL
      accounts: [`0x9a5f141c63e6b7f670f7384b9d19f6200f74ee9e6cd1b4bf7e08ddb13ad509f6`]  // Replace with your private key (if needed)
    }
  }
};
