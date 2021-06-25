<template>
  <div id="app">
    <v-app>
      <Title msg="Data visualization with Vue.js, Veutify and Chart.js"/>
      <visualisation></visualisation>
    </v-app>
  </div>
</template>
<script>
/* eslint-disable */
import Visualisation from './components/Visualisation.vue';
import Title from './components/Title.vue'

export default {
  name: 'app',
  components: {
    Visualisation,
    Title
  }
}
</script>

<style>
</style>
