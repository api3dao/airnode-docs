---
title: Cloud Resources
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.12
path: /reference/airnode/v0.12/cloud-resources.html
version: v0.12
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

When deployed to a cloud provider, such as AWS or GCP, Airnode uses certain resources to fully operate and supports most regions.

## Resources

Airnode uses the following AWS or GCP resources.

### AWS

| Resource    | Description                                                                                                                   |
| :---------- | :---------------------------------------------------------------------------------------------------------------------------- |
| EventBridge | Timer starting the Airnode service.                                                                                           |
| CloudWatch  | Log groups for deployed resources. For more details see [Monitoring Airnode](/reference/airnode/v0.12/understand/monitor.md). |
| Lambda      | The heart of the Airnode. Serverless functions providing the Airnode service.                                                 |
| IAM         | Roles & policies to allow communication among other resources.                                                                |
| API Gateway | Endpoints for the Airnode gateways.                                                                                           |
| S3          | File describing the state of the deployed infrastructure.                                                                     |

### GCP

| Resource        | Description                                                                                                                   |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| Cloud Scheduler | Timer starting the Airnode service.                                                                                           |
| Logs Explorer   | Log groups for deployed resources. For more details see [Monitoring Airnode](/reference/airnode/v0.12/understand/monitor.md). |
| Cloud Functions | The heart of the Airnode. Serverless functions providing the Airnode service.                                                 |
| API Gateway     | Endpoints for the Airnode gateways.                                                                                           |
| Cloud Storage   | File describing the state of the deployed infrastructure & source code for cloud functions.                                   |
| IAM             | Service accounts & roles to allow communication among other resources.                                                        |

## Supported Regions

The following regions are supported.

| GCP                  | AWS            |
| -------------------- | -------------- |
| asia-northeast1      | ap-northeast-1 |
| australia-southeast1 | ap-northeast-2 |
| europe-west1         | ap-northeast-3 |
| europe-west2         | ap-south-1     |
| us-central1          | ap-southeast-1 |
| us-east1             | ap-southeast-2 |
| us-east4             | ca-central-1   |
| us-west2             | eu-central-1   |
| us-west4             | eu-north-1     |
|                      | eu-west-1      |
|                      | eu-west-2      |
|                      | eu-west-3      |
|                      | sa-east-1      |
|                      | us-east-1      |
|                      | us-east-2      |
|                      | us-west-1      |
|                      | us-west-2      |

<FlexEndTag/>
