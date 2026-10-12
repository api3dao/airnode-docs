---
title: Axios Scripts
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/axios-scripts.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

The script [axiosBuildScripts.js](https://github.com/api3dao/airnode-docs/blob/main/libs/axiosBuildScripts.js) is used to generated local data files. These files are rendered by certain markdown pages as a data source. For example see these markdown files:

- [/reference/dapis/chains/chains-list.md](https://raw.githubusercontent.com/api3dao/airnode-docs/main/docs/reference/dapis/chains/chains-list.md)
- [/reference/airnode/latest/index.md](https://raw.githubusercontent.com/api3dao/airnode-docs/main/docs/reference/airnode/latest/index.md)

The local data files provide for a better page load experience rather than real-time data access from the monorepo. More importantly, the local data files allow the vite build to pre-render the html so that Flex can index its content, see [Vue components and Flex indexes](/dev/flexsearch.md#vue-components-and-flex-indexes).

## Building the local data files

The local data files can be refreshed by running the `/libs/axiosBuildScripts.js` script as follows:

```sh
pnpm axios:build
```
