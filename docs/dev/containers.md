---
title: VitePress Containers
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/containers.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

VitePress provides several containers. The following examples explain how they should be used in `airnode-docs`.

::: info

The info box is the default go-to for the API3 technical documentation.

:::

::: tip

Try to avoid using this container. It overwhelms the theme's dark mode.

:::

::: warning

Express to the reader not to do something.

:::

::: danger

Rarely used. Expresses an important failure concern to the reader should they fail to follow instructions.

:::

::: details

Use the details container with extended code samples in order to compress them.

```json
{}
```

:::

## Usage

```md
::: info My custom title

Custom title here Content of the container goes here.

:::
```

::: info My custom title

Custom title here Content of the container goes here.

:::
