<template>
  <div class="m-auto">
    <b-col class="text-light text-center m-auto">

      <div class="my-4">
        <h4><u>Time Range of Goals Scored</u></h4>
        <Doughnut
            :data="scoredRange.data"
            :labels="scoredRange.labels"
            :background-colors="scoredRange.colors"
        />
      </div>

      <div class="my-4">
        <h4><u>Time Range of Goals Conceded</u></h4>
        <Doughnut
            :data="concededRange.data"
            :labels="concededRange.labels"
            :background-colors="concededRange.colors"
        />
      </div>

    </b-col>

  </div>
</template>

<script>
import Doughnut from "@/components/charts/Doughnut";
import api from "@/api";

export default {
  name: "TeamGoalLine",
  components: {
    Doughnut,
  },
  props: {
    scored: {
      type: Object,
      required: true,
    },
    conceded: {
      type: Object,
      required: true,
    },
  },
  computed: {
    scoredRange() {
      let ret = {
        data: [],
        labels: [],
        colors: []
      }
      this.scored.period.forEach(range => {
        ret.data.push(range.percentage)
        ret.labels.push(range.minute + 'th minute')
        ret.colors.push(this.getColor())
      })
      return ret;
    },
    concededRange() {
      let ret = {
        data: [],
        labels: [],
        colors: []
      }
      this.conceded.period.forEach(range => {
        ret.data.push(range.percentage)
        ret.labels.push(range.minute + 'th minute')
        ret.colors.push(this.getColor())
      })
      return ret;
    }
  },
  methods: {
    getColor() {
      return api.util.getColor(0.5)[1]
    }
  }
}
</script>

<style scoped>

</style>