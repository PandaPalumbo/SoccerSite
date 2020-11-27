<template>
  <b-col class="mx-auto my-1" cols="11">
    <table :class="['table table-bordered table-striped table-'+variant]" >
      <thead>
      <tr>
        <th scope="col" colspan="2" class="text-center">
          <span>{{ label }}</span>
          <span class="text-warning">{{ areAnyZero ? '*' : '' }}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="data['total'] != undefined">
        <th scope="row">Total</th>
        <td>{{data.total}}</td>
      </tr>
      <tr v-if="data['avg_per_match'] != undefined">
        <th scope="row">Per Match</th>
        <td>{{data.avg_per_match}}</td>
      </tr>
      <tr v-if="data['avg_every_minutes'] != undefined">
        <th scope="row">Minutes Per</th>
        <td>{{ (label === 'Assists ' || label === 'Substitutions') &&  data.avg_per_match != 0 ? Math.floor(90/data.avg_per_match): data.avg_every_minutes}}</td>
      </tr>
      <tr v-if="data['percentage_total_goals'] != undefined">
        <th scope="row">Percentage of Total Goals</th>
        <td>{{data.percentage_total_goals +'%'}}</td>
      </tr>
      </tbody>
    </table>
    <span v-if="areAnyZero" class="text-warning ml-4"> * Values of 0 may be incomplete data</span>
  </b-col>

</template>

<script>
export default {
name: "StatsTable",
props:{
  data:{
    type: Object,
    required: true,
  },
  label:{
    type: String,
    required: true,
  },
  variant:{
    type: String,
    required: false,
    default:'light',
  },
},
  computed:{
    areAnyZero(){
      let keys = Object.keys(this.data);
      let areAnyZero = false
      keys.forEach(key =>{
        if(this.data[key] == 0)
          areAnyZero = true;
        return areAnyZero
      })
      return areAnyZero
    }
  }
}
</script>

<style scoped>

</style>