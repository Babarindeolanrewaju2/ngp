<template>
  <div>
      <h1 class="display-2 mb-4 mt-15 text-center">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    msg: String
  }
}
</script>

<style>
</style>
