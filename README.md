# OpenZeppelin Pause Guardian Demo

Demo repo showing a basic OpenZeppelin Defender "fast-pause" setup for automated incident response.

Defender lets you configure Sentinels for monitoring transactions on your contracts, which you can configure to automatically fire a script you load into an Autotask. As part of that script, you can send a pause transaction to your contracts via a Relayer, which is a private key assigned to your team and managed by Defender in a secure keyvault, with a few goodies built in like nonce management, gas price estimation, and automatic retries.

## Structure

- `contracts` : Standard pausable ERC20 contract implementing role-based access control, generated using Wizard api
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

1. Sign up for Defender

2. Ensure your deployment account is funded with Goerli ETH

3. Fork the repo

4. Clone your fork and install dependencies:

```
$ git clone https://github.com/[GitHub username]/pause-guardian.git
$ cd pause-guardian
$ npm install
```

5. Supply the necessary api keys in your local `.env` file.

6. Generate a pausable ERC20 contract with role-based access control using OpenZeppelin Contracts Wizard API:

    `$ npm run generate`

7. Deploy the ERC20 contract and add it to Defender Admin dashboard:

    `$ npm run deploy`

8. Create a Relayer to run blockchain transactions via API:

    `$ npm run relay`

9. Assign the pauser role to the Relay via Defender UI. From the Admin dashboard, select the contract, then Admin Action. On the next screen, copy the value for the PAUSER role, select the grantRole() function, paste the PAUSER value and select the Relayer just created. Describe the Admin action and execute it.

10. Create an Autotask that runs `pause` on the deployed ERC20 contract using the Relayer.

    `$ npm run autotask`

11. Create a Sentinel that triggers the Autotask if a high volume token transfer is detected

    `$ npm run sentinel`
