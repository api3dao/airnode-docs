---
title: secrets.env
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Deployment Files → Templates
path: /reference/airnode/v0.11/deployment-files/templates/secrets-env.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The `secrets.env` contains the secrets that the respective Airnode deployments will need. All variables defined in a `secrets.env` can be interpolated inside `config.json`. For more details, see the full description of the [secrets.env](/reference/airnode/v0.11/deployment-files/secrets-env.md) file. Variable names cannot contain dashes (-) or start with a number.

```sh
AIRNODE_WALLET_MNEMONIC="<FILL_*>"
CHAIN_PROVIDER_URL="<FILL_*>"
SS_API_KEY="<FILL_*>"

HEARTBEAT_API_KEY="<FILL_*>"
HEARTBEAT_URL="<FILL_*>"

# Used for GCP only
GCP_PROJECT_ID="<FILL_*>"
```

<FlexEndTag/>
