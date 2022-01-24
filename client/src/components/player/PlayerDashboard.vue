<template>
  <div class="mx-4" v-if="data">

  </div>
</template>

<script>
// import PlayerStats from "./PlayerStats";

import { getPlayerInformation } from "@/api";

export default {
  name: "Players",
  // components: {PlayerStats},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // currentStats(){
    //   let stats = this.data.stats.data.filter(stat=> stat.season.data.is_current_season);
    //   stats = stats.map(stat => api.util.flattenJson(stat))
    //   let keys = Object.keys(stats[0]);
    //   let combinedStats = {}
    //   keys.forEach(key => {
    //     combinedStats[key] = 0;
    //     stats.forEach(stat => {
    //       if(key == 'rating'){
    //         combinedStats[key] += parseFloat(stat[key])
    //       } else{
    //         combinedStats[key] += stat[key]
    //       }
    //
    //     })
    //
    //   })
    //   combinedStats['rating'] = (combinedStats['rating']/stats.length).toFixed(2)
    //   combinedStats['passes_accuracy'] = (combinedStats['passes_accuracy']/stats.length).toFixed(2)
    //   //console.log(combinedStats);
    //   return combinedStats;
    // },
  },
  data() {
    // return {
    //   dataImg: this.data.img,
    // }
  },
  methods: {
    // prettyCasing(string) {
    //   let splitString = string.split('_');
    //   let res = "";
    //   splitString.map(string => {
    //     string = string.charAt(0).toUpperCase() + string.slice(1)
    //     res += string + " "
    //   })
    //   return res;
    // },
    // getColor() {
    //   return this.$randomColor({luminosity: 'bright'}).toString();
    // },
    // altImage(e) {
    //   //console.log(e)
    //   e.target.src = 'https://cdn.soccersapi.com/images/soccer/teams/100/' + this.data.team_id + '.png'
    // },
    // calculateAge(birthday) { // birthday is a date
    //   birthday = birthday.split('/')
    //   birthday = birthday[1] + '/' + birthday[0] + '/' + birthday[2]
    //   let bday = new Date(birthday)
    //   let ageDifMs = Date.now() - bday.getTime();
    //   let ageDate = new Date(ageDifMs); // miliseconds from epoch
    //   return Math.abs(ageDate.getUTCFullYear() - 1970);
    // },
    // calculatePounds(kg) {
    //   return Math.floor(parseInt(kg) * 2.2046)
    // },
    // calculateFeetInchecs(cm) {
    //   var realFeet = ((parseInt(cm) * 0.393700) / 12);
    //   var feet = Math.floor(realFeet);
    //   var inches = Math.round((realFeet - feet) * 12);
    //   return feet + " feet " + inches + ' inches';
    // }
  },
  mounted() {
    console.log(this.data)
    getPlayerInformation({id: this.data.player_id}, (player) => {
      console.log(player)
    })
  }
}
</script>

<style scoped>
.league-cont {
  width: 100%;
}

.text-small {
  font-size: .5em;
}

.tab {
  width: 100%;
  margin: auto;
}

.player-img {
  width: 200px;
  height: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: block !important;
  border-radius: 10px;
}
.small-logo{
  width: 50px;
  height: 50px;
}

.flag-logo{
  width: 50px;
  height: 25px;
}

.big-flag-logo{
  width: 100px;
  height: 50px;
}
</style>