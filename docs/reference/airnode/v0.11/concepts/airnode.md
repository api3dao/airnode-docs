---
title: Airnode
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Concepts and Definitions
path: /reference/airnode/v0.11/concepts/airnode.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Airnode is a serverless oracle node implemented with a "set and forget" philosophy. Airnode is flexible in that it can move API provider data on-chain for multiple purposes. The most important of which are data feeds ([dAPIs](https://docs.api3.org/oev-searchers/in-depth/dapis/)) and also in response to dApp direct requests for API provider data ([RRP](/reference/airnode/v0.11/developers/)).

## Airnode sources data to dAPIs

An Airnode supplies API provider data to beacons from API providers. These beacons are the underlying data source for data feeds known as dAPIs.

API providers, owners of first-party Airnodes, store data feed values on-chain as individual beacons that in are turn sourced by the [Api3ServerV1.sol](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/api3-server-v1/Api3ServerV1.sol) contract as [dAPIs](https://docs.api3.org/oev-searchers/in-depth/dapis/). Airnode has an internal mechanism that looks for a deviation in the value of API provider's API operations. This mechanism updates beacons on-chain as needed.

## Airnode processes RRP requests

An Airnode is capable of serving the data from one or more APIs directly to [requesters](/reference/airnode/v0.11/concepts/requester.md) (which are on-chain smart contracts) that request data served by a particular Airnode. This is done using the request-response protocol (RRP) mechanism of Airnode. The AirnodeRrpV0 protocol is designed to be flexible and is meant to serve a variety of use cases. See the the [Calling Airnode (RRP)](/reference/airnode/v0.11/developers/index.md) for more details on how an RRP request is made. Also see the Airnode [requester examples](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/contracts) for potential design patterns.

<!--Airnode consists of two parts: the off-chain **Airnode** (a.k.a. "the node")
deployed as self hosted or cloud provider functions, e.g., AWS) and the on-chain
**protocol contract** AirnodeRrpV0.sol. A requester calls the protocol contract,
which emits a blockchain event with the request parameters. Airnode listens to
the events emitted by the AirnodeRrpV0 contract. During the next run cycle,
Airnode gets the request parameters from the emitted event. The diagram below
illustrates the mechanics of the entire process.

Ignoring the mechanics of the overall process, the requester calling an Airnode
primarily focuses on two tasks, indicated by points A & B in the diagram below.

- <span style="color:green;font-weight:bold;">1</span>: Make the request
- <span style="color:blue;font-weight:bold;">2</span>: Accept and decode the
  response

> <img src="../assets/images/call-an-airnode.png"/>
>
> 1.  <p>A requester makes a request to the AirnodeRrpV0 contract which adds the <code>requestId</code> to storage, emits the request to the event logs and returns the <code>requestId</code> to the requester. The request is retrieved by the Airnode during its next run cycle. It then verifies the requester is authorized by checking authorizer contracts assigned to the Airnode.</p>
> 2.  <p>If the request is authorized, Airnode proceeds to respond. It first gathers the requested data from the API and calls the <code>fulfill()</code> function in AirnodeRrpV0, which removes the pending <code>requestId</code> from storage and makes a callback to <code>myFulfill()</code>. The gas costs associated
>     with the response are covered by the sponsor of the requester.</p>
> -->

## mnemonic

Each and every Airnode has a unique mnemonic identifying its wallet. This mnemonic is kept secret and Airnode is publicly identified using the default [address](/reference/airnode/v0.11/concepts/airnode.md#airnodeaddress) derived from the mnemonic.

## airnodeAddress

An Airnode is identified by the default address of a BIP 44 wallet (with the path `m/44'/60'/0'/0/0`) which is referred to as the `airnodeAddress`. This address is same for all chains on which Airnode operates. The wallet mnemonic is specified in the [secrets.env](/reference/airnode/v0.11/deployment-files/secrets-env.md) file when deploying the Airnode.

Use the admin CLI command [derive-airnode-address](/reference/airnode/v0.11/packages/admin-cli.md#derive-airnode-address) to derive the `airnodeAddress` from the mnemonic for informational purposes.

```bash
npx @api3/airnode-admin derive-airnode-address \
--airnode-mnemonic "cricket elephant ..."

# outputs
Airnode address: 0xaBd9...
```

## xpub

The Airnode owner announces the _extended public key_ (`xpub` of the hardened derivation path `m/44'/60'/0'`) off-chain. Then a sponsor derives a [sponsor wallet](/reference/airnode/v0.11/concepts/sponsor.md#sponsorwallet) for the Airnode using the `xpub` and `airnodeAddress`. The sponsor wallet will then be used by the Airnode to fulfill requests made by the sponsor's contracts.

Use the admin CLI command [derive-airnode-xpub](/reference/airnode/v0.11/packages/admin-cli.md#derive-airnode-xpub) to get the `xpub` of an Airnode by passing the same mnemonic used to create the `airnodeAddress`.

```bash
npx @api3/airnode-admin derive-airnode-xpub \
--airnode-mnemonic "cricket elephant ..."

# outputs
Airnode xpub: xpub6CUGRUo...
```

## Admin CLI: `generate-airnode-mnemonic`

The [generate-airnode-mnemonic](/reference/airnode/v0.11/packages/admin-cli.md#generate-airnode-mnemonic) command is useful because it will generate a mnemonic as well as return the `airnodeAddress` and `xpub`.

```sh
npx @api3/airnode-admin generate-airnode-mnemonic

# output
This mnemonic is created locally on your machine using "ethers.Wallet.createRandom" under the hood.
Make sure to back it up securely, e.g., by writing it down on a piece of paper:

############################## MNEMONIC ###############################

cricket elephant ...

############################## MNEMONIC ###############################

The Airnode address for this mnemonic is: 0xaBd9...
The Airnode xpub for this mnemonic is: xpub6CUGRUo...
```

## Verification

The `xpub` that the Airnode owner has announced is not verified on-chain. A sponsor can verify the `xpub` off-chain. Use the admin CLI command [verify-xpub](/reference/airnode/v0.11/packages/admin-cli.md#verify-airnode-xpub) command from the admin CLI.

```bash
npx @api3/airnode-admin verify-airnode-xpub \
--airnode-xpub xpub6CUGRUo... \
--airnode-address 0xaBd9...

# output
Airnode xpub is: VALID
```

<FlexEndTag/>
