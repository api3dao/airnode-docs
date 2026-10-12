---
title: AWS/GCP Deployer Image
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.11 → Docker Images
path: /reference/airnode/v0.11/docker/deployer-image.html
version: v0.11
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Use the deployer image to deploy or remove an Airnode with a cloud provider such as AWS. The simplest way is to use the pre-built packages. If you would rather build the images yourself see the [README](https://github.com/api3dao/airnode/tree/v0.11/packages/airnode-deployer/docker) in the deployer package.

::: info Quick Deploy Demos

See the [<span style="color:rgb(16, 185, 129);">Deploying an Airnode on AWS</span>](/guides/airnode/deploy-airnode/deploy-aws/) guides to quickly deploy and remove a preconfigured Airnode using the deployer image.

:::

## Configuration Files

The files `config.json` and `secrets.env` are used to configure the Airnode. The `aws.env` and `gcp.json` files are used to define environment information the deployer uses to connect to these cloud providers.

```
my-airnode
├── aws.env     <- Used for AWS deployment
├── gcp.json    <- Used for GCP deployment
├── config.json
└── secrets.env
```

## Cloud Provider Credentials

In order to deploy Airnode to a serverless cloud provider, you need to provide cloud provider credentials to the Airnode deployer image. The deployer image currently supports deploying to AWS and GCP. For AWS deployment, see the [AWS Setup](/reference/airnode/v0.11/understand/configuring.md#aws-setup-aws-deployment-only) and for GCP deployment, see the [GCP Setup](/reference/airnode/v0.11/understand/configuring.md#gcp-setup-gcp-deployment-only).

## Deployer Logs

The deployer saves log files by default into the `config/logs/` direcotry, but this can be changed by passing a `--logs` argument to the command.

## Deployer Image Commands

Commands are similar for AWS and GCP. Any differences between AWS and GCP are noted where they exist.

- `deploy`
- `list`
- `info`
- `rollback`
- `fetch-files`
- `remove`
- `remove-with-receipt`

### `deploy`

The [deploy](/reference/airnode/v0.11/packages/deployer.md#deploy) command will create the Airnode with a cloud provider or update it if it already exists. Three files are needed to run the deploy command.

- config.json
- secrets.env
- aws.env (AWS only)
- gcp.json (GCP only)

See [Deploying an Airnode](/reference/airnode/v0.11/understand/deploying.md#deploy-with-docker) for deployment commands specific to various operating systems and cloud providers.

Note that a `receipt.json` file will be created upon completion. It contains some deployment information and is used to remove the Airnode.

<!-- Use of .html below is intended. -->

<WarningSimultaneousDeployments removeLink="/reference/airnode/v0.11/docker/deployer-image.html#manual-removal"/>

<p><DeployerPermissionsWarning/></p>

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 deploy
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 deploy
```

:::

#### Re-deployments

A unique deployment is defined by the value of [nodeSetting.stage](/reference/airnode/v0.11/deployment-files/config-json.md#stage). If you deploy again, using the same `nodeSetting.stage` value, then you are re-deploying or updating the previous deployment.

By default the deployer will attempt to remove the Airnode should either a deployment or re-deployment fail. But if either fails (and [--auto-remove](/reference/airnode/v0.11/packages/deployer.md#deploy) is false) then the Airnode will not be removed, however it could be left in an unstable state. You can alter the `deploy` command to change this behavior using the following.

- `--auto-remove true|false`: defaults to true
- `--no-auto-remove`

Auto removal is usually recommended for development deployments. For production deployments, consider changing the value of `nodeSetting.stage` to create a new deployment and follow-up by removing the previous deployment.

Use the following example to avoid the automatic removal of the Airnode.

```sh
docker run -it --rm \
-e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
-v "$(pwd):/app/config" \
api3/airnode-deployer:0.11.2 deploy --auto-remove false
```

### `list`

Once one or more Airnodes were deployed using the [deploy](/reference/airnode/v0.11/docker/deployer-image.md#deploy) command above, the [list](/reference/airnode/v0.11/packages/deployer.md#list) command can be used to list currently deployed Airnodes. Files for cloud provider authentication are needed for the command to run correctly: `aws.env` (for AWS) and/or `gcp.json` (for GCP).

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 list
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 list
```

:::

By default, the deployer will attempt to list Airnode instances from all the supported cloud providers. You can use the `--cloud-providers` option to select just the cloud providers you want the deployer to list from.

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 list --cloud-providers aws
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 list --cloud-providers aws
```

:::

### `info`

Retrieve more information about a deployment with the [info](/reference/airnode/v0.11/packages/deployer.md#info) command. Use the deployment ID from the [list](/reference/airnode/v0.11/docker/deployer-image.md#list) command above to request information about a specific deployment. The retrieved information include deployment's Airnode address, stage, Airnode version and the update history. Files for cloud provider authentication are needed for the command to run correctly: `aws.env` (for AWS) and/or `gcp.json` (for GCP).

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 info aws2c6ef2b3
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 info aws2c6ef2b3
```

:::

### `rollback`

To revert to a previous version of a deployment, use the [rollback](/reference/airnode/v0.11/packages/deployer.md#rollback) command. Provide the deployment ID from the [list](/reference/airnode/v0.11/docker/deployer-image.md#list) command above to specify which deployment will be changed. Also provide the desired version ID from the [info](/reference/airnode/v0.11/docker/deployer-image.md#info) command above to revert to. The [rollback](/reference/airnode/v0.11/packages/deployer.md#rollback) command will then fetch the configuration files of the specified version and deploy the version using its configuration. Check this with the [info](/reference/airnode/v0.11/docker/deployer-image.md#info) command above.

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 rollback aws2c6ef2b3 3580a278
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 rollback aws2c6ef2b3 3580a278
```

:::

### `fetch-files`

During the Airnode deployment, your `config.json` and `secrets.env` are uploaded to the cloud provider of your choosing. You can use the [fetch-files](/reference/airnode/v0.11/packages/deployer.md#fetch-files) command to retrieve them. You need to provide the deployment ID from the [list](/reference/airnode/v0.11/docker/deployer-image.md#list) command above to specify the desired deployment. By default, the files from the latest version of this deployment are fetched. Alternatively, you can additionally provide a deployment version ID from the [info](/reference/airnode/v0.11/docker/deployer-image.md#info) command above to specify the desired deployment version. By default, the archive with the files is stored in the `config` directory **within the Docker container** that is, in the example below, mapped to your current working directory. You can change the output directory by providing an `--output-dir` option specifying a different directory instead. Don't forget to add a mapping for the new output directory so you'll be able to access the files. Files for cloud provider authentication are needed for the command to run correctly: `aws.env` (for AWS) or `gcp.json` (for GCP).

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 fetch-files aws2c6ef2b3
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 fetch-files aws2c6ef2b3
```

:::

### `remove`

A deployed Airnode can be removed via the [remove](/reference/airnode/v0.11/packages/deployer.md#remove) command. To remove Airnode, use the deployment ID from the [list](/reference/airnode/v0.11/docker/deployer-image.md#list) command above. Airnode's update history, that can be seen by the [info](/reference/airnode/v0.11/docker/deployer-image.md#info) command, will be removed as well. Files for cloud provider authentication are needed for the command to run correctly: `aws.env` (for AWS) or `gcp.json` (for GCP). This is the recommended way to remove a deployment, but an alternative is the `remove-with-receipt` command.

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 remove aws2c6ef2b3
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 remove aws2c6ef2b3
```

:::

### `remove-with-receipt`

When an Airnode was deployed using the `deploy` command, a `receipt.json` file was created. This file is used to remove the Airnode. The [remove-with-receipt](/reference/airnode/v0.11/packages/deployer.md#remove-with-receipt) command is identical for AWS and GCP. Files for cloud provider authentication are needed for the command to run correctly: `aws.env` (for AWS) or `gcp.json` (for GCP).

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.11.2 remove-with-receipt
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.11.2 remove-with-receipt
```

:::

## Manual Removal

Optionally you can remove an Airnode manually though it is highly recommended that you do so using the deployer image's `remove-with-receipt` or `remove` commands. When removing manually, you will need the Airnode's deployment ID, `deploymentId` (e.g., `awsef86dfad`) and the Airnode stage name (e.g., `production`). They can be found in the [receipt.json](/reference/airnode/v0.11/deployment-files/receipt-json.md) file generated when deploying the Airnode. These are included in the element name of AWS and GCP deployed features. Airnode has a presence in several areas of both AWS and GCP as listed below.

::: danger Remember

Only delete elements of a feature with the `deploymentId` and `stage` name contained in the element's name. There can be more than one Airnode. Example: (airnode-**awsef86dfad-production**-run), where `awsef86dfad` is the deploymentId and `production` is the stage name.

:::

### AWS

<DeleteAirnodeAws />

### GCP

<DeleteAirnodeGcp />

Learn more about AWS or GCP resources that Airnode uses in the [Cloud Resources](/reference/airnode/v0.11/cloud-resources.md) doc.

<FlexEndTag/>
