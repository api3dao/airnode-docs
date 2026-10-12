---
title: Firebase
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/firebase.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

All production and PR preview deployments are published on Firebase hosting and are built automatically using GitHub [workflows](https://github.com/api3dao/airnode-docs/tree/main/.github/workflows) stored in the `airnode-docs` repo.

- Production: https://vitepress-docs.web.app (and https://airnode-docs.api3.org)

## Repo Branches

When a PR is merged into the default branch, `main`, a Firebase deployment of the docs production website is triggered.

## Firebase emulator

You can run the docs using the firebase emulator after updating the flex indexes and prior to pushing changes to the repo. Run the following commands from the root of the project after ensuring that the firebase CLI is installed.

```sh
firebase:emulator
```

OR

```sh
pnpm docs:build

pnpm flex:build

pnpm flex:test

firebase emulators:start
```
