---
title: Sponsor
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Concepts and Definitions
path: /reference/airnode/latest/concepts/sponsor.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

A sponsor is an entity (individual, business, etc.). Sponsors create relationships between [requesters](/reference/airnode/latest/concepts/requester.md) and [sponsorWallets](/reference/airnode/latest/concepts/sponsor.md#sponsorwallet). They do so by sponsoring requesters and deriving sponsorWallets for Airnodes they want their requesters to call.

> <img src="../assets/images/concepts-sponsor-relationships.png" width="350px"/>

Making the relationship:

- A sponsor "sponsors" a requester.
- A sponsor "derives" a [sponsorWallet](/reference/airnode/latest/concepts/sponsor.md#sponsorwallet) for a desired Airnode.

Making a request.

1. The now "sponsored" requester makes a [request](/reference/airnode/latest/concepts/request.md) of an Airnode. Parameters passed to the Airnode include the `sponsorAddress` and the `sponsorWallet` address.
2. The Airnode verifies that the sponsor of the requester is the sponsor that derived the `sponsorWallet` associated with the Airnode.
3. The Airnode uses the respective sponsor's `sponsorWallet` to fulfill the request, meaning that the sponsor covers the gas cost.

How a requester refers to the sponsor.

1. A requester can have multiple sponsors that have sponsored it. While making a request, the requester provides the `sponsorAddress` that it wants to have the request fulfilled by. The AirnodeRrpV0.sol protocol contract checks if the requester is sponsored, and if so, emits the request event.

2. Next Airnode derives the `sponsorWallet` address using the provided `sponsorAddress`, then checks if this matches `sponsorWallet` address provided in the request. Airnode will ignore the request if the two do not match. This is done this way because deriving the `sponsorWallet` address from the `sponsorAddress` on-chain is not feasible.

## sponsorAddress

A sponsor is identified by a `sponsorAddress` which is usually the default account `m/44'/60'/0'/0/0` of a BIP 44 wallet owned by the sponsor. The sponsor can use a different address from the wallet if desired such as `m/44'/60'/0'/0/2`.

Note that a sponsor could use multiple addresses from multiple wallets. Below are some example reasons why one would want to have multiple `sponsorAddress` identities on-chain:

- To keep separate `sponsorWallets` for two separate use-cases for easier accounting.
- To duplicate transaction queues for a single use-case and increase response throughput.

## sponsorWallet

Each [Airnode](/reference/airnode/latest/concepts/airnode.md) can keep a unique`sponsorWallet` for a sponsor. The wallet is identified by a `sponsorAddress/airnodeAddress` pair. A sponsor must take action to [derive](/reference/airnode/latest/concepts/sponsor.md#derive-a-sponsor-wallet) a `sponsorWallet` for a particular Airnode. [Requesters](/reference/airnode/latest/concepts/requester.md), that have been sponsored by a sponsor, can specify their requests be fulfilled by the `sponsorWallet` designated to the sponsor. This allows the sponsor to cover the gas cost of request fulfillments by the Airnode since the sponsor must send funds to this wallet before making the request.

Requests from the same `sponsorWallet` are performed sequentially to respect the transaction nonce. A single Airnode run will only attempt to serve five oldest requests to prevent timeout issues. For high volatility use cases it is recommended to use multiple sponsors (and thus sponsor wallets) as the requests from different sponsor wallets are performed in parallel.

::: info Wallet and Protocols

A sponsorWallet derived for a particular sponsor depends on the Airnode protocol (RRP, the forthcoming PSP protocol, etc.). This means that a sponsorWallet address derived for a particular sponsor will be different for each protocol. This is intentional and allows a particular sponsor to only fund a particular protocol (e.g. only RRP).

:::

### Derivation Path

Each sponsor is identified by a `sponsorAddress`, and their sponsor wallets are designated implicitly by a derivation path. For the RRP protocol the derivation path for a `sponsorWallet` starts with `m/44'/60'/0'/1/...`. Other branches will be used to derive the sponsor wallets for other protocols.

::: warning Understanding Derivation Paths

It is not important to understand derivation paths, you can simply use the addresses the admin CLI derives for you.

:::

The general path for connecting to the base Ethereum set of addresses looks like this: `m/44’/60’/0’/0`. This sequence is broken down into different sections and changes based on what is being worked with. The sequence goes: `m’ / purpose’ / coin_type’ / account’ / change / address_index`. The `change` part of the BIP44 derivation path is used to determine which protocol a sponsor wallet path will be for. Here (`m/44'/60'/0'/1/...`) has been reserved for the RRP protocol where the value of `change` is 1.

An Ethereum address is 20 bytes-long, which makes it 160 bits. Each index in the HD wallet non-hardened derivation path goes up to 2^31. This requires the division of these 160 bits into six 31 bit-long chunks, therefore derivation path for a sponsor wallet of a requester using the RRP protocol would be:

```sh
m/44'/60'/0'/1/...
  /1st least significant 31-bits of the sponsor address (sponsor && 0x7FFFFFFF)…
  /2nd least significant 31-bits of the sponsor address (sponsor >> 31 && 0x7FFFFFFF)…
  /3rd least significant 31-bits of the sponsor address (sponsor >> 62 && 0x7FFFFFFF)…
  /4th least significant 31-bits of the sponsor address (sponsor >> 93 && 0x7FFFFFFF)…
  /5th least significant 31-bits of the sponsor address (sponsor >> 124 && 0x7FFFFFFF)…
  /6th least significant 31-bits of the sponsor address (sponsor >> 155 && 0x7FFFFFFF)
```

Anyone can use the xpub that the Airnode has announced (through off-chain channels) and the sponsor's `sponsorAddress` to derive a `sponsorWallet` address for a specific Airnode–sponsor pair. In other words, a sponsor can calculate the address of their respective sponsor wallet for an Airnode and have requesters use it to make requests right away.

### Gas Costs

Although the `sponsorWallet` scheme allows the sponsor to cover the fulfillment gas costs, it is just as easy to have the Airnode cover the gas costs. In this case the Airnode funds the `sponsorWallet`, instead of the sponsor. Furthermore, this scheme allows hybrid use-cases where the Airnode covers the fulfillment gas costs for one sponsor (e.g., because they have made a special service agreement with them), while requiring others to cover their own fulfillment gas costs.

### Trusting the `sponsorWallet`

<SponsorWalletWarning/>

The risk mentioned above becomes negligible when:

1. The Airnode is a first-party oracle, because first-party oracles are trustworthy
2. The Airnode is being used for a high value use-case, which already implies a high level of trust

If the sponsor does not trust the Airnode at all, they can fund the sponsor wallet just enough to cover a single fulfillment for each request to the Airnode. Therefore, this scheme both supports the traditional per-call payments, but also allows the protocol to leverage the trustworthiness of Airnodes to reduce unnecessary gas costs caused by microtransactions.

### Withdrawals

If the sponsor decides not to use a particular `sponsorWallet` going forward, they can make a request to withdraw funds from it, see the [request-withdrawal](/reference/airnode/latest/packages/admin-cli.md#request-withdrawal) command. The Airnode listens for withdrawal requests and fulfills them automatically. Therefore, the sponsor should be able to receive their funds from their `sponsorWallet` in a few minutes notice. The `sponsorWallet` does not get deleted, and can be used in the future simply by funding it again.

::: warning Withdrawal Priority

Airnode will drop any pending API calls associated with a `sponsorWallet` once a withdrawal is requested.

:::

## Sponsoring a Requester

A sponsor specifies the public address (`sponsorAddress`) of an account from a mnemonic it owns and the on-chain `requesterAddress` of a requester to "sponsor a requester". This sponsorship is know to have, and be defined by, a `sponsorAddress/requesterAddress` pair.

This sponsorship allows the requester to use the sponsor's `sponsorWallet` for a particular Airnode to cover gas costs incurred by the Airnode in response to a request. Learn more about [sponsorships](/reference/airnode/latest/developers/requesters-sponsors.md).

Use the [Admin CLI tool](/reference/airnode/latest/packages/admin-cli.md#sponsor-requester) to sponsor a requester. An example can be seem in the [Requesters and Sponsors](/reference/airnode/latest/developers/requesters-sponsors.md#how-to-sponsor-a-requester) doc.

## Derive a Sponsor Wallet

When a sponsor wishes to access an Airnode (via a requester) it must create a `sponsorWallet` for the Airnode. Requesters that have been sponsored by the same sponsor, can specify their requests be fulfilled by the `sponsorWallet` belonging to the sponsor. A sponsor uses a [sponsorAddress](/reference/airnode/latest/concepts/sponsor.md#sponsoraddress) and the [xpub](/reference/airnode/latest/concepts/airnode.md#xpub) of a particular Airnode to derive a [sponsorWallet](/reference/airnode/latest/concepts/sponsor.md#sponsorwallet) for the Airnode. The sponsor must also provide the [airnodeAddress](/reference/airnode/latest/concepts/airnode.md#airnodeaddress) because it will be used to verify that the provided `xpub` belongs to the Airnode wallet before deriving a child sponsor wallet address.

Use the [Admin CLI tool](/reference/airnode/latest/packages/admin-cli.md#derive-sponsor-wallet-address) to derive a `sponsorWallet`. An example can be seem in the [Requesters and Sponsors](/reference/airnode/latest/developers/requesters-sponsors.md#how-to-derive-a-sponsor-wallet) doc.

<FlexEndTag/>
