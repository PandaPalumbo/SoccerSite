<template>
  <div class="p-4">
    <b-tabs v-if="standings" fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
            class="tab w-100 bg-dark league-list ">
      <b-tab title-link-class="text-light  font-weight-bold" title="Current Season" class="p-2"
      >
        <b-row class="text-center m-2">
          <span class="text-warning mx-auto">* League Statistics</span>
        </b-row>

        <b-tabs v-if="standings" fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
                class="tab w-100 bg-dark league-list ">

          <b-tab title-link-class="text-light  font-weight-bold" title="Goals" class="p-2"
          >
            <PlayerTable :data="current_goals" stat-type="goals"/>
          </b-tab>
          <b-tab title-link-class="text-light  font-weight-bold" title="Assists" class="p-2"
          >
            <PlayerTable :data="current_assist" stat-type="assists"/>
          </b-tab>
          <b-tab title-link-class="text-light  font-weight-bold" title="Cards" class="p-2"
          >
            <PlayerTable :data="current_cards" stat-type="cards"/>
          </b-tab>
        </b-tabs>

      </b-tab>

      <b-tab title-link-class="text-light  font-weight-bold" title="Historical" class="p-2"
      >
        <b-row class="text-center m-2">
          <span class="text-warning mx-auto">* Single Season League Statistics</span>
        </b-row>
        <b-tabs v-if="standings" fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
                class="tab w-100 bg-dark league-list ">

          <b-tab title-link-class="text-light  font-weight-bold" title="Goals" class="p-2"
          >
            <PlayerTable :data="goals" stat-type="goals" />
          </b-tab>
          <b-tab title-link-class="text-light  font-weight-bold" title="Assists" class="p-2"
          >
            <PlayerTable :data="assist" stat-type="assists" />
          </b-tab>
          <b-tab title-link-class="text-light  font-weight-bold" title="Cards" class="p-2"
          >
            <PlayerTable :data="cards" stat-type="cards" />
          </b-tab>
        </b-tabs>
      </b-tab>

    </b-tabs>
    <b-row v-else>
      <b-spinner style="width: 2em; height: 2em;"  class="m-auto" />
    </b-row>

  </div>
</template>

<script>
import api from "../../api";
import PlayerTable from "../charts/PlayerTable";

export default {
  name: "TeamPlayerStandings",
  components: {
    PlayerTable
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    current_season_id: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    if(!this.standings){
      api.getData.getTeamPlayerStandings(this.id, (data) => {
        console.log(data);
        this.standings = data;
        this.current_goals = data.aggregatedGoalscorers.data.filter(play => play.season_id === this.current_season_id).sort((a, b) => b.goals - a.goals);
        this.current_assist = data.aggregatedAssistscorers.data.filter(play => play.season_id === this.current_season_id).sort((a, b) => b.assists - a.assists);
        this.current_cards = data.aggregatedCardscorers.data.filter(play => play.season_id === this.current_season_id).sort((a, b) => (b.yellowcards + b.redcards) - (a.yellowcards + a.redcards));

        this.goals = data.aggregatedGoalscorers.data.sort((a, b) => b.goals - a.goals)
        this.assist = data.aggregatedAssistscorers.data.sort((a, b) => b.assists - a.assists)
        this.cards = data.aggregatedCardscorers.data.sort((a, b) => (b.yellowcards + b.redcards) - (a.yellowcards + a.redcards))

        console.log(this.current_goals)
      })
    }
  },
  data() {
    return {
      standings: null,
      current_goals: null,
      goals: null,
      current_cards: null,
      cards: null,
      current_assist: null,
      assist: null,
    }
  }
}
</script>

<style scoped>

</style>