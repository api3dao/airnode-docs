---
title: Configuring Airnode
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Understanding Airnode
path: /reference/airnode/v0.13/understand/configuring.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

An Airnode is deployed or redeployed using configuration values from its `config.json` and `secrets.env` files. The `config.json` specifies the [Oracle Integration Specifications OIS](/reference/ois/2.2/specification.md) and other specific configuration details. The `secrets.env` file holds secrets, such as API keys and chain provider URLs, which are referenced within the config.json file using interpolation.

> <img src="../assets/images/config-json.png" width="600px">
>
> - <p>The <b>config.json</b> file is used during the deployment/redeployment of an Airnode to configure its behavior and to provide mappings of API operations.</p>
> - <p>The <b>secrets.env</b> file holds values for config.json that must be kept secret.</p>
> - <p>The <b>aws.env</b> file holds AWS credentials for deployments targeted to AWS.</p>
> - <p>The <b>gcp.json</b> file holds GCP credentials for deployments targeted to GCP.</p>

The following example files are useful while reading this doc.

- [config.json](/reference/airnode/v0.13/deployment-files/examples/config-json.md)
- [secrets.env](/reference/airnode/v0.13/deployment-files/examples/secrets-env.md)
- [aws.env](/reference/airnode/v0.13/deployment-files/examples/aws-env.md)

## Creating `config.json`

Use the [config.json template](/reference/airnode/v0.13/deployment-files/templates/config-json.md) to build your own Airnode configuration file or alter the [config.json example](/reference/airnode/v0.13/deployment-files/examples/config-json.md) file. There are six root level fields in `config.json`.

- [chains](/reference/airnode/v0.13/understand/configuring.md#chains)
- [nodeSettings](/reference/airnode/v0.13/understand/configuring.md#nodesettings)
- [triggers](/reference/airnode/v0.13/understand/configuring.md#triggers)
- [templates](/reference/airnode/v0.13/understand/configuring.md#templates)
- [ois](/reference/airnode/v0.13/understand/configuring.md#ois)
- [apiCredentials](/reference/airnode/v0.13/understand/configuring.md#apicredentials)

### chains

Each row in the `chains` array represents an Ethereum blockchain the Airnode will serve as identified by the `id`. Currently Airnode only supports Ethereum blockchains as denoted by `type: "evm"`. There are several supported blockchains, see them in the [Airnode contract addresses](/reference/airnode/v0.13/) doc. You can use multiple chain providers for each chain and declare multiple chains each with one of more chain providers. See [Chains Providers](/reference/airnode/v0.13/concepts/chain-providers.md) in _Concepts and Definitions_.

Below is a simple chain array with a single chain provider.

```json
"chains": [
  {
    "authorizers": {
      "requesterEndpointAuthorizers": [
        "0xf18c105D0375E80980e4EED829a4A68A539E6178"
      ],
      "crossChainRequesterAuthorizers": [],
      "requesterAuthorizersWithErc721": [],
      "crossChainRequesterAuthorizersWithErc721": []
    },
    "authorizations": {
        "requesterEndpointAuthorizations": {}
      },
    "id": "11155111",
    "providers": {
      "infuraSepolia": {
        "url": "${INFURA_SEPOLIA_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "gasPriceOracle": [
        {
          "gasPriceStrategy": "latestBlockPercentileGasPrice",
          "percentile": 60,
          "minTransactionCount": 20,
          "pastToCompareInBlocks": 20,
          "maxDeviationMultiplier": 2,
        },
        {
          "gasPriceStrategy": "providerRecommendedGasPrice",
          "recommendedGasPriceMultiplier": 1.2,
        },
        {
          "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
          "baseFeeMultiplier": 2,
          "priorityFee": {
            "value": 3.12,
            "unit": "gwei",
          }
        },
        {
          "gasPriceStrategy": "constantGasPrice",
          "gasPrice": {
            "value": 10,
            "unit": "gwei"
          }
        }
      ],
    },
    "maxConcurrency": 100,
    "blockHistoryLimit": 300,
    "minConfirmations": 0
  }
],
```

::: info Idiosyncrasies

See the dedicated [<span style="color: rgb(16, 185, 129)">Chain Idiosyncrasies</span>](/reference/airnode/v0.13/chain-idiosyncrasies.md) page for chain-specific configuration considerations.

:::

#### Considerations: Gas Price Oracle

The gas price oracle strategies are applied in the order that they are listed. Airnode supports four strategies: `latestBlockPercentileGasPrice`, `providerRecommendedGasPrice`, `providerRecommendedEip1559GasPrice` and `constantGasPrice`. The only required strategy is `constantGasPrice` and it is recommended to place it as the last strategy in the list as it should be the final fallback for the Airnode to use if all other strategies fail. For more detail on these strategies, see the [Gas Price Strategies](/reference/airnode/v0.13/concepts/gas-prices.md) page.

#### Considerations: Concurrency

If you set the `maxConcurrency` field to value X, then Airnode will guarantee that:

- At most X api calls are made to the API
- At most X transactions (made by blockchain providers) will be made by the blockchain providers of the respective chain

When doing this, Airnode will calculate the total number of requests reported by all blockchain providers. If this number exceeds the maximum concurrency limit, Airnode will start processing the oldest request from the blockchain providers until the number of processed requests reaches the limit. All other requests are dropped and will be processed in the next Airnode run.

Note that this request dropping happens for each **chain** separately.

For example, if `maxConcurrency` is set to 5 and there are three providers (A, B and C) and they reported the following requests:

- A1, A2, A3, A4 and A5
- B1, B2 and B3
- C1 and C2

The above example results in the following requests: A1, A2, B1, B2, and C1.

::: warning

Note, that this limit only applies to the requests initiated on chain. For example, requests initiated using HTTP gateway are not included in this limit. Also note that, this limit is configured per chain and the limits of different chains are unrelated to each other.

:::

#### References: `chains`

The links below offer additional details for each field from the Deployment Files section:

- [authorizers](/reference/airnode/v0.13/deployment-files/config-json.md#authorizers)
- [id](/reference/airnode/v0.13/deployment-files/config-json.md#id)
- [providers](/reference/airnode/v0.13/deployment-files/config-json.md#providers)
- [type](/reference/airnode/v0.13/deployment-files/config-json.md#type)
- [options](/reference/airnode/v0.13/deployment-files/config-json.md#options)
  - [options.gasPriceOracle](/reference/airnode/v0.13/deployment-files/config-json.md#options-gaspriceoracle-n)
  - [options.withdrawalRemainder](/reference/airnode/v0.13/deployment-files/config-json.md#options-withdrawalremainder)
- [maxConcurrency](/reference/airnode/v0.13/deployment-files/config-json.md#maxconcurrency)
- [blockHistoryLimit](/reference/airnode/v0.13/deployment-files/config-json.md#blockhistorylimit)
- [minConfirmations](/reference/airnode/v0.13/deployment-files/config-json.md#minconfirmations)

### nodeSettings

The `nodeSettings` field holds node-specific (Airnode) configuration parameters.

```json
{
"nodeSettings": {
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1",
      "disableConcurrencyReservations": false
    },
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": true,
      "apiKey": "${HEARTBEAT_API_KEY}",
      "url": "${HEARTBEAT_URL}"
    },
    "httpGateway": {
      "enabled": true,
      "maxConcurrency": 20,
      "corsOrigins": []
    },
    "httpSignedDataGateway": {
      "enabled": true,
      "maxConcurrency": 20,
      "corsOrigins": []
    },
    "logFormat": "plain",
    "logLevel": "INFO",
    "nodeVersion": "0.13.0",
    "stage": "dev"
  },
```

#### Considerations: Cloud Providers

Currently, Amazon Web Services (AWS) and Google Cloud Platform (GCP) are supported cloud providers for hosting Airnode. Note that while many fields within `nodeSettings` are required by both, there are some cloud provider specific fields. For example, `cloudProvider.projectId` is only required with GCP. Also note that not all cloud provider regions can be deployed to; see the [cloudProvider.region reference](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider-region) for more information.

#### Considerations: Gateways

Airnode offers two gateways for accessing provider HTTP endpoints without using the blockchain: `httpGateway` and `httpSignedDataGateway`. For more information on each of these see the [HTTP Gateways](/reference/airnode/v0.13/understand/http-gateways.md) documentation. Also note that that distinct API keys must be used for each.

#### References: `nodeSettings`

The links below offer additional details for each field from the Deployment Files section:

- [cloudProvider](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider)
  - [cloudProvider.type](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider-type)
  - [cloudProvider.region](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider-region)
  - [cloudProvider.disableConcurrencyReservations](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider-disableconcurrencyreservations)
  - [cloudProvider.projectId](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider-projectid)
- [airnodeWalletMnemonic](/reference/airnode/v0.13/deployment-files/config-json.md#airnodewalletmnemonic)
- [heartbeat](/reference/airnode/v0.13/deployment-files/config-json.md#heartbeat)
  - [heartbeat.enabled](/reference/airnode/v0.13/deployment-files/config-json.md#heartbeat-enabled)
  - [heartbeat.apiKey](/reference/airnode/v0.13/deployment-files/config-json.md#heartbeat-apikey)
  - [heartbeat.url](/reference/airnode/v0.13/deployment-files/config-json.md#heartbeat-url)
- [httpGateway](/reference/airnode/v0.13/deployment-files/config-json.md#httpgateway)
  - [httpGateway.enabled](/reference/airnode/v0.13/deployment-files/config-json.md#httpgateway-enabled)
  - [httpGateway.maxConcurrency](/reference/airnode/v0.13/deployment-files/config-json.md#httpgateway-corsorigins)
  - [httpGateway.corsOrigins](/reference/airnode/v0.13/deployment-files/config-json.md#httpgateway-maxconcurrency)
- [httpSignedDataGateway](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddatagateway)
  - [httpSignedDataGateway.enabled](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddatagateway-enabled)
  - [httpSignedDataGateway.maxConcurrency](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddatagateway-maxconcurrency)
  - [httpSignedDataGateway.corsOrigins](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddatagateway-corsorigins)
- [logFormat](/reference/airnode/v0.13/deployment-files/config-json.md#logformat)
- [logLevel](/reference/airnode/v0.13/deployment-files/config-json.md#loglevel)
- [nodeVersion](/reference/airnode/v0.13/deployment-files/config-json.md#nodeversion)
- [stage](/reference/airnode/v0.13/deployment-files/config-json.md#stage)

### triggers

The `triggers` field allow exposes Airnode endpoints from an OIS selectively for the RRP protocol or via the HTTP gateway. For example, an OIS object may include 10 endpoints, but only two are desired for RRP and all 10 for the gateway.

List the endpoints to serve with the request–response protocol (RRP) under `triggers.rrp`. List the endpoints to serve with the HTTP gateway under `triggers.http`. List the endpoints which can be used to get the signed data in `triggers.httpSignedData`. In most cases create a trigger for each endpoint in your OIS object.

```json
"triggers": {
    "rrp": [
      {
        "endpointId": "0xd4b0718c9a3316dbd831e6d01058202e5dde20a116304419f0d79e07a82b46bf",
        "oisTitle": "CoinGecko Requests",
        "endpointName": "coinGeckoMarketData",
        "cacheResponses": false
      }
    ],
    "http": [
      {
        "endpointId": "0xd4b0718c9a3316dbd831e6d01058202e5dde20a116304419f0d79e07a82b46bf",
        "oisTitle": "CoinGecko Requests",
        "endpointName": "coinGeckoMarketData"
      }
    ],
    "httpSignedData": [
      {
        "endpointId": "0xd4b0718c9a3316dbd831e6d01058202e5dde20a116304419f0d79e07a82b46bf",
        "oisTitle": "CoinGecko Requests",
        "endpointName": "coinGeckoMarketData"
      }
    ]
  },
```

#### Considerations: triggers

The `endpointId` required for `rrp`, `http`, and `httpSignedData` can be derived from the `oisTitle` and `endpointName` using the CLI command [derive-endpoint-id](/reference/airnode/v0.13/packages/admin-cli.md#derive-endpoint-id). Remember that an Airnode's config.json file can have more than one OIS object and that these endpoints can be triggers for `rrp`, `http`, and/or `httpSignedData` as desired.

#### Considerations: cached responses

When setting `triggers.rrp[n].cacheResponses` to `true`, Airnode caches API responses on the local filesystem per request ID. This only applies to blockchain requests. The flow is:

1. A request is received from the Blockchain.
1. The Airnode does an HTTP/S call to a remote API based on the request.
1. [with caching enabled] Airnode stores the response on the local filesystem by request ID.
1. Airnode then follows the usual process of extracting the response, post-processing it and sending the response back on chain as a fulfillment callback.
1. After all current requests are processed, Airnode then exits until the next cycle (the next minute).
1. If during the next cycle, if the Airnode gets the same request and it isn't fulfilled, it will try and fulfill the request again. Ordinarily, without caching enabled, it would follow steps 1, 2 and 4 (as shown above), but with caching enabled it will fulfill the response using the cached API response value.

Clearance of the local filesystem cache is dependant on the environment Airnode runs in. As a guideline:

- AWS Lambda persists for 2.5 hours.
- Google Cloud persistence is completely arbitrary.
- Docker persists as long as the container remains running.

If the local filesystem is cleared, the cache is lost and if a repeat request is received after the cache has been cleared, Airnode will repeat the API call. Airnode self-clears cached data after the data has reached 1 hour's age.

Furthermore, as an example: "if an Airnode AWS Lambda environment/container" (since this example of 2.5 hrs is specific to AWS) has been "warm" for 2.4 hours and Airnode gets a request, that request will only be cached until the container resets, in this case 2.5 hours - 2.4 hours = 0.1 hours.

As described above, caching on serverless infrastructure is unreliable and if request caching is mission critical, Airnode should be run in a Docker container with a persistent `/tmp` directory.

Caching is useful for non-idempotent API operations like random number generators. Consider the following use-case:

> Random Numbers: in the absence of caching, a malicious blockchain provider can selectively block fulfillments containing numbers they don't like, allowing them to improve their odds of winning in a random-number betting game.

#### References: `triggers`

The links below offer additional details for each field from the Deployment Files section:

- [rrp](/reference/airnode/v0.13/deployment-files/config-json.md#rrp)
  - [rrp[n].endpointId](/reference/airnode/v0.13/deployment-files/config-json.md#rrp-n-endpointid)
  - [rrp[n].oisTitle](/reference/airnode/v0.13/deployment-files/config-json.md#rrp-n-oistitle)
  - [rrp[n].endpointName](/reference/airnode/v0.13/deployment-files/config-json.md#rrp-n-endpointname)
  - [rrp[n].cacheResponses](/reference/airnode/v0.13/deployment-files/config-json.md#rrp-n-cacheresponses)
- [http](/reference/airnode/v0.13/deployment-files/config-json.md#http)
  - [http[n].endpointId](/reference/airnode/v0.13/deployment-files/config-json.md#http-n-endpointid)
  - [http[n].oisTitle](/reference/airnode/v0.13/deployment-files/config-json.md#http-n-oistitle)
  - [http[n].endpointName](/reference/airnode/v0.13/deployment-files/config-json.md#http-n-endpointname)
- [httpSignedData](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddata)
  - [httpSignedData[n].endpointId](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddata-n-endpointid)
  - [httpSignedData[n].oisTitle](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddata-n-oistitle)
  - [httpSignedData[n].endpointName](/reference/airnode/v0.13/deployment-files/config-json.md#httpsigneddata-n-endpointname)

### templates

The templates field allows you to specify templates to be used to make template requests. The array can be left empty if no templates will be used.

#### References: templates

The links below offer additional details for each field from the Deployment Files section:

- [templateId](/reference/airnode/v0.13/deployment-files/config-json.md#templateid)
- [endpointId](/reference/airnode/v0.13/deployment-files/config-json.md#endpointid)
- [encodedParameters](/reference/airnode/v0.13/deployment-files/config-json.md#encodedparameters)

### ois

The `ois` field is a list OIS objects that Airnode will be serving. This means that a single instance of an Airnode can serve multiple APIs. You can simply copy paste OIS objects that you will be serving into the `ois` list. Use the previous guide [API Integration](/reference/airnode/v0.13/understand/api-integration.md) to create an OIS object. The full specification is available in the [Oracle Integration Specifications (OIS)](/reference/ois/2.2/) documentation.

### apiCredentials

Each entry in `apiCredentials` maps to a security scheme defined in an OIS (`ois[n].components.securitySchemes.{securitySchemeName}` and `ois[n].security`), where `oisTitle` is the `title` field of the related OIS, and `securitySchemeName` is the name of the respective security scheme. These would be `myOisTitle` and `mySecurityScheme` in the example below. `securitySchemeValue` is the value used for the authentication with the security scheme (e.g., the API key).

If no security scheme is needed, leave the `apiCredentials` array empty.

```json
// apiCredentials
[
  {
    "oisTitle": "myOisTitle",
    "securitySchemeName": "mySecurityScheme",
    "securitySchemeValue": "${SS_MY_API_KEY}"
  }
]

// From the OIS object apiCredentials is referencing
// using the oisTitle/securitySchemeName pair.
{
  "title": "myOisTitle",
  ...,
  "components": {
    "securitySchemes": {
      "mySecurityScheme": {
        "in": "header",
        "type": "apiKey",
        "name": "X-api-key"
      }
    }
  },
  "security":{
    "mySecurityScheme": []
  }
  ...
}
```

#### Considerations: apiCredentials

Currently Airnode supports the following security scheme types when making API calls: `apiKey` and `http`. For more detail, visit the previous section on [API Security](/reference/airnode/v0.13/understand/api-security.md).

#### References: `apiCredentials`

The links below offer additional details for each field from the Deployment Files section:

- [oisTitle](/reference/airnode/v0.13/deployment-files/config-json.md#oistitle)
- [securitySchemeName](/reference/airnode/v0.13/deployment-files/config-json.md#securityschemename)
- [securitySchemeValue](/reference/airnode/v0.13/deployment-files/config-json.md#securityschemevalue)

## Creating `secrets.env`

The `secrets.env` file contains values (secrets) such as blockchain provider urls, chain provider urls, etc. These secrets are embedded in [config.json](/reference/airnode/v0.13/deployment-files/config-json.md) using interpolation.

```json
// Sample interpolation value from config.json
"heartbeat": {
  "enabled": true,
  "apiKey": "${HEARTBEAT_API_KEY}"
},

// Sample variable in secrets.env
// Variable names cannot contain dashes (-) or start with a number.
HEARTBEAT_API_KEY="d714a900-3b9e-4e4d-8eae-756ef06a8836"
```

Use the [secrets.env](/reference/airnode/v0.13/deployment-files/templates/secrets-env.md) template and refer to [Reference > Deployment Files > secrets.env](/reference/airnode/v0.13/deployment-files/secrets-env.md) as needed.

## AWS setup (AWS deployment only)

When it is time to deploy the Airnode to AWS, the Docker [deployer image](/reference/airnode/v0.13/docker/deployer-image.md) will need the AWS credentials to build the node on AWS Lambda.

### Creating `aws.env` (AWS only)

Follow [this video](https://www.youtube.com/watch?v=KngM5bfpttA) if needed. It explains how to create an IAM user and get security credentials. Put them in the `aws.env` file as shown below. See an [example file](/reference/airnode/v0.13/deployment-files/templates/aws-env.md) in the reference section.

- Variable names cannot contain dashes (-) or start with a number.

```bash
AWS_ACCESS_KEY_ID=XYZ...123
AWS_SECRET_ACCESS_KEY=ABC7...89
```

## GCP setup (GCP deployment only)

When it is time to deploy the Airnode to GCP, the Docker [deployer image](/reference/airnode/v0.13/docker/deployer-image.md) will need the GCP project ID to build the Airnode.

### Creating a GCP project

First [create a GCP project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) under which will the Airnode be deployed. Once the project is created, insert its [projectId](/reference/airnode/v0.13/deployment-files/config-json.md#cloudprovider) into the `config.json` file.

### Enable required API

In order for Airnode to deploy successfully, enable [App Engine Admin API](https://console.cloud.google.com/apis/library/appengine.googleapis.com) for the GCP project. After enabling it, wait a few minutes before the deployment itself so the change will take place.

### Creating a Service Account

Create a new service account from the [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) menu. Grant this service account access to the project by adding a role `Owner` during the creation process.

Once the account is created, add a new access key of type JSON for this account. Download the key file as `gcp.json` into the root of your project.

## Summary

In this guide you created the `config.json`, `secrets.env` and obtained cloud provider credentials required to deploy an Airnode to a cloud provider. Note that `config.json` is user-specific and therefore it is not much use to others.

The `secrets.env`, `aws.env` and `gcp.json` files contains keys, chain provider urls and security credentials, so they should be kept secret. Make sure that you do not push your credentials to a repository or otherwise expose them as these credentials can be used to gain access to your Airnode's private key, AWS account or GCP account.

<FlexEndTag/>
