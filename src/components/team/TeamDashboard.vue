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
                <img class="league-img bg-dark"
                     :src="data.logo_path"/>
              </b-col>
              <b-col>
                {{ data.name + ' - ' + data.country.data.name }}
                <!--                header stats-->
                <b-row >
                  <b-col cols="6" class="p-4">
                    <b-row class=" smaller-font">
                      League - <img style="width: 50px; height: 50px; margin:0 5px;" :src="data.league.data.logo_path">  {{data.league.data.name}}
                    </b-row>
                    <b-row class=" smaller-font">
                     Trophies Won - {{trophiesTotal.winner}}
                    </b-row>
                    <b-row class=" smaller-font">
                      Trophies Runner-up - {{trophiesTotal.runnerUp}}
                    </b-row>
                    <b-row class=" smaller-font">
                      {{data.uefaranking ? "UEFA Ranking - " + data.uefaranking.data.position : ''}}
                      {{data.fifaranking ? "FIFA Ranking - " + data.fifaranking.data.position : ''}}
                    </b-row>
                  </b-col>
                  <b-col  class=" m-auto smaller-font" cols="6">
                      <b-row>
                        Coach: {{data.coach.data.common_name}}
                      </b-row>
                      <b-row class="m-auto">
                        <img :src="data.coach.data.image_path" />
                      </b-row>
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

      <b-tab title-link-class="text-light  font-weight-bold" title="Squad" class="text-light"
      >
        <b-row class="text-center m-2">
          <span class="text-warning mx-auto">* League Statistics</span>
        </b-row>
        <TeamSquad :squad="squad" />
      </b-tab>
      <b-tab title-link-class="text-light  font-weight-bold" title="League Stats"
      >
        <TeamStats :stats="leagueStats" :league="data"/>
      </b-tab>

      <b-tab title-link-class="text-light  font-weight-bold" title="Trophies" class="text-light"
      >
        <TeamTrophies :trophies="trophies"/>
      </b-tab>

      <b-tab lazy title-link-class="text-light  font-weight-bold" title="Player Standings" class="text-light"
      >
        <TeamPlayerStandings :id="data.id" :current_season_id="data.current_season_id"/>
      </b-tab>

      <b-tab lazy title-link-class="text-light  font-weight-bold" title="Fixtures" class="text-light"
      >
        <TeamFixtures :latest="data.latest.data" :upcoming="data.upcoming.data"/>
      </b-tab>

      <b-tab lazy title-link-class="text-light  font-weight-bold" title="Transfers" class="text-light"
      >
        <TeamTransfers :transfers="data.transfers.data"/>
      </b-tab>


    </b-tabs>


  </div>
</template>

<script>
import TeamStats from "@/components/team/TeamStats";
import TeamTrophies from "@/components/team/TeamTrophies";
import TeamSquad from "@/components/team/TeamSquad";
import TeamPlayerStandings from "@/components/team/TeamPlayerStandings";
import TeamFixtures from "@/components/team/TeamFixtures";
import TeamTransfers from "@/components/team/TeamTransfers";

// import LeagueTeamStats from "@/components/league/LeagueTeamStats";
// import LeagueFixtures from "@/components/league/LeagueFixtures";

export default {
  name: "TeamDashboard",
  components: {
    TeamStats,
    TeamTrophies,
    TeamSquad,
    TeamPlayerStandings,
    TeamFixtures,
    TeamTransfers
    // PlayerStandings,
    // LeagueTeamStats,
    // LeagueFixtures
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
    trophies(){
      return this.data.trophies.data.filter(trophy => trophy.status == 'Winner')
    },
    squad(){
      let data = this.data
      console.log(data)
          // data = data.squad.data.sort((a,b) => b.appearences - a.appearences);
      return data;
    },
    leagueStats() {
      console.log(this.data);
      return this.data.stats.data.filter(stat => stat.season).filter(stat => stat.season.data.league).filter(stat => !stat.season.data.league.data.is_cup);
    },
    cupStats(){
      //cups stats are given on round to round basis
      let cups = this.data.stats.data.filter(stat => stat.season).filter(stat => stat.season.data.league.data.is_cup);
      console.log(cups)
      return cups;
    },
    trophiesTotal(){
      let count = {
        winner: 0,
        runnerUp:0,
      };
      this.data.trophies.data.forEach(trophy => {
        if(trophy.status == 'Winner') {
          count.winner += trophy.times;
        } else if(trophy.status == "Runner-up"){
          count.runnerUp += trophy.times;
        }
      })
      return count;
    },
    // currentSeasonStats() {
    //   return this.data.seasons.data.filter(season => season.is_current_season)[0]
    // },
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