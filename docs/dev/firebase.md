---
title: Firebase
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
basePath: /dev/firebase.html
outline: deep
tags:
---

<PageHeader/>

# {{$frontmatter.title}}

All sites for production, staging, and PR previews are published on Firebase
hosting. All sites are build automatically using GitHub
[workflows](https://github.com/api3dao/vitepress-docs/tree/main/.github/workflows)
stored in the `vitepress-docs` repo.

- Production: https://vitepress-docs.web.app
- Staging: https://vitepress-docs--stage-1sggkn03.web.app

## Repo Branches

The branch `live-site` is used to generate the production web site for the docs,
whereas the default branch remains as `main`. Commits to `main`, for example
after a merging a PR, trigger a Firebase staging deployment.

## PRs on `live-site`, merge only

When merging `main` into `live-site` do not "Squash and Merge". Use a regular
merge. Otherwise `live-site` will end up with its own commit history. If you
mistakenly do so, follow these instructions to fix this issue.

From branch main locally:

```bash
git branch -d live-site
git checkout -b live-site <abc>
git push origin live-site --force
```

1. Delete the `live-site` branch locally.
2. Checkout a new branch, `live-site`, from main commit `<abc>`,  which is the
   commit before the last main commit.
3. Force push `live-site` to github. This now puts `live-site` 1 commit behind
   main in the network graph, thereby enabling a clean PR from main into
   `live-site`.

Going forward, PRs should just work easily so long as there aren't squash
commits on `live-site`.
