# Defender Relayer Pause Guardian Demo

Demo repo showing basic OpenZeppelin Defender "fast-pause" feature for automated incident response. Defender lets you configure Sentinels for monitoring transactions on your contracts, which you can use to fire a script you load into an Autotask. As part of that script, you can send a pause transaction to your contracts via a Relayer, which is a private key assigned to your team and managed by Defender in a secure keyvault, with a few goodies built in like nonce management, gas price estimation, and automatic retries.

## Scripts

`yarn generate` : Generates pausable ERC20 contract with role-based access control using OpenZeppelin Contracts Wizard API
`yarn deploy` : Deploys the ERC20 contract and adds it to Defender Admin dashboard
`yarn relay` : Creates a Relayer, used to run blockchain transactions via API
(assign pauser role via defender)
`yarn autotask` : Creates an Autotask that runs `pause` on the deployed ERC20 contract using the Relayer
`yarn sentinel` : Creates a Sentinel that triggers the Autotask if a high volume token transfer is detected
