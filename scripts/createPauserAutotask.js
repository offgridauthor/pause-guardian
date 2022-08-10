const {AutotaskClient} = require('defender-autotask-client')
const {writeFileSync } = require('fs')

async function main() {
  require('dotenv').config();
  const credentials = {apiKey: process.env.API_KEY, apiSecret: process.env.API_SECRET}
  const autotaskClient = new AutotaskClient(credentials)

  const pauserAutotask = {
    name: "erc20 pauser autotask",
    encodedZippedCode: await autotaskClient.getEncodedZippedCodeFromFolder('./src/pauser/autotasks'),
    trigger: {
      type: 'webhook',
    },
    paused: false,
    relayerId: '8797f960-20f0-4ff0-b7d2-086a9daf6f9f',
  }

  const createdAutotask = await autotaskClient.create(pauserAutotask)
  console.log(createdAutotask)

  writeFileSync(
    `autotask.json`,
    JSON.stringify(
      {
        AutotaskId: createdAutotask.autotaskId,
      },
      null,
      2
    )
  )

}

if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}
