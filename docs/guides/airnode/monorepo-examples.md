---
title: Monorepo Examples
sidebarHeader: Guides
sidebarSubHeader:
pageHeader: Guides → Airnode
path: /guides/airnode/monorepo-examples.html
outline: deep
tags:
---

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

There are examples of various Airnode functionality in the [airnode-examples package](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples) of the Airnode monorepo:

- [authenticated-coinmarketcap](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-examples/integrations/authenticated-coinmarketcap) - cryptocurrency price request using [authentication](/reference/airnode/latest/understand/api-security.md#airnode-authentication-security-schemes).
- [coingecko](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-examples/integrations/coingecko) - unauthenticated cryptocurrency price request.
- [coingecko-post-processing](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/coingecko-post-processing) - demonstration of the [post-processing](/reference/ois/latest/processing.md) feature.
- [coingecko-pre-processing](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/coingecko-pre-processing) - demonstration of the [pre-processing](/reference/ois/latest/processing.md) feature.
- [coingecko-http-gateways](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/coingecko-http-gateways) demonstration of the [HTTP gateway and HTTP signed data gateway](/reference/airnode/latest/understand/http-gateways.md).
- [coingecko-template](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/coingecko-template) - demonstration of [template](/reference/airnode/latest/developers/using-templates.md) requests.
- [failing-example](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/failing-example) - demonstration of Airnode error handling through an invalid request.
- [relay-security-schemes](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/relay-security-schemes) - demonstration of how to [relay multiple request metadata](/reference/airnode/latest/understand/api-security.md#relayed-meta-data-security-schemes) like chain ID and sponsor address to the API endpoint.
- [weather-multi-value](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-examples/integrations/weather-multi-value) - authenticated weather request [encoding multiple parameters](/reference/ois/latest/reserved-parameters.md#encoding-multiple-values) including the transaction timestamp, time of sunset, temperature, and a description of the weather.

<FlexEndTag/>
