---
title: Verify dAPI sources
sidebarHeader: Reference
sidebarSubHeader: dAPIs
pageHeader: Reference → dAPIs
path: /reference/dapis/verify-beacon.html
outline: deep
tags:
---

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

[Datafeed values are stored on-chain](/reference/dapis/understand/#data-feeds-values-stored-on-chain)
within the
[`Api3ServerV1.sol`<ExternalLinkImage/>](https://github.com/api3dao/airnode-protocol-v1/tree/79b509f0e88a96fa4ea3cd576685051d37c9a504/contracts/api3-server-v1)
contract and are updated on the basis of `beaconIds`.

A `beaconId` for each dAPI is derived from the hash of the provider's Airnode
address and `templateId`

A `templateId` is a hash of one of the Airnode's `endpointId` and encoded
parameters

The dAPI team is running Airseekers which are primarily responsible for updating
the `beaconId` based on the specification of the dAPI. Providers also update the
`beaconId` at a higher deviation threshold/heartbeat as a fallback.

To verify that the airnode address of a beaconId belongs to the provider listed
in the market, refer to the
[Verify Airnode Addresses](/reference/airnode/latest/developers/verify-airnode-addresses.md)
section.

## Verifying beaconId

From the API3 [Market<externalLinkImage/>](https://market.api3.org/dapis),
navigate to the parameters page of a dAPI. As an example for
[ETH/USD on gnosis chain<externalLinkImage/>](https://market.api3.org/dapis/gnosis/ETH-USD/parameters)
the parameters are as follows:

<img src="./assets/images/dapi-parameters.png"/>

The templateId is calculated by taking the hash of the `encodedParameters` and
`endpointId`.

Following is an ethers.js script to derive the templateId (you need
[airnode-abi](/reference/airnode/latest/packages/airnode-abi.md) installed):

```javascript
import { encode } from '@api3/airnode-abi';
import { ethers } from 'ethers';

const encodedParameters = encode(decodedParameters);
const templateId = hre.ethers.utils.solidityKeccak256(
  ['bytes32', 'bytes'],
  [endpointId, encodedParameters]
);
```

Once derived the beaconId is the hash of the `templateId` and Airnode address:

```javascript
import { ethers } from 'ethers';

const beaconId = hre.ethers.utils.solidityKeccak256(
  ['bytes32', 'address'],
  [templateId, AirnodeAddress]
);
```

## Verifying beaconSetId

Beacon sets are a collection of `beaconIds` that provide the aggregated median
value of the underlying `beaconIds`. The `beaconSetId` is a hash of all the
underlying `beaconIds` and points to the datafeed containing the median value.
Following is an ethers.js script to derive the `beaconSetId`.

```javascript
const beaconSetId = hre.ethers.utils.keccak256(
  hre.ethers.utils.defaultAbiCoder.encode(
    ['bytes32[]'],
    [[beaconId1, beaconId2, beaconId3]]
  )
);
```

<FlexEndTag/>
