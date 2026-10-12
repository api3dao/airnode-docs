---
title: Migration Guide
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11
path: /reference/airnode/v0.11/migration.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The following guide assumes a valid v0.10.x `config.json` file. All changes listed below will need to be implemented in order to migrate to Airnode v0.11.2. This document is written in a way that will preserve existing behavior with earlier Airnode versions.

The document also mentions changes to user facing services related to Airnode, such as airnode-deployer, airnode-admin, etc., and new features.

## Summary

1. `ois[n].oisFormat` updated to "2.1.0". Note that Airnode v0.11.0 and v0.11.1 use "2.0.0".

2. `nodeSettings.nodeVersion` updated to "0.11.2".

3. `ois[n].endpoints[n].preProcessingSpecifications` and `ois[n].endpoints[n].postProcessingSpecifications` have an updated allowed Node environment value.

4. `chains[n].authorizers.requesterAuthorizersWithErc721` and `chains[n].authorizers.crossChainRequesterAuthorizersWithErc721` added.

5. Section `nodeSettings.oevGateway` was added.

## Details

1. `ois[n].oisFormat`

Updated to "2.1.0". Note that Airnode v0.11.0 and v0.11.1 use "2.0.0".

```diff
{
- "oisFormat": "1.4.0"
+ "oisFormat": "2.1.0"
}
```

2. `nodeSettings.nodeVersion`

Updated to "0.11.2"

```diff
{
- "nodeVersion": "0.10.0"
+ "nodeVersion": "0.11.2"
}
```

3. `ois[n].endpoints[n].preProcessingSpecifications` and `ois[n].endpoints[n].postProcessingSpecifications`

Removes `14` from the `Node 14` environment value to represent that the Node version of the pre- and post-processing environments is dictated by the Node.js version of Airnode. As of v0.11, the Node.js version of Airnode was upgraded from 14 to 18.

```diff
{
  "preProcessingSpecifications": [
    {
-     "environment": "Node 14",
+     "environment": "Node",
      "timeoutMs": 5000,
      "value": ""
    }
  ]
}
```

```diff
{
  "postProcessingSpecifications": [
    {
-     "environment": "Node 14",
+     "environment": "Node",
      "timeoutMs": 5000,
      "value": ""
    }
  ]
}
```

4. `chains[n].authorizers.requesterAuthorizersWithErc721` and `chains[n].authorizers.crossChainRequesterAuthorizersWithErc721`

Adds two new authorizers, `requesterAuthorizersWithErc721` and `crossChainRequesterAuthorizersWithErc721`, that enable request authorization using ERC721 tokens. These new fields are required, but their values may be empty arrays if this feature is not required. For further details, see the [Authorizers](/reference/airnode/v0.11/concepts/authorizers.md#how-are-authorizers-implemented) page.

```diff
  "chains": [
    {
      "authorizers": {
+       "requesterAuthorizersWithErc721": [],
+       "crossChainRequesterAuthorizersWithErc721": [],
        "requesterEndpointAuthorizers": [],
        "crossChainRequesterAuthorizers": []
      },
    }
  ]
```

5. With the new OEV gateway feature there's a new section in the `config.json` file for it. The new section `nodeSettings.oevGateway` needs to be added in order for the configuration file to be valid.

```diff
{
  "httpSignedDataGateway": {
    "enabled": false
  },
+ "oevGateway": {
+   "enabled": false
+ },
  "logFormat": "plain",
  "logLevel": "INFO",
}
```

Read the [OEV gateway](/reference/airnode/v0.11/understand/oev-gateway.md) doc to learn more about this feature.

## New features

- The Node.js version of Airnode was upgraded from 14 to 18.
- The `coingecko-signed-data` and `coingecko-testable` HTTP gateway `airnode-examples` integrations have been combined into a single `coingecko-http-gateways` integration.
- There's a new gateway available called the OEV gateway. Read the [OEV gateway](/reference/airnode/v0.11/understand/oev-gateway.md) doc to learn more about this feature.
- The heartbeat payload now includes `deployment_id`.
- The `value` for a `fixedOperationParameters` object is now allowed to be any type, including an object; for example, the following specifies an array containing multiple primitives. Note that this feature is only available beginning in v0.11.2.

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

<FlexEndTag/>
