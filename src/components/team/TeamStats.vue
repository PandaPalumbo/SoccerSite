<template>
  <b-row v-if="stats" class="bg-light-dark p-4 mb-2 rounded w-100 m-auto">

    <b-col cols="2">
      <b-form-group class="league-list p-2">
        <b-form-checkbox-group
            v-model="selected_team_stats"
            :options="seasons"
            stacked
            buttons
            button-variant="outline-light"
            class="w-100 "
            @change="test"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-col>

    <b-col cols="10">
      <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab w-100 bg-dark league-list ">
        <div v-for="(stat, i) in selected_team_stats" :key="i">
          <b-tab  v-if="selected_team_stats.length > 0" title-link-class="text-light  font-weight-bold" :title="stat.name" class="p-4"
          >
            <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab w-100 bg-dark league-list ">

              <b-tab  title-link-class="text-light  font-weight-bold" title="Stats" class="p-2">
                <b-row class="m-2 bg-light-dark">
                  <StatsTable :data="stat" :label="stat.name" variant="dark" class="m-4"/>
                </b-row>
              </b-tab>

              <b-tab  title-link-class="text-light  font-weight-bold" title="Goal Line" class="p-2"
              >
                <b-row class="justify-content-center bg-light-dark">
                  <TeamGoalLine  :over="stat.goal_line_over" :under="stat.goal_line_under"/>
                </b-row>
              </b-tab>

              <b-tab  title-link-class="text-light  font-weight-bold" title="Goals by Time Range" class="p-2"
              >
                <b-row class="m-2 bg-light-dark">
                  <TeamGoalTimeRange :conceded="stat.goals_conceded_minutes_0" :scored="stat.scoring_minutes_0" />
                </b-row>
              </b-tab>
            </b-tabs>


          </b-tab>
        </div>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import StatsTable from "@/components/charts/StatsTable";
import TeamGoalLine from "@/components/team/TeamGoalLine";
import TeamGoalTimeRange from "@/components/team/TeamGoalTimeRange";
import api from '../../api';

export default {
  name: "TeamSats",
  components: {
    StatsTable,
    TeamGoalLine,
    TeamGoalTimeRange
  },
  props: {
    stats: {
      type: Array,
      required: true,
    },
    league: {
      type: Object,
      required: true,
    },
  },
  computed: {
    allStats() {
      return this.stats.map(stat => api.util.flattenJson(stat));
    },
    seasons() {
      let stats = this.stats;
      stats = stats.filter(stat => stat.season).filter(stat=> !stat.season.data.league.data.is_cup);
      stats = stats.map(stat => {
        stat['name'] = stat.season.data.name + ' - ' + stat.season.data.league.data.name;
        return {
          text: stat.name,
          value: api.util.flattenJson(stat),
        }
      })
      //console.log(stats)
      if(this.selected_team_stats.length ===0)
        stats.forEach(season => {
          if(season.value.season_data.is_current_season){
            this.selected_team_stats.push(season.value)
          }
        })
      return stats.sort((a,b)=> b.text.split('/')[0] - a.text.split('/')[0]);
    },
    currentSeason(){
      return this.seasons.filter()
    },
  },
  methods: {
    prettyCasing(string) {
      let splitString = string.split('_');
      let res = "";
      splitString.map(string => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },
    getColor() {
      return this.$randomColor({luminosity: 'bright'}).toString();
    },
    test(){
      //console.log(this.selected_team_stats)
    }
  },
  data() {
    return {
      selected_team_stats: [],
    }
  }
}
</script>

<style scoped>
.league-list {
  max-height: 900px;
  overflow-y: auto;
}
</style>