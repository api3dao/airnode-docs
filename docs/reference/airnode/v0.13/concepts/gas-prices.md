---
title: Gas Price Strategies
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Concepts and Definitions
path: /reference/airnode/v0.13/concepts/gas-prices.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Airnode supports different strategies to calculate the gas price that it should use for submitting transactions. These can be defined in the `config.json` using the `chains.options.gasPriceOracle` field.

The supported strategies include:

- [latestBlockPercentileGasPrice](/reference/airnode/v0.13/concepts/gas-prices.md#latestblockpercentilegasprice)
- [providerRecommendedGasPrice](/reference/airnode/v0.13/concepts/gas-prices.md#providerrecommendedgasprice)
- [sanitizedProviderRecommendedGasPrice](/reference/airnode/v0.13/concepts/gas-prices.md#sanitizedproviderrecommendedgasprice)
- [providerRecommendedEip1559GasPrice](/reference/airnode/v0.13/concepts/gas-prices.md#providerrecommendedeip1559gasprice)
- [constantGasPrice](/reference/airnode/v0.13/concepts/gas-prices.md#constantgasprice)

Below are examples of each strategy.

```json
// latestBlockPercentileGasPrice
{
  "gasPriceStrategy": "latestBlockPercentileGasPrice",
  "percentile": 60,
  "minTransactionCount": 20,
  "pastToCompareInBlocks": 20,
  "maxDeviationMultiplier": 2
}
// providerRecommendedGasPrice
{
  "gasPriceStrategy": "providerRecommendedGasPrice",
  "recommendedGasPriceMultiplier": 1.2
}
// sanitizedProviderRecommendedGasPrice
{
  "gasPriceStrategy": "sanitizedProviderRecommendedGasPrice",
  "recommendedGasPriceMultiplier": 1.2,
  "baseFeeMultiplier": 2,
  "baseFeeMultiplierThreshold": 5,
  "priorityFee": {
    "value": 3.12,
    "unit": "gwei",
  },
}
// providerRecommendedEip1559GasPrice
{
  "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
  "baseFeeMultiplier": 2,
  "priorityFee": {
    "value": 3.12,
    "unit": "gwei"
  }
}
// constantGasPrice
{
  "gasPriceStrategy": "constantGasPrice",
  "gasPrice": {
    "value": 10,
    "unit": "gwei"
  }
}
```

The strategies are attempted in the order that they are defined in `config.json` where the Airnode will move on to the next strategy in the list if the current fails. The only required strategy to be included is `constantGasPrice` which is intended to be used as the final fallback if all other strategies fail to return a gas price. Therefore, `constantGasPrice` should be set as the last strategy in the list.

It does not make sense to mix and match eip1559 (`providerRecommendedEip1559GasPrice`) and non-eip1559 (`providerRecommendedGasPrice`) strategies though it can be done. The best practice is to use one or the other.

## latestBlockPercentileGasPrice

The `latestBlockPercentileGasPrice` strategy calculates a gas price based on the specified percentile of previous transactions in recent blocks and sets the transaction to `type 0` and a `gasPrice` value. The parameters that the strategy uses to calculate the gas price can be configured. This strategy can fail with local hardhat nodes because the chain may not have enough blocks.

```json
{
  "gasPriceStrategy": "latestBlockPercentileGasPrice",
  "percentile": 60,
  "minTransactionCount": 20,
  "pastToCompareInBlocks": 20,
  "maxDeviationMultiplier": 2
}
```

### `percentile`

(required) - The percentile of gas prices to return from a block.

### `minTransactionCount`

(required) - The minimum amount of transactions required in a block to use for calculating a gas price percentile.

### `pastToCompareInBlocks`

(required) - The number of blocks to look back for the reference block.

### `maxDeviationMultiplier`

(required) - The maximum deviation multiplier of the latest block gas price percentile compared to the reference block gas price percentile. Used to protect against large gas price spikes.

## providerRecommendedGasPrice

The `providerRecommendedGasPrice` strategy gets a gas price estimate from the provider, applies the defined multiplier to it and sets the transaction to`type 0` and a `gasPrice` value.

```json
{
  "gasPriceStrategy": "providerRecommendedGasPrice",
  "recommendedGasPriceMultiplier": 1.2
}
```

### `recommendedGasPriceMultiplier`

(required) - A number with a maximum of two decimals that gets multiplied by the provider reported gas price. The resulting Gas Price will equal `Gas Price * providerRecommendedGasPrice`.

## sanitizedProviderRecommendedGasPrice

The `sanitizedProviderRecommendedGasPrice` strategy builds upon the `providerRecommendedGasPrice` strategy to ensure that the gas price remains reasonable and capped based on specified parameters. The strategy estimates gas by first determining the `providerRecommendedGasPrice`. It then compares this value, multiplied by `recommendedGasPriceMultiplier`, to the Base Fee reported in block headers multiplied by the `baseFeeMultiplierThreshold`. If the former is greater than the latter, it multiplies the Base Fee with the `baseFeeMultiplier`, adds the `priorityFee`, and returns this value. Otherwise, it returns the value from the `providerRecommendedGasPrice` strategy. Similar to the former, it sets the transaction to `type 0` and a `gasPrice` value.

```json
{
  "gasPriceStrategy": "sanitizedProviderRecommendedGasPrice",
  "recommendedGasPriceMultiplier": 1.2,
  "baseFeeMultiplierThreshold": 5,
  "baseFeeMultiplier": 2,
  "priorityFee": {
    "value": 3.12,
    "unit": "gwei"
  }
}
```

### `recommendedGasPriceMultiplier`

(required) - A number with a maximum of two decimals that gets multiplied by the provider reported gas price. This value will be passed to parent strategy `providerRecommendedGasPrice`.

### `baseFeeMultiplierThreshold`

(required) - A threshold value used to determine whether the strategy should sanitize the gas estimation from the `providerRecommendedGasPrice` strategy.

### `baseFeeMultiplier`

(required) - Number multiplied by the Base Fee. The resulting sanitized gas price will equal `(Base Fee * baseFeeMultiplier) + priorityFee`.

### `priorityFee`

(required) - An object that configures the Priority Fee.

  <div style="margin-left:32px;">

#### `priorityFee.value`

(required) - A number specifying the priority fee value.

#### `priorityFee.unit`

(required) - The unit of the priority fee value. It can be one of the following: (wei, kwei, mwei, gwei, szabo, finney, ether).

  </div>

## providerRecommendedEip1559GasPrice

The `providerRecommendedEip1559GasPrice` strategy gets an EIP1559 fee data estimate from the provider and applies the configured `baseFeeMultiplier` and `priorityFee` values returning a `type 2` transaction with `maxFeePerGas` and `maxPriorityFeePerGas` values.

```json
{
  "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
  "baseFeeMultiplier": 2,
  "priorityFee": {
    "value": 3.12,
    "unit": "gwei"
  }
}
```

### `baseFeeMultiplier`

(required) - Number multiplied by the Base Fee to yield the Maximum Fee for EIP-1559 transactions. Defaults to: `2`. The resulting Maximum Fee will equal `(Base Fee * baseFeeMultiplier) + priorityFee`.

### `priorityFee`

(required) - An object that configures the EIP-1559 Priority Fee. Defaults: `{"value": 3.12, "unit": "gwei"}`.

  <div style="margin-left:32px;">

#### `priorityFee.value`

(required) - A number specifying the EIP-1559 priority fee value.

#### `priorityFee.unit`

(required) - The unit of the priority fee value. It can be one of the following: (wei, kwei, mwei, gwei, szabo, finney, ether).

  </div>

## constantGasPrice

The `constantGasPrice` strategy returns a `type 0` gas price with the configured `gasPrice` value. This strategy is intended to be used as a fallback in the case that the other strategies fail to return a gas price.

```json
{
  "gasPriceStrategy": "constantGasPrice",
  "gasPrice": {
    "value": 10,
    "unit": "gwei"
  }
}
```

### `gasPrice`

(required) - An object of the form `{"value": 0, "unit": "wei"}` that configures the amount to use as gas price.

  <div style="margin-left:32px;">

#### `gasPrice.value`

(required) - A number specifying the `gasPrice` value.

#### `gasPrice.unit`

(required) The unit of the `gasPrice` value. It can be one of the following: (wei, kwei, mwei, gwei, szabo, finney, ether).

  </div>

<FlexEndTag/>
