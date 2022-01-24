<template>
  <div>

    <!--    over -->
    <b-col class="text-light text-center m-auto">
      <div class="my-4">
        <h4><u>Percentage of Home Goals Over Range</u></h4>
        <Polar
            :labels="['0.5', '1.5', '2.5', '3.5', '4.5', '5.5']"
            :data="[this.over['0_5'].home, this.over['1_5'].home, this.over['2_5'].home,
          this.over['3_5'].home, this.over['4_5'].home, this.over['5_5'].home
          ]"
            :background-colors="[getColor(),getColor(), getColor(), getColor(), getColor(), getColor()]"
        />
      </div>
      <div class="my-4">
        <h4><u>Percentage of Away Goals Over Range</u></h4>
        <Polar
            :labels="['0.5', '1.5', '2.5', '3.5', '4.5', '5.5']"
            :data="[this.over['0_5'].away, this.over['1_5'].away, this.over['2_5'].away,
          this.over['3_5'].away, this.over['4_5'].away, this.over['5_5'].away
          ]"
            :background-colors="[getColor(),getColor(), getColor(), getColor(), getColor(), getColor()]"
        />
      </div>
      <!--        Under -->
      <div class="my-4">
        <h4><u>Percentage of Home Goals Under Range</u></h4>
        <Polar
            :labels="['0.5', '1.5', '2.5', '3.5', '4.5', '5.5']"
            :data="[this.under['0_5'].home, this.under['1_5'].home, this.under['2_5'].home,
          this.under['3_5'].home, this.under['4_5'].home, this.under['5_5'].home
          ]"
            :background-colors="[getColor(),getColor(), getColor(), getColor(), getColor(), getColor()]"
        />
      </div>
      <div class="my-4">
        <h4><u>Percentage of Away Goals Under Range</u></h4>
        <Polar
            :labels="['0.5', '1.5', '2.5', '3.5', '4.5', '5.5']"
            :data="[this.under['0_5'].away, this.under['1_5'].away, this.under['2_5'].away,
          this.under['3_5'].away, this.under['4_5'].away, this.under['5_5'].away
          ]"
            :background-colors="[getColor(),getColor(), getColor(), getColor(), getColor(), getColor()]"
        />
      </div>

    </b-col>


  </div>
</template>

<script>
import Polar from "../charts/Polar";
import api from "../../api";

export default {
  name: "TeamGoalLine",
  components: {
    Polar
  },
  props: {
    over: {
      type: Object,
      required: true,
    },
    under: {
      type: Object,
      required: true,
    },
  },
  computed: {
    goalLines() {
      //console.log(this.under)
      return false;
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