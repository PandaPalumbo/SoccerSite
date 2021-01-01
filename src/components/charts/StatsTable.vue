<template>
  <b-col class="mx-auto my-1" cols="11">
    <table :class="['table table-bordered table-striped table-'+variant]">
      <thead>
      <tr>
        <th scope="col" colspan="2" class="text-center">
          <span>{{ label + ' ' }}</span>
          <span class="text-warning">{{ areAnyZero ? ' *' : '' }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(key, i) in wantedDataPoints" :key="i" >
        <th v-if="key == 'owngoals'" scope="row">
         Own Goals
        </th>
        <th v-else-if="key == 'yellowcards'" scope="row">
          Yellow Cards
        </th>
        <th v-else-if="key == 'yellowred'" scope="row">
          Red Card - Double Yellow
        </th>
        <th v-else-if="key == 'redcards'" scope="row">
          Straight Red Card
        </th>
        <th v-else-if="key == 'redcards'" scope="row">
          Straight Red Card
        </th>
        <th v-else scope="row">
          {{ prettyCasing(key) }}
        </th>
        <td>{{data[key] ? data[key] : 0}}</td>
      </tr>
      </tbody>
    </table>
    <span v-if="areAnyZero" class="text-warning ml-4"> * Values of 0 may be incomplete data</span>
  </b-col>

</template>

<script>
export default {
  name: "StatsTable",
  props: {
    data: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: false,
      default: 'light',
    },
  },
  computed: {
    areAnyZero() {
      let keys = Object.keys(this.data);
      let areAnyZero = false
      keys.forEach(key => {
        if (!this.data[key])
          areAnyZero = true;
        return areAnyZero
      })
      return areAnyZero
    },
    wantedDataPoints() {
      let keys = Object.keys(this.data);
      keys = keys.filter(key => {
        return key != 'season_data' && key != 'player_id' && key != 'team_id' && key != 'season_id' && key != 'captain' && key != 'league_id' && key != 'type' && key != 'league_data'

      })
      return keys;
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