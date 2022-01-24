<template>
  <!--    Body Container-->
  <b-row class=" m-4 bg-dark p-2">
    <!--    Pills & Btn Container-->
    <b-col cols="12" class="my-2">
      <b-row>
        <b-col class="" cols="2" >
          <b-button v-show="canCompare" class="" @click="comparing = !comparing">
            {{ comparing ? 'Stop Comparing' : 'Compare Players' }}
          </b-button>
        </b-col>
        <b-col>
          <SelectedPill
              variant="danger"
              type="players" v-for="({player}, i) in selectedPlayers"
              :key="i"
              :data="player"
              :label="player.name"
          />
        </b-col>
      </b-row>
    </b-col>
    <!--    Search Container-->
    <b-col cols="12" v-if="!comparing">
      <SearchBar data-type="players"></SearchBar>
    </b-col>
    <!--    Main Container-->
    <b-col cols="12" class="m-2 bg-light-dark rounded p-2" v-if="selectedPlayers.length > 0 && !comparing">
      <b-tabs active-nav-item-class="bg-light-dark text-light " class="bg-dark rounded p-1">
<!--        <b-tab title-link-class="font-weight-bold text-light" v-for="(player, i) in selectedPlayers" :key="i"-->
<!--               :title="(player.player_name.split(',')[1] ? player.player_name.split(',')[1] : ' ') + ' ' + player.player_name.split(',')[0]">-->
<!--          <PlayerDashboard :data="selectedPlayers"/>-->
<!--        </b-tab>-->
        <PlayerComparison />
      </b-tabs>
    </b-col>
<!--    <b-col cols="12" class="m-2 bg-light-dark rounded p-2" v-else-if="selectedPlayers.length > 0 && comparing">-->

<!--    </b-col>-->
    <b-col cols="12" class="m-2 bg-dark rounded p-2" v-else>
      <h4 class="text-warning"> Please search for a player!</h4>
    </b-col>

  </b-row>
</template>

<script>
import SearchBar from "../SearchBar";
import SelectedPill from "../sidebar/SelectedPill";
import PlayerComparison from "./PlayerComparison";
import {mapState} from 'vuex';

export default {
  name: "Players.vue",
  components: {SearchBar, SelectedPill, PlayerComparison},
  computed: {
    ...mapState({
      selectedPlayers: state => state.selected.players,
    }),
    canCompare() {
      if(this.selectedPlayers.length > 1)
        return true
      else{
        this.flipCompare();
        return false;
      }
    }
  },
  data() {
    return {
      comparing:false,
    }
  },
  methods:{
    flipCompare(){
      this.comparing = false;
    },
  },
  mounted() {
    console.log(this.selectedPlayers)
  }

}
</script>

<style scoped>

</style>