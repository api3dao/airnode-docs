---
title: Hyperlinks
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/hyperlinks.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

Consider the following markdown based links in a file `/reference/ois/latest/specifications.md`.

- `/reference/ois/latest/reserved-parameters.md#gasprice`

- `reserved-parameters.md#gasprice`

- `./reserved-parameters.md#gasprice`

Because `reserved-parameters.md` is in the same folder as `specifications.md`, all three links will work. However with the later two links, VitePress will add `/reference/ois/latest/` at SPA runtime. This is problematic for link validator scripts such as `/lib/link-validator.js`.

During the release of VitePress 1.0.0-alpha.46 someone thought it best to add the base path to all markdown URLS at runtime. This was not thought through. It is entirely possible in the future they will flip on this. This was introduced as a breaking change.

::: info VitePress 1.0.0-alpha.46 BREAKING CHANGES

build: base is now prepended to all internal (non-relative) links, including any reference to a file present in the public directory. If you want the earlier behavior for such links, use absolute links.

:::

Even the description for the breaking change is poorly written. The commit can be seen [here](https://github.com/vuejs/vitepress/commit/dcf29419f24bfb0fe99e424771be931bf77b9961).

The safest solution is to use the full path from the root of `/docs` or in the case of the examples above, `/reference/ois/latest/reserved-parameters.md#gasprice`. Doing so will safe guard the docs from pattern substitutions by VitePress that could change in future releases. This will inconvenience writers of the docs but will will save countless hours tracking down bad links.
