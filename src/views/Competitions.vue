<template>
  <b-row class=" m-4 bg-dark p-2">
    <b-col v-show="sidebarOpen" cols="3" class="bg-dark text-light border-light border rounded overflow-auto">
      <SidebarRow
          v-for="(league, i) in leagues" :key="i" type="leagues"
          class="bg-dark border border-secondary rounded"
          :data="league" :label="league.country_name + ' - ' + league.name" />
    </b-col>
    <b-col class="info-cont m-2">
      <b-row>
        <b-col cols="3" class="ml-4">
          <b-row>
            <b-button v-show="!comparing" class="ml-2" @click="sidebarOpen = !sidebarOpen">{{ sidebarOpen ? 'Hide Leagues' : 'Choose Leagues' }}</b-button>
            <b-button v-show="selectedLeagues.length >1" class="ml-2" @click="canCompare">{{ comparing? 'Stop Comparing' : 'Compare Selcted' }}</b-button>
          </b-row>
        </b-col>
        <b-col>
          <SelectedPill v-for="(league) in selectedLeagues" :key="league.id" :data="league" :label="league.name" variant="danger"/>
        </b-col>
      </b-row>
      <b-row v-if="showAlert" class="alert alert-warning mx-auto mt-2">
        Select two or more leagues to compare!
      </b-row>
      <div class="m-2 bg-light-dark rounded p-2" v-show="selectedLeagues.length > 0 && !comparing">
        <b-tabs active-nav-item-class="bg-light-dark text-light " class="bg-dark rounded p-1">
          <b-tab title-link-class="font-weight-bold text-light" v-for="(league, i) in selectedLeagues" :key="i" :title="league.name">
            <League :id="parseInt(league.id)" />
          </b-tab>
        </b-tabs>
      </div>
      <div class="m-2 bg-light-dark rounded p-2" v-show="selectedLeagues.length > 1 && comparing">
        <LeagueComparison v-if="selectedLeagues.length > 1  && comparing"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {mapState} from 'vuex';
import SidebarRow from "@/components/sidebar/SidebarRow";
import SelectedPill from "@/components/sidebar/SelectedPill";
import League from "@/components/league/League";
import LeagueComparison from "@/components/league/LeagueComparison";

export default {
  name: "Competitions.vue",
  components: {
    LeagueComparison,
    SidebarRow, SelectedPill, League
  },
  computed: {
    ...mapState({
      leagues: state => state.leagues,
      selectedLeagues: state => state.selected.leagues,
    }),
  },
  data() {
    return {
      sidebarOpen: true,
      comparing: false,
      showAlert:false,
    }
  },
  methods:{
    canCompare(){
      if(this.selectedLeagues.length > 1){
        this.comparing = !this.comparing;
        this.toggleAlert(false)
        if(this.comparing)
          this.sidebarOpen = false;
      } else {
        this.comparing = false;
        this.toggleAlert(true)
      }
    },
    toggleAlert(bool){
        this.showAlert = bool;
    }
  },
}
</script>

<style scoped>
.info-cont{
  min-height: 1000px;
}
</style>