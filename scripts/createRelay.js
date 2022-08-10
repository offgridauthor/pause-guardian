const { RelayClient } = require('defender-relay-client');

async function run() {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  const relayClient = new RelayClient({ apiKey, apiSecret });

  const requestParams = {
    name: 'My Relayer',
    network: 'goerli',
    minBalance: BigInt(1e17).toString(),
  };
  
  await relayClient.create(requestParams);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
