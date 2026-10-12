---
title: OIS Template
sidebarHeader: Reference
sidebarSubHeader: OIS
pageHeader: Reference → OIS → v2.3
path: /reference/ois/latest/template.html
version: v2.3
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

An OIS (Oracle Integration Specifications) JSON object is part of an Airnode's `config.json` file.

In the OIS template, there are some fields that contain <FILL\_\*>. This means that the value you will be replacing this with is independent from the other fields. On the other hand, if two fields contain the same expression (e.g., `<FILL_OPERATION_PARAMETER_1_NAME>`), you must use the same value in them, because they are referencing each other.

The file below is a basic template for OIS. Note, that it might look differently for your particular use case. You can also check out the OISes created for the examples in the [Airnode repository](https://github.com/api3dao/airnode/tree/v0.13/packages/airnode-examples/integrations).

```json
{
  "oisFormat": "2.3.2",
  "title": "<FILL_*>",
  "version": "<FILL_*>",
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
          "name": "<FILL_*>"
        }
      }
    },
    "security": {
      "<FILL_SECURITY_SCHEME_NAME>": []
    }
  },
  "endpoints": [
    {
      "name": "<FILL_*>",
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
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        }
      ],
      "parameters": [
        {
          "name": "<FILL_*>",
          "operationParameter": {
            "in": "<FILL_OPERATION_PARAMETER_2_IN>",
            "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
          }
        }
      ]
    }
  ]
}
```

<FlexEndTag/>
