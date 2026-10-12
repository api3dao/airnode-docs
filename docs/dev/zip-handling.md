---
title: Zip File Handling
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/zip-handling.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

Zip files are available for three quick-start Airnode deployment guides:

1. [AWS](/guides/airnode/deploy-airnode/deploy-aws/)
2. [GCP](/guides/airnode/deploy-airnode/deploy-gcp/)
3. [Local](/guides/airnode/deploy-airnode/deploy-container/)

To facilitate the creation of these zip files, the following script can be run:

```sh
pnpm zip:create
```

To ensure that the `config.json` files within these zip files do not get out-of-sync with their input `config.json` files, the following script is run as part of the pre-push hook (it can also be run independently):

```sh
pnpm zip:config-check
```
