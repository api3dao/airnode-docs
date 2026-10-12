---
title: Deploying Airnode
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.12 → Understanding Airnode
path: /reference/airnode/v0.12/understand/deploying.html
version: v0.12
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

After integrating an API ([API Integration](/reference/airnode/v0.12/understand/api-integration.md)) and creating the configuration files ([Configuring Airnode](/reference/airnode/v0.12/understand/configuring.md)), the next step is to deploy the Airnode.

## Deploy with Docker

The recommended way to deploy Airnode is by using the Docker [deployer image](/reference/airnode/v0.12/docker/deployer-image.md). This image is simply a wrapper around the [deployer CLI](https://github.com/api3dao/airnode/tree/v0.12/packages/airnode-deployer). Try the [Deploying an Airnode on AWS](/guides/airnode/deploy-airnode/deploy-aws/) tutorial if you wish to become familiar with the deployer image first. There are also tutorials for [GCP](/guides/airnode/deploy-airnode/deploy-gcp/) and a [client Docker container](/guides/airnode/deploy-airnode/deploy-container/) as well as several repo based examples in the [Airnode monorepo example](https://github.com/api3dao/airnode/tree/v0.12.0/packages/airnode-examples) package.

The deployer interacts with a cloud provider to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces. For it to do so, a cloud project setup and credentials are required and was discussed in [Configuring an Airnode](/reference/airnode/v0.12/understand/configuring.md#aws-setup-aws-deployment-only). There is additional guidance in the AWS and GCP quick start tutorials mentioned above.

## Install Docker

The [deployer image](/reference/airnode/v0.12/docker/deployer-image.md) is containerized as a Docker image. This will deploy the Airnode to the cloud provider without the worry of installing dependencies and is the recommended way to do a deployment. If you do not already have docker installed go to the [Docker website](https://docs.docker.com/get-docker/) and install it.

## Deployment

At this point a project should resemble the following. The `config.json`, `secrets.env`, `aws.env` (if deploying to AWS) and `gcp.json` (if deploying to GCP) files should be ready to go. Other files and folders added to the project are expected and are ignored by the deployer image.

::: code-group

```json [AWS]
my-airnode
├── aws.env
├── config.json
└── secrets.env
```

```json [GCP]
my-airnode
├── config.json
├── gcp.json
└── secrets.env
```

:::

<!-- Use of .html below is intended. -->
<WarningSimultaneousDeployments removeLink="/reference/airnode/v0.12/docker/deployer-image.html#manual-removal"/>

From the root of the project directory run the Docker image command [deploy](/reference/airnode/v0.12/docker/deployer-image.md#deploy) as shown below to deploy the Airnode. When the deployment has completed a `receipt.json` file will be written to the project directory, which is mounted to the `/app/config` directory within the container. This file contains important configuration information about the Airnode and is needed to remove the Airnode should the need arise.

<p><DeployerPermissionsWarning/></p>

::: code-group

```sh [Linux/Mac/WSL2]
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.12.0 deploy
```

```batch [Windows]
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.12.0 deploy
```

:::

### receipt.json

The `receipt.json` file is a product of a deployment attempt. It contains Airnode configuration and deployment information and is used to remove the Airnode. The field `success` is important in that it specifies whether the deployment was successful or not.

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xaBd9daAdf32fCd96eE4607bf3d5B31e19a244Cac",
    "xpub": "xpub661MyMwAqRbcGHp9uC7...vbeziJwFHuNs"
  },
  "deployment": {
    "deploymentId": "aws8fd2e911",
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1",
      "disableConcurrencyReservations": false
    },
    "stage": "dev",
    "nodeVersion": "0.12.0",
    "timestamp": "2022-03-26T02:37:55.506Z"
  },
  "success": true
}
```

## Testing with HTTP Gateway

If you opted to enable the HTTP Gateway it can be used to test the Airnode while bypassing the chain it was deployed to. There are examples that detail how to do this.

- [HTTP Gateways](/reference/airnode/v0.12/understand/http-gateways.md#using-curl)
- [Deploying an Airnode on AWS](/guides/airnode/deploy-airnode/deploy-aws/#_5-test-the-airnode)
- [Deploying an Airnode on GCP](/guides/airnode/deploy-airnode/deploy-gcp/#_6-test-the-airnode)
- [Deploying an Airnode locally using Docker](/guides/airnode/deploy-airnode/deploy-container/#_5-test-the-airnode)

## Make an RRP request of the Airnode

Once the Airnode is deployed, see [Calling an Airnode](/reference/airnode/v0.12/developers/index.md) to learn how requests are made using the request-response protocol (RRP).

## Removing the Airnode

If you would like to remove a deployed Airnode, see the Docker image commands for [remove](/reference/airnode/v0.12/docker/deployer-image.md#remove) or [remove-with-receipt](/reference/airnode/v0.12/docker/deployer-image.md#remove-with-receipt) instructions.

<FlexEndTag/>
