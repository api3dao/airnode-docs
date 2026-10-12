---
title: Validator
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Packages
path: /reference/airnode/v0.11/packages/validator.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The [airnode-validator](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-validator) is used internally by the [Docker Images](/reference/airnode/v0.11/docker/) to validate the [configuration files](/reference/airnode/v0.11/understand/configuring.md) you provide when deploying an Airnode.

However, validator can also be used as a standalone package to verify the correctness of the configuration files without deploying the Airnode. The recommended way is to use the [validator CLI](/reference/airnode/v0.11/packages/validator.md#cli-usage), but for advanced use cases you can use the [validator SDK](/reference/airnode/v0.11/packages/validator.md#sdk-usage).

## CLI Usage

The simplest way to run the CLI is using [npx](https://www.codingninjas.com/codestudio/library/difference-between-npm-and-npx). Alternatively, you can install the validator package as a dependency in your project.

```sh
npx @api3/airnode-validator --config "config.json" --secrets "secrets.env"
```

alternatively

```sh
# First install the package
npm install @api3/airnode-validator
# Or
yarn add @api3/airnode-validator

# Run the validator CLI
npx airnode-validator --config "config.json" --secrets "secrets.env"
```

### Examples

Assuming the configurations files inside current working directory are valid, executing:

```sh
npx @api3/airnode-validator --config "valid-config.json" --secrets "valid-secrets.env"
```

yields:

```sh
✔ The configuration is valid
```

When there is an error during validation, the command prints out the error and fails with a non zero status code.

```sh
npx @api3/airnode-validator --config "valid-config.json" --secrets "non-existent-secrets.env"
```

yields:

```sh
✖ Unable to read secrets file at "non-existent-secrets.env". Reason: Error: ENOENT: no such file or directory, open (...omitted for brevity)
```

## SDK Usage

The validator package contains an API that can be used to validate Airnode configuration files programatically.

The following functions can be used:

- `parseConfigWithSecrets(config, secrets)` - Interpolates `secrets` into `config` and validates the interpolated configuration. Expects both `config` and `secrets` to be JSON objects.
- `parseConfig(config)` - Validates the `config`. Expects the `config` to be a JSON object.
- `parseSecrets(secrets)` - Validates the `secrets`. Expects the `secrets` to be a JSON object.
- `parseReceipt(receipt)` - Validates the `receipt`. Expects the `receipt` to be a JSON object.
- `unsafeParseConfigWithSecrets(config, secrets)` - Interpolates `secrets` into `config` but does not perform any validation afterwards. Use this function only when you can guarantee that the configuration is valid.

Validator has also full TypeScript support. All of these functions return a typed object.

### Examples

```js
const validator = require('@api3/airnode-validator');
const dotenv = require('dotenv');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const secrets = dotenv.parse(fs.readFileSync('secrets.env', 'utf-8'));

const parseResult = validator.parseConfigWithSecrets(config, secrets);
if (parseResult.success) {
  const config = parseResult.data;
  // ... (do something with valid "config")
} else {
  console.error(parseResult.error);
}
```

or:

```ts
import * as validator from '@api3/airnode-validator';
import { join } from 'path';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('config.json', 'utf-8'));
const secrets = dotenv.parse(readFileSync('secrets.env', 'utf-8'));

const parseResult = validator.parseConfigWithSecrets(config, secrets);
if (parseResult.success) {
  const config = parseResult.data;
  // ... (do something with valid "config")
} else {
  console.error(parseResult.error);
}
```

## Build Manually

See the build instructions for the validator in the [airnode package repository](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-validator).

<FlexEndTag/>
