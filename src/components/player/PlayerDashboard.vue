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
                     :src="'https://cdn.soccersapi.com/images/soccer/players/100/'+data.id+'.png'"/>
              </div>

            </b-col>
            <b-col cols="10">
              <p>{{ data.firstname + " " + data.lastname }}</p>
              <p class="text-small">
                <img :src="'https://cdn.soccersapi.com/images/soccer/teams/50/' + data.team_id + '.png'"/>
                {{ data.team_name }}, #{{ data.number }} -
                {{ data.position == 'D' ? 'Defender' : '' }}
                {{ data.position == 'M' ? 'Midfielder' : '' }}
                {{ data.position == 'F' ? 'Forward' : '' }}
                {{ data.position == 'G' ? 'Goalkeeper' : '' }}
              </p>
              <p class="text-small">
                <img :src="'https://cdn.soccersapi.com/images/soccer/leagues/50/' + data.league_id + '.png'"/>
                {{ data.league_name }}
              </p>
            </b-col>
          </b-row>
        </template>
        <template v-if="data" #lead>
          <b-row class="pt-4">
            <b-col cols="6">
              <p>{{ 'Nationality: ' + data.country_name }}</p>
              <p>Number: {{ data.number }}</p>
              <p>{{ 'Matches Played: ' + data.matches_played_total }}</p>
              <p>{{ 'Weight : ' + data.weight + ' kg, ' + calculatePounds(data.weight) + ' lbs' }}</p>
              <p>{{ 'Matches Started: ' + data.matches_starting_total }}</p>
            </b-col>
            <b-col cols="6">
              <p>{{ 'Age : ' + calculateAge(data.birthday) }}</p>
              <p>
                Position:
                {{ data.position == 'D' ? 'Defender' : '' }}
                {{ data.position == 'M' ? 'Midfielder' : '' }}
                {{ data.position == 'F' ? 'Forward' : '' }}
                {{ data.position == 'G' ? 'Goalkeeper' : '' }}
              </p>
              <p>{{ 'Birthday : ' + data.birthday }}</p>
              <p>{{ 'Height : ' + data.height + ' cm, ' + calculateFeetInchecs(data.height) }}</p>
              <p>{{ 'Starting Average: ' + data.matches_starting_avg + '%' }}</p>
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
    <PlayerStats :stats="data.stats" class="w-100"/>
  </div>
</template>

<script>
import PlayerStats from "@/components/player/PlayerStats";


export default {
  name: "Players",
  components: {PlayerStats},
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {},
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
</style>