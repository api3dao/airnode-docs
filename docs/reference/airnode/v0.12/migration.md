---
title: Migration Guide
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.12
path: /reference/airnode/v0.12/migration.html
version: v0.12
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The following guide assumes a valid v0.11.2 `config.json` file. All changes listed below will need to be implemented in order to migrate to Airnode v0.12.0. This document is written in a way that will preserve existing behavior with earlier Airnode versions.

The document also mentions changes to user facing services related to Airnode, such as airnode-deployer, airnode-admin, etc., and new features.

## Summary

1. `ois[n].oisFormat` updated to "2.1.0". This has not changed since v0.11.2, but has changed since v0.11.0 and v0.11.1 for which it was "2.0.0".

2. `nodeSettings.nodeVersion` updated to "0.12.0".

## Details

1. `ois[n].oisFormat`

Updated to "2.1.0". This has not changed since v0.11.2, but has changed since v0.11.0 and v0.11.1 for which it was "2.0.0".

```diff
{
- "oisFormat": "2.0.0"
+ "oisFormat": "2.1.0"
}
```

2. `nodeSettings.nodeVersion`

Updated to "0.12.0"

```diff
{
- "nodeVersion": "0.11.2"
+ "nodeVersion": "0.12.0"
}
```

## New features and updates

- There is no longer a hardcoded limit to the maximum number of sponsor wallet requests processed each cycle.

- Data from the HTTP Gateway is returned from successful API calls that fail response processing in order to assist with debugging. For an example, see the [HTTP Gateways](/reference/airnode/v0.12/understand/http-gateways.md#http-gateway) page.

- In all pre-processing and post-processing steps, parameters are now immutably exposed via an `endpointParameters` object and reserved parameters are no longer accessible.

- The `value` for a `fixedOperationParameters` object is now allowed to be any type, including an object; for example, the following specifies an array containing multiple primitives. This has not changed since v0.11.2, but has changed since v0.11.0 and v0.11.1 for which it was only allowed to be a string.

  ```json
  {
    "fixedOperationParameters": [
      {
        "operationParameter": {
          "in": "query",
          "name": "params"
        },
        "value": ["finalized", false]
      }
    ]
  }
  ```

- A new gas strategy, `sanitizedProviderRecommendedGasPrice`, has been added. See the [gas price documentation](/reference/airnode/v0.12/concepts/gas-prices.md#sanitizedproviderrecommendedgasprice) for more details.

- Gas can now be automatically estimated for RRP fulfillments on supported chains by excluding `chains[n].options.fulfillmentGasLimit` from `config.json`. For more details see the [corresponding documentation](/reference/airnode/v0.12/deployment-files/config-json.md#options-fulfillmentgaslimit).

- `AirnodeRrpV0` and `RequesterAuthorizerWithErc721` contract addresses are now optional if there is an API3 deployment for that contract on the specified chain. A table of such deployments can be found on the [Contract Addresses](/reference/airnode/v0.12/index.md) page. The following illustrates how the addresses can be omitted. First, within the `chains[n]` object:

  ```diff
  {
  - "contracts": {
  -   "AirnodeRrp": "0x..."
  - },
  }
  ```

  And second, within the `chains[n].authorizers` object:

  ```diff
  {
    "authorizers": {
      "requesterEndpointAuthorizers": [],
      "crossChainRequesterAuthorizers": [
        {
          "requesterEndpointAuthorizers": ["0x..."],
          "chainType": "evm",
          "chainId": "5",
  -       "contracts": {
  -         "AirnodeRrp": "0x..."
  -       },
          "chainProvider": {
            "url": "http://127.0.0.2"
          }
        }
      ],
      "requesterAuthorizersWithErc721": [
        {
  -       "RequesterAuthorizerWithErc721": "0x...",
          "erc721s": ["0x..."]
        }
      ],
      "crossChainRequesterAuthorizersWithErc721": [
        {
          "erc721s": ["0x..."],
          "chainType": "evm",
          "chainId": "5",
  -       "contracts": {
  -         "RequesterAuthorizerWithErc721": "0x..."
  -       },
          "chainProvider": {
            "url": "http://127.0.0.2"
          }
        }
      ]
    }
  }
  ```

<FlexEndTag/>
