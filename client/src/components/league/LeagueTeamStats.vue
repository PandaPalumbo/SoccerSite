<template>
  <div class="text-light p-4">
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th class="text-left pl-4">Team</th>
          <th class="text-center">Stat</th>
          <th class="text-center">Record</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-left">
            <b-row class="justify-content-center">
              <b-col cols="2">
                <img class="team-img" :src="data.mostgoalsteam.data.logo_path"/>
              </b-col>
              <b-col>
                {{data.mostgoalsteam.data.name}}
              </b-col>
            </b-row>
          </td>
          <td class="text-center">Most Goals Scored</td>
          <td class="text-center">{{data.team_with_most_goals_number}}</td>
        </tr>
        <tr>
          <td class="text-left">
            <b-row class="justify-content-center">
              <b-col cols="2">
                <img class="team-img" :src="data.mostgoalspermatchteam.data.logo_path"/>
              </b-col>
              <b-col>
                {{data.mostgoalspermatchteam.data.name}}
              </b-col>
            </b-row>
          </td>
          <td class="text-center">Most Goals Per Match Scored</td>
          <td class="text-center">{{data.team_with_most_goals_per_match_number}}</td>
        </tr>
        <tr>
          <td class="text-left">
            <b-row class="justify-content-center">
              <b-col cols="2">
                <img class="team-img" :src="data.mostconcededgoalsteam.data.logo_path"/>
              </b-col>
              <b-col>
                {{data.mostconcededgoalsteam.data.name}}
              </b-col>
            </b-row>
          </td>
          <td class="text-center">Most Goals Conceded</td>
          <td class="text-center">{{data.team_with_most_conceded_goals_number}}</td>
        </tr>
        <tr>
          <td class="text-left">
            <b-row class="justify-content-center">
              <b-col cols="2">
                <img class="team-img" :src="data.mostcornersteam.data.logo_path"/>
              </b-col>
              <b-col>
                {{data.mostcornersteam.data.name}}
              </b-col>
            </b-row>
          </td>
          <td class="text-center">Most Corners</td>
          <td class="text-center">{{data.team_most_corners_count}}</td>
        </tr>
        <tr>
          <td class="text-left">
            <b-row class="justify-content-center">
              <b-col cols="2">
                <img class="team-img" :src="data.mostcleansheetsteam.data.logo_path"/>
              </b-col>
              <b-col>
                {{data.mostcleansheetsteam.data.name}}
              </b-col>
            </b-row>
          </td>
          <td class="text-center">Most Clean Sheets</td>
          <td class="text-center">{{data.team_most_cleansheets_number}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LeagueTeamStats",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredData() {

      let keys = Object.keys(this.data);
      let obj = {};
      keys.forEach(key => {
        if(key.indexOf('team') !=-1){
          obj[key] = this.data[key];
        }
      })
      console.log(obj);
      return obj;
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>

<style scoped>
.team-img{
  max-height: 50px;
  max-width: 50px
}
</style>