<template>
  <div class="mx-4">
    <b-row v-if="leaguesWithStats.length > 1 && tabLabels" class="bg-light-dark p-1 mb-2 rounded">
      <b-tabs active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab  bg-dark">
        <b-tab title-link-class="text-light  font-weight-bold"
               v-for="(key, i) in this.tabLabels"
               :key="Math.random() * i"
               :title="prettyCasing(key)"
        >
          <b-row class="m-2 bg-light-dark text-light">
            <ComparisonTable :data="leaguesWithStats" :data-field="key"/>
          </b-row>

        </b-tab>
      </b-tabs>
    </b-row>
    <b-row class="justify-content-center" v-else>
      <b-spinner variant="light"></b-spinner>
    </b-row>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import api from "@/api";
import ComparisonTable from "@/components/charts/ComparisonTable";

export default {
  name: "LeagueComparison",
  components:{ComparisonTable},
  computed: {
    ...mapState({
      selectedLeagues: state => state.selected.leagues,
    })
  },
  data() {
    return {
      leaguesWithStats: [],
      tabLabels: null,
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
    getStats(id, cb) {
      api.getData.getLeagueStats(id, data => {
        cb(data.data);
      });
    },
    getColor() {
      return this.$randomColor({luminosity: 'bright'}).toString();
    },
    getAllStats() {
      this.selectedLeagues.forEach(league => {
        let tempLeague = league;
        if(!league.stats) {
          this.getStats(league.id, data => {
            tempLeague['stats'] = data;
            this.leaguesWithStats.push(tempLeague);
            this.getTabLables();
          })
        }else {
          this.leaguesWithStats.push(tempLeague);
          this.getTabLables();
        }
      })
    },
    getTabLables() {
      if (this.leaguesWithStats.length > 1) {
        let keys = Object.keys(this.leaguesWithStats[0]['stats']);
        let stats = this.leaguesWithStats[0]['stats'];
        let labels = keys.filter(key => key != 'player_most_scored' && key != 'team_most_scored' && key != 'goal_line' && typeof stats[key] != 'number').map(key => key);
        this.tabLabels = labels;
      }
    },
  },
  mounted() {
    this.getAllStats();
  }
}
</script>

<style scoped>
.tab {
  width: 100%;
  margin: auto;
}
</style>