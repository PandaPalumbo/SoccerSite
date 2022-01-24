<script>

import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['data', 'labels', 'backgroundColors'],
  mounted() {
    this.renderChart(
        //server
        {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: this.backgroundColors,
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
          maintainAspectRatio: true,
          animation: {
            animateRotate: true
          }
        }
    )
  }
}
</script>

