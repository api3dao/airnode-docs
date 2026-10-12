---
title: config.json
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Deployment Files → Examples
path: /reference/airnode/latest/deployment-files/examples/config-json.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

An Airnode's `config.json` file defines it behavior. Airnode can be deployed to a cloud provider such as AWS or GCP or in a local Docker container.

- Repo example for cloud providers AWS or GCP: [config.json](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-deployer/config/config.example.json)
- Repo example for a Docker container: [config.json](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-node/config/config.example.json)

::: code-group

```json [Cloud Providers]
<!--@include: config-cloud.json-->
```

```json [Docker Container]
<!--@include: config-local.json-->
```

:::

<FlexEndTag/>
