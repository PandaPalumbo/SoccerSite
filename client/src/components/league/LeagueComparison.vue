<template>
<!--  Main Containter-->
  <div class="mx-4">
<!--    Header Container-->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1">
        <template #header>
          Comparing...
        </template>
        <template v-if="names" #lead>
          <p>
            <span v-for="(name, i) in names" :key="i">
              {{i == names.length - 1 ? name: name  + ', '}}
            </span>
          </p>
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>
<!--    Data container-->
<!--    -->

      <b-row v-if="stats.length > 1" class="bg-light-dark p-1 mb-2 rounded">
        <ComparisonTable :data="stats"/>
      </b-row>
<!--    if no server show loading-->
    <b-row class="justify-content-center" v-else>
      <b-spinner variant="light"></b-spinner>
    </b-row>
  </div>

</template>

<script>
import {mapState} from 'vuex';
// import api from "@/api";
import ComparisonTable from "../charts/ComparisonTable";

//TODO add more graphs and stuff;
export default {
  name: "LeagueComparison",
  components:{ComparisonTable},
  computed: {
    ...mapState({
      selectedLeagues: state => state.selected.leagues,
    }),
    names(){
      return this.selectedLeagues.map(leagues => leagues.name)
    },
    stats(){

      let stats = this.selectedLeagues.map(league => {
        let league_stats = {
        }
        league.seasons.data.forEach(season => {
          if(season.is_current_season) {
            let keys = Object.keys(season.stats.data);
            league_stats['name'] = league.name;
            keys.forEach(key => {
              if(!key.includes('updated') || !key.includes('id'))
                league_stats[key] = season.stats.data[key]
            })
          }
        })
        return league_stats;
      })
      console.log(stats)
      return stats;
    },
    // sharedSeasons(){
    //   let stats = this.stats;
    //   let seasons = new Set();
    //   stats.forEach(stat => {
    //     let years = Object.keys(stat.stats);
    //     years.forEach(year => seasons.add(year));
    //   })
    //   return seasons;
    // }

  },
  data() {
    return {
      tabLabels: null,
    }
  },
  methods: {
    prettyCasing(string) {
      let splitString = string.split('_');
      let res = "";
      splitString.map((string) => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },


  },
  mounted() {
  }
}
</script>

<style scoped>
.tab {
  width: 100%;
  margin: auto;
}
</style>