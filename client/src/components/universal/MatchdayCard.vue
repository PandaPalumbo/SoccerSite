<template>
  <div class="my-4">

    <b-card-group deck>
      <b-card bg-variant="light-dark" text-variant="light" header-class="bigger-text font-weight-bold" :header="date" class="text-center">
        <b-row class="border-top border-bottom border-dark p-2 mx-2 justify-content-around"
               v-for="(fixture, i) in fixtures" :key="i">

          <!--    Home Team      -->
          <b-col cols="5" class="m-auto">
            <b-row  :class="'bg-'+determineOutcomeVariant(fixture, 'localteam_score') + ' rounded p-2'">
              <b-col  class="m-auto">
                <p class="m-auto bigger-text font-weight-bold ">{{ fixture.localTeam.data.name }}</p>
              </b-col>
              <b-col cols="2">
                <img class="team-img m-auto" :src="fixture.localTeam.data.logo_path"/>
              </b-col>
              <b-col cols="2" class="m-auto">
                <p class=" m-auto score-text font-weight-bold ">{{ fixture.scores.localteam_score }}</p>
              </b-col>

            </b-row>
          </b-col>

          <!--    Vs Time  Weather    -->
          <b-col cols="2">
            <b-row v-if="fixture.league">
              <p class="m-auto bigger-text font-weight-bold ">
                <u>{{fixture.league.data.name}}</u>
              </p>
            </b-row>
            <b-row v-if="!date">
              <p class="m-auto bigger-text font-weight-bold ">
                {{ new Date(fixture.time.starting_at.timestamp * 1000).toLocaleDateString()}}
              </p>
            </b-row>
            <b-row>
              <p class="m-auto bigger-text font-weight-bold ">
                {{ new Date(fixture.time.starting_at.timestamp * 1000).toLocaleTimeString()}}
              </p>
            </b-row>
<!--            <b-row>-->
<!--              <p class="m-auto bigger-text font-weight-bold ">vs </p>-->
<!--            </b-row>-->
            <b-row>
              <p class="m-auto bigger-text font-weight-bold ">
              {{fixture.time.status == 'NS' ? 'Not Started' : ''}}
              {{fixture.time.status == 'LIVE' ? 'Live' : ''}}
              {{fixture.time.status == 'HT' ? 'Half-time' : ''}}
              {{fixture.time.status == 'FT' ? 'Full-time' : ''}}
              {{fixture.time.status == 'ABAN' ? 'Abandoned' : ''}}
              {{fixture.time.status == 'SUSP' ? 'Suspended' : ''}}
              {{fixture.time.status == 'POSTP' ? 'Postponed' : ''}}
              </p>
            </b-row>
          </b-col>

          <!--    Away Team      -->
          <b-col cols="5" class="m-auto">
            <b-row
                :class="'bg-'+determineOutcomeVariant(fixture, 'visitorteam_score') + ' rounded p-2'"
            >
              <b-col cols="2"  class="m-auto">
                <p class="m-auto score-text font-weight-bold ">{{ fixture.scores.visitorteam_score }}</p>
              </b-col>
              <b-col cols="2">
                <img class="team-img m-auto" :src="fixture.visitorTeam.data.logo_path"/>
              </b-col>
              <b-col  class="m-auto">
                <p class="m-auto bigger-text font-weight-bold ">{{ fixture.visitorTeam.data.name }}</p>
              </b-col>
            </b-row>
          </b-col>

        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "MatchdayCard",
  props: {
    fixtures: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },
  methods:{
    determineOutcomeVariant(fixture, whichTeamScore){
      if(whichTeamScore == 'localteam_score'){
        if(fixture.scores[whichTeamScore] > fixture.scores['visitorteam_score']){
          return 'success'
        }
        else if(fixture.scores[whichTeamScore] < fixture.scores['visitorteam_score']){
          return 'danger'
        }
        else if(fixture.scores[whichTeamScore] == fixture.scores['visitorteam_score']){
          return 'warning'
        }
      }
      if(whichTeamScore == 'visitorteam_score'){
        if(fixture.scores[whichTeamScore] > fixture.scores['localteam_score']){
          return 'success'
        }
        else if(fixture.scores[whichTeamScore] < fixture.scores['localteam_score']){
          return 'danger'
        }
        else if(fixture.scores[whichTeamScore] == fixture.scores['localteam_score']){
          return 'warning'
        }
      }
    }
  },

}
</script>

<style scoped>
.team-img {
  max-height: 75px;
  max-width: 75px;
  height:75px;
  width:75px;
}

.bigger-text {
  font-size: 1.2em;
}
.score-text {
  font-size: 1.5em;
}

</style>