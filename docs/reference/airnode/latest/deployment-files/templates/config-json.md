---
title: config.json
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Deployment Files → Templates
path: /reference/airnode/latest/deployment-files/templates/config-json.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

A template for an Airnode's configuration file. Below are notations to help explain contents of the template.

- `<FILL_*>, <FILL_NUMBER>, <FILL_BOOLEAN>`: The value added is independent from other fields and a value is needed unless otherwise indicated. These values are not considered secret unless you want them to be.

- `<FILL_OPERATION_PARAMETER_1_NAME>`: If two fields contain the same expression, use the same value in them because they are referencing each other. Usually these are not considered to be secret.

- `${CHAIN_PROVIDER_URL}`: Interpolated values ${} that should be added to `secrets.env` though it is not required.

Consider the following relationships.

- `ois[0].title` is related to `triggers.rrp[0].oisTitle`.

- `ois[0].apiSpecifications.paths[path][method].parameters[0].in` is related to <code style="overflow-wrap: break-word;">ois[0].endpoints[0].fixedOperationParameters[0].operationParameter.in</code>

- `ois[0].apiSpecifications.paths[path][method].parameters[1].in` is related to <code style="overflow-wrap: break-word;">ois[0].endpoints[0].parameters[0].operationParameter.in</code>

See [config.json](/reference/airnode/latest/deployment-files/templates/config-json.md) as a reference while building a config.json file.

```json
{
  "chains": [
    {
      "authorizers": {
        "requesterEndpointAuthorizers": ["<FILL_*>"],
        "crossChainRequesterAuthorizers": ["<FILL_*>"],
        "requesterAuthorizersWithErc721": ["<FILL_*>"],
        "crossChainRequesterAuthorizersWithErc721": ["<FILL_*>"]
      },
      "authorizations": {
        "requesterEndpointAuthorizations": {
          "<FILL_ENDPOINT_ID_1>" : ["<FILL_*>"]
        }
      },
      "id": "<FILL_*>",
      "providers": {
        "<FILL_PROVIDER_NAME_1>": {
          "url": "${CHAIN_PROVIDER_URL}" // In secrets.env
        }
      },
      "type": "<FILL_*>",
      "options": {
        "gasPriceOracle": [
          {
            "gasPriceStrategy": "latestBlockPercentileGasPrice",
            "percentile": <FILL_NUMBER>,
            "minTransactionCount": <FILL_NUMBER>,
            "pastToCompareInBlocks": <FILL_NUMBER>,
            "maxDeviationMultiplier": <FILL_NUMBER>,
          },
          {
            "gasPriceStrategy": "providerRecommendedGasPrice",
            "recommendedGasPriceMultiplier": <FILL_NUMBER>,
          },
          {
            "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
            "baseFeeMultiplier": <FILL_NUMBER>,
            "priorityFee": {
              "value": <FILL_NUMBER>,
              "unit": "<FILL_*>"
            }
          },
          {
            "gasPriceStrategy": "constantGasPrice",
            "gasPrice": {
              "value": <FILL_NUMBER>,
              "unit": "<FILL_*>"
            }
          }
        ]
      },
      "maxConcurrency": <FILL_NUMBER>,
      "blockHistoryLimit": "<FILL_*>",
      "minConfirmations": "<FILL_*>"
    }
  ],
  "nodeSettings": {
    "cloudProvider": {
      "type": "aws", // local, aws or gcp
      "region": "<FILL_*>",
      "disableConcurrencyReservations": <FILL_BOOLEAN>, //Use for (type = gcp | aws) only
      "projectId": "${GCP_PROJECT_ID}" // Use for (type = gcp) only
    },
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": <FILL_BOOLEAN>,
      "url": "${HEARTBEAT_API_KEY}", // In secrets.env
      "apiKey": "${HEARTBEAT_API_KEY}", // In secrets.env
    },
    "httpGateway": {
      "enabled": "<FILL_BOOLEAN>",
      "maxConcurrency": "<FILL_NUMBER>",
      "corsOrigins": ["<FILL_*>"]
    },
    "httpSignedDataGateway": {
      "enabled": <FILL_BOOLEAN>,
      "maxConcurrency": <FILL_NUMBER>,
      "corsOrigins": ["<FILL_*>"]
    },
    "oevGateway": {
       "enabled": <FILL_BOOLEAN>,
       "maxConcurrency": <FILL_NUMBER>,
       "corsOrigins": ["<FILL_*>"]
     },
    "logFormat": "json",
    "logLevel": "INFO",
    "nodeVersion": "0.14.1",
    "stage": "<FILL_*>"
  },
  "triggers": {
    "rrp": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>",
        "cacheResponses": "<FILL_CACHE_RESPONSES>"
      }
    ],
    "http": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>"
      }
    ],
    "httpSignedData": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>"
      }
    ]
  },
  "templates": [
    {
      "templateId": "<FILL_*>",
      "endpointId": "<FILL_*>",
      "encodedParameters": "<FILL_*>",
    }
  ],
  "ois": [
    {
      "oisFormat": "2.3.2",
      "version": "<FILL_*>",
      "title": "<FILL_OIS_TITLE>",
      "apiSpecifications": {
        "servers": [
          {
            "url": "<FILL_*>"
          }
        ],
        "paths": {
          "<FILL_PATH>": {
            "<FILL_METHOD>": {
              "parameters": [
                {
                  "in": "<FILL_OPERATION_PARAMETER_1_IN>",
                  "name": "<FILL_OPERATION_PARAMETER_1_NAME>"
                },
                {
                  "in": "<FILL_OPERATION_PARAMETER_2_IN>",
                  "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
                }
              ]
            }
          }
        },
        "components": {
          "securitySchemes": {
            "<FILL_SECURITY_SCHEME_NAME>": {
              "in": "<FILL_*>",
              "type": "<FILL_*>",
              "name": "<FILL_*>",
              "scheme": "<FILL_*>"
            }
          }
        },
        "security": {
          "<FILL_SECURITY_SCHEME_NAME>": []
        }
      },
      "endpoints": [
        {
          "name": "<FILL_ENDPOINT_NAME>",
          "operation": {
            "method": "<FILL_METHOD>",
            "path": "<FILL_PATH>"
          },
          "fixedOperationParameters": [
            {
              "operationParameter": {
                "in": "<FILL_OPERATION_PARAMETER_1_IN>",
                "name": "<FILL_OPERATION_PARAMETER_1_NAME>"
              },
              "value": "<FILL_*>"
            }
          ],
          "reservedParameters": [
            {
              "name": "<FILL_*>",
              "fixed": "<FILL_*>"
            },
            {
              "name": "<FILL_*>",
              "fixed": "<FILL_*>"
            },
            {
              "name": "<FILL_*>",
              "default": "<FILL_*>"
            },
            {
              "name": "<FILL_*>"
            }
          ],
          "parameters": [
            {
              "name": "<FILL_*>",
              "default": "<FILL_*>",
              "operationParameter": {
                "in": "<FILL_OPERATION_PARAMETER_2_IN>",
                "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
              }
            }
          ]
        }
      ]
    }
  ],
  "apiCredentials": [
    {
      "oisTitle": "<FILL_OIS_TITLE>",
      "securitySchemeName": "<FILL_SECURITY_SCHEME_NAME>",
      "securitySchemeValue": "${SS_API_KEY}" // In secrets.env
    }
  ]
}
```

<FlexEndTag/>
