import { writeFileSync, appendFileSync } from 'fs'
import { erc20 } from '@openzeppelin/wizard'

const params = {
  name: 'ExampleToken',
  symbol: 'ETK',
  mintable: true,
  premint: '1000000',
  access: 'roles',
  pausable: true,
}

const contract = erc20.print(params)

writeFileSync(`./contracts/${params.name}.sol`, contract)
appendFileSync('.env', `\nCONTRACT_NAME="${params.name}"`)