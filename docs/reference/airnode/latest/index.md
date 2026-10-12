---
title: Contract Addresses
sidebarHeader: Reference
sidebarSubHeader: Airnode
pageHeader: Reference → Airnode → v0.14 → Deployment References
path: /reference/airnode/latest/index.html
version: v0.14
outline: deep
tags:
---

<VersionWarning/>

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

Use the contract addresses listed in the tables below to interact with Airnode on EVM-compatible blockchains. Additional addresses will be added as contracts are deployed, but feel free to [submit a GitHub issue](https://github.com/api3dao/airnode/issues) requesting a new deployment.

The contract addresses listed below are sourced from the Airnode monorepo [airnode-protocol](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol) and can be found in its [deployments](https://github.com/api3dao/airnode/blob/v0.14/packages/airnode-protocol/deployments) directory.

## AirnodeRrpV0

<table>
<tr><th class="contract-addresses-heading">Chain</th><th class="contract-addresses-heading">ID</th><th class="contract-addresses-heading">Contract Address</th></tr>
<tr v-for="(chain, index) in AirnodeRrpV0">
    <template v-if="chain.id == 1 || chain.id == 11155111">
        <td class="mainnet-and-sepolia" style="max-width:150px;">{{chain.fullname}}</td>
        <td class="mainnet-and-sepolia">{{chain.id}}</td>
        <td class="mainnet-and-sepolia contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
<tr v-for="(chain, index) in AirnodeRrpV0.sort((a, b) => a.fullname.localeCompare(b.fullname))">
    <template v-if="chain.id != 1 && chain.id != 11155111">
        <td style="max-width:150px;">{{chain.fullname}}</td>
        <td>{{chain.id}}</td>
        <td  class="contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
</table>

## RequesterAuthorizerWithAirnode

<table>
<th class="contract-addresses-heading">Chain</th><th class="contract-addresses-heading">ID</th><th class="contract-addresses-heading">Contract Address</th>
<tr v-for="(chain, index) in RequesterAuthorizerWithAirnode">
    <template v-if="chain.id == 1 || chain.id == 11155111">
        <td class="mainnet-and-sepolia" style="max-width:150px;">{{chain.fullname}}</td>
        <td class="mainnet-and-sepolia">{{chain.id}}</td>
        <td class="mainnet-and-sepolia contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
<tr v-for="(chain, index) in RequesterAuthorizerWithAirnode.sort((a, b) => a.fullname.localeCompare(b.fullname))">
    <template v-if="chain.id != 1 && chain.id != 11155111">
        <td style="max-width:150px;">{{chain.fullname}}</td>
        <td>{{chain.id}}</td>
        <td class="contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
</table>

## AccessControlRegistry

<table>
<th class="contract-addresses-heading">Chain</th><th class="contract-addresses-heading">ID</th><th class="contract-addresses-heading">Contract Address</th>
<tr v-for="(chain, index) in AccessControlRegistry">
    <template v-if="chain.id == 1 || chain.id == 11155111">
        <td class="mainnet-and-sepolia" style="max-width:150px;">{{chain.fullname}}</td>
        <td class="mainnet-and-sepolia">{{chain.id}}</td>
        <td class="mainnet-and-sepolia contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
<tr v-for="(chain, index) in AccessControlRegistry.sort((a, b) => a.fullname.localeCompare(b.fullname))">
    <template v-if="chain.id != 1 && chain.id != 11155111">
        <td style="max-width:150px;">{{chain.fullname}}</td>
        <td>{{chain.id}}</td>
        <td class="contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
</table>

## AirnodeRrpV0DryRun

<table>
<th class="contract-addresses-heading">Chain</th><th class="contract-addresses-heading">ID</th><th class="contract-addresses-heading">Contract Address</th>
<tr v-for="(chain, index) in AirnodeRrpV0DryRun">
    <template v-if="chain.id == 1 || chain.id == 11155111">
        <td class="mainnet-and-sepolia" style="max-width:150px;">{{chain.fullname}}</td>
        <td class="mainnet-and-sepolia">{{chain.id}}</td>
        <td class="mainnet-and-sepolia contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
<tr v-for="(chain, index) in AirnodeRrpV0DryRun.sort((a, b) => a.fullname.localeCompare(b.fullname))">
    <template v-if="chain.id != 1 && chain.id != 11155111">
        <td style="max-width:150px;">{{chain.fullname}}</td>
        <td>{{chain.id}}</td>
        <td class="contract-addresses-address" NOWRAP>{{chain.contractAddress}}
            <CopyIcon :text="chain.contractAddress" />
        </td>
    </template>
</tr>
</table>

<FlexEndTag/>

<script setup lang="ts">
    import AirnodeRrpV0 from './src/AirnodeRrpV0.json';
    import AccessControlRegistry from './src/AccessControlRegistry.json';
    import RequesterAuthorizerWithAirnode from './src/RequesterAuthorizerWithAirnode.json';
    import AirnodeRrpV0DryRun from './src/AirnodeRrpV0DryRun.json';
</script>

<style scoped>
.contract-addresses-address {
  font-family: courier;
  font-size: small;
}
.contract-addresses-heading {
  text-align: left;
}
.mainnet-and-sepolia { 
  color:black;
  background: #e5ecf9;
  text-align: left;
}
.contract-addresses-copy-icon {
  margin-left: 5px;
  cursor: pointer;
  height: 11px;
}
</style>
