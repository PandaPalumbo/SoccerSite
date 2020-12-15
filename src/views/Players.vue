<template>
  <b-row class=" m-4 bg-dark p-2">
    <div class="my-2">
      <SelectedPill
          variant="danger"
          type="players" v-for="(player, i) in selectedPlayers"
          :key="i"
          :data="player"
          :label="player.common_name"
      />
    </div>

    <SearchBar data-type="players"></SearchBar>
  </b-row>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import SelectedPill from "@/components/sidebar/SelectedPill";
import {mapState} from 'vuex';

export default {
name: "Players.vue",
  components:{SearchBar, SelectedPill},
  computed:{
    ...mapState({
      selectedPlayers: state => state.selected.players,
    })
  },

}
</script>

<style scoped>

</style>