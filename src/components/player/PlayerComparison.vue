<template>
  <!--  Main Containter-->
  <div class="mx-4">
    <!--    Header Container-->
    <b-row class="league-cont">
      <b-jumbotron bg-variant="dark" text-variant="light" class="w-100 mt-1">
        <template v-if="names" #lead>
          <!-- Radar   -->
          <b-row v-if="selectedPlayers.length > 1" class="w-100 h-100">
            <Radar  style="width: 50%; height: 50%; margin:auto;"  :data="radarStats.datasets" :labels="radarStats.lables"/>
          </b-row>
        </template>
        <template #lead v-else>
          <b-row class="justify-content-center">
            <b-spinner></b-spinner>
          </b-row>
        </template>
      </b-jumbotron>
    </b-row>
    <!--    Data container-->

    <!--    Tables-->
    <b-row v-if="selectedPlayers.length > 1 && tabLabels" class="bg-light-dark p-1 mb-2 rounded">
      <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab  bg-dark">
        <b-tab title-link-class="text-light  font-weight-bold"
               v-for="(key, i) in this.tabLabels"
               :key="Math.random() * i"
               :title="prettyCasing(key)"
        >
          <!--          for each data point make a table of points-->
          <b-row class="m-2 bg-light-dark text-light">
            <ComparisonTable v-if="key != 'name' " :data="stats" :data-field="key"/>
          </b-row>

        </b-tab>
      </b-tabs>
    </b-row>
    <!--    if no data show loading-->
    <b-row class="justify-content-center" v-else>
      <b-spinner variant="light"></b-spinner>
    </b-row>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import Radar from "@/components/charts/Radar";
import ComparisonTable from "@/components/charts/ComparisonTable";

//TODO add more graphs and stuff;
export default {
  name: "LeagueComparison",
  components: {ComparisonTable, Radar},
  computed: {
    ...mapState({
      selectedPlayers: state => state.selected.players,
    }),
    names() {
      return this.selectedPlayers.map(player => player.name)
    },
    stats() {
      let stats = this.selectedPlayers.map((player, i) => {
            let stats  = player.stats
            stats['name'] = this.names[i]
            return stats;
          }
      )
      return stats;
    },
    tabLabels() {
      let lables = Object.keys(this.stats[0]);
      lables.splice(lables.indexOf('name'), 1)
      return lables;
    },
    radarStats() {
      let stats = this.stats;
      let lables = [
        'Assists/Game',
        'Goals/Game',
        'Cards',
        'Subs In/Game',
        'Subs Out/Game',
        'Shots on Target/Game',
        'Shots off Target/Game',
        'Shots blocked Target/Game',
      ]
      let retObj = {
        lables: lables,
        datasets: null,
      }
      retObj.datasets = stats.map((player, i) => {
        let matches = this.selectedPlayers.filter(p2 => player.name = p2.name)[0]['matches_played_total']
        let color = this.getColor(0.5);
        return {
          data: [
            (player.assists.total ? player.assists.total : 0) / matches,
            (player.goals.total ? player.goals.total : 0) / matches,
            ((player.cards.yellow.total ? player.cards.yellow.total : 0) + (player.cards.yellowred.total ? player.cards.yellowred.total : 0) + (player.cards.redcards.total ? player.cards.redcards.total : 0) )/ matches,
            (player.substitutions.in.total ? player.substitutions.in.total : 0) / matches,
            (player.substitutions.out.total ? player.substitutions.out.total : 0) / matches,
            (player.shots.on_target.total ? player.shots.on_target.total : 0) / matches,
            (player.shots.off_target.total ? player.shots.off_target.total : 0) / matches,
            (player.shots.blocked.total ? player.shots.blocked.total : 0) / matches,
          ],
          backgroundColor: color[0],
          label: this.names[i],
          pointBackgroundColor: color[1],
          lineTension: 0,
          borderColor: color[1],
          borderWidth:2,
        }
      })

      return retObj;
    },
  },
  data() {
    return {}
  },
  methods: {
    prettyCasing(string) {
      let splitString = string.split('_');
      let res = "";
      splitString.map((string) => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },
    getColor(alpha) {
      let r1 = Math.random() * 255
      let r2 = Math.random() * 255
      let r3 = Math.random() * 255
      return ['rgb('+r1+','+r2+','+r3+','+alpha+')', 'rgb('+r1+','+r2+','+r3+',1)'];
    },

  },
}
</script>

<style scoped>
.tab {
  width: 100%;
  margin: auto;
}
</style>