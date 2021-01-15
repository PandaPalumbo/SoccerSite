<template>
  <b-row v-if="stats" class="bg-light-dark p-1 mb-2 rounded w-100">

    <b-col cols="2">
      <b-form-group class="league-list p-2">
        <b-form-checkbox-group
            v-model="selected_league_stats"
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
        <div v-for="(stat, i) in selected_league_stats" :key="i">
          <b-tab  v-if="selected_league_stats.length > 0" title-link-class="text-light  font-weight-bold" :title="stat.name"
          >
            <b-row class="m-2 bg-light-dark">
              <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab w-100 bg-dark league-list ">
                <b-tab   title-link-class="text-light  font-weight-bold" title="Stats"
                ></b-tab>
              </b-tabs>
              <StatsTable :data="stat.stats.data" :label="stat.name" variant="dark" class="m-4"/>
            </b-row>
          </b-tab>
        </div>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import StatsTable from "@/components/charts/StatsTable";
import api from '../../api';

export default {
  name: "LeagueStats",
  components: {StatsTable},
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
      let seasons = this.stats.map(stat => {
        stat['stats']['data'] = api.util.flattenJson(stat.stats.data);
        let keys = Object.keys(stat['stats']['data']);
        keys.forEach(key => {
          if(key.includes('id')){
            delete stat['stats']['data'][key]
          }
          if(key == 'btts'){
            stat['stats']['data']['Both Teams To Score'] = stat['stats']['data'][key]
            delete stat['stats']['data'][key]
          }
        })

        return {
          text: stat.name,
          value: stat,
        };
      })
      if(this.selected_league_stats.length ===0)
        seasons.forEach(season => {
          if(season.value.is_current_season){
            this.selected_league_stats.push(season.value)
          }
        })
      return seasons.sort((a,b)=>  b.text.split('/')[0] - a.text.split('/')[0]);
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
      console.log(this.selected_league_stats)
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