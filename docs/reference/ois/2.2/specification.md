---
title: Specification
sidebarHeader: Reference
sidebarSubHeader: OIS
pageHeader: Reference → OIS → v2.2
path: /reference/ois/2.2/specification.html
version: v2.2
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The Oracle Integration Specification (OIS) is based on [Open API specification (OAS)](https://swagger.io/specification/), but there are some differences, be sure to focus on the following documentation when working on an OIS file.

::: warning OAS

It is not recommended to refer to OAS for help while creating an OIS object. OIS only borrows formatting practices from OAS. Everything needed to create an OIS object is in these docs.

:::

For an overview that explains how Airnode maps its endpoints to API provider operations, see [API integration](/reference/airnode/v0.13/understand/api-integration.md). Also see the medium article [Setting Oracle Integration Standards](https://medium.com/api3/setting-oracle-integration-standards-ac9104c38f9e) for an overview of OIS.

- Fields denoted by (\*) are for documentation purposes and not used by an Airnode.
- <!--The [OAS](https://swagger.io/specification/) equivalents are given as
  reference to assist in the populating of OIS fields.--> The OIS fields should be
  reviewed and customized by the integrating party.
- All URLs are absolute (i.e., [relative URLs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#relative-references-in-urls) are not supported).

## OIS Object Summary

An OIS has five root fields (keys).

1. [oisFormat](/reference/ois/2.2/specification.md#_1-oisformat)
1. [title](/reference/ois/2.2/specification.md#_2-title)
1. [version](/reference/ois/2.2/specification.md#_3-version)
1. [apiSpecifications](/reference/ois/2.2/specification.md#_4-apispecifications)
1. [endpoints](/reference/ois/2.2/specification.md#_5-endpoints)

`apiSpecifications` describe the API's operations which are mapped to the `endpoints` that Airnode exposes on-chain.

```json
{
  "oisFormat": "2.2.0",
  "title": "myOisTitle",
  "version": "1.2.3",
  "apiSpecifications": {
    ...
  },
  "endpoints": [
    ...
  ]
}
```

## 1. `oisFormat`

(Required) The OIS format version followed while generating the specifications. See [Versions](/reference/ois/2.2/versions) for a list of OIS versions used by each Airnode version.

## 2. `title`

(Required) The OIS title. Title field is at most 64 characters, can only include alphanumeric characters, hyphens, underscores and whitespaces.

<!--OAS equivalent: `info.title`.-->

## 3. `version`

(Required) A user defined version for the OIS object. Not to be confused with the `oisFormat` version which defines an OIS formatting version.

## 4. `apiSpecifications`

(Required) An object specifying the API with the following root level fields:

- 4.1. [servers](/reference/ois/2.2/specification.md#_4-1-servers)
- 4.2. [paths](/reference/ois/2.2/specification.md#_4-2-paths)
- 4.3. [components](/reference/ois/2.2/specification.md#_4-3-components)
- 4.4. [security](/reference/ois/2.2/specification.md#_4-4-security)

```json
// apiSpecifications
{
  "servers": [
    {
      "url": "https://myapi.com/api/v1"
    }
  ],
  "paths": {
    "/myPath": {
      "get": {
        "parameters": [
          {
            "name": "myParameter",
            "in": "query"
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "mySecurityScheme1": {
        "type": "apiKey",
        "name": "X-MY-API-KEY",
        "in": "query"
      }
    }
  },
  "security": {
    "mySecurityScheme1": []
  }
}
```

### 4.1. `servers`

(Required) An array of objects containing the base URL of the API. Only one object (i.e., base URL) is allowed in the array. Applies to all API operations.

<!--OAS equivalent: `servers[0]` (raise warning during conversion if `servers` has
multiple elements)-->

### 4.2. `paths`

(Required) An object where an API's operations are defined by `{path}.{method}` (i.e. `paths./myPath.get`) each with a `parameters` array.

#### 4.2.1. `parameters`

(Required) A list of the API operation's parameters, each with the following fields:

- `name`
- `in`

##### 4.2.1.1. `name`

<p style="margin-left:35px;">
(Required) The name of the parameter.</p>

<!--p style="margin-left:35px;">OAS equivalent: <code>paths.{path}.{method}.parameters.{#}.name</code></p-->

##### 4.2.1.2. `in`

<p class="h5-indent">(Required) The location of the parameter. When integrating a POST method, define the body parameters with <code>in: query</code>.
Airnode will convert all <code>query</code> types into the <code>requestBody</code>. Note that only
the non-nested application/json content-type is supported.</p>

<p class="h5-indent">Allowed values: <code>query, header, path, cookie</code>.</p>

<!--p class="h5-indent">OAS equivalent: <code>paths.{path}.{method}.parameters.{#}.in</code></p-->

### 4.3. `components`

(Required) An object where [security schemes](/reference/airnode/v0.13/understand/api-security.md) can be found under `securitySchemes.{securitySchemeName}` with the following elements:

- `type`
- `name`
- `in`
- `scheme`

#### 4.3.1. `type`

(Required) The type of the security scheme.

Allowed values:

- Used by an API operation to authenticate Airnode.
  - `apiKey`
  - `http`
- Allows an API operation to acquire information about the requester and/or the chain.
  - `relayRequesterAddress`
  - `relaySponsorAddress`
  - `relaySponsorWalletAddress`
  - `relayChainId`
  - `relayChainType`
  - `relayRequestId`

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.type`.-->

#### 4.3.2. `name`

(Only if `type` is apiKey) The name of the security scheme variable.

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.name`.-->

#### 4.3.3. `in`

(Only if type is apiKey) The location of the security scheme variable.

Allowed values: `query`, `header`, `cookie`

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.in`.-->

#### 4.3.4. `scheme`

(Only if `type` is http) The name of the HTTP Authorization scheme to be used in the [Authorization header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1).

Allowed values: (`basic` and `bearer`).

```json
"mySecurityScheme2": {
  "type": "http",
  "scheme": "bearer"
}
```

<!--The values used SHOULD be registered in the [IANA Authentication Scheme registry](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml). The OIS object supports-->

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.scheme`.-->

### 4.4. `security`

(Required) An object containing all security schemes required by an API call. Applies to all operations. A security scheme can contain information required by the API to authenticate Airnode as well as information about the requester (relay information) the API may also require. Read more about security schemes in the [API Security](/reference/airnode/v0.13/understand/api-security.md) section of the _Build an Airnode_ guide and the [Airnode Authentication](/reference/airnode/v0.13/concepts/airnode-auth.md) section of _Concepts and Definitions_.

The `security` object maintains the names of all the security schemes used. Each security scheme in `security` maps to an empty list. The empty list will be used by future versions of Airnode for individual endpoint authentication. The `components.securitySchemes.{name}` object defines the security schemes. Unlike OAS `security` is an object, not an array.

```json
// OIS object
"components": {
  "securitySchemes": {
    "my-api-key-scheme": {
      "in": "query",
      "type": "apiKey",
      "name": "access_key"
      "scheme": "<FILL_*>" // Used when type="http".
    }
  }
},
"security": {
  "my-api-key-scheme": []
}
```

The `apiCredential` object (which is not part of the OIS object) holds credentials needed by the security scheme if any.

```json
// config.json root object.
// Not part of the OIS object.
"apiCredentials": [
    {
      "oisTitle": "my-ois-title", // Must match the ois.title field the security scheme is in.
      "securitySchemeName": "my-api-key-scheme",
      "securitySchemeValue": "${API_KEY}" // In secrets.env
    }
  ]
```

<!--OAS equivalent: `security`, or `security.0` if security is a list.-->

::: warning Please note:

Currently Airnode reads the security schemes from `component.securitySchemes` and not `security`. Using the `security` field now (in conjunction with `component.securitySchemes`) provides for a smooth transition to future releases of Airnode with regards to security scheme implementation. This will allow assigning of security schemes to individual API operations. Currently security schemes are assign to the entire API.

:::

## 5. `endpoints`

(Required) A list of objects, each specifying an Airnode endpoint with the following fields:

::: info Please Note

Fields denoted by \* are for documentation purposes and not used by Airnode node.

:::

- 5.1. [name](/reference/ois/2.2/specification.md#_5-1-name)
- 5.2. [operation](/reference/ois/2.2/specification.md#_5-2-operation)
- 5.3. [fixedOperationParameters](/reference/ois/2.2/specification.md#_5-3-fixedoperationparameters)
- 5.4. [reservedParameters](/reference/ois/2.2/specification.md#_5-4-reservedparameters)
- 5.5. [parameters](/reference/ois/2.2/specification.md#_5-5-parameters)
- 5.6. [summary \*](/reference/ois/2.2/specification.md#_5-6-summary)
- 5.7. [description \*](/reference/ois/2.2/specification.md#_5-7-description)
- 5.8. [externalDocs \*](/reference/ois/2.2/specification.md#_5-8-externaldocs)
- 5.9. [preProcessingSpecifications](/reference/ois/2.2/specification.md#_5-9-preprocessingspecifications)
- 5.10. [postProcessingSpecifications](/reference/ois/2.2/specification.md#_5-10-postprocessingspecifications)

```json
// endpoints
[
  {
    "name": "convertToUsd",
    "operation": {
      "path": "/myPath",
      "method": "get"
    },
    "fixedOperationParameters": [
      {
        "operationParameter": {
          "name": "to",
          "in": "query"
        },
        "value": "USD"
      }
    ],
    "reservedParameters": [
      {
        "name": "_type",
        "fixed": "int256"
      },
      {
        "name": "_path",
        "default": "data.0.price"
      },
      {
        "name": "_times"
      },
      {
        "name": "_gasPrice"
      },
      {
        "name": "_minConfirmations"
      }
    ],
    "parameters": [
      {
        "name": "from",
        "default": "EUR",
        "operationParameter": {
          "name": "from",
          "in": "query"
        }
      }
    ],
    "preProcessingSpecifications": [
      {
        "environment": "Node",
        "value": "const output = {...input, from: \"eth\"};",
        "timeoutMs": "5000"
      },
      {
        "environment": "Node",
        "value": "const output = {...input, from: input.from.toUpperCase()};",
        "timeoutMs": "5000"
      }
    ],
    "postProcessingSpecifications": [
      {
        "environment": "Node",
        "value": "const output = Math.round(input.price * 1000);",
        "timeoutMs": "5000"
      }
    ]
  }
]
```

### 5.1. `name`

(Required) The name of the Airnode endpoint, must be unique in OIS.

<!--OAS equivalent: `paths.{path}.{method}.operationId` of the corresponding
operation.-->

### 5.2. `operation`

(Required: when calling an API) An object that refers to an API operation defined in `apiSpecifications.paths`. The following elements must be defined:

- `path`
- `method`

The `operation` field must be omitted if the intent is _not_ to call an API but rather return a value from the [Pre/Post Processing](/reference/ois/2.2/processing.md) capabilities of Airnode. See [Skip the API provider call](/reference/ois/2.2/processing.md#skip-the-api-call) for more information.

#### 5.2.1. `path`

(Required) The path of the API operation.

<!--OAS equivalent: The `{path}` parameter in the `paths.{path}.{method}` for the
respective API operation.-->

#### 5.2.2. `method`

(Required) The method of the API operation.

Allowed values: `get`, `post`

<!--OAS equivalent: The `{method}` parameter in the `paths.{path}.{method}` for the
respective API operation.-->

### 5.3. `fixedOperationParameters`

(Required) A list of objects specifying the fixed parameters for an API operation. While required, the [fixedOperationParameters](/reference/airnode/v0.13/understand/api-integration.md#fixedoperationparameters) array can be left empty. Each object has the following elements:

- `operationParameter`
- `value`

#### 5.3.1. `operationParameter`

(Required) An object that refers to a parameter of an API operation with the following elements:

- `name`
- `in`

##### 5.3.1.1. `name`

<p class="h5-indent">The name of the API operation's parameter that will have a fixed value.</p>

##### 5.3.1.2. `in`

<p class="h5-indent">Must be one of three possible values (<code>query, header, path, cookie</code>).</p>

#### 5.3.2. `value`

(Required) The value to be used for the respective parameter of an API operation that cannot be overridden by the requester. This is allowed to be any type, including an object; for example, the following specifies an array containing multiple primitives: `["finalized", false]`.

### 5.4. `reservedParameters`

A list of objects that specify reserved Airnode endpoint parameters that do not map to any API operation parameters, but are used for special purposes by the Airnode. See the [Reserved Parameters](/reference/ois/2.2/reserved-parameters.md) doc for an in-depth explanation and [reservedParameters](/reference/airnode/v0.13/understand/api-integration.md#reservedparameters). Each object has the following elements:

- `name`
- `fixed`
- `default`

Note that if a reserved parameter object does not include a `fixed` value, a requester can, or may be expected to, supply this value as a parameter. A value supplied by a requester overrides a `default`. See the [\_gasPrice](/reference/ois/2.2/reserved-parameters.md#gasprice) reserved parameter description for an example.

#### 5.4.1. `name`

(Required) The name of the reserved parameter. Always starts with `_`.

Allowed values: `_type`, `_path`, `_times`, `_gasPrice`, and `_minConfirmations`.

#### 5.4.2. `fixed`

(Optional) The fixed (i.e., non-overridable) value for the reserved parameter. Cannot be used together with `default`.

#### 5.4.3. `default`

(Optional) The default value for the reserved parameter. Used when no value is provided by a requester. Cannot be used together with `fixed`.

### 5.5. `parameters`

(Optional) A list of objects that specify Airnode endpoint [parameters](/reference/airnode/v0.13/understand/api-integration.md#parameters) that map to an particular API operation's parameters. Each object has the following elements:

- `operationParameter`
- `name`
- `default`
- `description *`
- `required`
- `example *`

#### 5.5.1. `operationParameter`

(Optional) An object that refers to a parameter of an API operation and has the below elements. Note that if omitted, the `parameter` will not be included as part of the request to the API endpoint.

- `name`
- `in`

##### 5.5.1.1. `name`

<p class="h5-indent">The name of the parameter from an API operation.</p>

##### 5.5.1.2. `in`

<p class="h5-indent">Must be one of four possible values (<code>query, header, path, cookie</code>).</p>

#### 5.5.2. `name`

(Required) The name of the Airnode endpoint parameter. Is not allowed to start with `_`.

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.name` of a corresponding
API operation parameter.-->

#### 5.5.3. `default`

(Optional) The default value for the Airnode endpoint parameter. Used when no value is provided.

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.default` of a
corresponding API operation parameter.-->

#### 5.5.4. `description` \*

(Optional) A description of what the Airnode endpoint parameter does.

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.description` of the
corresponding operation parameter.-->

#### 5.5.5. `required`

(Optional) If the Airnode endpoint parameter is required, a boolean value.

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.required` of the
corresponding operation parameter.-->

#### 5.5.6. `example` \*

(Optional) The example value to be used in test calls.

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.example` of the
corresponding operation parameter.-->

### 5.6. `summary` \*

(Optional) A one sentence summary of what the Airnode endpoint does.

<!--OAS equivalent: `paths.{path}.{method}.summary` of corresponding operation.-->

### 5.7. `description` \*

(Optional) A more detailed description of what the Airnode endpoint does.

<!--OAS equivalent: `paths.{path}.{method}.description` of corresponding operation.-->

### 5.8. `externalDocs` \*

(Optional) URL to external documentation for the Airnode endpoint.

<!--OAS equivalent: `paths.{path}.{method}.externalDocs` of corresponding operation.-->

### 5.9. `preProcessingSpecifications` \*

(Optional) Defines the preprocessing code that can be used to modify the endpoint parameter before making the API request defined by an Airnode endpoint.

See the [Pre/Post Processing](/reference/ois/2.2/processing.md) doc for additional details.

#### Example

```json
"preProcessingSpecifications": [
  {
    // Execute synchronously in Node.js
    "environment": "Node",
    // Define a new "from" parameter with value "eth"
    "value": "const output = {...input, from: \"eth\"};",
    // Run for 5 seconds maximum
    "timeoutMs": "5000"
  },
  {
    // Execute synchronously in Node.js
    "environment": "Node",
    // Uppercase the "from" parameter defined by the previous snippet
    "value": "const output = {...input, from: input.from.toUpperCase()};",
    // Run for 5 seconds maximum
    "timeoutMs": "5000"
  }
]
```

### 5.10. `postProcessingSpecifications` \*

(Optional) Defines the post-processing code that can be used to modify the API response from the request defined by an Airnode endpoint.

See the [Pre/Post Processing](/reference/ois/2.2/processing.md) doc for additional details.

#### Example

```json
"postProcessingSpecifications": [
  {
    // Execute synchronously in Node.js
    "environment": "Node",
    // Multiply the API return value by 1000 and round it to an integer
    "value": "const output = Math.round(input.price * 1000);",
    // Run for 5 seconds maximum
    "timeoutMs": "5000"
  }
]
```

<FlexEndTag/>
