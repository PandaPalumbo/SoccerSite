<template>
  <b-container fluid>
<!--    CATEGORIES / FIELDS-->
    <b-row>
      <b-col cols="4">
        <b-row class="">
          <b-col v-for="(category, i) in Object.keys(categories)" :key="i" cols="5 p-2" class="border rounded m-1">
            <b-form-checkbox-group v-if="category !== 'game'" @change="generateGraph()" v-model="selectedFields">
              <section v-if="category !== 'game'">
                <h4>{{ prettyCasing(category) }}</h4>
                <b-form-checkbox v-for="(field, i) in categories[category]" :key="i" :value="`${category}_${field}`">{{
                    prettyCasing(field)
                  }}
                </b-form-checkbox>
              </section>
            </b-form-checkbox-group>
          </b-col>
        </b-row>
<!--        TIME MEASURES-->
        <b-row>
          <b-form-radio-group @change="generateGraph()" v-model="selectedTimeField">

            <b-col cols="12" class="border rounded m-1">
              <h4>Time Measures</h4>
              <div v-for="(category, i) in timeMeasureCategories.games" :key="i">


                <b-form-radio :value="`${category}`">{{ category }}</b-form-radio>

              </div>
            </b-col>
          </b-form-radio-group>
        </b-row>
      </b-col>

      <b-col cols="8">
        <div class="m-auto text-center"  v-if="selectedFields.length >= 3 && radarData && !isGenerating">
          <h3>
            {{this.selectedTimeField === 'minutes' ? 'Per 90' : 'Per appearance'}}
          </h3>
        </div>
        <div  class="text-center m-auto" v-if="selectedFields.length >= 3 && radarData && !isGenerating">
          <Radar style="width:65%; height: 65%; margin: auto" :chart-data="radarData" :options="radarOptions"/>
        </div>
        <div class="text-center m-auto" v-else>
          <h3 class="m-auto">Select 3 or more stats to compare with a radar chart!</h3>
        </div>
      </b-col>
    </b-row>
  </b-container>

</template>

<script>
import Radar from "../charts/Radar";
import {mapState} from "vuex";
import {getColor, prettyCasing} from "@/utils";

export default {
  name: "PlayerRadar",
  components: {Radar},
  props: {},
  data() {
    return {
      selectedFields: [],
      selectedTimeField: 'minutes',
      isGenerating: false,
      radarData: null,
      radarOptions: //options
          {
            legend: {
              labels: {
                fontColor: '#f7f7f7',
                fontSize: 15,
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
          ret[selected] = (statistics[category][field] / timeMath).toFixed(2)
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
        this.isGenerating = true
        let labels = this.selectedFields.map(field => {
          return prettyCasing(field)
        })
        this.radarData = {
          labels: labels,
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
          obj['label'] = stat.name
          obj['pointBackgroundColor'] = color[1]
          obj['lineTension'] = 0
          obj['borderColor'] = color[1]
          obj['borderWidth'] = 2
          return obj;
        })
        console.log('Datasets: ', dataset)
        this.radarOptions = {
          legend: {
            labels: {
              fontColor: '#f7f7f7',
              fontSize: 15,
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
        this.radarData.datasets = dataset;
        this.isGenerating = false
        console.log(this.radarData)
      }
    },
    prettyCasing
  }
}
</script>

<style scoped>

</style>