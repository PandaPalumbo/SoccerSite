<script>

import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['dataset', 'labels', 'backgroundColors'],
  mounted() {
    this.renderChart(
        //server
        {
          labels: this.labels,
          datasets: this.dataset,
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

