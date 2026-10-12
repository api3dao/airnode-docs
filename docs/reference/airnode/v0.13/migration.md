---
title: Migration Guide
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Deployment References
path: /reference/airnode/v0.13/migration.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The following guide assumes a valid v0.12 `config.json` file. All changes listed below will need to be implemented in order to migrate to Airnode v0.13.0. This document is written in a way that will preserve existing behavior with earlier Airnode versions.

The document also mentions changes to user facing services related to Airnode, such as airnode-deployer, airnode-admin, etc., and new features.

## Summary

1. `nodeSettings.nodeVersion` updated to "0.13.0".

## Details

1. `nodeSettings.nodeVersion`

Updated to "0.13.0"

```diff
{
- "nodeVersion": "0.12.0"
+ "nodeVersion": "0.13.0"
}
```

## New features and updates

- The [HTTP Gateway](/reference/airnode/latest/understand/http-gateways.md#http-gateway) response has been harmonized so that the API call response, after undergoing any post-processing, will be present in the `rawValue` field independent of encoding success or failure.
- Airnode protocol contracts were deployed on the following chains: `linea`, `linea-goerli-testnet`, `mantle`, `mantle-goerli-testnet`, `base`, `base-goerli-testnet`, `polygon-zkevm`, and `polygon-zkevm-testnet`.
- In conjunction with the [OIS bump to v2.2](https://github.com/api3dao/ois/releases), endpoint parameters now do not have to be mapped to operation parameters.
