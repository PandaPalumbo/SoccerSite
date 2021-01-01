<template>
  <div class="mx-4" v-if="data">
    <!--    Header Container-->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 m-1 p-4">
        <template #header>
          <b-row class="border-bottom border-light-gray border-rounded">
            <b-col cols="2">
              <div class="w-100 h-100">
                <img @error="altImage" class="player-img bg-light"
                     :src="data.image_path"/>
              </div>

            </b-col>
            <b-col cols="10">
              <p><img class="big-flag-logo" :src="data.country.data.image_path" />{{"  " + data.firstname + " " + data.lastname }}</p>
              <p class="text-small">
                <img class="small-logo" :src="data.team.data.logo_path"/>
                {{ data.team.data.name }}, #{{ data.lineups.data[0].number }} -
                {{ data.position.data.name}}
              </p>
              <p class="text-small">
                <img class="small-logo" :src="data.team.data.league.data.logo_path"/>
                {{ data.team.data.league.data.name + ', ' + data.team.data.country.data.name }}
              </p>
            </b-col>
          </b-row>
        </template>
        <template v-if="data" #lead>
          <b-row class="pt-4">
            <b-col cols="6">
              <p>Nationality:  <img class="flag-logo" :src="data.country.data.image_path" /> {{  data.nationality }}</p>
              <p>Number: {{  data.lineups.data[0].number }}</p>
              <p>{{ 'Matches Played: ' + currentStats.appearences }}</p>
              <p>{{ 'Weight : ' + data.weight + ", " + calculatePounds(data.weight) + ' lbs' }}</p>
              <p>{{ 'Goals: ' + currentStats.goals }}</p>
            </b-col>
            <b-col cols="6">
              <p>{{ 'Age : ' + calculateAge(data.birthdate) }}</p>
              <p>
                Position:
                {{ data.position.data.name}}
              </p>
              <p>{{ 'Birthday : ' + data.birthdate }}</p>
              <p>{{ 'Height : ' + data.height + ', ' + calculateFeetInchecs(data.height) }}</p>
              <p>{{ 'Assists: ' + currentStats.assists  }}</p>
            </b-col>
          </b-row>
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center ">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>

    <!--    Stats Container-->
    <PlayerStats :stats="data.stats.data" class="w-100"/>
  </div>
</template>

<script>
import PlayerStats from "@/components/player/PlayerStats";
import api from "@/api";

export default {
  name: "Players",
  components: {PlayerStats},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentStats(){
      let stats = this.data.stats.data;
      stats = stats.filter(stat => stat.season_id === this.data.team.data.current_season_id)[0]
      return api.util.flattenJson(stats)
    },
  },
  data() {
    return {
      dataImg: this.data.img,
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
    altImage(e) {
      console.log(e)
      e.target.src = 'https://cdn.soccersapi.com/images/soccer/teams/100/' + this.data.team_id + '.png'
    },
    calculateAge(birthday) { // birthday is a date
      birthday = birthday.split('/')
      birthday = birthday[1] + '/' + birthday[0] + '/' + birthday[2]
      let bday = new Date(birthday)
      let ageDifMs = Date.now() - bday.getTime();
      let ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    calculatePounds(kg) {
      return Math.floor(parseInt(kg) * 2.2046)
    },
    calculateFeetInchecs(cm) {
      var realFeet = ((parseInt(cm) * 0.393700) / 12);
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      return feet + " feet " + inches + ' inches';
    }
  },
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
  width: 65%;
  height: 65%;
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