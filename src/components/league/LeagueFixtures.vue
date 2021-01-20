<template>
<div style="max-height: 900px;" class="overflow-auto p-4">
  <b-row class="text-light">
    <b-col cols="6">
      <label class="font-weight-bold">Start Date:</label>
      <b-form-datepicker @input="getfixturesByDate"  v-model="startDate" class="mb-2"></b-form-datepicker>
    </b-col>
    <b-col cols="6">
      <label class="font-weight-bold" >End Date:</label>
      <b-form-datepicker @input="getfixturesByDate" v-model="endDate" class="mb-2"></b-form-datepicker>
    </b-col>
  </b-row>
  <div v-if="fixturesByDate">
    <MatchdayCard v-for="(date, i) in Object.keys(fixturesByDate)" :key="i" :date="date" :fixtures="fixturesByDate[date]"/>

  </div>
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

  },
  data(){
    return{
      startDate:'',
      endDate:'',
      fixturesByDate:null,
    }
  },
  methods:{
    getfixturesByDate(){
      let fixtures = {};

      let propFixtures = this.fixtures.sort((b, a) => b.time.starting_at.timestamp - a.time.starting_at.timestamp)
      let startDate = new Date( new Date(this.startDate).getTime()).setHours(24,0,0,0);
      let endDate = new Date( new Date(this.endDate).getTime()).setHours(47,59,59,5999);
      console.log(new Date(startDate))
      console.log(new Date(endDate))

      propFixtures.forEach(fixture => {

        let isBetweenDates = true
        if(this.startDate != '' && this.endDate != '')
          isBetweenDates = fixture.time.starting_at.timestamp * 1000  >= startDate  && fixture.time.starting_at.timestamp  * 1000 <= endDate
        // console.log('is between dates: '+ isBetweenDates)
        if(!fixtures[fixture.time.starting_at.date] && isBetweenDates){
          fixtures[fixture.time.starting_at.date] = [];
        }
        if(fixtures[fixture.time.starting_at.date] && isBetweenDates)
          fixtures[fixture.time.starting_at.date].push(fixture);
      })
      // console.log(fixtures)
      this.fixturesByDate = fixtures;
    }
  },
  mounted() {
    this.getfixturesByDate();
  }
}
</script>

<style scoped>

</style>