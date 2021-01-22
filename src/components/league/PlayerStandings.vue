<template>
  <b-row class="bg-light-dark text-light">
    <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
            class="tab w-100 bg-dark league-list ">
      <b-tab title-link-class="text-light  font-weight-bold" title="Goals" class="p-2"
      >
          <PlayerTable :data="goals" stat-type="goals" />
      </b-tab>
      <b-tab title-link-class="text-light  font-weight-bold" title="Assists" class="p-2"
      >
        <PlayerTable :data="assists" stat-type="assists" />
      </b-tab>
      <b-tab title-link-class="text-light  font-weight-bold" title="Cards" class="p-2"
      >
        <PlayerTable :data="cards" stat-type="cards" />
      </b-tab>
    </b-tabs>
  </b-row>
</template>

<script>
import PlayerTable from "@/components/charts/PlayerTable";
export default {
  name: "PlayerStandings",
  components:{
    PlayerTable
  },
  props: {
    goals: {
      type: Array,
      required: true,
    },
    assists: {
      type: Array,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  computed:{
    filterCards(){
      return false;
    },
  }
}
</script>

<style scoped>

</style>