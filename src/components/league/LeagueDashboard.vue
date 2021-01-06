<template>
  <!--  Main Cont-->
  <div class="mx-4" v-if="data">
    <!-- Page Header   -->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1">
        <template #header>
          <img class="league-img bg-light"
               :src="data.logo_path"/>
          {{ data.name + ' - ' + data.country.data.name }}
        </template>
      </b-jumbotron>
    </b-row>
    <!--  Data Container  -->
    <LeagueStats :stats="stats" :league="data"/>

  </div>
</template>

<script>
import LeagueStats from "@/components/league/LeagueStats";
export default {
  name: "League",
  components: {LeagueStats},

  props: {
    id: {
      type: Number,
      required: true,
    },
    data: {
      type:Object,
      required:true,
    }
  },
  computed:{
    stats(){
      return this.data.seasons.data.filter(season => season.stats)
    }
  },
  data() {
    return {
      selectedSeasons:[],
    }
  },
  methods: {


    //getting object of stats I want to show in tab format and not in the header.
    getTabStats(stats) {
      if (this.stats) {
        let keys = Object.keys(stats);
        let newStats = {};
        keys.forEach(key => {
          if (typeof stats[key] === "object" && key !== 'team_most_scored' && key !== 'player_most_scored' && key !== 'goal_line') {
            newStats[key] = stats[key];
          }
        });
        //console.log(newStats)
        return newStats;
      } else
        return false;
    },

    getColor() {
      return this.$randomColor({luminosity: 'bright'}).toString();
    }
  },
}
</script>

<style scoped>
.league-cont {
  width: 100%;
}

.tab {
  width: 100%;
  margin: auto;
}
</style>