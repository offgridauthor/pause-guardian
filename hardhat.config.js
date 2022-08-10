require("@nomicfoundation/hardhat-toolbox");
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
  defender:   {
    "apiKey": process.env.API_KEY,
    "apiSecret": process.env.API_SECRET
  }
  
};
