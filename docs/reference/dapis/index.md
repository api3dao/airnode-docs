---
title: dAPI Names
sidebarHeader: Reference
sidebarSubHeader: dAPIs
pageHeader: Reference → dAPIs
path: /reference/dapis/index.html
version:
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

# {{$frontmatter.title}}

A dAPI is a live data point associated with human readable `dapiName`. dAPI
definitions simplify access and can return aggregated Beacon values or a single
Beacon value. This is suitable where the more recent data point (meaning its set
of Beacons could change as needed) is always more favorable, e.g., in the
context of an asset price data feed.

## Example Usage

Pass a `dapiName`, as an encoded bytes32 value, to the desired `DapiServer.sol`
reader function the uses `dapiName` as its parameter.

- [readDataFeedWithDapiName(\_dapiName)](./functions/read-data-feed-with-dapi-name.md) -
  returns a value and timestamp
- [readDataFeedValueWithDapiName(\_dapiName)](./functions/read-data-feed-value-with-dapi-name.md) -
  returns a value

The example below generates the encoded bytes32 value of AVAX/USD. Try encoding
AVAX/USD in the [ethers playground](https://playground.ethers.org/).

```solidity
// Encode the dapiName (such as AVAX/USD) to bytes32
ethers.utils.formatBytes32String("AVAX/USD");
// 0x415641582f555344000000000000000000000000000000000000000000000000
// Pass the above value to readDataFeedWithDapiName()

// Calling readDataFeedWithDapiName() using the DapiServer contract
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName("0x415641582f555344000000000000000000000000000000000000000000000000");
```

## Optionally, use Beacon and Beacon set IDs

It is possible to use a Beacon or Beacon set ID by calling
[readDataFeedId()](./functions/read-data-feed-with-id.md) and
[readDataFeedValueById()](./functions/read-data-feed-value-with-id.md). Doing so
is considered an advanced user flow. In practice reading with a name and reading
with an ID are very different things. When you read with a name, you benefit
from what the name maps to and how its value is aggregated from sourced Beacons.
API3 manages dAPI name mappings to provide the best possible responses. When you
read with an ID, you will always read a value directly from a Beacon or Beacon
set. Also see
[dAPI Composition](/explore/dapis/what-are-dapis.md#dapi-composition).
