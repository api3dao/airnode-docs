---
title: Using Templates (RRP)
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Airnode for dApp Developers
path: /reference/airnode/next/developers/using-templates.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

A request to an Airnode can have many parameters. It is very common for requester contracts (e.g., a data feed) to make repeated requests with the exact same parameters. In such instances, it is wasteful to pass all of these parameters repeatedly. Templates are used to hold a set of parameter values on-chain that can be used repeatedly when calling the`makeTemplateRequest()`function in [AirnodeRrpV0.sol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/contracts/rrp/AirnodeRrpV0.sol). Unlike`makeFullRequest(), makeTemplateRequest()`requires that a requester pass`templateId`which identifies a template.

```solidity
function makeTemplateRequest(
    bytes32 templateId,
    address sponsor,
    address sponsorWallet,
    address fulfillAddress,
    bytes4 fulfillFunctionId,
    bytes calldata parameters
) external override returns (bytes32 requestId) {
```

When a template is used to make a request, both the parameters encoded in parameters of the template and parameters provided at request-time (if any) will be used by the Airnode. In case the two include a parameter with the same name, the one provided at request-time will be used.

The structure of a template, as shown below, is simple.

- address of the desired Airnode
- endpointId from the Airnode
- endpoint parameters

```solidity
struct Template {
  address airnode;
  bytes32 endpointId;
  bytes parameters;
}
```

See the guide [Making RRP Template Requests](/guides/airnode/using-rrp-templates.md) and learn how to create and use a template. Also visit the [coingecko-template](https://github.com/api3dao/airnode/tree/v0.14/packages/airnode-examples/integrations/coingecko-template) monorepo example demonstrates template requests.

<FlexEndTag/>
