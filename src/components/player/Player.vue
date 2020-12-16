<template>
  <div class="mx-4" v-if="data">
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 m-1 p-4">
        <template #header>
          <b-row class="border-bottom border-light-gray border-rounded">
            <b-col cols="2">
              <img @error="altImage" class="player-img bg-light"
                   :src="'https://cdn.soccersapi.com/images/soccer/players/100/'+data.id+'.png'"/>
            </b-col>
            <b-col cols="10">
              <p>{{ data.firstname + " " + data.lastname }}</p>
              <p class="text-small">
                <img :src="'https://cdn.soccersapi.com/images/soccer/teams/50/' + data.team_id + '.png'"/>
                {{data.team_name}}, #{{data.number}} -
                {{data.position  == 'D'? 'Defender' : ''}}
                {{data.position  == 'M'? 'Midfielder' : ''}}
                {{data.position  == 'F'? 'Forward' : ''}}
                {{data.position  == 'G'? 'Goalkeeper' : ''}}
              </p>
              <p class="text-small">
                <img :src="'https://cdn.soccersapi.com/images/soccer/leagues/50/' + data.league_id + '.png'"/> {{data.league_name}}
              </p>
            </b-col>
          </b-row>
        </template>
        <template v-if="data" #lead>
          <b-row>
            <b-col cols="6">
              <p>{{ 'Nationality: ' + data.country_name }}</p>
              <p>Number: {{data.number}}</p>
              <p>{{ 'Matches Played: ' + data.matches_played_total }}</p>
              <p>{{ 'Weight : ' + data.weight + ' kg, ' + calculatePounds(data.weight) + ' lbs' }}</p>
              <p>{{ 'Matches Started: ' + data.matches_starting_total}}</p>
            </b-col>
            <b-col cols="6">
              <p>{{ 'Age : ' + calculateAge(data.birthday) }}</p>
              <p>
                Position:
                {{data.position  == 'D'? 'Defender' : ''}}
                {{data.position  == 'M'? 'Midfielder' : ''}}
                {{data.position  == 'F'? 'Forward' : ''}}
                {{data.position  == 'G'? 'Goalkeeper' : ''}}
              </p>
              <p>{{ 'Birthday : ' + data.birthday }}</p>
              <p>{{ 'Height : ' + data.height + ' cm, ' + calculateFeetInchecs(data.height) }}</p>
              <p>{{ 'Starting Average: ' + data.matches_starting_avg + '%'}}</p>
            </b-col>
          </b-row>
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>
    <PlayerStats :stats="stats" class="w-100"/>
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
  computed: {
    stats() {
      let data = this.data;
      let obj = {
        'assists':{
          'total': data['assists_total'] ? data['assists_total'] : 0,
          'avg': data['assists_avg'] ? data['assists_avg'] : 0,
        },
        'penalties':{
          'total': data['penalties_total'] ? data['penalties_total'] : 0,
          'avg': data['penalties_avg'] ? data['penalties_avg'] : 0,
        },
        'offsides':{
          'total': data['offsides_total'] ? data['offsides_total'] : 0,
          'avg': data['offsides_avg'] ? data['offsides_avg'] : 0,
        },
        'substitutions':{
          'in':{
            'total': data['substitutions_in_total'] ? data['substitutions_in_total'] : 0,
            'avg': data['substitutions_in_avg'] ? data['substitutions_in_avg'] : 0,
          },
          'out':{
            'total': data['substitutions_in_total'] ? data['substitutions_in_total'] : 0,
            'avg': data['substitutions_in_avg'] ? data['substitutions_in_avg'] : 0,
          }
        },
        'cards':{
          'yellow':{
            'total': data['cards_yellow_total'] ? data['cards_yellow_total'] : 0,
            'avg': data['cards_yellow_avg'] ? data['cards_yellow_avg'] : 0
          },
          'yellowred':{
            'total': data['cards_yellowred_total'] ? data['cards_yellowred_total'] : 0,
            'avg': data['cards_yellowred_avg'] ? data['cards_yellowred_avg'] : 0,
          },
          'redcards':{
            'total': data['cards_redcards_total'] ? data['cards_redcards_total'] : 0,
            'avg': data['cards_redcards_avg'] ? data['cards_redcards_avg'] : 0,
          },
        },
        'goals':{
          'total': data['goals_total'] ? data['goals_total'] : 0,
          'avg': data['goals_avg'] ? data['goals_avg'] : 0,
        },
        'shots':{
          'total': data['shots_total'] ? data['shots_total'] : 0,
          'avg_calc':(data['shots_total'] ? data['shots_total'] : 0)/data['matches_played_total'],
          'on_target':{
            'total': data['shots_on_target_total'] ? data['shots_on_target_total'] : 0,
            'avg': data['shots_on_target_avg'] ? data['shots_on_target_avg'] : 0,
          },
          'off_target':{
            'total': data['shots_off_target_total'] ? data['shots_off_target_total'] : 0,
            'avg': data['shots_off_target_avg'] ? data['shots_off_target_avg'] : 0,
          },
          'blocked':{
            'total': data['shots_blocked_total'] ? data['shots_blocked_total'] : 0,
            'avg': data['shots_blocked_avg'] ? data['shots_blocked_avg'] : 0,
          },
        },
        'corners':{
          'total': data['corners_total'] ? data['corners_total'] : 0 ,
          'avg': data['corners_avg'] ? data['corners_avg'] : 0,
        },
    }
      return obj
    }
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
.text-small{
  font-size: .5em;
}
.tab {
  width: 100%;
  margin: auto;
}
.player-img{
  width:150px;
  height:150px;
}
</style>