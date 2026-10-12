---
title: Requester
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Concepts and Definitions
path: /reference/airnode/next/concepts/requester.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

A requester is a contract that makes Airnode requests. While making a request, the requester refers to a [sponsor](/reference/airnode/next/concepts/sponsor.md) by its [sponsorAddress](/reference/airnode/next/concepts/sponsor.md#sponsoraddress), which means "fulfill my request with the [sponsor wallet](/reference/airnode/next/concepts/sponsor.md#sponsorwallet) of the sponsor identified by `sponsorAddress`. Doing so requires the requester to be [sponsored](/reference/airnode/next/concepts/sponsor.md) by the said sponsor.

Note that the requester is the contract that makes the request. The requester may specify the request such that the request is fulfilled by the Airnode calling back another contract.

See the [Airnode requester examples](https://github.com/api3dao/airnode/tree/v0.14/packages/airnode-examples/contracts).

<FlexEndTag/>
