---
title: Deployer
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Packages
path: /reference/airnode/v0.11/packages/deployer.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The [airnode-deployer](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-deployer) package is used primarily by the [Docker Images](/reference/airnode/v0.11/docker/). This CLI tool provides the underlying commands used by the Docker images when deploying an Airnode. API providers are strongly encouraged to use the [Docker Images](/reference/airnode/v0.11/docker/) when deploying an Airnode and not the deployer CLI commands.

## Usage

The deployer's commands can be run using [npx](https://www.codingninjas.com/codestudio/library/difference-between-npm-and-npx), installing a global npm package or by manually building the airnode-deployer package. Using npx is the simplest method to interact with the deployer manually if you do not wish to use the Docker images.

- [Using npx](/reference/airnode/v0.11/packages/deployer.md#using-npx)
- [Global Package](/reference/airnode/v0.11/packages/deployer.md#global-package)
- [Build Manually](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-deployer)

### Using npx

The airnode-deployer package can be run as an npm package using npx. This allows you to run deployer commands without installing the deployer npm package or having to manually build the airnode-deployer package yourself.

```sh
npx @api3/airnode-deployer deploy \
    --config config/config.json \
    --secrets config/secrets.env \
    --receipt config/receipt.json \
    --logs config/logs/
```

### Global Package

The airnode-deployer package can be installed globally with yarn or npm. If installed using yarn make sure yarn bin is added to `PATH`.

```sh
yarn global add @api3/airnode-deployer
# OR
npm install @api3/airnode-deployer -g

# Executing the deployer.
airnode-deployer deploy \
   --config config/config.json \
   --secrets config/secrets.env \
   --receipt config/receipt.json \
   --logs config/logs/
```

<!--  HOLD THIS UNTIL THE REPO README IS UPDATED
### Prerequisites

- Install [Terraform](https://www.terraform.io/downloads.html) and make sure
  that the terraform binary is available in your `PATH`.
- Make sure your AWS credentials are stored in the
  [configuration file](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-where)
  or exported as
  [environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-set).
  If you need help setting up an AWS IAM user you can follow
  [this video tutorial](https://www.youtube.com/watch?v=bT19B3IBWHE). Note that
  this step is done for you when using the Docker
  [deployer image](/reference/airnode/v0.11/docker/deployer-image.md).

### Setup

- Download the Airnode monorepo and build the Airnode packages.

```bash
git clone https://github.com/api3dao/airnode.git
cd airnode

# Run from the root of the airnode directory
git checkout v0.3
yarn run bootstrap
yarn build
```

- Make sure `config.json` and `secrets.env` are available in the `config`
  directory. You can use the provided example
  [config.json](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-deployer/config/config.example.json)
  and
  [secrets.env](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-deployer/config/secrets.example.env)
  templates to get started quickly, but you will need to edit these with your
  own API details and secrets.

```bash
# Change directories: /packages/airnode-deployer
cd packages/airnode-deployer

cp config/config.json.example config/config.json
cp config/secrets.env.example config/secrets.env
# Edit both `config.json` and `secrets.env` to reflect your configuration.
```
-->

## Credentials

When using the `airnode-deployer` Docker image, AWS or GCP credentials are loaded automatically. Conversely, when using the deployer CLI directly, you will need to first load AWS or GCP credentials into the environment manually as described below.

### AWS Credentials

For AWS, there are two options:

1. Set the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (and `AWS_SESSION_TOKEN` as well, if using temporary credentials) to their appropriate values.
2. Populate the AWS `credentials` file. See the AWS documentation for the [expected file format](https://docs.aws.amazon.com/sdkref/latest/guide/file-format.html#file-format-creds) as well as its [default location](https://docs.aws.amazon.com/sdkref/latest/guide/file-location.html).

### GCP Credentials

Set the environmental variable `GOOGLE_APPLICATION_CREDENTIALS` to the path of the `gcp.json` credentials file.

## Commands

- `deploy`
- `list`
- `info`
- `fetch-files`
- `remove`
- `remove-with-receipt`

### Airnode Deployment

When creating or updating an Airnode the `config.json` and `secrets.env` files are needed. You can use the provided example [config.json](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-deployer/config/config.example.json) and [secrets.env](https://github.com/api3dao/airnode/blob/v0.11/packages/airnode-deployer/config/secrets.example.env) templates to get started quickly, but you will need to edit these with your own API details and secrets.

<!-- Use of .html below is intended. -->
<WarningSimultaneousDeployments removeLink="/reference/airnode/v0.11/docker/deployer-image.html#manual-removal"/>

Make sure `config.json` and `secrets.env` are available in the path for the `--configuration` argument.

#### deploy

When executed, the `deploy` command defaults to creating a `receipt.json` file in the `config/` directory, although a different path can be specified using the path and name with the `--receipt` argument. The receipt contains metadata about the deployment and can be used to remove the Airnode.

By default the deployer will save logs into the `config/logs/` directory. This can be changed with the `--logs` argument.

If the deployment isn't successful, the command will try to automatically remove deployed resources. You can disable this by running the deploy command with a `--no-auto-remove` argument.

```bash
# Deploys an Airnode instance using the config.json and
# secrets.env files. This can be used for a new deployment
# or to update an existing deployment.

Options:
      --version                          Show version number                                                  [boolean]
      --debug                            Run in debug mode                                   [boolean] [default: false]
      --help                             Show help                                                            [boolean]
  -c, --configuration, --config, --conf  Path to configuration file            [string] [default: "config/config.json"]
  -s, --secrets                          Path to secrets file                  [string] [default: "config/secrets.env"]
  -r, --receipt                          Output path for receipt file         [string] [default: "config/receipt.json"]
  -l, --logs                             Output path for log files                   [string] [default: "config/logs/"]
      --auto-remove                      Enable automatic removal of deployed resources for failed deployments
                                                                                              [boolean] [default: true]
# Basic example
airnode-deployer deploy

# Advanced example
airnode-deployer deploy \
  --config config/config.json \
  --secrets config/secrets.env \
  --receipt config/receipt.json \
  --logs config/logs/
```

See how [deploy](/reference/airnode/v0.11/docker/deployer-image.md#deploy) is used via the AWS/GCP deployer image.

### Listing Airnodes

Once you've already deployed one or more Airnode, you can list your currently deployed instances using the `list` command.

#### list

By default, the deployer will attempt to list Airnode instances from all the supported cloud providers. You can use the `--cloud-providers` option to select just the cloud providers you want the deployer to list from.

```bash
# Lists deployed Airnode instances

Options:
      --version          Show version number                                [boolean]
      --debug            Run in debug mode                 [boolean] [default: false]
      --help             Show help                                          [boolean]
  -c, --cloud-providers  Cloud providers to list Airnodes from
                             [array] [choices: "aws", "gcp"] [default: ["aws","gcp"]]
  -l, --logs             Output path for log files [string] [default: "config/logs/"]

# Basic example
airnode-deployer list

# Advanced example with cloud provider selection
airnode-deployer list --cloud-providers gcp
```

See how [list](/reference/airnode/v0.11/docker/deployer-image.md#list) is used via the AWS/GCP deployer image.

### Fetching deployment information

You can use the `info` command to retrieve information about existing deployments. The retrieved information include deployment's Airnode address, stage, Airnode version and the update history.

#### info

```bash
# Displays info about deployed Airnode

Positionals:
  deployment-id  ID of the deployment (from 'list' command) [string] [required]

Options:
      --version  Show version number                                      [boolean]
      --debug    Run in debug mode                       [boolean] [default: false]
      --help     Show help                                                [boolean]
  -l, --logs     Output path for log files       [string] [default: "config/logs/"]

# Example
airnode-deployer info aws2c6ef2b3
```

See how [info](/reference/airnode/v0.11/docker/deployer-image.md#info) is used via the AWS/GCP deployer image.

### Reverting to a previous version

Revert to a previous version of a deployment using the `rollback` command.

#### rollback

```bash
# Deploy one of the previous Airnode deployment versions

Positionals:
  deployment-id  ID of the deployment to rollback (from 'list' command)                              [string] [required]
  version-id     ID of the deployment version to rollback to (from 'info' command)                   [string] [required]

Options:
      --version      Show version number                                                                       [boolean]
      --debug        Run in debug mode                                                        [boolean] [default: false]
      --help         Show help                                                                                 [boolean]
  -r, --receipt      Output path for receipt file                              [string] [default: "config/receipt.json"]
  -l, --logs         Output path for log files                                        [string] [default: "config/logs/"]
      --auto-remove  Enable automatic removal of deployed resources for failed deployments     [boolean] [default: true]

# Example
airnode-deployer rollback aws808e2a22 5bbcd317
```

See how [rollback](/reference/airnode/v0.11/docker/deployer-image.md#rollback) is used via the AWS/GCP deployer image.

### Fetching deployment files

During the Airnode deployment, your `config.json` and `secrets.env` are uploaded to the cloud provider of your choosing. You can use the `fetch-files` command to retrieve them.

#### fetch-files

```bash
# Fetch deployment files for the deployed Airnode
Positionals:
  deployment-id  ID of the deployment to fetch files for (from 'list' command)             [string] [required]
  version-id     ID of the deployment version to fetch files for (from 'info' command)                [string]

Options:
      --version     Show version number                                                              [boolean]
      --debug       Run in debug mode                                               [boolean] [default: false]
      --help        Show help                                                                        [boolean]
  -o, --output-dir  Where to store fetched files                                 [string] [default: "config/"]
# Example
airnode-deployer fetch-files aws2c6ef2b3
```

See how [fetch-files](/reference/airnode/v0.11/docker/deployer-image.md#fetch-files) is used via the AWS/GCP deployer image.

### Airnode Removal

An Airnode can be removed in two different ways:

- **Best:** With `remove`, which uses the deployment ID found either in the [deployment receipt file](/reference/airnode/v0.11/deployment-files/receipt-json.md) or via the `list` command.
- **Alternate:** With `remove-with-receipt`, which uses the deployment receipt created when the Airnode was deployed.

#### remove

```bash
# Removes a deployed Airnode instance

Positionals:
  deployment-id  ID of the deployment to remove (from 'list' command)
                                                            [string] [required]
Options:
     --version  Show version number                                   [boolean]
     --debug    Run in debug mode                    [boolean] [default: false]
     --help     Show help                                             [boolean]
 -l, --logs     Output path for log files    [string] [default: "config/logs/"]

# Example
airnode-deployer remove aws2c6ef2b3
```

See how [remove](/reference/airnode/v0.11/docker/deployer-image.md#remove) is used via the AWS/GCP deployer image.

#### remove-with-receipt

```bash
# Removes a deployed Airnode instance with a deployment receipt.

Options:
      --version  Show version number                                   [boolean]
      --debug    Run in debug mode                    [boolean] [default: false]
      --help     Show help                                             [boolean]
  -r, --receipt  Path to receipt file  [string] [default: "config/receipt.json"]
  -l, --logs     Output path for log files    [string] [default: "config/logs/"]

# Basic example
airnode-deployer remove-with-receipt

# Advanced example specifying the receipt file location
airnode-deployer remove-with-receipt \
  --receipt config/receipt.json \
  --logs config/logs/
```

See how [remove-with-receipt](/reference/airnode/v0.11/docker/deployer-image.md#remove-with-receipt) is used via the AWS/GCP deployer image.

<FlexEndTag/>
