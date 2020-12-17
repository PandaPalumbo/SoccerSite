<script>

import {Radar} from 'vue-chartjs'

export default {
  extends: Radar,
  props: ['data', 'labels', 'backgroundColors'],
  mounted() {
    this.renderChart(
        //data
        {
          labels: this.labels,
          datasets:this.data,
        },
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

