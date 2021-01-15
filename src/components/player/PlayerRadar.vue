<template>
  <b-row>
    <b-col cols="4">
        <b-form-checkbox-group @change="generateGraph()"
            v-model="selectedFields">
          <div  v-for="(field, i) in availableFields" :key="i">
            <b-row v-if="field != 'Name'">
              <label >
                <b-form-checkbox :value="field">

                </b-form-checkbox>
                {{field}}
              </label>
            </b-row>
          </div>

        </b-form-checkbox-group>
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
import Radar from "@/components/charts/Radar";
export default {
  name: "PlayerRadar",
  components:{Radar},
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedFields: [],
      radarData:null,
      radarOptions: //options
          {
            legend: {
              labels: {
                fontColor: '#f7f7f7',
                fontSize:16,
              }
            },
            scale:{
              gridLines:{
                color:'#f7f7f7',
              },
              pointLabels:{
                fontColor: '#f7f7f7',
                fontSize:12,
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
    availableFields() {
      let fields = Object.keys(this.radarStats[0])
      return fields;
    },
    radarStats() {
      let stats = this.stats;
      stats = stats.map(stat => ({
        'Goals / Game': (stat.goals / stat.appearences).toFixed(2),
        'Assists / Game': (stat.assists / stat.appearences).toFixed(2),
        'Goal Contributed / Game': ((stat.goals + stat.assists) / stat.appearences).toFixed(2),
        'Crosses / Game': (stat.crosses_total / stat.appearences).toFixed(2),
        'Dribbles / Game': (stat.dribbles_success / stat.appearences).toFixed(2),
        'Dribbled Past / Game': (stat.dribbles_dribbled_past / stat.appearences).toFixed(2),
        'Dribbles Attempts / Game': (stat.dispossesed / stat.appearences).toFixed(2),
        'Duels Won / Game': (stat.duels_won / stat.appearences).toFixed(2),
        'Interceptions / Game': (stat.interceptions / stat.appearences).toFixed(2),
        'Key Passes / Game': (stat.passes_key_passes / stat.appearences).toFixed(2),
        'Saves / Game': (stat.saves / stat.appearences).toFixed(2),
        'Tackles / Game': (stat.tackles / stat.appearences).toFixed(2),
        'Name': stat.name,
      }))
      //console.log(stats);
      return stats;
    },
    names(){
      return this.stats.map(stat=> stat.name)
    }
  },
  methods:{
    generateGraph(){
      if(this.selectedFields.length >= 3){
        this.radarData = {
          labels: this.selectedFields,
          datasets:null,
        };
        let data = this.radarStats.map(stat => {
          let color = this.getColor(0.5)
          let obj = {}
          obj['data'] = []
          this.selectedFields.forEach(field => {
            obj['data'].push(parseFloat(stat[field]));
          })
          obj['backgroundColor'] = color[0];
          obj['label'] = stat.Name
          obj['pointBackgroundColor'] = color[1]
          obj['lineTension'] = 0
          obj['borderColor'] = color[1]
          obj['borderWidth'] = 2
          return obj;
        })

        this.radarData.datasets = data;
        console.log(this.radarData)
      }
    },
    getColor(alpha) {
      let r1 = (Math.random() * 255).toFixed(2)
      let r2 = (Math.random() * 255).toFixed(2)
      let r3 = (Math.random() * 255).toFixed(2)
      return ['rgb('+r1+','+r2+','+r3+','+alpha+')', 'rgb('+r1+','+r2+','+r3+',1)'];
    },

  }
}
</script>

<style scoped>

</style>