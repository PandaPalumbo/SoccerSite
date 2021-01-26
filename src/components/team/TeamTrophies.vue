<template>
<div class="p-4 bg-light-dark">
  <table class="table table-striped table-dark table-bordered">
    <thead>
      <tr>
        <th>Competition</th>
        <th class="text-center">Times Won</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(trophy, i ) in trophies.sort((a,b) => b.times - a.times)" :key="i">
        <th>{{trophy.league}}</th>
        <th  class="text-center">{{trophy.times}}</th>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
name: "TeamTrophies",
  props: {
    trophies: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>