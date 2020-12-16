<template>
  <b-row v-if="stats" class="bg-light-dark p-1 mb-2 rounded w-100">
    <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold" class="tab w-100 bg-dark">
      <b-tab title-link-class="text-light  font-weight-bold" v-for="(key, i) in Object.keys(stats)"
             :key="Math.random() * i" :title="prettyCasing(key)">
        <b-row class="m-2 bg-light-dark" v-if="key === 'assists'">
          <StatsTable :data="stats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'goals'">
          <StatsTable :data="stats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'penalties'">
          <StatsTable :data="stats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'offsides'">
          <StatsTable :data="stats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'substitutions'">
          <StatsTable :data="stats[key]['in']" :label="prettyCasing(key + ' In')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['out']" :label="prettyCasing(key + ' Out')" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'cards'">
          <StatsTable :data="stats[key]['yellow']" :label="prettyCasing('Yellow Cards')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['yellowred']" :label="prettyCasing('Red Cards - Double Yellow')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['redcards']" :label="prettyCasing('Straight Reds')" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'shots'">
          <StatsTable :data="stats[key]" :label="prettyCasing('Total Shots')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['on_target']" :label="prettyCasing('Shots On Target')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['off_target']" :label="prettyCasing('Shots On Target')" variant="dark" class="m-4"/>
          <StatsTable :data="stats[key]['blocked']" :label="prettyCasing('Taken Shots Blocked')" variant="dark" class="m-4"/>
        </b-row>
        <b-row class="m-2 bg-light-dark" v-if="key === 'corners'">
          <StatsTable :data="stats[key]" :label="prettyCasing(key)" variant="dark" class="m-4"/>
        </b-row>
      </b-tab>
    </b-tabs>
  </b-row>
</template>

<script>
import StatsTable from "@/components/charts/StatsTable";

export default {
name: "PlayerStats",
  components:{StatsTable},
  props: {
    stats: {
      type: Object,
      required: true,
    },
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
    }
  },
}
</script>

<style scoped>

</style>