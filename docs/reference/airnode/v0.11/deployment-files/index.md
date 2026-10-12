---
title: Overview
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Deployment Files
path: /reference/airnode/v0.11/deployment-files/index.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Airnode is deployed with the following files:

- [config.json](/reference/airnode/v0.11/deployment-files/config-json.md): specifies the API–Airnode integrations and various node and deployment parameters.

- [secrets.env](/reference/airnode/v0.11/deployment-files/secrets-env.md): holds secrets used by Airnode such as the Airnode mnemonic, API keys, blockchain provider URLs, and more.

- [aws.env](/reference/airnode/v0.11/deployment-files/aws-env.md): (AWS deployments only) holds AWS credentials and is required by the Docker [deployer image](/reference/airnode/v0.11/docker/deployer-image.md).

- gcp.json: (GCP deployments only) holds GCP project information and is required by the Docker [deployer image](/reference/airnode/v0.11/docker/deployer-image.md). This file is downloaded from a GCP project. See the guide [Deploying an Airnode on GCP](/guides/airnode/deploy-airnode/deploy-gcp/#_3-gcp-project-setup-credentials) for more information.

Airnode deployments utilize secrets such as security scheme values (i.e., API keys) and blockchain provider URLs. These secrets are injected into `config.json` from `secrets.env` using standard shell variable interpolation syntax (e.g. `${VARIABLE}`). This way secrets are stored separately but are available as part of the configuration during the Airnode runtime.

The `config.json` file does NOT reference values in `aws.env` as `aws.env` is read directly by the deployer image.

The deployer image outputs a [receipt.json](/reference/airnode/v0.11/deployment-files/receipt-json.md) file after deployment, which contains information about the deployment that can be referred to later on for interaction or removal.

<FlexEndTag/>
