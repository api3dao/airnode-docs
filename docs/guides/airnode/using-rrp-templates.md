---
title: Making RRP Template Requests
sidebarHeader: Guides
sidebarSubHeader:
pageHeader: Guides → Airnode
path: /guides/airnode/using-rrp-templates.html
outline: deep
---

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

This guide steps through the process of making a template request of an Airnode using RRP (request-response protocol) to get data from an API provider. This approach allows a smart contract to store the parameters for an RRP call in a template. This is advantageous when a call to an Airnode will be made using the same parameters each time. See [Using Templates (RRP)](/reference/airnode/latest/developers/using-templates.md) and [Coingecko example](https://github.com/api3dao/airnode/tree/master/packages/airnode-examples/integrations/coingecko-template) to learn more about the technical specifications of a template as used by a requester. As a prerequisite to this guide first try the guide [Making an RRP Request](/guides/airnode/rrp-request.md).

::: info Consider dAPIs

While using the Airnode's RRP protocol to acquire API provider data is usable it is not as efficient or as straightforward as using a dAPI. Therefore, best practices usually entail using a [<span style="color:rgb(16, 185, 129);">dAPI</span>](https://docs.api3.org/oev-searchers/in-depth/dapis/) to acquire API provider data.

:::

There are just a few steps to create and place a template on-chain for use by a requester (smart contract). Each template is identified by a `templateId`, which is the hash of its contents.

## 1. Create a template

First create a file that contains a JSON object, see the example below.

```
{
  "airnode": "0x2ab9f26E18B64848cd349582ca3B55c2d06f507d",
  "endpointId": "0x2605589dfc93c8f9c35eecdfe1e666c2193df30a8b13e1e0dd72941f59f9064c",
  "parameters": [
    {
      "name": "name1",
      "value": "someString",
      "type": "string"
    },
    {
      "name": "name2",
      "value": "1000",
      "type": "uint256"
    }
  ]
}
```

- `airnode`: You will need the address of the `AirnodeRrpV0.sol` contract on a desired network. See [Airnode Contract Addresses](/reference/airnode/latest/) for a listings of several networks. The example above uses an address on Sepolia.

- `endpointId`: Declared inside an Airnode's configuration file which is created by the API provider that owns the Airnode. You may need to contact the API provider if they do not publish their `endpointIds`.

- `parameters`: The parameters that the Airnode endpoint needs. All parameters needed by the endpoint do not need to be included as they could also be passed to the `makeTemplateRequest()` function of Airnode along with the `templateId`.

Below are links that further discuss request parameters if you additional help.

- [Request](/reference/airnode/latest/concepts/request.md)
- [Making an RRP Request](/guides/airnode/rrp-request.md#request-parameters)

## 2. Upload the template

Use the [create-template](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-admin#create-template) command in the @api3/airnode-admin package to move your template on-chain. The command`create-template`reads a file, uses its contents to create a template and returns a`templateId`. To create a new template record on-chain you will need the following.

- A providerURL from your blockchain provider.
- A mnemonic for gas to fund the record creation.
- The local path to a template file.

::: info mnemonic

This wallet pays the transaction gas costs to write the template record on-chain. This is not the wallet(s) that will pay gas costs to actually execute any Airnode, for that the Airnode themselves will create sponsor wallets on behalf of your sponsor record.

:::

```sh
npx @api3/airnode-admin create-template \
  --providerUrl https://sepolia.infura.io/v3/<KEY> \
  --mnemonic "<MNEMONIC>" \
  --templateFilePath ./template.json
```

The above command will return a `templateId`. This is the ID used when calling the Airnode function `makeTemplateRequest()`.

```sh
Template ID: 0x006154fb94631d2bd66f36565824a6ed0f4c979eb26173ef9e4aad15dd03e6df
```

When creating more than one template using the same parameter values for an Airnode/endpointId pair, the same `templateId`will be returned for each. Only one template is created when the parameters are the same.

## 3. Retrieving the template

You can retrieve the template from the chain using the Admin CLI command [get-template](/reference/airnode/latest/packages/admin-cli.md#get-template) using the `templateId`. Note that the parameters are ABI encoded.

```sh
npx @api3/airnode-admin get-template \
  --providerUrl https://sepolia.infura.io/v3/<KEY> \
  --template-id <TEMPLATE-ID>

# Returns
{
  "airnode":"0x2ab9f26E18B64848cd349582ca3B55c2d06f507d",
  "endpointId":"0x2605589dfc93c8f9c35eecdfe1e666c2193df30a8b13e1e0dd72941f59f9064c",
  "parameters":"0x31537500000000000000000000000000000000000000000000000000000000006e616d653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a06e616d653200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e8000000000000000000000000000000000000000000000000000000000000000a736f6d65537472696e6700000000000000000000000000000000000000000000"
}
```

## 4. Make a request using the template

A requester can use the template by calling a different function from `AirnodeRrpV0.sol` when making a request. See the guide [Making an RRP Request](/guides/airnode/rrp-request.md#_2-implement-the-request-logic) and use the function `makeTemplateRequest()` rather than `makeFullRequest()`. Note that the parameter for each are slightly different. The `templateId ` replaces both the `airnode` and `endpointId`.

When calling `makeTemplateRequest()` the parameter `parameters` is used to provide addition parameters to those in the template, if any are required.

Replace the function call `makeFullRequest()` with `makeTemplateRequest()` in the [Making an RRP Request](/guides/airnode/rrp-request.md#_2-implement-the-request-logic) guide.

```solidity
bytes32 requestId = airnodeRrp.makeTemplateRequest(
  templateId,                     // templateId
  sponsor,                        // sponsor's address
  sponsorWallet,                  // sponsorWallet
  address(this),                  // fulfillAddress
  this.airnodeCallback.selector,  // fulfillFunctionId
  parameters                      // Additional API parameters
);
```

<FlexEndTag/>
