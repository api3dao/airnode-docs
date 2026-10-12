---
title: Formatting Guides
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/guides-format.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

Guides can be broken into two categories.

- How to
- Tutorial

## How to

This type of guide does not engage in a step-by-step instructional page. Often it is short with a code example and a paragraph or two explaining the code example. A majority of readers appreciate how to guides rather than tutorials.

## Tutorial

This type if guide steps the reader through a progression. Each step in the progression is numbered. Once the progression starts it must be contiguous until the progression ends. There can only be un-numbers sections (heading2) before and after the progression. Each progression section must be heading2 and each start with a number followed by a period _(1.)_. See the [Deploying an Airnode on AWS](/guides/airnode/deploy-airnode/deploy-aws/) guide as an example.

Each section in the progression must instruct the reader to do something, an action. Sections that are purely instructional must be placed before or after the progression. Sections in the progression can contain instructional explanations as they are related to the action the reader must perform.

## Directory structure

Most guides use a simple directory structure to contain its markdown and other asset files locally. As a rule the primary markdown page is named `index.md`. In the example below, `src` might contain images, code sample, and other required files.

```sh
testnets-metamask
├── src
└── index.md
```

## Other formatting rules

1. Single page layout using markdown elements.
1. Minimize use of Vue components if any.
1. Simple (post heading 1) intro.
1. Each section (heading 2) involved in the guide’s progression is numbered.
1. Each section (heading 2) should fit (if possible) within the height of a developer sized screen.
1. Avoid the use of heading 3-n sections if possible.
1. Operations related to any clicking widgets (panes, button, pick-list, etc.) are in bold.
1. For tutorials, “unnumbered” sections (heading 2) can precede or follow a series of numbered steps ( the tutorial's progression) which must be contiguous. See the [Deploying an Airnode on AWS](/guides/airnode/deploy-airnode/deploy-aws/) guide as an example.
