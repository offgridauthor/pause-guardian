const { ethers } = require('hardhat')
const { AdminClient } = require('defender-admin-client')
const { writeFileSync, readFileSync } = require('fs')

const {name} = JSON.parse(readFileSync(`contract.json`))
const contractABI = JSON.stringify(
  JSON.parse(
    readFileSync(`artifacts/contracts/${name}.sol/${name}.json`, 'utf8')
  ).abi
)

async function main() {
  require('dotenv').config()
  const adminClient = new AdminClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  })

  const Contract = await ethers.getContractFactory(`${name}`)
  const contract = await Contract.deploy().then((f) => f.deployed())

  const contractDetails = {
    network: 'goerli',
    address: contract.address,
    name: `${name}`,
    abi: contractABI,
  }
  
  const newAdminContract = await adminClient.addContract(contractDetails)
  writeFileSync(
    `${contract}-details.json`,
    JSON.stringify(
      {
        deployedAddress: contract.address,
      },
      null,
      2
    )
  )

  console.log(`Contract Deployed to Address: ${contract.address}\n`)
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
