<template>
  <b-row class="border-top border-bottom border-dark p-2 mx-auto my-2 justify-content-around bg-light-dark">
    <b-col cols="5"  class="justify-content-center">
      <b-row class="justify-content-center">
        <img class="team-img" :src="transfer.player.data.image_path">
      </b-row>
      <b-row cols="2" class="justify-content-center">
        <p class="text-center font-weight-bold">{{transfer.player.data.display_name}}</p>
      </b-row>
    </b-col>
    <b-col cols="2"  class="justify-content-center">
      <b-row class="m-auto">
        <p class="text-center  justify-content-center font-weight-bold m-auto">
          {{transfer.type == 'OUT' ? 'IN' : 'OUT'}}
        </p>
      </b-row>
      <b-row class="m-auto">
        <p class="text-center  justify-content-center font-weight-bold m-auto">{{transfer.date}}</p>
      </b-row>
      <b-row class="m-auto">
        <p class="text-center  justify-content-center font-weight-bold m-auto">
          {{transfer.transfer}}
        </p>
      </b-row>
      <b-row class="m-auto">
        <p class="text-center  justify-content-center font-weight-bold m-auto">
          {{transfer.amount}}
        </p>
      </b-row>
    </b-col>
    <b-col  cols="5" class="justify-content-center">
      <b-row class="justify-content-center">
        <img class="team-img" :src="transfer.type === 'OUT' ? transfer.fromTeam.data.logo_path : transfer.toTeam.data.logo_path">
      </b-row>
      <b-row class="justify-content-center">
        <p class="text-center font-weight-bold">
          {{transfer.type === 'IN' ? transfer.toTeam.data.name : transfer.fromTeam.data.name}}
        </p>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
name: "TransferCard",
  props: {
    transfer: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>