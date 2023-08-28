# OpenZeppelin Pause Guardian Demo

Demo repo showing a basic OpenZeppelin Defender "fast-pause" setup for automated incident response.

[Defender](https://defender.openzeppelin.com) lets you configure [Sentinels](https://docs.openzeppelin.com/defender/sentinel) for monitoring transactions on your contracts, which you can configure to automatically fire a script you load into an [Autotask](https://docs.openzeppelin.com/defender/autotasks). As part of that script, you can send a pause transaction to your contracts via a [Relayer](https://docs.openzeppelin.com/defender/relay), which is a private key assigned to your team and managed by Defender in a secure keyvault, with some goodies built in like EIP1559 support, nonce management, gas price estimation, and automatic retries.

[Link to Video walkthrough](https://youtu.be/11erJye56jQ)

[Link to Guide on OpenZeppelin Docs](https://docs.openzeppelin.com/defender/guide-pauseguardian)

## Structure

- `contracts` : Standard pausable ERC20 contract implementing role-based access control, generated using [Wizard api](https://www.npmjs.com/package/@openzeppelin/wizard)
- `scripts` : Custom scripts for Relayer creation, ERC20 contract generation and deployment, uploading the Autotask and creating the Sentinel
- `src/autotasks` : The `index.js` file to be loaded into Defender as an Autotask. When triggered by the Sentinel, the Autotask runs the pause function on the contract using the Relayer

## Scripts

- `generate` : Generates a pausable ERC20 contract with role-based access control using OpenZeppelin Contracts Wizard API
- `deploy` : Deploys the ERC20 contract and adds it to Defender Admin dashboard
- `relay` : Creates a Relayer, used to run blockchain transactions via API
- `autotask` : Creates an Autotask that runs `pause` on the deployed ERC20 contract using the Relayer
- `sentinel` : Creates a Sentinel that triggers the Autotask if a high volume token transfer is detected

## Environment

Expected `.env` in project root:

- `PRIVATE_KEY` : For contract deployment on Goerli network
- `API_KEY` : Defender team API key
- `API_SECRET` : Defender team API secret

The following additional values will be appended to `.env` after running the relevant creation/deployment scripts:

- `AUTOTASK_ID`
- `CONTRACT_NAME`
- `CONTRACT_ADDRESS`
- `RELAYER_ID`

## How to Run

1. Sign up for [Defender](https://defender.openzeppelin.com)

2. Ensure your deployment account is funded with Goerli ETH ([via a faucet](https://forum.openzeppelin.com/t/goerli-testnet-faucets/26710))

3. Fork the repo

4. Clone your fork and install dependencies:

```
$ git clone https://github.com/[GitHub username]/pause-guardian.git
$ cd pause-guardian
$ npm install
```

5. Supply the necessary api keys in your local `.env` file.

6. Generate a [pausable](https://docs.openzeppelin.com/contracts/3.x/api/utils#Pausable) ERC20 contract with role-based [access control](https://docs.openzeppelin.com/contracts/3.x/access-control#role-based-access-control) using OpenZeppelin Contracts Wizard API:

    `$ npm run generate`

7. Deploy the ERC20 contract and add it to Defender Admin dashboard:

    `$ npm run deploy`

8. Create a Relayer to run blockchain transactions via API:

    `$ npm run relay`

9. Assign the pauser role to the Relay via Defender UI. From the Admin dashboard, select the contract, then New Proposal --> Modify Access. On the next screen, select the PAUSER role from the dropdown, and supply the address of the Relayer just created. Select EOA as the execution strategy and select the address of the accout used to deploy the contract. Give the access proposal a title and execute it.

10. Create an Autotask that runs `pause` on the deployed ERC20 contract using the Relayer.

    `$ npm run autotask`

11. Create a Sentinel that triggers the Autotask if a high volume token transfer is detected

    `$ npm run sentinel`

