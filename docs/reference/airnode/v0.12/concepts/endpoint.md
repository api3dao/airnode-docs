---
title: Endpoint
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.12 → Concepts and Definitions
path: /reference/airnode/v0.12/concepts/endpoint.html
version: v0.12
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Airnode serves an API to a blockchain according to [Oracle Integration Specifications (OIS)](/reference/ois/2.1/). An API is composed of [operations](/reference/ois/2.1/specification.md#_5-2-operation), which represent individual functionalities that an API offers. OIS maps each API operation to an [endpoint](/reference/ois/2.1/specification.md#_5-endpoints), which can be thought of as an Airnode operation. The endpoints that an Airnode will serve over the request–response protocol are listed under triggers of [config.json](/reference/airnode/v0.12/deployment-files/config-json.md#triggers).

## `endpointId`

`endpointId` identifies a specific endpoint that an Airnode serves. Its derivation, shown below, is enforced by `airnode-validator`.

```js
ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(
    ['string', 'string'],
    [oisTitle, endpointName]
  )
);
```

An alternative method to create an `endpointId` is to use the [Admin CLI](/reference/airnode/v0.12/packages/admin-cli.md) to derive the endpoint ID.

Note that this means that an `endpointId` is not unique, and two Airnodes can serve equivalent endpoints using the same ID (in fact, this is the desired outcome). This is not an issue, as requests are made with a `airnode` (Airnode's `address`) and `endpointId` pair.

## Authorizers

Airnodes can assign a list of authorizers for each chain it responds to. See [Authorizers](/reference/airnode/v0.12/concepts/authorizers.md) for more information.

<FlexEndTag/>
