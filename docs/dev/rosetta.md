---
title: Rosetta, Nodejs, esbuild
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /dev/rosetta.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

This page refers to Apple silicon Macs that have implemented the use of Rosetta. It is best not to use Rosetta with the VitePress docs. While it may work it almost always results in longer builds and other processes. Other issues can arise such as the Rosetta platform error. This usually happens when Nodejs and NPM are installed using CLI running with Rosetta on, and NPM will install the wrong [esbuild](https://esbuild.github.io/getting-started/) package. It is best to use a version of Nodejs and NPM installed with its installer or install it using your CLI with Rosetta deactivated.

::: info Nodejs `v22`

It is best to use nodejs `v22` as this is what is used in GitHub Actions

:::

```sh
failed to load config from /Users/warren/DEV/airnode-docs/docs/.vitepress/config.js
build error:
 Error:
You installed esbuild for another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.

Specifically the "@esbuild/darwin-arm64" package is present but this platform
needs the "@esbuild/darwin-x64" package instead. People often get into this
situation by installing esbuild with npm running inside of Rosetta 2 and then
trying to use it with node running outside of Rosetta 2, or vice versa (Rosetta
2 is Apple's on-the-fly x86_64-to-arm64 translation service).

If you are installing with npm, you can try ensuring that both npm and node are
not running under Rosetta 2 and then reinstalling esbuild. This likely involves
changing how you installed npm and/or node. For example, installing node with
the universal installer here should work: https://nodejs.org/en/download/. Or
you could consider using pnpm instead of npm which has built-in support for
installing a package on multiple platforms simultaneously.
...
```

## How to correct

If you run `pnpm docs:build` and get the above error you may have an `esbuild` package for use with the non-native platform for Apple silicon probably install using NPM. Run the following (only using pnpm) to update `esbuild`. If your CLI is not running under Rosetta, it will install for the proper platform.

`esbuild` will not appear in `packages.json` under `devDependencies`, but it does update.

```sh
pnpm install --dev esbuild
```

Next run a VitePress build.

```sh
pnpm docs:build
```
