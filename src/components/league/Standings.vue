<template>
<div>
  <div v-if="loaded">
    <table class=" m-4 table table-bordered table-striped table-dark ">
      <thead>
        <th>#</th>
        <th>Team</th>
        <th>GP</th>
        <th>Won</th>
        <th>Draw</th>
        <th>Lost</th>
        <th>GS</th>
        <th>GA</th>
        <th>GD</th>
        <th>Form</th>
        <th>Points</th>
      </thead>
      <tbody>
        <tr v-for="(team, i) in standings[0].standings.data" :key="i">
          <td>{{team.position}}</td>
          <td><img class="small-img mx-4" :src="team.team.data.logo_path" />{{ team.team.data.name }}</td>
          <td>{{ team.overall.games_played }}</td>
          <td>{{ team.overall.won }}</td>
          <td>{{ team.overall.draw }}</td>
          <td>{{ team.overall.lost }}</td>
          <td>{{ team.overall.goals_scored }}</td>
          <td>{{ team.overall.goals_against }}</td>
          <td>{{ team.overall.goals_scored -  team.overall.goals_against}}</td>
          <td class="justify-content-center">
            <div class="d-inline-flex m-1" v-for="(letter, i) in team.recent_form" :key="i">
              <span class="bg-success form-letter p-1" v-if="letter == 'W'">{{letter}}</span>
              <span class="bg-warning form-letter p-1" v-if="letter == 'D'">{{letter}}</span>
              <span class="bg-danger form-letter p-1" v-if="letter == 'L'">{{letter}}</span>
            </div>
          </td>
          <td>{{ team.points }}</td>
        </tr>
      </tbody>

    </table>
  </div>
  <b-spinner v-else>

  </b-spinner>
</div>
</template>

<script>
import api from "@/api";

export default {
name: "Standings",
  props:{
    id:{
      type: Number,
      required: true,
    }
  },
  data(){
    return {
      loaded:null,
      standings:null,
    }
  },
  mounted() {
    api.getData.getCurrentLeagueStandings(this.id, (data)=>{
      this.loaded = true;
      this.standings = data;
      console.log(data)
    })
  }
}
</script>

<style scoped>
.form-letter{
  font-weight: bold;
  border-radius: 15px;
}
</style>