---
title: Chain Idiosyncrasies
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11
path: /reference/airnode/v0.11/chain-idiosyncrasies.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Differences in chain design inevitably lead to some unique chain-specific considerations. Below are idiosyncrasies we have identified, though it may not be comprehensive and we are interested in hearing if you encounter others.

## config.json - `chains` field

The idiosyncrasies below relate to the `chains` field of `config.json` discussed in [Configuring Airnode](/reference/airnode/v0.11/understand/configuring.md#chains) and [Deployment Files](/reference/airnode/v0.11/deployment-files/config-json.md#chains) section.

### Avalanche

Gas prices on Avalanche mainnet are often underestimated when getting `type 0` estimates (e.g. for the `providerRecommendedGasPrice` strategy). The error manifests as the `maxFeePerGas` being set to less than the block `baseFeePerGas`, resulting in unfulfilled requests. A solution to this is to set `recommendedGasPriceMultiplier` to slightly greater than `1` e.g. `1.1`.

### Arbitrum

Execution costs on Arbitrum are calculated slightly differently than Ethereum, which impacts the gas required to fulfill requests. To account for this, it is recommended to use a minimum value of `5000000` for `fulfillmentGasLimit` when using both Arbitrum mainnet and testnet. Read more about [ArbGas](https://developer.offchainlabs.com/docs/arbgas) gas and fees.

### Metis

On the Metis testnet Stardust, though not on the Metis mainnet Andromeda, it is recommended to use a `fulfillmentGasLimit` of at least `5000000`.

### Optimism

Using `type 0` transaction types is recommended over `type 2` so the use of `providerRecommendedEip1559GasPrice` is discouraged.

As a L2 scaling solution, Optimism has an L1 data fee and an L2 execution fee, which are [accounted for separately](https://docs.optimism.io/stack/transactions/fees)). To cover the L1 data fee when a sponsor requests a [withdrawal](/reference/airnode/v0.11/concepts/sponsor.md#withdrawals), an amount has to be subtracted from the funds returned to the sponsor. The `withdrawalRemainder` parameter has been introduced specifically for this reason, though the value required will differ between Optimism mainnet and testnet due to differences in L1 gas fees. For Optimism testnet, a `withdrawalRemainder` of `1 gwei` should suffice, while for Optimism mainnet, a value as high as `2.4 finney` (`2400000 gwei`) may be required in order to cover an L1 gas price of `300 gwei` and `8000` L1 gas used by the transaction.

<FlexEndTag/>
