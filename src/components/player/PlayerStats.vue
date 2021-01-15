<template>
  <b-row v-if="stats" class="bg-light-dark p-1 mb-2 rounded w-100">

    <b-col cols="2">
      <b-form-group class="league-list p-2">
        <b-form-checkbox-group
            v-model="selected_league_stats"
            :options="leagues"
            stacked
            buttons
            button-variant="outline-light"
            @change="test"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-col>

    <b-col cols="10">
      <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab w-100 bg-dark league-list ">
        <div v-for="(stat, i) in selected_league_stats" :key="i">
          <b-tab  v-if="selected_league_stats.length > 0" title-link-class="text-light  font-weight-bold" :title="stat.league_data.name + ' - ' + stat.season_data.name"
          >
            <b-row class="m-2 bg-light-dark">
              <StatsTable :data="stat" :label="stat.league_data.name + ' - ' + stat.season_data.name" variant="dark" class="m-4"/>
            </b-row>
          </b-tab>
        </div>

        <b-tab title-link-class="text-light  font-weight-bold" title="Current Season - All Competitions">
          <b-row class="m-2 bg-light-dark">
            <StatsTable :data="currentStats" label="All Competitions" variant="dark" class="m-4"/>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import StatsTable from "@/components/charts/StatsTable";
import api from '../../api';

export default {
  name: "PlayerStats",
  components: {StatsTable},
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentStats() {
      let stats = this.stats.filter(stat => stat.season.data.is_current_season)
      stats = stats.map(stat => api.util.flattenJson(stat))
      let keys = Object.keys(stats[0]);
      let combinedStats = {}
      keys.forEach(key => {
          combinedStats[key] = 0;
          stats.forEach(stat => {
            if(key == 'rating'){
              combinedStats[key] += parseFloat(stat[key])
            } else{
              combinedStats[key] += stat[key]
            }

          })

      })
      combinedStats['rating'] = (combinedStats['rating']/stats.length).toFixed(2)
      combinedStats['passes_accuracy'] = (combinedStats['passes_accuracy']/stats.length).toFixed(2)
      //console.log(combinedStats);
      return combinedStats
    },
    allStats() {
      return this.stats.map(stat => api.util.flattenJson(stat));
    },
    leagues() {
      let leagues = this.stats.map(stat => {
        let league = stat.league.data;
        league['season_name'] = stat.season.data.name;
        return {
          text: league.name + ' - ' + league.season_name,
          value: api.util.flattenJson(stat),
        };
      })
      //console.log(leagues)
      return leagues.sort((a,b)=>  b.value.season_data.name.split("/")[0] - a.value.season_data.name.split("/")[0]);
    }
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
      //console.log(this.selected_league_stats)
    }
  },
  data() {
    return {
      selected_league_stats: [],
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