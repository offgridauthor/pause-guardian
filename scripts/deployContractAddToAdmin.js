const { ethers } = require('hardhat')
const { AdminClient } = require('defender-admin-client')
const { appendFileSync, readFileSync } = require('fs')
require('dotenv').config()

const NAME = process.env.CONTRACT_NAME
const contractABI = JSON.stringify(
  JSON.parse(
    readFileSync(`artifacts/contracts/${NAME}.sol/${NAME}.json`, 'utf8')
  ).abi
)

async function main() {
  const adminClient = new AdminClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  })

  const Contract = await ethers.getContractFactory(`${NAME}`)
  const contract = await Contract.deploy().then((f) => f.deployed())

  const contractDetails = {
    network: 'goerli',
    address: contract.address,
    name: NAME,
    abi: contractABI,
  }
  
  const newAdminContract = await adminClient.addContract(contractDetails)
  appendFileSync('.env', `\nCONTRACT_ADDRESS="${contract.address}"`)
  console.log(`Contract Deployed to: ${contract.address}`)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
