<template>
<div class="p-4">
  <b-tabs v-if="standings" fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
          class="tab w-100 bg-dark league-list ">
    <b-tab title-link-class="text-light  font-weight-bold" title="Goals" class="p-2"
    >
      <PlayerTable :data="goals" stat-type="goals" />
    </b-tab>
<!--    <b-tab title-link-class="text-light  font-weight-bold" title="Assists" class="p-2"-->
<!--    >-->
<!--      <PlayerTable :data="assist" stat-type="assists" />-->
<!--    </b-tab>-->
<!--    <b-tab title-link-class="text-light  font-weight-bold" title="Cards" class="p-2"-->
<!--    >-->
<!--      <PlayerTable :data="cards" stat-type="cards" />-->
<!--    </b-tab>-->
  </b-tabs>
  <b-spinner v-else/>
</div>
</template>

<script>
import api from "@/api";
import PlayerTable from "@/components/charts/PlayerTable";
export default {
  name: "TeamPlayerStandings",
  components:{
    PlayerTable
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  mounted(){
    api.getData.getTeamPlayerStandings(this.id,(data)=>{
      console.log(data);
      this.standings = data;
      this.goals = data.aggregatedGoalscorers.data.sort((a,b) => b.goals - a.goals).slice(0, 25);
      this.assist = data.aggregatedAssistscorers.data.sort((a,b) => b.assists - a.assists).slice(0, 25);
      this.cards = data.aggregatedCardscorers.data.sort((a,b) => b.cards - a.cards).slice(0, 25);
    })
  },
  data(){
    return{
      standings:null,
      goals:null,
      cards:null,
      assist:null,
    }
  }
}
</script>

<style scoped>

</style>