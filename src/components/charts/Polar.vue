<script>

import {PolarArea} from 'vue-chartjs'

export default {
  extends: PolarArea,
  props: ['data', 'labels', 'backgroundColors'],
  mounted() {
    this.renderChart(
        //data
        {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: this.backgroundColors,
            borderColor: "#f8f9fa",
          }],
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

