<template>
  <!--  Main Containter-->
  <div class="mx-4">
    <!--    Header Container-->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1">
        <template v-if="names" #lead>
          <!-- Radar   -->
          <PlayerRadar />
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>
    <!--    Data container-->

    <!--    Tables-->
<!--    <b-row v-if="selectedPlayers.length > 1" class="bg-light-dark p-1 mb-2 rounded">-->
<!--      <ComparisonTable :data="stats"/>-->
<!--    </b-row>-->
    <!--    if no server show loading-->
<!--    <b-row class="justify-content-center" v-else>-->
<!--      <b-spinner variant="light"></b-spinner>-->
<!--    </b-row>-->
  </div>

</template>

<script>
import {mapState} from 'vuex';
import PlayerRadar from "./PlayerRadar";

//TODO add more graphs and stuff;
export default {
  name: "LeagueComparison",
  components: {PlayerRadar},
  computed: {
    ...mapState({
      selectedPlayers: state => state.selected.players,
    }),
    names() {
      return this.selectedPlayers.map(player => player.name)
    },

  },
  data() {
    return {}
  },
  methods: {
  },
}
</script>

<style scoped>
.tab {
  width: 100%;
  margin: auto;
}

#radar-chart {
  width: 600px;
  height: 600px;
}
</style>