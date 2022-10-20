---
title: Calling a dAPI
sidebarHeader: Guides
sidebarSubHeader:
pageHeader: Guides → dAPIs
path: /guides/dapis/calling-a-dapi.html
outline: deep
tags:
  - dapi
  - dapis
  - datafeed
  - datafeeds
  - data
  - feed
  - feeds
---

<PageHeader/>

# {{$frontmatter.title}}

Use the `DapiServer` contract to access dAPIs on-chain. There are four functions
within `DapiServer` that can be called to get dAPI values. The more common ones
use a human readable name.

- `readDataFeedWithDapiName(\_dapiName)` - returns a value and timestamp
- `readDataFeedValueWithDapiName(\_dapiName)` - returns only the value

Watch this short video to gain an understanding on how a dAPI is called.

<iframe width="560" height="315" src="https://www.youtube.com/embed/edI2upnMsA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

::: danger Follow-up tips

Starting here add information and highlight content from the video so the reader
does not need to go back to the video to get at important code snippets.

:::

## DapiServer

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

<Tabs>

@tab:DapiServer

```solidity
import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
...
// Calling the ETH/USD dAPI with the DapiServer contract address.
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName("ETH/USD");
```

@tab:Smart Contractr

```solidity
import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
...
// Calling the ETH/USD dAPI with the DapiServer contract address.
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName("ETH/USD");
```

</Tabs>
