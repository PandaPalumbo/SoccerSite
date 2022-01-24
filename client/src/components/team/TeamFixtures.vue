<template>
  <b-tabs fill active-nav-item-class="bg-light-dark text-light font-weight-bold"
          class="tab w-100 bg-dark league-list p-2">

    <b-tab lazy title-link-class="text-light  font-weight-bold" title="Latest" class="text-light"
    >
      <div style="max-height: 900px;" class="overflow-auto" v-if="latest">
        <MatchdayCard  :fixtures="latest"/>

      </div>
    </b-tab>
    <b-tab lazy title-link-class="text-light  font-weight-bold" title="Upcoming" class="text-light"
    >
      <div style="max-height: 900px;" class="overflow-auto" v-if="upcoming">
        <MatchdayCard  :fixtures="upcoming"/>

      </div>
    </b-tab>

  </b-tabs>
</template>

<script>
import MatchdayCard from "../universal/MatchdayCard";
export default {
  name: "TeamFixtures",
  components:{
    MatchdayCard,
  },
  props: {
    upcoming: {
      type: Array,
      required: true,
    },
    latest: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>