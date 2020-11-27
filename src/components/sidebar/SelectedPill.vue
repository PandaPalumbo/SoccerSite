<template>
  <b-form-tag @remove="toggle" :variant="variant">
    {{label}}
  </b-form-tag>
</template>

<script>

export default {
  name: "SelectedPill",
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
      required: true,
    }
  },
  methods:{
    toggle(){
      this.$store.commit('updateSelected',{
        type:'leagues',
        add:false,
        value:this.data,
      })
    },
  }
}
</script>

<style scoped>

</style>