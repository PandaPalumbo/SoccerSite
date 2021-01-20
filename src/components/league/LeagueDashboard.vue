<template>
  <!--  Main Cont-->
  <div class="mx-4" v-if="data">
    <!-- Page Header   -->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1 mb-0">
        <template #header>
          <b-col cols="12">
            <b-row>
              <b-col cols="2">
                <img class="league-img bg-light"
                     :src="data.logo_path"/>
              </b-col>
              <b-col>
                {{ data.name + ' - ' + data.country.data.name }}
                <!--                header stats-->
                <b-row v-if="currentSeasonStats">
                  <b-col cols="6" class="p-4">
                    <b-row class=" smaller-font"> <!-- ###/### Matches Played -->
                      {{ currentSeasonStats.stats.data.number_of_matches_played }} /
                      {{ currentSeasonStats.stats.data.number_of_matches }} Matches Played
                    </b-row>
                    <b-row class=" smaller-font">
                      {{ currentSeasonStats.stats.data.number_of_clubs }} Teams
                    </b-row>
                    <b-row class=" smaller-font">
                      {{ currentSeasonStats.stats.data.number_of_goals }} Goals Scored
                    </b-row>
                  </b-col>
                  <b-col cols="6">
                    <b-row></b-row>
                  </b-col>
                </b-row>

              </b-col>
            </b-row>
          </b-col>
        </template>

      </b-jumbotron>
    </b-row>
    <!--  Data Container  -->
    <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
            class="tab w-100 bg-dark league-list ">
      <b-tab title-link-class="text-light  font-weight-bold" title="League Stats"
      >
        <LeagueStats :stats="stats" :league="data"/>
      </b-tab>
      <b-tab lazy title-link-class="text-light  font-weight-bold" title="Player Stats" class="p-4"
      >
        <PlayerStandings :assists="data.season.data.aggregatedAssistscorers.data" :goals="data.season.data.aggregatedGoalscorers.data" :cards="data.season.data.cardscorers.data"/>
      </b-tab>
      <b-tab title-link-class="text-light  font-weight-bold" title="Team Stats"
      >
        <LeagueTeamStats :data="data.season.data.stats.data" />
      </b-tab>
      <b-tab lazy title-link-class="text-light  font-weight-bold" title="Fixtures"
      >
        <LeagueFixtures :fixtures="data.season.data.fixtures.data" />
      </b-tab>
    </b-tabs>


  </div>
</template>

<script>
import LeagueStats from "@/components/league/LeagueStats";
import PlayerStandings from "@/components/league/PlayerStandings";
import LeagueTeamStats from "@/components/league/LeagueTeamStats";
import LeagueFixtures from "@/components/league/LeagueFixtures";

export default {
  name: "League",
  components: {
    LeagueStats,
    PlayerStandings,
    LeagueTeamStats,
    LeagueFixtures
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  computed: {
    stats() {
      return this.data.seasons.data.filter(season => season.stats)
    },
    currentSeasonStats() {
      return this.data.seasons.data.filter(season => season.is_current_season)[0]
    },

  },
  data() {
    return {
      selectedSeasons: [],
    }
  },
  methods: {


    //getting object of stats I want to show in tab format and not in the header.
    getTabStats(stats) {
      if (this.stats) {
        let keys = Object.keys(stats);
        let newStats = {};
        keys.forEach(key => {
          if (typeof stats[key] === "object" && key !== 'team_most_scored' && key !== 'player_most_scored' && key !== 'goal_line') {
            newStats[key] = stats[key];
          }
        });
        //console.log(newStats)
        return newStats;
      } else
        return false;
    },

    getColor() {
      return this.$randomColor({luminosity: 'bright'}).toString();
    }
  },
}
</script>

<style scoped>
.league-cont {
  width: 100%;
}

.smaller-font {
  font-size: 0.5em;
}

.tab {
  width: 100%;
  margin: auto;
}
</style>