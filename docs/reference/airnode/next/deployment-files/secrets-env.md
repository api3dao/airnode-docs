---
title: secrets.env
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Deployment Files
path: /reference/airnode/next/deployment-files/secrets-env.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The `secrets.env` file is bundled with a [config.json](/reference/airnode/next/deployment-files/config-json.md) file and contains the secrets that the respective Airnode deployments will need. All variables defined in a `secrets.env` file will be available in the `config.json` file via variable interpolation (e.g. `${VARIABLE_NAME}`).

There are few pieces of data that are **highly recommend** to be provided via variables. The variable names shown can be adjusted to anything desired. Just be sure to change the correlating interpolation value in `config.json`.

| Variable name           | `config.json` field name               | Description                                           |
| ----------------------- | -------------------------------------- | ----------------------------------------------------- |
| AIRNODE_WALLET_MNEMONIC | `nodeSettings.airnodeWalletMnemonic`   | The wallet mnemonic that will be used by the Airnode  |
| CHAIN_PROVIDER_URL      | `chains[].providers.<name>.url`        | The blockchain provider url                           |
| SS_MY_API_KEY           | `apiCredentials[].securitySchemeValue` | A security scheme value                               |
| HEARTBEAT_URL           | `nodeSettings.heartbeat.url`           | The URL to make the heartbeat request to              |
| HEARTBEAT_API_KEY       | `nodeSettings.heartbeat.apiKey`        | The API key to authenticate against the heartbeat URL |
| GCP_PROJECT_ID          | `nodeSettings.cloudProvider.projectId` | (GCP only) The GCP project ID for deployment          |

Below is an example of `secrets.env`. Variable names cannot contain dashes (-) or start with a number.

<!-- TODO: Reference a file from Airnode examples instead -->

```
AIRNODE_WALLET_MNEMONIC="achieve...blouse echo label"
CHAIN_PROVIDER_URL="https://sepolia.infura.io/v3/b1955...eb84f"

SS_MY_API_KEY="FRAC...X5uTd"

HEARTBEAT_API_KEY="d714a900-3b9e-4e4d-8eae-756ef06a8836"
HEARTBEAT_URL="https://your.heartbeat.service.io/airnode"

# GCP only
GCP_PROJECT_ID="my-gcp-airnode-project-01"
```

<FlexEndTag/>
