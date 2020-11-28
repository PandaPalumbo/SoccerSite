<template>
  <b-col class="mx-auto my-1" cols="11" v-if="subKeys">
    <div v-for="(tableName, i) in statlabels" :key="i">
      <table v-if="tableName != 'name'" class="table table-striped table-dark table-bordered">
        <thead>
        <tr>
          <th :class="['text-center']" :colspan="subKeys.length + 1">{{tableName == 'yellowred' ? 'Red - Double Yellow' : prettyCasing(tableName) }}</th>
        </tr>
        <tr>
          <th v-for="(key, x) in subKeys" :key="x">{{prettyCasing(key)}}</th>
        </tr>
        </thead>
        <tbody>
        <tr  v-for="(stats, x) in wantedStats" :key="x">
          <td v-for="(key, y) in subKeys" :key="y">
            {{dataField == 'clean_sheets' && key == 'avg_per_match' ?parseFloat(stats[tableName][key]/100).toFixed(2) : stats[tableName][key]}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </b-col>
  <b-col class="mx-auto my-1" cols="11" v-else>
    <table class="table table-striped table-dark">
      <thead>
      <tr>
        <th :colspan="statlabels.length + 1" class="text-center">{{prettyCasing(dataField)}}</th>
      </tr>
      <tr>
        <th v-for="(label,i) in statlabels" :key="i">{{prettyCasing(label)}}</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(stats,i) in wantedStats" :key="i">
          <td v-for="(label,x) in statlabels" :key="x">
            {{label === 'avg_every_minutes' ? parseFloat(90/stats['avg_per_match']).toFixed(2) : stats[label]}}
          </td>
        </tr>
      </tbody>
    </table>
  </b-col>
</template>

<script>
export default {
  name: "ComparisonTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
    dataField: {
      type: String,
      required: true,
    }
  },
  computed: {
    wantedStats() {
      let stats = this.data.map(league => {
        if(league.stats[this.dataField]['avg_per_match'] !== undefined) {
          league.stats[this.dataField]['name'] = league.country_name + ' - ' + league.name;
        }
        else{
          let keys = Object.keys(league.stats[this.dataField]);
          keys.map(key => league.stats[this.dataField][key]['name'] = league.country_name +' - ' + league.name)
        }
        return league.stats[this.dataField]
      });
      return stats;
    },
    statlabels(){
      let stats = this.wantedStats;
      let keys = Object.keys(stats[0]);
      keys.sort((a,b) => {
        if(a=='name' && b != a)
          return -1
      })
      return keys;
    },
    subKeys() {
      let stats = this.wantedStats;
      let subkeys = Object.keys(stats[0]);
      if (typeof stats[0][subkeys[0]] == 'object') {
        let keys = Object.keys(stats[0][subkeys[0]])
        keys.sort((a,b) => {
          if(a=='name' && b != a)
            return -1
        })
        return keys;
      }
      else
        return null;
    },
    // subKeyStats(){
    //   if(this.subKeys) {
    //     let stats = {};
    //   }else {
    //     return null;
    //   }
    // }
  },
  methods:{
    prettyCasing(string) {
      let splitString = string.split('_');
      let res = "";
      splitString.map(string => {
        string = string.charAt(0).toUpperCase() + string.slice(1)
        res += string + " "
      })
      return res;
    },
  },
  mounted() {
    //console.log(this.data)
  }
}
</script>

<style scoped>

</style>