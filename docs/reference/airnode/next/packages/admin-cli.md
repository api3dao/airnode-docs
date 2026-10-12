---
title: Admin CLI
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Packages
path: /reference/airnode/next/packages/admin-cli.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Use the [airnode-admin](https://github.com/api3dao/airnode/tree/v0.14/packages/airnode-admin) Admin CLI tool to interact with Airnode across blockchains. There are commands for both developers (dApp) and API providers. Developers can sponsor [requester](/reference/airnode/next/concepts/requester.md) contracts and derive [sponsorWallets](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) for Airnodes. API providers can build [Airnodes](/reference/airnode/next/concepts/airnode.md) that serve their API data to requester contracts.

::: warning Transaction Gas Costs

Some commands will incur transaction fees. These are per call transaction gas costs and are relatively small. See the [<span style="color:green;">Developer Fees</span>](/reference/airnode/next/developers/fees.md) doc.

:::

Almost all commands require you to provide a blockchain `providerUrl`. Following are just two examples of many possibilities. See the [Chain Providers](/reference/airnode/next/concepts/chain-providers.md) doc for more information.

- `https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID>`
- `https://sepolia.infura.io/v3/<KEY>`

The CLI connects to the [AirnodeRrpV0.sol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol) or the [RequesterAuthorizerWithAirnode.sol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol) contract, which addresses are derived from the current chain. You can optionally specify the contract addresses yourself by providing optional `airnode-rrp-address` or `requester-authorizer-with-airnode` command argument with the address of the deployed contract on your targeted chain.

Commands that require `mnemonic` will make an on-chain transaction. The application will derive the account from the mnemonic with default ethereum derivation path `m/44'/60'/0'/0/0`. You can override this by using the optional parameter `derivation-path` (`m/44'/60'/0'/0/...`). Make sure that the wallet that is associated with the mnemonic is funded on the target chain. The application will not exit until the transaction is confirmed.

### Using transaction overrides

CLI commands also support the following transaction overrides as optional arguments: `gas-limit`, `gas-price` (legacy transactions), `max-fee` and `max-priority-fee` (EIP-1559 transactions) and `nonce`.

### Default transaction overrides

If no overrides are provided, transactions will default to the following values:

**EIP-1559 transactions**

```sh
maxPriorityFeePerGas: 3.12 gwei
maxFeePerGas: baseFeePerGas of the last block * 2 + maxPriorityFeePerGas
```

**Legacy transactions**

```sh
gasPrice: gasPrice returned by the ethers getGasPrice method
```

## Using npx

View all commands:

```sh
npx @api3/airnode-admin --help
```

View the parameters of a command:

```sh
npx @api3/airnode-admin $COMMAND --help
```

## Using Docker

Use the Admin CLI docker image as an alternative to `npx`:

```sh
docker run api3/airnode-admin:0.15.0 --help
```

View the parameters of a command:

```sh
docker run api3/airnode-admin:0.15.0 $COMMAND --help
```

## SDK

You can also use the package programmatically. The SDK exports respective functions for all CLI commands as well as helper functions for obtaining the contract instance on the targeted chain.

```js
import { sponsorRequester, getAirnodeRrpWithSigner } from '@api3/airnode-admin';

// First obtain the contract instance on target chain
const airnodeRrp = await getAirnodeRrpWithSigner(
  mnemonic,
  derivation - path,
  providerUrl,
  airnodeRrpAddress
);
// Pass the contract instance as the first argument to the SDK function
const requester = await sponsorRequester(airnodeRrp, requester);
```

If you plan to use multiple commands it might be tedious to pass the contract instance to every function call. For this reason there is also class based `AdminSdk` which you initialize with `AirnodeRrp` contract only once.

```js
import { AdminSdk } from '@api3/airnode-admin';

// First initialize the SDK with AirnodeRrpV0 contract instance.
// You can use static AdminSdk functions or provide your own instance.
const airnodeRrp = await AdminSdk.getAirnodeRrpWithSigner(
  mnemonic,
  derivation - path,
  providerUrl,
  airnodeRrpAddress
);
// Create sdk instance
const adminSdk = new AdminSdk(airnodeRrp);
// Call the method you need
const requester = await adminSdk.sponsorRequester(requester);

// You can switch the contract instance anytime. E.g. if you are using ethers
adminSdk.airnodeRrp = airnodeRrp.connect(someOtherWallet);
```

The SDK will also provide TS typings out of the box. Please, refer to the implementation for more details.

### Using transaction overrides

You can also use transaction overrides to customize gas limits and fee settings. The SDK simply passes the overrides parameter to the contract method so you can use any overrides supported by the ethers library.

```js
import { ethers } from 'ethers';

// Legacy transaction overrides
const overrides = {
  gasLimit: ethers.BigNumber.from('200000'),
  gasPrice: ethers.utils.parseUnits('20', 'gwei')
};

// EIP-1559 transaction overrides
const overrides = {
  gasLimit: ethers.BigNumber.from('200000'),
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei')
  maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei')
};

// The transaction overrides parameter is optional and can be passed in as the last parameter
const requester = await adminSdk.sponsorRequester(requester, overrides);
```

## Sponsors

Commands related to a [sponsor's](/reference/airnode/next/concepts/sponsor.md) relationships between [requesters](/reference/airnode/next/concepts/requester.md) and [sponsorWallets](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) as well as [templates](/reference/airnode/next/concepts/template.md) used by a sponsor's requesters. Some of these commands connect to the [AirnodeRrpV0.sol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol) protocol contract where the signer is sponsor account.

- [sponsor-requester](/reference/airnode/next/packages/admin-cli.md#sponsor-requester)
- [unsponsor-requester](/reference/airnode/next/packages/admin-cli.md#unsponsor-requester)
- [get-sponsor-status](/reference/airnode/next/packages/admin-cli.md#get-sponsor-status)
- [derive-sponsor-wallet-address](/reference/airnode/next/packages/admin-cli.md#derive-sponsor-wallet-address)
- [create-template](/reference/airnode/next/packages/admin-cli.md#create-template)
- [create-inline-template](/reference/airnode/next/packages/admin-cli.md#create-inline-template)
- [get-template](/reference/airnode/next/packages/admin-cli.md#get-template)
- [request-withdrawal](/reference/airnode/next/packages/admin-cli.md#request-withdrawal)
- [check-withdrawal-request](/reference/airnode/next/packages/admin-cli.md#check-withdrawal-request)
- [verify-airnode-xpub](/reference/airnode/next/packages/admin-cli.md#verify-airnode-xpub)

### `sponsor-requester`

[Sponsors](/reference/airnode/next/concepts/sponsor.md) a [requester](/reference/airnode/next/concepts/requester.md) contract so that its requests can be fulfilled by the [sponsorWallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) of an Airnode. The account derived from the `mnemonic` you provide must belong to the sponsor.

Sponsoring a requester and using the returned `sponsorAddress` to derive a `sponsorWallet` for an Airnode creates a [relationship](/reference/airnode/next/concepts/sponsor.md) between the requester and the Airnode, see the [`derive-sponsor-wallet-address`](/reference/airnode/next/packages/admin-cli.md#derive-sponsor-wallet-address) command.

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Used to derive a `sponsorAddress` as the default account of the mnemonic unless a `derivation-path` is specified. It's also used to pay gas costs from the mnemonic's default account unless a `derivation-path` is specified.
- `requester-address`: The contract address of the requester to sponsor.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract. If this parameter is not provided, it will be deduced from the current chain. If there is no RRP address found for the given chain an error is thrown.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin sponsor-requester \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --requester-address 0x2c2e12...
```

```batch [Windows]
npx @api3/airnode-admin sponsor-requester ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --requester-address 0x2c2e12...
```

:::

### `unsponsor-requester`

Removes the sponsorship of a [requester](/reference/airnode/next/concepts/requester.md) contract so that its requests can no longer be fulfilled by the [sponsorWallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet). The account derived from the `mnemonic` you provide here has to belong to the sponsor.

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Must be the mnemonic used to sponsor the requester. Used to pay gas costs from the mnemonic's default account unless a `derivation-path` is specified.
- `requester-address`: The contract address of the requester to unsponsor.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```bash [Linux/Mac/WSL2]
npx @api3/airnode-admin unsponsor-requester \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --requester-address 0x2c2e12...
```

```batch [Windows]
npx @api3/airnode-admin unsponsor-requester ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --requester-address 0x2c2e12...
```

:::

### `get-sponsor-status`

Returns the sponsor status for a given [sponsor](/reference/airnode/next/concepts/sponsor.md) and [requester](/reference/airnode/next/concepts/requester.md) (`true` if sponsored, `false` otherwise).

- `provider-url`: A valid blockchain provider URL.
- `sponsor-address`: The `sponsorAddress` returned when the requester was sponsored.
- `requester-address`: The requester contract address.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin get-sponsor-status \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...
```

```batch [Windows]
npx @api3/airnode-admin get-sponsor-status ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-address 0x9Ec6C4... ^
  --requester-address 0x2c2e12...
```

:::

### `derive-sponsor-wallet-address`

Derives the address of the wallet designated by an Airnode for a [sponsor](/reference/airnode/next/concepts/sponsor.md), which is called the [sponsorWallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet). This command will error if `airnode-xpub` does not belong to the HDNode with the path `m/44'/60'/0'` of the Airnode wallet. See the [`derive-airnode-xpub`](/reference/airnode/next/packages/admin-cli.md#derive-airnode-xpub) command.

- `airnode-xpub`: The extended public address of the Airnode for path `m/44'/60'/0'`.
- `airnode-address`: The public address of the Airnode.
- `sponsor-address`: The address of the sponsor account.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin derive-sponsor-wallet-address \
  --airnode-xpub xpub6CUGRUo... \
  --airnode-address 0xe1e0dd... \
  --sponsor-address 0x9Ec6C4...
```

```batch [Windows]
npx @api3/airnode-admin derive-sponsor-wallet-address ^
  --airnode-xpub xpub6CUGRUo... ^
  --airnode-address 0xe1e0dd... ^
  --sponsor-address 0x9Ec6C4...
```

:::

### `create-template`

Reads a file, uses its contents to create a [template](/reference/airnode/next/concepts/template.md) and returns a `template-id`. Also see [Using Templates](/reference/airnode/next/developers/using-templates.md) for an example template file.

- `provider-url`: A valid blockchain provider URL.
- `mnemonic`: Used to pay gas costs from the mnemonic's default account unless a `derivation-path` is specified.
- `template-file-path`: Path to the template file to create on-chain.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin create-template \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --template-file-path ./template.json
```

```batch [Windows]
npx @api3/airnode-admin create-template ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --mnemonic "nature about salad..." ^
  --template-file-path ./template.json
```

:::

### `create-inline-template`

It is possible to inline Airnode templates inside config.json in a `templates` section. These templates need to be published on chain, but inlining them inside config provides more clarity which templates can be used for template requests and also saves a blockchain call .

The command reads a template file, uses its contents to create a [template](/reference/airnode/next/concepts/template.md) and returns the data necessary to inline the template inside config. See [Using Templates](/reference/airnode/next/developers/using-templates.md) for an example template file.

This command does **not** create a template on chain. Be sure to use the [create-template](/reference/airnode/next/packages/admin-cli.md#create-template) command on chain before making template requests.

- `template-file-path`: Path to the template file to create on-chain.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin create-inline-template \
  --template-file-path ./template.json
```

```batch [Windows]
npx @api3/airnode-admin create-inline-template ^
  --template-file-path ./template.json
```

:::

### `get-template`

Returns the [template](/reference/airnode/next/concepts/template.md) for the given `template-id`.

- `provider-url`: A valid blockchain provider URL.
- `template-id`: The id of a template to return.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin get-template \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --template-id 0x8d3b9...
```

```batch [Windows]
npx @api3/airnode-admin get-template ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --template-id 0x8d3b9...
```

:::

### `request-withdrawal`

Requests a [withdrawal](/reference/airnode/next/concepts/sponsor.md#withdrawals) from a [sponsorWallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) managed by an Airnode.

The funds will be returned to the account derived from the `sponsor-mnemonic`. This account must belong to a [sponsor](/reference/airnode/next/concepts/sponsor.md) for the specified [sponsor wallet address](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) in the command.

After the request is made, it needs to be fulfilled by Airnode, so the return value of this command is only a `withdrawal-request-id` which you can use to call [check-withdrawal-request](/reference/airnode/next/packages/admin-cli.md#check-withdrawal-request) to see whether the request was processed or not.

::: warning Withdrawal Priority

Airnode will drop any pending API calls associated with a `sponsorWallet` once a withdrawal is requested.

:::

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Used to pay gas costs from the mnemonic's default account unless a `derivation-path` is specified. Withdrawn funds will be added to this mnemonic's default address unless a `derivation-path` is specified.
- `airnode-address`: The public address of the Airnode.
- `sponsor-wallet-address`: The pubic address of the sponsorWallet to withdraw from. This address was returned by the `derive-sponsor-wallet-address` command.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.
- `derivation-path (optional)` : The destination address of the `mnemonic` parameter to add the withdrawn funds to if the default address is not desired.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin request-withdrawal \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --airnode-address 0xe1e0dd... \
  --sponsor-wallet-address 0x9Ec6C4...
```

```batch [Windows]
npx @api3/airnode-admin request-withdrawal ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --airnode-address 0xe1e0dd... ^
  --sponsor-wallet-address 0x9Ec6C4...
```

:::

### `check-withdrawal-request`

Checks the status of the [withdrawal](/reference/airnode/next/concepts/sponsor.md#withdrawals) request with the given `withdrawal-request-id` from the [request withdrawal command](/reference/airnode/next/packages/admin-cli.md#request-withdrawal) above.

- `provider-url`: A valid blockchain provider URL.
- `withdrawal-request-id`: This id was returned by the `request-withdrawal` command.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrpV0.sol protocol contract.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin check-withdrawal-request \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --withdrawal-request-id 0x011d1b...
```

```batch [Windows]
npx @api3/airnode-admin check-withdrawal-request ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --withdrawal-request-id 0x011d1b...
```

:::

### `verify-airnode-xpub`

Verifies that the `airnode-xpub` belongs to the HDNode with the path `m/44'/60'/0'` of the Airnode wallet. This command checks that the Airnode address can be derived with provided Airnode [xpub](/reference/airnode/next/concepts/airnode.md#xpub) with default derivation path `m/44'/60'/0'/0/0` and compares it with the `airnode-address`. This command will most likely be used by a [sponsor](/reference/airnode/next/concepts/sponsor.md) to verify that the xpub belongs to the Airnode before calling the [derive-sponsor-wallet-address](/reference/airnode/next/packages/admin-cli.md#derive-sponsor-wallet-address) command.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin verify-airnode-xpub \
  --airnode-xpub xpub6CUGRUo... \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin verify-airnode-xpub ^
  --airnode-xpub xpub6CUGRUo... ^
  --airnode-address 0xe1e0dd...
```

:::

## Airnodes

Helper commands for a previously deployed Airnode. Some of these commands connect to the AirnodeRrpV0.sol protocol contract where the signer must be the Airnode wallet.

- [derive-airnode-xpub](/reference/airnode/next/packages/admin-cli.md#derive-airnode-xpub)
- [derive-endpoint-id](/reference/airnode/next/packages/admin-cli.md#derive-endpoint-id)
- [generate-airnode-mnemonic](/reference/airnode/next/packages/admin-cli.md#generate-airnode-mnemonic)
- [derive-airnode-address](/reference/airnode/next/packages/admin-cli.md#derive-airnode-address)

### `derive-airnode-xpub`

Derives the Airnode extended public key ([xpub](/reference/airnode/next/concepts/airnode.md#xpub)). This xpub must be announced via off-chain channels because it will be needed to derive a [sponsorWallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) address. See the [derive-sponsor-wallet-address](/reference/airnode/next/packages/admin-cli.md#derive-sponsor-wallet-address) command.

- `airnode-mnemonic`: The Airnode mnemonic for which the xpub is to be derived.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin derive-airnode-xpub --airnode-mnemonic "nature about salad..."
```

```batch [Windows]
npx @api3/airnode-admin derive-airnode-xpub --airnode-mnemonic "nature about salad..."
```

:::

### `derive-endpoint-id`

Derives an [endpointId](/reference/airnode/next/deployment-files/config-json.md#triggers) from the OIS title and the endpoint's name as described in the [endpoint](/reference/airnode/next/concepts/endpoint.md) documentation. Add the `endpointId` to the config.json file (`triggers.rrp[n].endpointId`).

- `ois-title`: The title of the OIS from config.json (`ois.title`).
- `endpoint-name`: The name of the endpoint from config.json (`triggers.rrp[n].endpointName`).

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin derive-endpoint-id \
  --ois-title "My OIS title..." \
  --endpoint-name "My endpoint name..."
```

```batch [Windows]
npx @api3/airnode-admin derive-endpoint-id ^
  --ois-title "My OIS title..." ^
  --endpoint-name "My endpoint name..."
```

:::

### `generate-airnode-mnemonic`

Generates a unique mnemonic which can be used to create an [airnode wallet](/reference/airnode/next/concepts/airnode.md#mnemonic). In addition to the mnemonic, this command will also display the corresponding [airnode address](/reference/airnode/next/concepts/airnode.md#airnodeaddress) and its extended public key ([xpub](/reference/airnode/next/concepts/airnode.md#xpub)).

```sh
npx @api3/airnode-admin generate-airnode-mnemonic
```

### `generate-mnemonic`

Generates a unique mnemonic which can be used to create a wallet. In addition to the mnemonic, this command will also display the corresponding default wallet (path:m/44'/60'/0'/0/0) address.

```sh
npx @api3/airnode-admin generate-mnemonic
```

### `derive-airnode-address`

Derives the [airnode address](/reference/airnode/next/concepts/airnode.md#airnodeaddress) which is the identifier of the particular Airnode on chain. The address is the default address of a BIP 44 wallet (with the path m/44'/60'/0'/0/0). Use this identifier for many other admin CLI commands, such as [derive-sponsor-wallet-address](/reference/airnode/next/packages/admin-cli.md#derive-sponsor-wallet-address).

- `airnode-mnemonic`: A mnemonic used to generate the airnode address.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin derive-airnode-address \
--airnode-mnemonic "cricket among ..."
```

```batch [Windows]
npx @api3/airnode-admin derive-airnode-address ^
--airnode-mnemonic "cricket among ..."
```

:::

## RequesterAuthorizerWithAirnode

RequesterAuthorizerWithAirnode contract was written by API3 as an [authorizer](/reference/airnode/next/concepts/authorizers.md) contract that can be used by any Airnode. Airnode owners can use this contract in addition to authorizer contracts they have written themselves.

This authorizer contract can whitelist [requesters](/reference/airnode/next/concepts/requester.md) where each Airnode is administered by themselves.

These commands connect to the [RequesterAuthorizerWithAirnode.sol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol) contract.

- [set-whitelist-expiration](/reference/airnode/next/packages/admin-cli.md#set-whitelist-expiration)
- [extend-whitelist-expiration](/reference/airnode/next/packages/admin-cli.md#extend-whitelist-expiration)
- [set-indefinite-whitelist-status](/reference/airnode/next/packages/admin-cli.md#set-indefinite-whitelist-status)
- [get-whitelist-status](/reference/airnode/next/packages/admin-cli.md#get-whitelist-status)
- [is-requester-whitelisted](/reference/airnode/next/packages/admin-cli.md#is-requester-whitelisted)

### `set-whitelist-expiration`

Called by the Airnode wallet or a whitelist expiration setter to set the whitelisting expiration of a requester for the Airnode–endpoint pair. This can hasten expiration in the case the new expiration timestamp is prior to a previously set timestamp.

- `mnemonic`: Used to pay gas costs from the mnemonic's default account unless a `derivation-path` is specified. The mnemonic must be at least an Admin or Airnode wallet.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](/reference/airnode/next/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract address.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin set-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --expiration-timestamp 1947451793 \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin set-whitelist-expiration ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --expiration-timestamp 1947451793 ^
  --airnode-address 0xe1e0dd...
```

:::

### `extend-whitelist-expiration`

Called by the Airnode wallet or a whitelist expiration extender to extend the whitelist expiration of a requester for the Airnode–endpoint pair. This command expects that the new expiration timestamp is later then the previously set timestamp.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The mnemonic must be at least an Admin or Airnode wallet.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](/reference/airnode/next/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract address.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin extend-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --expiration-timestamp 1947451793 \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin extend-whitelist-expiration ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --expiration-timestamp 1947451793 ^
  --airnode-address 0xe1e0dd...
```

:::

### `set-indefinite-whitelist-status`

Called by the Airnode wallet or an indefinite whitelister to whitelist a requester indefinitely for the Airnode–endpoint pair. This command can be used to make whitelisting permanent in cases where it is needed to allow requests even beyond the expiration period.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The mnemonic must be at least an Admin or Airnode wallet. The default address of the mnemonic will be used unless a derivation-path is provided.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](/reference/airnode/next/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract address.
- `derivation-path (optional)`: Selects an alternate account to use from the mnemonic rather than the default.
- `indefinite-whitelist-status`: Whether the Airnode-endpoint pair should be whitelisted indefinitely or not.
- `gas-limit` (optional): The gas limit to use for the transaction.
- `gas-price` (optional): The gas price (in gwei) to use for the transaction (only for legacy transactions).
- `max-fee` (optional): The maximum fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `max-priority-fee` (optional): The maximum priority fee (in gwei) per gas to use for the transaction (only for EIP-1559 transactions).
- `nonce` (optional): The nonce to use for the transaction.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin set-indefinite-whitelist-status \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --whitelist-status-past-expiration true \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin set-indefinite-whitelist-status ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --whitelist-status-past-expiration true ^
  --airnode-address 0xe1e0dd...
```

:::

### `get-whitelist-status`

Called to get the detailed whitelist status of a requester for the Airnode–endpoint pair.

- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](/reference/airnode/next/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract address.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin get-whitelist-status \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin get-whitelist-status ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --airnode-address 0xe1e0dd...
```

:::

### `is-requester-whitelisted`

Called to check if a requester is whitelisted to use the Airnode–endpoint pair.

- `provider-url`: A valid blockchain provider URL.
- `requester-authorizer-with-airnode`: The authorizer contract address.
- `endpoint-id`: The [`endpointId`](/reference/airnode/next/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `airnode-address`: The public address of the Airnode.

::: code-group

```sh [Linux/Mac/WSL2]
npx @api3/airnode-admin is-requester-whitelisted \
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> \
  --requester-authorizer-with-airnode 0xDc64a1... \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --airnode-address 0xe1e0dd...
```

```batch [Windows]
npx @api3/airnode-admin is-requester-whitelisted ^
  --provider-url https://eth-goerli.gateway.pokt.network/v1/lb/<APP_ID> ^
  --requester-authorizer-with-airnode 0xDc64a1... ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --airnode-address 0xe1e0dd...
```

:::

## More Examples

You can find more examples in the [test directory](https://github.com/api3dao/airnode/tree/v0.14/packages/airnode-admin/test) of the `@api3-dao/airnode/package/admin` repo.

<FlexEndTag/>
