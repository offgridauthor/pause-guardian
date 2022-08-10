const { SentinelClient } = require('defender-sentinel-client')
const { readFileSync } = require('fs')

const NAME = process.env.CONTRACT_NAME
const ABI = JSON.stringify(
  JSON.parse(readFileSync(`./artifacts/contracts/${NAME}.sol/${NAME}.json`)).abi
)
const ADDRESS = process.env.CONTRACT_ADDRESS

async function main() {
  require('dotenv').config()
  const client = new SentinelClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  })

  const requestParams = {
    type: 'BLOCK',
    network: 'goerli',
    name: 'High transfer volume detected - pausing contract',
    abi: ABI,
    address: ADDRESS,
    paused: false,
    eventConditions: [
      {
        eventSignature: 'Transfer(address,address,uint256)',
        expression: 'value > 200000e18',
      },
    ],
    autotaskTrigger: process.env.AUTOTASK_ID,
    notificationChannels: [notificationChannels[0].notificationId],
  }

  const newSentinel = await client.create(requestParams)
  console.log(newSentinel)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
