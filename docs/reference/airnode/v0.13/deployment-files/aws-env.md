---
title: aws.env
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Deployment Files
path: /reference/airnode/v0.13/deployment-files/aws-env.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

When it is time to deploy the Airnode to AWS, the Docker [deployer image](/reference/airnode/v0.13/docker/deployer-image.md) will need the AWS credentials to build the node. Variable names cannot contain dashes (-) or start with a number.

```bash
AWS_ACCESS_KEY_ID=XYZ...123
AWS_SECRET_ACCESS_KEY=ABC7...89
```

<FlexEndTag/>
