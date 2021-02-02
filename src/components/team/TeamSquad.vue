<template>
  <div class="p-4 bg-light-dark">
    <table class="table table-striped table-dark table-bordered">
      <thead>
      <tr>
        <th>Player</th>
        <th class="text-center">Position</th>
        <th class="text-center">Appearances</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(player, i ) in sortedSquad" :key="i">
        <td class="font-weight-bold">
          <img class="mx-2" :src="player.player.data.image_path" />{{player.player.data.common_name}}
        </td>
        <td  class="text-center">{{player.player.data.position.data.name}}</td>
        <td  class="text-center">{{player.appearences}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
name: "TeamSquad",
  props: {
    squad: {
      type: Array,
      required: true,
    },
  },
  computed:{
      sortedSquad(){
        let squad = this.squad;
        squad = squad.sort((a,b) => b.appearences - a.appearences)
        return squad;
      }
  }
}
</script>

<style scoped>

</style>