## Contributor's Guide

Welcome to the API3 Documentation Repository. This guide will help you get started with contributing to the API3 documentation.

## How to get started

The API3 Docs uses [VitePress](https://vitepress.dev/), a Vue-powered static site generator. Follow the steps below to get started.

Make sure to check out https://docs.api3.org/dev/ for more details and information about getting started and making a contribution to the API3 Docs.

### Pre-requisites

- [Node.js](https://nodejs.org/en/) (version 22 or higher).
- Unix/macOS/WSL for the scripts to work properly.

### Installation

```bash
pnpm install
```

### Running the local development server

Run the following command to start the local development server on port `5173`:

```bash
pnpm docs:dev
```

### Structure

The API3 Docs repository is structured as follows:

- `/docs/explore`: Explore section within the API3 Docs.
- `/docs/guides`: All the guides that demonstrate the use of Airnode.
- `/docs/reference`: Contains the core documentation for Airnode.

Each section will have a `sidebar.js` file that contains the sidebar structure for that section.

`/_components`: Contains the custom vue components used in the API3 Docs.

[Check this out](https://docs.api3.org/dev/docsets.html) for more info about the structure of the docs.

### Building the static site

```bash
pnpm docs:build
```

### Prettier Formatting

Make sure to run the following command before submitting a PR to format the markdown. The Github action will check for prettier formatting:

```bash
pnpm format
```

### Formatting and Styling

You can use markdown to format the content. Check out the [docs development section](https://docs.api3.org/dev/) for more info. Some useful links:

- [Page styling](https://docs.api3.org/dev/page-styling.html)
- [Formatting guides](https://docs.api3.org/dev/guides-format.html)
- [VitePress Containers](https://docs.api3.org/dev/containers.html)

### Git Workflow:

- `main` branch: for the current live site [docs.api3.org](https://docs.api3.org)

[Check this out](https://docs.api3.org/dev/firebase.html#repo-branches) for more info about the branches.

### Submitting an Issue

You can submit an issue if you find any bugs or have any feature requests. Please make sure to check if the issue already exists before submitting a new one.

You can:

- Submit an issue for a bug.
- Submit an issue for a feature request.
- Submit an issue for a documentation request.

### Making a PR

After making changes in a feature branch, submit a PR against the `main` branch. Make sure to link the corresponding GitHub Issue in the PR description e.g. `Closes #1`. You will be able to see the changes within a Firebase preview deployment that is unique to the PR. The PR will be reviewed by the team and merged into the `main` branch, which will result in the changes going live into production.
