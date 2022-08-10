require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require('@openzeppelin/hardhat-defender');
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: 'https://rpc.goerli.mudit.blog',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey:{
      goerli: process.env.ETHERSCAN_KEY
    }
  },
  defender:   {
    "apiKey": process.env.API_KEY,
    "apiSecret": process.env.API_SECRET
  }
  
};
