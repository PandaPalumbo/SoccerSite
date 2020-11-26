<template>
  <b-row class=" m-4 bg-dark p-2">
    <b-col v-show="sidebarOpen" cols="3" class="bg-dark text-light border-light border rounded">
      <SidebarRow
          v-for="(league, i) in leagues" :key="i"
          class="bg-dark border border-secondary rounded"
          :data="league" :label="league.country_name + ' - ' + league.name" />
    </b-col>
    <b-col class="info-cont m-2">
      <b-row>
        <b-col cols="2">
          <b-button class="ml-2" @click="sidebarOpen = !sidebarOpen">Choose Leagues</b-button>
        </b-col>
        <b-col>
          <SelectedPill v-for="(league, i) in selectedLeagues" :key="i" :data="league" :label="league.name"/>
        </b-col>
      </b-row>
      <div class="m-2 bg-light rounded p-2" v-if="selectedLeagues.length > 0">
        <b-tabs>
          <b-tab title-link-class="font-weight-bold" v-for="(league, i) in selectedLeagues" :key="i" :title="league.name">
            <League :id="parseInt(league.id)" />
          </b-tab>
        </b-tabs>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {mapState} from 'vuex';
import SidebarRow from "@/components/sidebar/SidebarRow";
import SelectedPill from "@/components/sidebar/SelectedPill";
import League from "@/components/league/League";
export default {
  name: "Competitions.vue",
  components: {
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
      sidebarOpen: false,
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.info-cont{
  min-height: 1000px;
}
</style>