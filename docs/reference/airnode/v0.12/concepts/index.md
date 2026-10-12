---
title: Request-Response Protocol
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.12 → Concepts and Definitions
path: /reference/airnode/v0.12/concepts/index.html
version: v0.12
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The first protocol implemented for Airnode is request–response. An Airnode serving the request–response protocol listens for requests, makes the API call specified by the request, and finally makes the response transaction back on chain.

## Contracts

This sections briefly describes the structure of the request response protocol contracts. You can find more information in the [source files on github](https://github.com/api3dao/airnode/tree/v0.12/packages/airnode-protocol/contracts/rrp).

The request–response protocol is implemented as a single permissionless contract that all Airnodes interact with, which is named `AirnodeRrpV0.sol`. This base contract has the following inheritance tree that compartmentalizes the aspects of the protocol.

> <img src="../assets/images/RRP-protocol-contracts.png" width="650px"/>

### AirnodeRrpV0.sol

The [AirnodeRrpV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol) contract sits between a [requester](/reference/airnode/v0.12/concepts/requester.md) and the Airnode. It inherits from four additional contracts as illustrated in the diagram above:

- [IAirnodeRrpV0.sol](/reference/airnode/v0.12/concepts/index.md#iairnoderrpv0-sol)
- [AuthorizationUtilsV0.sol](/reference/airnode/v0.12/concepts/index.md#authorizationutilsv0-sol)
- [WithdrawalUtilsV0.sol](/reference/airnode/v0.12/concepts/index.md#withdrawalutilsv0-sol)
- [TemplateUtilsV0.sol](/reference/airnode/v0.12/concepts/index.md#templateutilsv0-sol)

This contract has two key responsibilities:

- It is used by requesters to make requests.
- It is used by Airnodes to fulfill requests.

However, this contract is shared for all requesters and Airnodes on a particular chain. This means that neither Airnode operators nor requesters need to deploy this contract themselves. Instead, API3 will deploy this contract once per chain and you simply connect your Airnode or requester contract to that deployed contract. See the [Airnode Contract Addresses](/reference/airnode/v0.12/) for reference.

The [`@api3/airnode-admin`](/reference/airnode/v0.12/packages/admin-cli.md) package is a CLI tool used to interact with `AirnodeRrpV0.sol` and perform administrative actions.

### IAirnodeRrpV0.sol

The [IAirnodeRrpV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/interfaces/IAirnodeRrpV0.sol) interface describes all functions and events of the `AirnodeRrpV0.sol` contract which implements this interface.

This interface inherits:

- [IAuthorizationUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/interfaces/IAuthorizationUtilsV0.sol)
- [IWithdrawalUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/interfaces/IWithdrawalUtilsV0.sol)
- [ITemplateUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/interfaces/ITemplateUtilsV0.sol)

### AuthorizationUtilsV0.sol

The [AuthorizationUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/AuthorizationUtilsV0.sol) contract implements Airnode [Authorizer](/reference/airnode/v0.12/concepts/authorizers.md) checks.

### WithdrawalUtilsV0.sol

The [WithdrawalUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/WithdrawalUtilsV0.sol) contract allows the [sponsor](/reference/airnode/v0.12/concepts/sponsor.md) to trigger a withdrawal request which is later fulfilled by Airnode and all sponsor wallet funds are sent back to the sponsor.

### TemplateUtilsV0.sol

The [TemplateUtilsV0.sol](https://github.com/api3dao/airnode/blob/v0.12/packages/airnode-protocol/contracts/rrp/TemplateUtilsV0.sol) contract is used to create and store Airnode [templates](/reference/airnode/v0.12/concepts/template.md) used to create a [template request](/reference/airnode/v0.12/concepts/request.md#template-request).

<FlexEndTag/>
