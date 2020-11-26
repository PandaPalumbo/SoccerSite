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
        </template>
      </b-jumbotron>
    </b-row>
    <b-row>
      <b-tabs>
        <b-tab v-for="(key, i) in Object.keys(tabStats)" :key="i" :title="prettyCasing(key)">
          <b-row v-if="key === 'assists'">
            <p><strong>Total: </strong> {{' ' + tabStats[key].total}}</p>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "League",
  props:{
    id:{
      type: Number,
      required: true,
    },
  },
  computed:{
    ...mapState({
      leagues: state => state.selected.leagues
    }),
    leagueData(){
      return this.leagues.filter(league => league.id == this.id)[0]
    },
    tabStats(){
      let stats =  this.leagueData.stats;
      let keys = Object.keys(stats);
      let newStats = {};
      keys.forEach(key =>{
        if(typeof stats[key] === "object"){
          newStats[key] = stats[key];
        }
      });
      console.log(newStats)
      return newStats;
    },
    stats(){
      return this.leagueData.stats;
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
  }
}
</script>

<style scoped>
.league-cont{
  width:100%;
}
</style>