---
title: Using Authorizations (optional)
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Understanding Airnode
path: /reference/airnode/v0.13/understand/using-authorizations.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

An Airnode can authorize smart contracts (know as requesters) access to its endpoints using [Authorizations](/reference/airnode/v0.13/concepts/authorizations.md). This method is off-chain and requires no blockchain knowledge by an API provider. It is different than [Authorizers](/reference/airnode/v0.13/concepts/authorizers.md) which is an on-chain auth scheme.

::: info Alternative: Relayed Meta Data

As an alternative to authorizers and authorizations, an API provider can use [<span style="color: rgb(16, 185, 129)">Relayed Meta Data</span>](/reference/airnode/v0.13/understand/api-security.md#relayed-meta-data-security-schemes) to authenticate a request. This approach is off-chain and requires no blockchain knowledge by the API provider. Note that it is possible to use authorizers, authorizations, and relayed meta data together.

:::

Authorizations use scheme types that hard-code access to an Airnode's endpoints in the same file that defines the Airnode, its `config.json` file. These hard-coded values are endpointId/address pairs that the Airnode will use to allow access to its endpoints by requesters (smart contracts).

Nothing in _authorizers_ can supersede permissions granted by _authorizations_ as the latter takes precedence.  
Currently there is only one _authorizations_ scheme type, `requesterEndpointAuthorizations`.

## requesterEndpointAuthorizations

Currently `requesterEndpointAuthorizations` is the only scheme type available for _authorizations_. It defines a list of endpointIds each with a array of requester addresses that can access them.

```json
{
 ...
 "chains":[
    {
        "id": "1",
        ...
        "authorizers": {
            "requesterEndpointAuthorizers": []
                             The scheme type requesterEndpointAuthorizations
        },                   grants access to endpointId/address pairs
        "authorizations": {  ⬇
            "requesterEndpointAuthorizations": {
                "0x6db9...7af6": ["0xdhrt...A498"],
                "0x8dd9...5ad7": ["0xdhrt...A498", "0xcse0...D236"],
                       ⬆                 ⬆                ⬆
                       endpointId         requester addresses
            }
        },
    },
 ]
}
```

<FlexEndTag/>
