---
title: Airnode ABI
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.13 → Specifications
path: /reference/airnode/v0.13/specifications/airnode-abi.html
version: v0.13
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

[Contract application binary interface (ABI)](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html) is used to encode different types of data while interacting with Ethereum contracts. As a result, both Solidity and modules such as [web3.js](https://web3js.readthedocs.io/) and [ethers.js](https://docs.ethers.io/) treat ABI encoding–decoding functionality as a first-class citizen. This makes using contract ABI for encoding API call parameters a very attractive option.

Although encoding API call parameters using contract ABI has many advantages, it cannot be used for this purpose directly. Quoting from the [Solidity docs](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html):

> The encoding is not self describing and thus requires a schema in order to decode.

This means that when passing API call parameters (of type `bytes`), you would also need to pass a list of the types for these parameters, which is cumbersome and it is not clear how these types would be encoded. As a solution, Airnode uses _Airnode ABI specifications_, an extension of contract ABI specifications that includes a header that keeps the schema.

## Header

The Airnode ABI specifications header is of type `bytes32` and acts as the schema (i.e., describes the types of the API call parameters). The header is encoded in UTF-8 for ease of use. Here is an example:

```
"1BSasbiuBa"
```

The first character, `1`, represents the encoding version. Each following character represents the type of an API call parameter.

### Type encodings

The types are encoded in UTF-8 characters as follows:

```
B: bytes
b: bytes32
S: string
s: string32
a: address
u: uint256
i: int256
f: bool
```

Note that dynamically-sized types are represented with uppercase letters and statically-sized types are represented with lowercase letters. Another thing to notice is that `s` represents `string32`, but this is an artificial type and it is not part of [solidity types](https://docs.soliditylang.org/en/latest/types.html). This type is instead represented on chain as `bytes32`. The reasons for this are explained in depth in [string32 details](/reference/airnode/v0.13/specifications/airnode-abi.md#string32) section.

## Encoding format

Airnode ABI specifications has the following encoding format (which is somewhat similar to [SDS](https://github.com/antirez/sds)):

```
[------------------------][-----------------------------------------]
  Header of type bytes32      API call parameter name–value pairs
```

Note that each API call parameter is preceded with a name of type `bytes32`.

## Example encoding

To encode the following API call parameters

```json
{
  "MyFirstBytes": "0x1234",
  "MyString": "1234",
  "MyFirstAddress": "0x0000000000000000000000000000000000001234",
  "MyString32": "1234",
  "MyBytes32": "0x68656c6c6f000000000000000000000000000000000000000000000000000000",
  "MyInt256": "-1234",
  "MyUint256": "1234",
  "MySecondBytes": "0x5678",
  "MySecondAddress": "0x0000000000000000000000000000000000005678"
}
```

you would do this in a requester contract as:

```solidity
bytes memory parameters = abi.encode(
    bytes32("1BSasbiuBa"),
    bytes32("MyFirstBytes"), bytes(hex"1234"),
    bytes32("MyString"), "1234",
    bytes32("MyFirstAddress"), 0x0000000000000000000000000000000000001234,
    bytes32("MyString32"), bytes32("1234"),
    bytes32("MyBytes32"), 0x68656c6c6f000000000000000000000000000000000000000000000000000000,
    bytes32("MyInt256"), -1234,
    bytes32("MyUint256"), 1234,
    bytes32("MySecondBytes"), bytes(hex"5678"),
    bytes32("MySecondAddress"), 0x0000000000000000000000000000000000005678
);
```

Note that you do not need to add an external library to the contract, and `abi.encode()` is fairly cheap in terms of gas usage (compared to alternative encoding methods).

## Example decoding

If you know the schema of the encoded parameters, then decode them on-chain. For example, if the schema is `(bytes,string)`:

```solidity
(
    bytes32 header,
    bytes32 name1, bytes memory value1,
    bytes32 name2, string memory value2
) = abi.decode(parameters, (bytes32,bytes32,bytes,bytes32,string));
```

Note that this disregards the header and hard codes the schema into the code. It is also possible to parse the header on-chain and decode accordingly, yet that would be a lot more complex.

## Details

### `string32`

A parameter being of type `string32` (encoded as characted `s` in the ABI specification schema header) implies that the parameter is UTF-8 encoded text. For example, if the parameter is

```
0x68656c6c6f000000000000000000000000000000000000000000000000000000
```

Airnode will decode it as

```
"hello"
```

and feed that to the API, which is what the user would want to do in most cases. This becomes a problem if the parameter is not encoded text, but for example a hash such as:

```
0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71
```

If this hash is encoded as a `string32` type, Airnode will decode it as:

```
ÓlaÀÁUÓ?úÀ2[×À
!Õ$B±=/¡>q
```

which is probably not what the user is looking for. For these use cases, the user should use the [`bytes32`](/reference/airnode/v0.13/specifications/airnode-abi.md#bytes32) type instead.

### `bytes32`

To encode a `bytes32` hash on chain, use the `bytes32` type which is represented by `b` in the ABI header schema.

```solidity
bytes memory parameters = abi.encode(
    bytes32("1b"),
    bytes32("MyBytes32"), 0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71,
);
```

When decoded by Airnode, the value would be the hash itself:

```
"0x1fd36c61981313c0c155d33ffac0325bd7c00d21d52442981bb13d2fa13e8f71"
```

If you want to store 32 byte string values on chain, use the [`string32`](/reference/airnode/v0.13/specifications/airnode-abi.md#string32) type instead.

### `bool`

The `bool` type, encoded as character `f` using the ABI specification schema can be used to encode a boolean value. The header symbol is `f`, because character `b` was already reserved for bytes encodings. So we chose letter `f` as bool values are commonly used to represent "boolean flags".

### Omitted types

`array` and `tuple` are omitted because they are not suitable to be used as API parameters. `uint8-uint128`, `int8-int128`, `bytes1-bytes31` are omitted because they are padded to 32 bytes by the ABI encoder anyway (meaning that the user should simply typecast these to the 32-byte versions).

### Size limit

The header can encode up to 31 parameters (and 1 byte is used to encode the encoding version). This is far more than what would be needed in practice, and thus is tolerated to avoid a more complex solution.

### Padding

[Strict encoding mode](https://docs.soliditylang.org/en/v0.6.12/abi-spec.html#strict-encoding-mode) is used so that you can decode the values later on. This means that each parameter will be padded with zeros to complete them to 32 bytes. Although this padding increases gas costs, ABI encoding/decoding functions being cheap balances this. Furthermore, the [template](/reference/airnode/v0.13/concepts/template.md) pattern used in the protocols allows for the referencing of these encoded parameters without explicitly passing them in requests, making the increased cost induced by padding irrelevant in most cases.

## `@api3/airnode-abi`

Encode and decode parameters with the [airnode-abi](/reference/airnode/v0.13/packages/airnode-abi.md) package.

```js
import { encode } from '@api3/airnode-abi';
import { decode } from '@api3/airnode-abi';

const parameters = [
  { type: 'string32', name: 'from', value: 'ETH' },
  { type: 'uint256', name: 'amount', value: '100000' },
];
const encodedData = encode(parameters);
const decoded = decode(encodedData);

console.log('ENCODED:', encodedData);
console.log('\nDECODED:', decoded);
```

See the package doc [airnode-abi](/reference/airnode/v0.13/packages/airnode-abi.md) for more information on how to encode and decode with Airnode ABI off-chain. Also see code samples in the [examples](https://github.com/api3dao/airnode/tree/v0.13/packages/airnode-examples) package. Lastly see the file [request-utils.ts](https://github.com/api3dao/airnode/blob/v0.13/packages/airnode-examples/integrations/coingecko/request-utils.ts#L9) for example syntax on encoding parameters.

<FlexEndTag/>
