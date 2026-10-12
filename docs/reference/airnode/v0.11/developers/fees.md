---
title: Fees
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Airnode for dApp Developers
path: /reference/airnode/v0.11/developers/fees.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

There are some one-time setup/maintenance costs and some ongoing costs of calling an Airnode. The Airnode protocol is designed in a way that the requester assumes all gas costs, including the request fulfillment (response) transactions.

## Sponsors

Fees are encountered when a sponsor engages in setup activity such as sponsoring a requester. These are per call transaction gas costs and are relatively small. The funds come from the wallet mnemonic that the sponsor supplies when calling certain [admin commands](/reference/airnode/v0.11/packages/admin-cli.md) as shown below.

- [sponsor-requester](/reference/airnode/v0.11/packages/admin-cli.md#sponsor-requester)
- [unsponsor-requester](/reference/airnode/v0.11/packages/admin-cli.md#unsponsor-requester)
- [create-template](/reference/airnode/v0.11/packages/admin-cli.md#create-template)
- [request-withdrawal](/reference/airnode/v0.11/packages/admin-cli.md#request-withdrawal)

## Airnodes

The fees take the form of transaction gas costs. These are applied when funding a requester's sponsor wallet for an Airnode and when executing the Airnode in response to a request.

- Funding a sponsor wallet associated with an Airnode: A sponsor wallet is funded manually by a sponsor using their preferred wallet management tool such as MetaMask.

- [Calling](/reference/airnode/v0.11/developers/index.md) an Airnode: Transaction gas fees are withdrawn from the sponsor wallet related to the Airnode being called by a sponsored requester.

<SponsorWalletWarning/>

Learn more about [sponsor wallets](/reference/airnode/v0.11/concepts/sponsor.md) in the reference section.

## API Provider Fees

Some API providers charge a subscription fee for access to their data. This is a typical practice and usually requires the requester to create an account on the provider's website and then subscribe to a level of service offered. These types of services are usually billed monthly and can be based on an annual rate to save costs. The subscription (even if free) will most likely involve the use of a security scheme such as an API key that must be used to access the data. See [Calling an Airnode](/reference/airnode/v0.11/developers/index.md) to learn more on how to pass the security credentials to an Airnode.

<FlexEndTag/>
