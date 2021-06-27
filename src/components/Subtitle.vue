<template>
  <div>
        <p class="font-italic mb-2 mt-4 text-center">
          {{disclaimer}}
        </p>
        <p class="font-weight-light mb-2 text-center">{{dateTime(time.updated)}}</p>
        <p v-if="error" class="font-weight-light mt-7 text-center red accent-2" color="error">{{error}}</p>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Subtitle',
  props: {
    disclaimer: String,
    time: Object,
    error: String
  },
  methods: {
    dateTime(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a')
    },
 }
}
</script>

<style>
</style>
