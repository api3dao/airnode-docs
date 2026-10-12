---
title: Migration Guide
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Deployment References
path: /reference/airnode/next/migration.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

This document describes changes to `config.json` as well as to user facing services related to Airnode, such as airnode-deployer, airnode-admin, etc.

## Changes to `config.json`

The following assumes a valid v0.13 `config.json` file. All changes listed below must be implemented in order to migrate to Airnode v0.14.1.

1. `nodeSettings.nodeVersion`

Updated to "0.14.1"

```diff
{
- "nodeVersion": "0.13.0"
+ "nodeVersion": "0.14.1"
}
```

2. `ois[n].oisFormat`

Updated to "2.3.2".

```diff
{
- "oisFormat": "2.2.1"
+ "oisFormat": "2.3.2"
}
```

## Breaking changes outside of `config.json`

The following are not expected to have an impact on users, but are listed here for completeness.

- The OEV interface has changed in the following ways:
  - `api3ServerV1` has replaced `dapiServerAddress`
  - `templateId` has replaced `endpointId` and `encodedParameters`
- `chainNames` and `networks` are no longer exported from `references.json` of `airnode-protocol`.
- Support for `boba-avalanche` has been removed as the chain has shut down.

## New features and fixes

- In conjunction with OIS v2.3.2, there is now a version 2 of pre-processing and post-processing. More details can be found in the [OIS reference](/reference/ois/latest/processing.md#v2).
- OEV gateway AWS lambda memory has been increased from 256 MB to 2048 MB
- Airnode protocol contracts have been deployed on LightLink, LightLink Goerli Testnet, and Blast Sepolia Testnet chains. You can find the addresses on the [Contracts page](/reference/airnode/next/index.md).
