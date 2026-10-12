---
title: OEV Gateway (optional)
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Understanding Airnode
path: /reference/airnode/latest/understand/oev-gateway.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

OEV gateway is used in the OEV flow to sign the data won in the OEV auction. The data is signed by the Airnode so that only the searcher who won the auction can use it to update the data feed. You can learn more about OEV at https://api3.org.

## Setup

Enable the gateway in the `config.json` file via `nodeSettings.oevGateway` section.

- **enabled**: A boolean to enable/disable for the gateway.
- **maxConcurrency**: (optional) A number higher than zero that represents the maximum number of serverless functions serving gateway requests. When omitted, there is no maximum concurrency set. This field is ignored for Airnode client gateways.
- **corsOrigins**: A list of allowed origins, `['*']` to allow all origins or an empty array to disable CORS.

```json
"nodeSettings": {
  "cloudProvider": {
    "type": "aws",
    "region": "us-east-1"
  },
  "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
  "heartbeat": {...},
  "oevGateway": {
    "enabled": true,
    "maxConcurrency": 20,
    "corsOrigins": []
  },
  ...
},
```

## Gateway URL

The gateway implementation is different depending on how Airnode is deployed. When deployed on a cloud provider, the serverless gateway is used. Inside Airnode client, the gateway is implemented via a simple web server inside the docker container. There are subtle differences in both how the gateways work and what the gateway URLs look like.

The deployer generates a secret `UUID` path parameter which ensures that the endpoints are not openly accessible. Therefore, the gateway URL should be kept secret.

The gateway URL is also available as part of the payload sent from Airnode's [heartbeat](/reference/airnode/latest/understand/heartbeat.md) to your specified heartbeat URL.

### When deployed on a cloud provider

A gateway URL is generated when Airnode is deployed. You can see the URLs including the secret `UUID` path parameter, displayed on your terminal at the end of an Airnode deployment using a [Docker image](/reference/airnode/latest/docker/).

### When using Airnode client

Airnode client can be used to run Airnode as a docker container locally. There is a common web server for the gateway, which is exposed on the host machine. Doing so will make the gateway API accessible like a regular web server running on the machine. Note the `PORT` which is exposed as part of the Airnode client container. See the [Airnode client usage](/reference/airnode/latest/docker/client-image.md#usage) for more details.

- `http://localhost:<PORT>/sign-oev/01234567-abcd-abcd-abcd-012345678abc` - Gateway URL for the OEV Gateway

## Usage

In order to execute the processing on the gateway, it needs to receive a properly constructed HTTP request:

- It must be a `POST` request
- It must contain a `Content-Type` header, set to `application/json`.
- It must contain the following JSON body:

```json
{
  "chainId": <CHAIN_ID>,
  "api3ServerV1": <API3_SERVER_ADDRESS>,
  "oevProxyAddress": <OEV_PROXY_ADDRESS>,
  "updateId": <UPDATE_ID>,
  "bidderAddress": <BIDDER_ADDRESS>,
  "bidAmount": <BID_AMOUNT>,
  "beacons": [
    {
      "airnodeAddress": <AIRNODE_ADDRESS>,
      "templateId": <TEMPLATE_ID>,
      "signedData": {
        "timestamp": <TIMESTAMP>,
        "encodedValue": <ENCODED_VALUE>,
        "signature": <SIGNATURE>
      }
    },
    {
      "airnodeAddress": <AIRNODE_ADDRESS>,
      "templateId": <TEMPLATE_ID>,
    },
    ...
  ]
}
```

where:

- `chainId` - ID of the blockchain where the auction was held.
- `api3ServerV1` - Blockchain address of the API3 server contract.
- `oevProxyAddress` - Blockchain address of the proxy data feed contract.
- `updateId` - Auction update ID.
- `bidderAddress` - Blockchain address of the winning searcher.
- `bidAmount` - Bid amount that won the auction.
- `beacons` - A list of beacon data to be signed. It can contain two types: full beacon data, only beacon metadata
  - `airnodeAddress` - Airnode address identifying a beacon
  - `templateId` - Template ID identifying a beacon
  - `signedData` - The signed beacon data received from signed data gateway.
    - `timestamp` - UNIX timestamp of the beacon data
    - `encodedValue` - Beacon value in its encoded form
    - `signature` - Signature of the beacon data

### Example request

```sh
curl --location '<gatewayUrl>' \
--header 'Content-Type: application/json' \
--data '{
    "chainId": 6999,
    "bidAmount": "50000000000000000",
    "bidderAddress": "0xf20e5d27690078c102FDbDe117a990a337820A51",
    "api3ServerV1": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    "oevProxyAddress": "0x29fbec16e63F1881a50423030e540037cecBd5A6",
    "beacons": [
         {
            "airnodeAddress": "0xaD1b4e9F83bA33d9B0A92b0085f8606bFe4a41d0",
            "templateId": "0xe7a871afe2dbe549219b60de080086ea1132f05f4557a21d95ef0a01d7511587",
            "signedData": {
                "encodedValue": "0x000000000000000000000000000000000000000000000000000000006d16277b",
                "timestamp": "1679589673",
                "signature": "0x36b4ba2ea19063e0f32055ef80774f302666bf9209f7f33b364fbfbd5079e8e61486f89aa9d63a392f2af2dd925b94da592fc5acb976303a095ffdcd77f1dc7d1b"
            }
        }
    ],
    "updateId": "0x336a3067645a4e33616f4e4c723734376633644555576a463675737900000000"
}'
```

### Example response

```json
[
  "0xf9ada63d498bca65598b7a2504a89f61a82665dd7e2a0828cf21c6715aca5214103998ac98e5ddc3d32ba50c79de984d286b3d602019acf6689f31845ec04abb1b"
]
```

The gateway will return a list of signatures. There is a signature for each beacon within the data feed that is served by the given Airnode, returned in the same order as they are specified in the request body.

<FlexEndTag/>
