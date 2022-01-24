<template>
  <b-row>
    <b-col cols="4">
      <b-form-checkbox-group @change="generateGraph()" v-model="selectedFields">
        <b-row>
          <div v-for="(category, i) in Object.keys(categories)" :key="i">
            <b-col cols="5">
              <h4>{{ category }}</h4>
              <div v-for="(field, i) in categories[category]" :key="i">
                <b-form-checkbox v-if="category !== 'game'" :value="`${category}_${field}`">{{
                    field
                  }}
                </b-form-checkbox>
              </div>
            </b-col>
          </div>
        </b-row>
      </b-form-checkbox-group>

      <b-form-radio-group @change="generateGraph()" v-model="selectedTimeField">
        <b-row>
          <b-col cols="5">
            <h4>Time Measures</h4>
            <div v-for="(category, i) in timeMeasureCategories.games" :key="i">


              <b-form-radio :value="`${category}`">{{ category }}</b-form-radio>

            </div>
          </b-col>
        </b-row>
      </b-form-radio-group>
    </b-col>

    <b-col cols="8">
      <div v-if="selectedFields.length >= 3 && radarData">
        <Radar style="width:65%; height: 65%;" :chart-data="radarData" :options="radarOptions"/>
      </div>
      <div class="text-center m-auto" v-else>
        <h3 class="m-auto">Select 3 or more stats to compare with a radar chart!</h3>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Radar from "../charts/Radar";
import {mapState} from "vuex";
import {getColor} from "@/utils";

export default {
  name: "PlayerRadar",
  components: {Radar},
  props: {
  },
  data() {
    return {
      selectedFields: [],
      selectedTimeField: 'minutes',
      radarData: null,
      radarOptions: //options
          {
            legend: {
              labels: {
                fontColor: '#f7f7f7',
                fontSize: 16,
              }
            },
            scale: {
              gridLines: {
                color: '#f7f7f7',
              },
              pointLabels: {
                fontColor: '#f7f7f7',
                fontSize: 12,
              }
            },
            maintainAspectRatio: true,
            animation: {
              animateRotate: true
            }
          }
    }
  },
  computed: {
    ...mapState({
      selectedPlayers: state => state.selected.players,
    }),
    categories() {
      let stats = this.selectedPlayers[0].statistics
      let categories = {}
      for (const category in stats) {
        if (category !== 'teams' && category !== 'leagues' && category !== 'games')
          categories[category] = Object.keys(stats[category]).filter(key => {
            return key !== 'positions' && key !== 'number' && key !== 'captain' && key !== 'rating'
          })
      }
      return categories
    },
    timeMeasureCategories() {
      let stats = this.selectedPlayers[0].statistics
      let categories = {}
      for (const category in stats) {
        if (category == 'games')
          categories[category] = Object.keys(stats[category]).filter(key => key == 'minutes' || key == 'appearences')
      }
      console.log('categories: ', categories)
      return categories
    },
    radarStats() {

      const stats = this.selectedPlayers.map(({player, statistics}) => {
        let ret = {}
        ret['name'] = player.name
        this.selectedFields.forEach((selected) => {
          let category = selected.split('_')[0]
          let field = selected.split('_')[1]
          let timeMath = this.selectedTimeField == 'minutes' ? statistics['games'][this.selectedTimeField] / 90 : statistics['games'][this.selectedTimeField]
          ret[selected] = ( statistics[category][field] / timeMath ).toFixed(2)
        })
        return ret
      })

      console.log('stats: ', stats)
      return stats
    },
    names() {
      return this.stats.map(stat => stat.name)
    }
  },
  methods: {
    generateGraph() {
      if (this.selectedFields.length >= 3) {
        this.radarData = {
          labels: this.selectedFields,
          datasets: null,
        };
        let dataset = this.radarStats.map(stat => {
          let color = getColor(0.5)
          let obj = {}
          obj['data'] = []
          this.selectedFields.forEach(field => {
            obj['data'].push(parseFloat(stat[field]));
          })
          obj['backgroundColor'] = color[0];
          if(this.selectedTimeField == 'minutes'){
            obj['label'] = stat.name + ', per 90'
          } else {
            obj['label'] = stat.name + ', per appearance'
          }
          obj['pointBackgroundColor'] = color[1]
          obj['lineTension'] = 0
          obj['borderColor'] = color[1]
          obj['borderWidth'] = 2
          return obj;
        })
        console.log('Datasets: ', dataset)
        this.radarData.datasets = dataset;
        console.log(this.radarData)
      }
    },
  }
}
</script>

<style scoped>

</style>