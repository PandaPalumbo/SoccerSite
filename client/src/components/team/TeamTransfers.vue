<template>
<div style="max-height: 900px;" class="overflow-auto">
  <transfer-card  v-for="(transfer, i) in sortedTransfers" :key="i" :transfer="transfer"/>
</div>
</template>

<script>
import TransferCard from "../universal/TransferCard";
export default {
name: "TeamTransfers",
  components:{
   TransferCard,
  },
  props: {
    transfers: {
      type: Array,
      required: true,
    },
  },
  computed:{
    sortedTransfers(){
      let transfers = this.transfers;
      transfers = transfers.sort((a,b) => {
        let aDate = a.date.split('-')
        let bDate = b.date.split('-')
        aDate = new Date(aDate[1]+'-'+aDate[2]+'-'+aDate[0])
        bDate = new Date(bDate[1]+'-'+bDate[2]+'-'+bDate[0])
        return bDate - aDate
      })
      transfers.filter(transfer => {
        let date = transfer.date.split('-');
        let newDate = new Date(date[1]+'-'+date[2]+'-'+date[0]);
        return newDate < new Date()
      })
      return transfers;
    }
  },
}
</script>

<style scoped>

</style>