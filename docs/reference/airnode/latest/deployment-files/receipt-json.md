---
title: receipt.json
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Deployment Files
path: /reference/airnode/latest/deployment-files/receipt-json.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

A `receipt.json` file is outputted after each deployment and contains non-sensitive information about the deployment. The main use of a receipt file is to remove an Airnode deployment when no longer needed. See the [Airnode Removal documentation](/reference/airnode/latest/packages/deployer.md) for usage and commands.

It also provides the Airnode xpub for the hardened derivation path `m/44'/60'/0'` that must be announced off-chain in order for sponsors to derive their designated sponsor wallet. This wallet will then be used by the Airnode to fulfill each request made by the requester contracts.

- `airnodeWallet`: address and xpub information
- `deployment`: Airnode configuration and timestamp of deployment
- `success`: specifies whether the deployment was successful or not

A `receipt.json` file is created for both a AWS or GCP deployment. A receipt is not generated for client deployments (deploying to a Docker container).

::: code-group

```json [AWS]
{
  "airnodeWallet": {
    "airnodeAddress": "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace",
    "airnodeXpub": "xpub6C8tvRgYkjNVaGMtpyZf4deBcUQHf7vgWUraVxY6gYiZhBYbPkFkLLWJzUUeVFdkKpVtatmXHX8kB76xgfmTpVZWbVWdq1rneaAY6a8RtbY"
  },
  "deployment": {
    "deploymentId": "awsef86dfad",
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1",
      "disableConcurrencyReservations": false
    },
    "stage": "starter-example",
    "nodeVersion": "0.14.1",
    "timestamp": "2022-03-26T02:37:55.506Z"
  },
  "success": true
}
```

```json [GCP]
{
  "airnodeWallet": {
    "airnodeAddress": "0xAcCc602FA6d1dD57cE11559Fe0c07895396a7359",
    "airnodeXpub": "xpub6C6wfzZ8EptS8Ti2xZgukJFWkgBcFY2ygU4BDTTGtR2GmX3vvrx3YFat3i1XLfwvhtiCEty1GZnV1MSCKBBt7uYKBbrHaqWvP623w9jUNhW"
  },
  "deployment": {
    "deploymentId": "gcpbecf1982",
    "cloudProvider": {
      "type": "gcp",
      "region": "us-east4",
      "disableConcurrencyReservations": false,
      "projectId": "api3-753118"
    },
    "stage": "dev",
    "nodeVersion": "0.14.1",
    "timestamp": "2022-03-26T02:37:55.506Z"
  },
  "success": true
}
```

:::

<FlexEndTag/>
