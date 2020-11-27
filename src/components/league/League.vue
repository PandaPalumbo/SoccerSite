<template>
  <div class="mx-4" v-if="leagueData">
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1">
        <template #header>
          <img class="league-img bg-light" :src="'https://cdn.soccersapi.com/images/soccer/leagues/100/'+leagueData.id+'.png'"/>
          {{leagueData.name + ' - ' + leagueData.country_name}}
        </template>
        <template v-if="stats" #lead>
          <p>{{'Matches Played: ' + stats.number_of_matches_played + '/'+ stats.number_of_matches}}</p>
          <p>{{'Teams : ' + stats.number_of_teams}}</p>
          <p>{{'Teams : ' + stats.number_of_teams}}</p>
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>
    <b-row v-if="stats && tabStats" class="bg-light-dark p-1 mb-2 rounded">
      <b-tabs active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab  bg-dark">
        <b-tab title-link-class="text-light  font-weight-bold" v-for="(key, i) in Object.keys(tabStats)" :key="Math.random() * i" :title="prettyCasing(key)">
          <b-row class="m-2 bg-light-dark" v-if="key === 'assists'">
            <StatsTable :data="tabStats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
          </b-row>
          <b-row class="m-2 bg-light-dark" v-if="key === 'cards'">
            <StatsTable  :data="tabStats[key].yellow" label="Yellow Cards" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].yellowred" label="Red Cards - Double Yellow" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].red" label="Straight Red Cards" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].total" label="Total Cards" variant="dark" class="m-4"/>
          </b-row>
          <b-row class="m-2 bg-light-dark" v-if="key === 'goals'">
            <StatsTable :data="tabStats[key].home" label="Home Goals" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].away" label="Away Goals" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].overall" label="Total Goals" variant="dark" class="m-4"/>
          </b-row>
          <b-row class="m-2 bg-light-dark" v-if="key === 'substituted_in'">
            <StatsTable :data="tabStats[key]" label="Substitutions" variant="dark" class="m-4"/>
          </b-row>
          <b-row class="m-2 bg-light-dark" v-if="key === 'clean_sheets'">
            <StatsTable :data="tabStats[key].home" label="Home" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].away" label="Away" variant="dark" class="m-4"/>
            <StatsTable :data="tabStats[key].overall" label="Total" variant="dark" class="m-4"/>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-row>
    <b-row class="justify-content-center" v-else>
      <b-spinner></b-spinner>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import StatsTable from "@/components/charts/StatsTable";
import api from "@/api";

export default {
  name: "League",
  components:{StatsTable},
  props:{
    id:{
      type: Number,
      required: true,
    },
  },
  data(){
    return{
      stats: null,
      tabStats:null,
    }
  },
  computed:{
    ...mapState({
      leagues: state => state.selected.leagues
    }),
    leagueData(){
      return this.leagues.filter(league => league.id == this.id)[0]
    },
  },
  methods:{
    prettyCasing(string){
      let splitString = string.split('_');
      let res = "";
      splitString.map(string => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },
    getTabStats(stats){
      if(this.stats) {
        let keys = Object.keys(stats);
        let newStats = {};
        keys.forEach(key => {
          if (typeof stats[key] === "object" && key !== 'team_most_scored' && key !== 'player_most_scored') {
            newStats[key] = stats[key];
          }
        });
        console.log(newStats)
        return newStats;
      }else
        return false;
    },
    getStats(id){
      if(!this.leagueData.stats) {
        api.getData.getLeagueStats(id, data => {
          this.leagues.map(league => {
            if (league.id == id) {
              this.stats = data.data;
              console.log('set stats')
              this.tabStats = this.getTabStats(this.stats)
              this.$store.dispatch('updateSelectedStatistics', {
                type: 'leagues',
                id: this.id,
                data: data.data,
              })
            }
          });
        })
      } else{
        this.stats = this.leagueData.stats;
        this.tabStats = this.getTabStats(this.stats);
      }
    },
  },
  mounted() {
    this.getStats(this.id)
  }
}
</script>

<style scoped>
.league-cont{
  width:100%;
}
.tab{
  width:100%;
  margin: auto;
}
</style>