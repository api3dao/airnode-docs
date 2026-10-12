---
title: Adapter
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.15 → Packages
path: /reference/airnode/next/packages/adapter.html
version: v0.15
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

The [airnode-adapter](https://github.com/api3dao/airnode/tree/v0.14/packages/airnode-adapter) package has multiple responsibilities. It is used for building requests from an [Oracle Integration Specification (OIS)](/reference/ois/next/), executing them, parsing the responses, but also converting and encoding them for on chain use.

It is an internal dependency of Airnode, but can also be used standalone as an API.

## Installation

You can install `@api3/airnode-adapter` by adding it to the `package.json` file in your project.

```sh
npm install --save @api3/airnode-adapter
```

You shouldn't need to use the adapter package directly. However, you might want to use its API to double check the conversion or encoding behavior for which you can install this package and verify your assumptions.

## Conversion

While the adapter package has many responsibilities, many of those can be treated as implementation details. On the other hand, there are a few important behaviors to be noted when converting the response values based on the target type and making the response transaction on chain.

Altogether, the response cycle consists of multiple steps

1. A successful API call is made and Airnode receives a response value.
2. The value to be converted is extracted from the response using the [\_path](/reference/ois/next/reserved-parameters.md#path) from the OIS object.
3. This extracted value is converted to the target type. Conversions are performed internally by the `castValue(value, type)` function.
4. The converted value is encoded to the native solidity type based on the [\_type](/reference/ois/next/reserved-parameters.md#type) from the OIS object. Encoding is performed internally by the `encodeValue(value, type)` function.

<!-- TODO: Create a page about how to read Airnode logs (probably the troubleshooting guide) and link it-->

If any of the steps above fail, an error is thrown. This will fail the given API request and the error reason can be found in the logs.

The rest of this section covers the conversion logic for all of the supported types.

### `int256` or `uint256`

Converting any of the values in the following example will result in an error:

```ts
const ERROR_VALUES = [
  null,
  undefined,
  Infinity,
  NaN,
  '', // empty string
  'randomstring',
  [], // arrays of any kind
  {}, // objects of any kind
];
```

There are a few special strings and boolean values that are convertible to `int256` or `uint256`:

```ts
const SPECIAL_INT_VALUES = [false, 'false', true, 'true'];

const values = SPECIAL_INT_VALUES.map((v) => adapter.castValue(v, 'int256'));
console.log(values);
// [0, 0, 1, 1];
```

Number strings and numbers will attempt to be converted to [BigNumbers](https://mikemcl.github.io/bignumber.js/). The value will also be multiplied by the value of the [\_times](/reference/ois/next/reserved-parameters.md#times) parameter if it is present.

```ts
const VALID_INT_VALUES = ['123.456', 7777];

const values = VALID_INT_VALUES.map((v) => adapter.castValue(v, 'uint256'));
console.log(values);
// [new BigNumber(123.456), new BigNumber(7777)];
```

Conversion for `int256` and `uint256` is the same - this means that `-123` can be converted to `uint256`. However, an error will be thrown while encoding.

:::warning Flooring

Beware that any floating point number will be **floored**. This is necessary, because floating point numbers are not valid in solidity. To mitigate precision loss, you can use the [`_times`](/reference/ois/next/reserved-parameters.md#times) parameter that is sufficiently large. For example, if the API response is a USD currency, you might want to use `_times: "100"` to convert the value to cents.

:::

### `bool`

Converting values in the example are all considered `false`.

```ts
const FALSE_BOOLEAN_VALUES = [0, '0', false, 'false', undefined, null];

const values = FALSE_BOOLEAN_VALUES.map((v) => {
  return adapter.castValue(v, 'bool');
});

console.log(values);
// [false, false, false, false, false, false];
```

All other values are converted to `true`.

### `bytes32`

There is no conversion for `bytes32` - the value is expected to be a valid hex string representing the encoded 32 bytes value. This means that the encoding **must** be implemented on the API side. If you want to delegate the encoding to Airnode, see the documentation for [`string32`](/reference/airnode/next/packages/adapter.md#string32).

For example, let's say the API wants to encode the following string `simple string` with length 13. Its encoding is <code style="overflow-wrap: break-word;">0x73696d706c6520737472696e6700000000000000000000000000000000000000</code>. This is the value that should be sent as a response to Airnode request, together with the `0x` prefix.

You can use [ethers](https://docs.ethers.io/v5/) to encode these on the API side

```js
const value = 'simple string';
const encoded = ethers.utils.formatBytes32String(value);
console.log(encoded); // 0x73696d706c6520737472696e6700000000000000000000000000000000000000
```

### `address`

There is no conversion for `address` - the value is expected to be a string representing a valid address. Valid examples are:

- <code style="overflow-wrap: break-word;">0x0765baA22F6D4A53847D63B056DC79400b9A592a</code> - [EIP-55 mixed case checksum](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md) of an address.
- <code style="overflow-wrap: break-word;">0x0765baa22f6d4a53847d63b056dc79400b9a592a</code> - all lowercase address.

### `bytes`

There is no conversion for `bytes` - the value is expected to be a valid hex string representing the encoded value. This means that the encoding to bytes **must** be implemented on the API side. If you want to send a string, see the documentation for [`string`](/reference/airnode/next/packages/adapter.md#string).

For example, let's say the API wants to encode the following string `this is an example string that is a bit longer`. Its encoding is <code style="overflow-wrap: break-word;">0x7468697320697320616e206578616d706c6520737472696e672074686174206973206120626974206c6f6e676572</code>. This is the value that should be sent as a response to Airnode request, together with the `0x` prefix. Use [ethers](https://docs.ethers.io/v5/) to encode these on the API side.

```js
const value = 'this is an example string that is a bit longer';
const encodedValue = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));
console.log(encodedValue); // 0x7468697320697320616e206578616d706c6520737472696e672074686174206973206120626974206c6f6e676572
```

### `string`

You can pass any value to convert it to string - with the exception of arrays and objects, which will throw an error. All other values will be converted to `string` and before encoded on chain using the `string` type.

```js
const values = [
  -1,
  0,
  777.89,
  null,
  'simple string',
  'this is an example string that is a bit longer',
];

// ["-1", "0", "777.89", "null", "simple string", "this is an example string that is a bit longer"]
const mappedValues = values.map((v) => {
  return adapter.castValue(v, 'string');
});
```

### `string32`

You can pass any value to convert it to string - with the exception of arrays and objects, which will throw an error.

However, there is one exception, if the stringified value contains more than 31 characters it will be **trimmed down** to only the first 31 characters during conversion.

For example, if the API response is the following string `this is an example string that is a bit longer` with length 46. It will be first trimmed to 31 characters, string `this is an example string that ` and afterwards converted to <code style="overflow-wrap: break-word;">0x7468697320697320616e206578616d706c6520737472696e6720746861742000</code>. Use [ethers](https://docs.ethers.io/v5/) to decode the values off chain using the following snippet

```js
const encoded =
  '0x7468697320697320616e206578616d706c6520737472696e6720746861742000';
const decoded = ethers.utils.parseBytes32String(encoded);
console.log(decoded); // "this is an example string that "
```

### Arrays

Conversion of arrays depends on the primitive type. All values of the array (or nested array) will be converted according to the rules of the primitive type.

For example:

- `int256[]` - has primitive type `int256`. All elements of this array follow the [`int256`](/reference/airnode/next/packages/adapter.md#int256-or-uint256) rules.
- `string32[7][][5]` - is a multidimensional array, where some dimensions are fixed and some not. This is irrelevant though, and all the elements are converted based on [`string32`](/reference/airnode/next/packages/adapter.md#string32) rules.

<FlexEndTag/>
