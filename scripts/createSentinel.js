const { SentinelClient } = require('defender-sentinel-client')
const { readFileSync } = require('fs')

const { name } = JSON.parse(readFileSync(`contract.json`))
const ABI = JSON.stringify(
  JSON.parse(readFileSync(`./artifacts/contracts/${name}.sol/${name}.json`)).abi
)
const ADDRESS = JSON.stringify(
  JSON.parse(readFileSync(`${name}-details.json`)).address
)
const autotaskId = JSON.stringify(
  JSON.parse(readFileSync(`autotask.json`)).AutotaskId
)

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
    autotaskTrigger: autotaskId,
    notificationChannels: [notificationChannels[0].notificationId],
  }

  const newSentinel = await client.create(requestParams)
  console.log(newSentinel)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
