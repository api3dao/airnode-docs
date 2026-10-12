---
title: Pre/Post Processing
sidebarHeader: Reference
sidebarSubHeader: OIS
pageHeader: Reference → OIS → v2.3
path: /reference/ois/latest/processing.html
version: v2.3
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Processing allows Airnode operators to define custom logic that executes before or after an API call. This feature is useful for multiple use cases, including:

- Authentication
- Data transformation
- Data aggregation
- Data validation
- Skipping an API call

## Processing versions

OIS specification has two versions of pre/post processing. Both versions serve the same use cases, but the second version is more flexible and convenient. Users are encouraged to use the second version.

### v1

The processing schema accepts an array of processing snippets (user defined code) which are chained. The first snippet receives parameters submitted as part of a template or on-chain request. The output of this snippet is passed to the second snippet and so on.

Airnode executes snippets for `preProcessingSpecifications` and `postProcessingSpecifications` during its run cycle. The following describes the work flow Airnode uses:

1. Run `preProcessingSpecifications`
2. Airnode calls requested OIS endpoint (unless the API call is skipped)
3. Run `postProcessingSpecifications`
4. Airnode encodes the response values defined by `reservedParameters`

The processing schema is the same for both [`preProcessingSpecifications`](/reference/ois/latest/specification.md#_5-9-preprocessingspecifications) and [`postProcessingSpecifications`](/reference/ois/latest/specification.md#_5-10-postprocessingspecifications). Snippets for both specifications follow this schema:

- `environment` - Currently one of `Node` or `Node async`. Both options interpret the code as JavaScript and execute in Node.js. The async version can use asynchronous code. The code snippet is expected to call `resolve(output)` with the output value as an argument. Airnode will use the resolved value as the input to subsequent snippets (if defined).
- `value` - The processing code written as a string.
- `timeoutMs` - The maximum duration that this snippet can run. In case the timeout is exceeded an error is thrown.

Try the [Post processing](/guides/airnode/post-processing/) guide to further understand pre/post processing.

#### Input and Output

The processing snippet receives an `input` value which is either the initial value or the output value from the previous processing snippet. The snippet must create a variable `output` which will be used for the next processing snippet. The processing snippet can use most Node.js built-in modules. Refer to the source code of Airnode to understand how processing works and what modules are made available to the snippet code. Modules cannot be imported directly in cloud environments.

#### Accessing endpoint parameters

Endpoint parameters, with the exception of reserved parameters, are accessible within pre-processing and post-processing via the immutable `endpointParameters` object. For example, if there was a parameter named `myParameter` defined in the `endpoints[n].parameters` array, its value could be accessed using `endpointParameters.myParameter` within pre-processing and post-processing code snippets.

::: info Accessing reserved parameters

Note that reserved parameters are inaccessible in both pre-processing and post-processing.

:::

### v2

The processing snippet receives parameters submitted as part of a template or on-chain request.

Airnode executes snippets for `preProcessingSpecificationV2` and `postProcessingSpecificationV2` during its run cycle. The following describes the work flow Airnode uses:

1. Run `preProcessingSpecificationV2`
2. Airnode calls requested OIS endpoint (unless the API call is skipped)
3. Run `postProcessingSpecificationV2`
4. Airnode encodes the response values defined by `reservedParameters`

The processing schema is the same for both [`preProcessingSpecificationV2`](/reference/ois/latest/specification.md#_5-11-preprocessingspecificationv2) and [`postProcessingSpecificationV2`](/reference/ois/latest/specification.md#_5-12-postprocessingspecificationv2). Snippets for both specifications follow this schema:

- `environment` - Currently only possible value is `Node`. This options interprets the code as JavaScript and executes it in Node.js. The function can be also asynchronous (async/await is supported as well). The processing implementation will wait for the function to resolve.
- `value` - The processing code written as a string.
- `timeoutMs` - The maximum duration that this snippet can run. In case the timeout is exceeded an error is thrown.

Try the [Post processing](/guides/airnode/post-processing/) guide to further understand pre/post processing.

#### Input and Output

The processing snippet expects a function that takes an object as an argument, the properties of which are different for pre-processing and post-processing. The return value of the function is treated as a processing result. Within the snippet, you can use most Node.js built-in modules.

The pre-processing argument object contains the following property:

- `endpointParameters` - The endpoint parameters with the exception of reserved parameters. For example, if there was a parameter named `myParameter` defined in the `endpoints[n].parameters` array, its value could be accessed using `endpointParameters.myParameter` within pre-processing snippet.

The output of the pre-processing snippet is an object with the following property:

- `endpointParameters` - The pre-processed endpoint parameters parameters. These are used to make the API call.

The post-processing argument object contains the following properties:

- `response` - The response of the underlying data provider API call. In case of Airnode skipping the API call, the `response` contains the output of pre-processing snippet.
- `endpointParameters` - The raw (not pre-processed) endpoint parameters with the exception of reserved parameters. For example, if there was a parameter named `myParameter` defined in the `endpoints[n].parameters` array, its value could be accessed using `endpointParameters.myParameter` within pre-processing snippet.

The output of the post-processing snippet is an object with the following properties:

- `response` - The post-processed API call response (or post-processed result of pre-processing snippet in case of skipping an API call). This is used to encode the response values defined by reserved parameters.
- `timestamp` - (Optional) The timestamp of the API call response. Use this if you want Airnode to use a specific timestamp (instead of a current time at request processing) when using the [signed data gateway](/reference/airnode/latest/understand/http-gateways.md#http-signed-data-gateway). See the example below for more details.

#### Timestamp example

One of the possible use cases for post-processing v2 would be to use override the timestamp used by [signed data gateway](/reference/airnode/next/understand/http-gateways.md#http-signed-data-gateway). By default the signed data gateway uses the timestamp of the request processing. However, sometimes the API itself returns the timestamp. Modifying timestamp is only supported with the v2 of the processing.

```json
{
  "postProcessingSpecificationV2": {
    "environment": "Node",
    // Reuses the timestamp from the API call response.
    "value": "async ({ response }) => { return { response, timestamp: response.timestamp }; }",
    "timeoutMs": 5000
  }
}
```

## Interpolation

Note, that config.json supports interpolation of secrets via the JavaScript string interpolation pattern (e.g `${SECRET_NAME}`). This syntax conflicts with the string interpolation inside the processing snippets. In order to use the interpolation in snippets, you need to escape the interpolation.

For example, the following code (using the v1 processing snippet, but the concept is the same for v2):

```js
console.log(`Received input ${input}`);
const output = input;
```

should be escaped inside the `config.json` like this:

```json
{
  "environment": "Node",
  "timeoutMs": 5000,
  "value": "console.log(`Received input \\${input}`);\nconst output = input;"
}
```

## Error Handling and Security

Processing code is expected to be trustworthy as it is specified by the Airnode operator. Processing is an advanced feature that carries great security risks. It is therefore advised that developers using the processing feature familiarize themselves with the Airnode sources prior to developing any processing code snippets.

Processing code executes in a constrained execution environment resembling Node.js. Some resources may not be available, for example the `require` statement. Therefore code should be tested thoroughly in the target environment (e.g. Lambda and/or Docker client). For example, authentication implemented in pre-processing should always be executed at the end of the respective processing chain and special care should be taken to avoid leakage of secrets.

## Skip the API call

Not all Airnode endpoints need to call an API. An Airnode endpoint can rely on either (or both) pre-processing or post-processing to acquire a value for the Airnode to place on-chain.

Instead of calling an API, Airnode uses the output of `preProcessingSpecifications`, `postProcessingSpecifications`, or both. The field `operation` must be undefined, `fixedOperationParameters` must be an empty array and some processing specification needs to be defined. This means that one of `preProcessingSpecifications` or `postProcessingSpecifications` must be defined and not be an empty array or `preProcessingSpecificationV2` or `postProcessingSpecificationV2` must be defined.

### Random number example

An Airnode endpoint that places a random number on-chain. Rather than calling an API, the Airnode will derive a random number during its execution of a pre-processing v1 specification. A requester would make a request of this Airnode endpoint without parameters. The Airnode endpoint simply sets the random number on-chain in response to the request using a `preProcessingSpecifications` specification. Example #1 below implements this use case.

This example creates an Airnode endpoint named `generateRandomNumber` with no parameters. Because there isn't an [operation field](/reference/ois/latest/specification.md#_5-2-operation) defined for this Airnode endpoint, a call to an API will not be made. The Airnode will instead execute a single specification defined in the [preProcessingSpecifications](/reference/ois/latest/specification.md#_5-9-preprocessingspecifications) array.

To implement the use case mentioned above, the [operation field](/reference/ois/latest/specification.md#_5-2-operation) will be undefined, `fixedOperationParameters` will be an empty array, and `preProcessingSpecifications` will be defined with a single specification.

- A requester makes a request of the Airnode endpoint `generateRandomNumber` without any parameters.
- Airnode runs the specification in `preProcessingSpecifications[0]`.
- The specification generates a random number.
- The reserved parameter named `randomNumber` now holds the random number.
- Airnode places the value on-chain and makes a callback to the requester.

```json
endpoints: [
  {
    "name": "generateRandomNumber",
    "fixedOperationParameters": [],
    "parameters": [],
    "preProcessingSpecifications": [
      {
        "environment": "Node",
        "timeoutMs": 5000,
        "value": "output = {randomNumber: Math.floor(Math.random() * 100)}"
      }
    ],
    "reservedParameters": [
      {
        "fixed": "uint256",
        "name": "_type"
      },
      {
        "fixed": "randomNumber",
        "name": "_path"
      },
      {
        "name": "_times"
      }
    ]
  }
]
```

### Parameter processing example

The code below is unrelated to the above example. Instead, this example creates an Airnode endpoint named `endpointThatSumsWith1000` with a parameter named `numberToSum`. Because there isn't an [operation field](/reference/ois/latest/specification.md#_5-2-operation) defined for this Airnode endpoint, a call to an API will not be made. The Airnode will instead execute a single specification defined in the [preProcessingSpecifications](/reference/ois/latest/specification.md#_5-9-preprocessingspecifications) array.

- A requester passes the number `5` in the parameter named `numberToSum`.
- Airnode runs the specification in `preProcessingSpecifications[0]`.
- The specification adds 1000 to the value of `numberToSum`.
- The reserved parameter named `inputsSumWith1000` now holds the value of 1005.
- Airnode places the value on-chain and makes a callback to the requester.

```json
endpoints: [
  {
    "name": "endpointThatSumsWith1000",
    "fixedOperationParameters": [],
    "parameters": [
      {
        "name": "numberToSum",
        "operationParameter": {
          "in": "path",
          "name": "numberToSum"
        }
      }
    ],
    "preProcessingSpecifications": [
      {
        "environment": "Node",
        "timeoutMs": 5000,
        "value": "output = {inputsSumWith1000: parseInt(input.numberToSum) + 1000}"
      }
    ],
    "reservedParameters": [
      {
        "fixed": "uint256",
        "name": "_type"
      },
      {
        "fixed": "inputsSumWith1000",
        "name": "_path"
      },
      {
        "name": "_times"
      }
    ]
  }
]
```

<FlexEndTag/>
