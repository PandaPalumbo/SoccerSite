<template>
  <b-row class=" m-4 bg-dark p-2">
    <SearchBar data-type="players"></SearchBar>
  </b-row>
</template>

<script>
import SearchBar from "@/components/SearchBar";
export default {
name: "Players.vue",
  components:{SearchBar},
}
</script>

<style scoped>

</style>