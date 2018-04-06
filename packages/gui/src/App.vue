<template>
  <div id="app">
    <img src="./assets/logo.png" height="100">
    <LargeUpdateMessage msg="Hi YOU"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LargeUpdateMessage from './components/LargeUpdateMessage.vue';

@Component({
  components: {
    LargeUpdateMessage
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
