<template>
  <div class="mx-4" v-if="leagueData">
    <b-row class="league-cont">
      <b-jumbotron class="w-100 mt-1">
        <template #header>
          <img class="league-img" :src="'https://cdn.soccersapi.com/images/soccer/leagues/100/'+leagueData.id+'.png'"/>
          {{leagueData.name + ' - ' + leagueData.country_name}}
        </template>
      </b-jumbotron>
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
      console.log(this.leagues.filter(league => league.id == this.id)[0].stats)
      return this.leagues.filter(league => league.id == this.id)[0]
    }
  }
}
</script>

<style scoped>
.league-cont{
  width:100%;
}
</style>