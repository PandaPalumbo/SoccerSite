<script>

import {Radar, mixins} from 'vue-chartjs'
const {reactiveProp } = mixins;

export default {
  extends: Radar,
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(
        this.chartData,
        //options
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
    )
  }
}
</script>

