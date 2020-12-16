<template>
  <b-row class=" m-4 bg-dark p-2">
    <b-col cols="12" class="my-2">
      <SelectedPill
          variant="danger"
          type="players" v-for="(player, i) in selectedPlayers"
          :key="i"
          :data="player"
          :label="player.common_name"
      />
    </b-col>
    <b-col cols="12">
      <SearchBar data-type="players"></SearchBar>
    </b-col>
    <b-col cols="12" class="m-2 bg-light-dark rounded p-2" v-if="selectedPlayers.length > 0">
      <b-tabs active-nav-item-class="bg-light-dark text-light " class="bg-dark rounded p-1">
        <b-tab title-link-class="font-weight-bold text-light" v-for="(player, i) in selectedPlayers" :key="i"
               :title="(player.common_name.split(',')[1] ? player.common_name.split(',')[1] : ' ') + ' ' + player.common_name.split(',')[0]">
          <PlayerDashboard :data="player" />
        </b-tab>
      </b-tabs>
    </b-col>
    <b-col cols="12" class="m-2 bg-dark rounded p-2" v-else>
      <h4 class="text-warning"> Please search for a player!</h4>
    </b-col>

    <span class="mx-4 my-1 text-warning">*  Offensive data collected</span>
  </b-row>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import SelectedPill from "@/components/sidebar/SelectedPill";
import PlayerDashboard from "@/components/player/PlayerDashboard";
import {mapState} from 'vuex';

export default {
name: "Players.vue",
  components:{SearchBar, SelectedPill, PlayerDashboard},
  computed:{
    ...mapState({
      selectedPlayers: state => state.selected.players,
    })
  },

}
</script>

<style scoped>

</style>