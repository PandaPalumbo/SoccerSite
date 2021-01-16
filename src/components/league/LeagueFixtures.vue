<template>
<div style="max-height: 900px;" class="overflow-auto p-4">
<!--  <b-row class="text-light">-->
<!--    <b-col cols="6">-->
<!--      <label class="font-weight-bold">Start Date:</label>-->
<!--      <b-form-datepicker  v-model="startDate" class="mb-2"></b-form-datepicker>-->
<!--    </b-col>-->
<!--    <b-col cols="6">-->
<!--      <label class="font-weight-bold" >End Date:</label>-->
<!--      <b-form-datepicker v-model="endDate" class="mb-2"></b-form-datepicker>-->
<!--    </b-col>-->
<!--  </b-row>-->
  <MatchdayCard v-for="(date, i) in Object.keys(fixturesByDate)" :key="i" :date="date" :fixtures="fixturesByDate[date]"/>
</div>
</template>

<script>
import MatchdayCard from "@/components/league/MatchdayCard";
export default {
name: "LeagueFixtures",
  components:{
    MatchdayCard
  },
  props: {
    fixtures: {
      type: Array,
      required: true,
    },
  },
  computed:{
    fixturesByDate(){
      let fixtures = {};
      this.fixtures.forEach(fixture => {
        if(!fixtures[fixture.time.starting_at.date]){
          fixtures[fixture.time.starting_at.date] = [];
        }
        if(fixtures[fixture.time.starting_at.date])
          fixtures[fixture.time.starting_at.date].push(fixture);
      })
      console.log(fixtures)
      return fixtures;
    }
  },
  data(){
    return{
      startDate:'',
      endDate:'',
    }
  },
  // methods:{
  //   withinDateRange(timestamp){
  //     if(this.startDate != '' && this.endDate != '') {
  //       let startDate = new Date(this.startDate).getTime()
  //       let endDate = new Date(this.endDate).getTime()
  //       return timestamp > startDate && timestamp < endDate;
  //     }
  //     else
  //       return true;
  //   }
  // }
}
</script>

<style scoped>

</style>