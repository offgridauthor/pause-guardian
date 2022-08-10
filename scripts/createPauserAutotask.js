const { AutotaskClient } = require('defender-autotask-client')
const { appendFileSync } = require('fs')

async function main() {
  require('dotenv').config()
  const credentials = {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  }
  const autotaskClient = new AutotaskClient(credentials)

  const pauserAutotask = {
    name: 'erc20 pauser autotask',
    encodedZippedCode: await autotaskClient.getEncodedZippedCodeFromFolder(
      './src/pauser/autotasks'
    ),
    trigger: {
      type: 'webhook',
    },
    paused: false,
    relayerId: process.env.RELAYER_ID,
  }

  const createdAutotask = await autotaskClient.create(pauserAutotask)
  console.log(createdAutotask)

  appendFileSync('.env', `\nAUTOTASK_ID="${createdAutotask.autotaskId}"`)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
