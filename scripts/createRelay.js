const { RelayClient } = require('defender-relay-client');
const {appendFileSync} = require('fs')

async function run() {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env;
  const relayClient = new RelayClient({ apiKey, apiSecret });

  const requestParams = {
    name: 'My Relayer',
    network: 'goerli',
    minBalance: BigInt(1e17).toString(),
  };
  
  const relayer = await relayClient.create(requestParams);
  console.log("Relayer created with ID ", relayer.relayerId)
  appendFileSync('.env', `\nRELAYER_ID="${relayer.relayerId}"`)
  
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
