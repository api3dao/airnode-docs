## Contributor's Guide

Welcome to the API3 Documentation Repository. This guide will help you get
started with contributing to the API3 documentation.

## How to get started

The API3 Docs uses [VitePress](https://vitepress.dev/), a Vue-powered static
site generator. Follow the steps below to get started.

Make sure to check out https://docs.api3.org/dev/ for more details and
information about getting started and making a contribution to the API3 Docs.

### Pre-requisites

- [Node.js](https://nodejs.org/en/) (version 18 or higher).
- Unix/macOS/WSL for the scripts to work properly.

### Installation

```bash
yarn install
```

### Running the local development server

Run the following command to start the local development server on port `5173`:

```bash
yarn docs:dev
```

### Structure

The API3 Docs repository is structured as follows:

- `/docs/explore`: Explore section within the API3 Docs.
- `/docs/guides`: All the guides that demonstrate the use of Airnode, QRNG and
  dAPIs.
- `/docs/reference`: Contains the core documentation for Airnode, QRNG and
  dAPIs.

Each section will have a `sidebar.js` file that contains the sidebar structure
for that section.

`/_components`: Contains the custom vue components used in the API3 Docs.

[Check this out](https://docs.api3.org/dev/docsets.html) for more info about the
structure of the docs.

### Building the static site

```bash
yarn docs:build
```

### Prettier Formatting

Make sure to run the following command before submitting a PR to format the
markdown. The Github action will check for prettier formatting:

```bash
yarn format
```

### Formatting and Styling

You can use markdown to format the content. Check out the
[docs development section](https://docs.api3.org/dev/) for more info. Some
useful links:

- [Page styling](https://docs.api3.org/dev/page-styling.html)
- [Formatting guides](https://docs.api3.org/dev/guides-format.html)
- [VitePress Containers](https://docs.api3.org/dev/containers.html)

### Git Workflow:

- `live-site` branch: for the current live site
  [docs.api3.org](https://docs.api3.org)
- `main` branch: for the staging site.

[Check this out](https://docs.api3.org/dev/firebase.html#repo-branches) for more
info about the branches.

### Submitting an Issue

You can submit an issue if you find any bugs or have any feature requests.
Please make sure to check if the issue already exists before submitting a new
one.

You can:

- Submit an issue for a bug.
- Submit an issue for a feature request.
- Submit an issue for a documentation request.

### Making a PR

After making all the changes, submit a PR against the `main` branch. The PR will
be reviewed by the team and merged into the `main` branch. Make sure to link the
issue in the PR description.

You will then be able to see the changes with a Firebase preview link. Each PR
has its own Firebase preview site. The URL will be available in the PR's
comments.

The changes will be deployed to the staging site. Once the changes are reviewed
and approved, the changes will be merged from `main` into the `live-site` branch
and deployed to the live site.
