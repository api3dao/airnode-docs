<template>
  <div>
    <b>Ethers AbiCoder: Decode</b>
    <div>
      <form id="formAbi" class="api3-abi-decode-form">
        <input
          type="text"
          v-model="encodeValue"
          class="api3-abi-decode-input"
          placeholder="enter encoded value here"
        />
        <input
          type="button"
          value="Decode"
          class="api3-abi-decode-btn"
          @click="decodeValues"
        />
        <br />
        <div v-if="result">
          <code style="text-align: left">{{ result }}</code>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { AbiCoder } from 'ethers';
const abiCoder = new AbiCoder();

/*
Input example:
0x000000000000000000000000000000000000000000000000000000000000007b00000000000000000000000000000000000000000000000000000000000001c8

Output:
123,456
*/
export default {
  name: 'EthersAbiCoder',
  props: ['types'],
  data: () => ({
    result: undefined,
    encodeValue: undefined,
  }),
  methods: {
    decodeValues() {
      try {
        this.result = undefined;
        console.log(this.encodeValue);
        this.result = abiCoder
          .decode(['int256', 'int256'], this.encodeValue)
          .toString();
        console.log(this.result);
      } catch (err) {
        console.error(err.toString());
        this.result = err.toString();
      }
    },
  },
  mounted() {
    this.$nextTick(async function () {});
    console.log('MOUNTED', this.types);
  },
};
</script>

<style scoped>
.api3-abi-decode-form {
  border: 0.5px lightgray solid;
  padding: 5px 10px 5px 10px;
  border-radius: 0.4em;
}
.api3-abi-decode-input {
  margin-top: 10px;
  font-size: small;
  border: 1px lightgray solid;
  width: 100%;
  font-family: courier;
  padding: 3px;
  border-radius: 0.3em;
}
.api3-abi-decode-btn {
  font-size: small;
  border: 1px solid lightgray;
  border-radius: 0.5em;
  padding: 2px 5px 2px 5px;
  margin-top: 8px;
  margin-bottom: 10px;
}
</style>
