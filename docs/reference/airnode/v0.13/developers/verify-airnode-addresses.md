---
title: Verify Airnode Addresses
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Verify Airnode Addresses
path: /reference/airnode/v0.13/developers/verify-airnode-addresses.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

An Airnode is owned and operated by an API provider. Every Airnode has a unique on-chain [`airnodeAddress`](/reference/airnode/v0.13/concepts/airnode.md#airnodeaddress) created and known by its API provider. API providers normally announce their Airnode addresses in the form of a DNS `TXT` record within their DNS registration, which also serves to prove ownership. An API provider's Airnode address is the same for all chains.

The key for the `TXT` record is `chainapi-verification-keys` and is an array of Airnode addresses owned by the API provider. Below is an example of the Airnode for [dxFeed](https://www.digitalocean.com/community/tools/dns?domain=dxfeed.com#TXT-Records).

![dxfeed-txt-record](../assets/images/txt-record-dxfeed.png)

## API providers

- Coingeicko: https://www.coingecko.com/
- Coinpaprika: https://coinpaprika.com/
- dxFeed: https://dxfeed.com/
- Finage: https://finage.co.uk/
- Kaiko: https://www.kaiko.com/
- NCFX: https://www.newchangefx.com/
- Nodary: https://nodary.io/docs/data-feeds/
- **twelve**data: https://twelvedata.com/

## API provider `txt` records

The following list of links go to the DNS lookup at DigitalOcean.

- [Coingecko](https://www.digitalocean.com/community/tools/dns?domain=coingecko.com#TXT-Records)
- [Coinpaprika](https://www.digitalocean.com/community/tools/dns?domain=coinpaprika.com#TXT-Records)
- [dxFeed](https://www.digitalocean.com/community/tools/dns?domain=dxfeed.com#TXT-Records)
- [Finage](https://www.digitalocean.com/community/tools/dns?domain=finage.co.uk#TXT-Records)
- [Kaiko](https://www.digitalocean.com/community/tools/dns?domain=kaiko.io#TXT-Records)
- [NewChangeFX](https://www.digitalocean.com/community/tools/dns?domain=newchangefx.com#TXT-Records)
- [Nodary](https://www.digitalocean.com/community/tools/dns?domain=nodary.io#TXT-Records)
- [twelvedata](https://www.digitalocean.com/community/tools/dns?domain=twelvedata.com#TXT-Records)

<FlexEndTag/>
