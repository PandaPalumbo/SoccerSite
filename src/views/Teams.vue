<template>
  <!-- Body container -->
  <b-row class=" m-4 bg-dark p-2">
    <!-- Main Container / Data   -->
    <b-col cols="12">
      <SearchBar data-type="teams" />
    </b-col>
    <b-col class="info-cont m-2">
      <!--  Show/Hide Btn, Compare Btn, Selected league pills   -->
      <b-row>
        <b-col cols="3" class="ml-4">
          <b-row>
            <b-button v-show="!comparing" class="ml-2" @click="sidebarOpen = !sidebarOpen">
              {{ sidebarOpen ? 'Hide Leagues' : 'Choose Teams' }}
            </b-button>
            <b-button v-show="selectedTeams.length >1" class="ml-2" @click="canCompare">
              {{ comparing ? 'Stop Comparing' : 'Compare Selected' }}
            </b-button>
          </b-row>
        </b-col>
        <b-col>
          <SelectedPill type="teams" v-for="(team) in selectedTeams" :key="team.id" :data="team"
                        :label="team.name" variant="danger"/>
        </b-col>
      </b-row>
         Single League view, shows this leagues stats and some graphs
      <div class="m-2 bg-light-dark rounded p-2" v-show="selectedTeams.length > 0 && !comparing">
        <b-tabs active-nav-item-class="bg-light-dark text-light " class="bg-dark rounded p-1">
          <b-tab title-link-class="font-weight-bold text-light" v-for="(team, i) in selectedTeams" :key="i"
                 :title="team.name">
            <TeamDashboard :id="parseInt(team.id)" :data="team"/>
          </b-tab>
        </b-tabs>
      </div>
      <!-- Comparison View, compares all selected leagues-->
      <!--   TODO add graphs   -->
<!--      <div class="m-2 bg-light-dark rounded p-2" v-show="selectedLeagues.length > 1 && comparing">-->
<!--        <LeagueComparison v-if="selectedLeagues.length > 1  && comparing"/>-->
<!--      </div>-->
    </b-col>
  </b-row>
</template>

<script>
import {mapState} from 'vuex';
import SearchBar from "@/components/SearchBar";
import SelectedPill from "@/components/sidebar/SelectedPill";
import TeamDashboard from "@/components/team/TeamDashboard";
// import LeagueComparison from "@/components/league/LeagueComparison";

export default {
  name: "Teams.vue",
  components: {
    // LeagueComparison,
    SelectedPill,
    TeamDashboard,
    SearchBar
  },
  computed: {
    //get the leagues and selected leagues from the state
    ...mapState({
      leagues: state => state.leagues,
      selectedTeams: state => state.selected.teams,
    }),
  },
  data() {
    return {
      sidebarOpen: true,
      comparing: false,
      showAlert: false,
    }
  },
  methods: {
    // checks conditions to determine if user can compare and is comparing.
    canCompare() {
      if (this.selectedTeams.length > 1) {
        this.comparing = !this.comparing;
        this.toggleAlert(false)
        if (this.comparing)
          this.sidebarOpen = false;
      } else {
        this.comparing = false;
        this.toggleAlert(true)
      }
    },
    toggleAlert(bool) {
      this.showAlert = bool;
    }
  },
}
</script>

<style scoped>
.info-cont {
  min-height: 1000px;
}
</style>