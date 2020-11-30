<template>
  <div class="bg-dark">
    <b-row>
      <b-col>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
name: "Teams.vue",
  computed:{
  ...mapState({
    teams: state => state.teams,
    leagues: state => state.leagues,
  }),
  }
}
</script>

<style scoped>

</style>