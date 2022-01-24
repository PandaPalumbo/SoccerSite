<template>
  <b-row class="mt-2 mx-2 justify-content-center">
    <b-col class="my-auto pt-2" cols="8">
      <p>{{label}}</p>

    </b-col>
    <b-col  class="my-auto"  cols="2">
      <b-button @click="toggle" v-bind:class="[isSelected ? 'btn-danger' : 'btn-success', 'btn-sm']">
        {{isSelected ? 'Unselect' : 'Select'}}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import {mapState} from 'vuex';
export default {
name: "SidebarRow",
  props:{
    data:{
      type: Object,
      required: true,
    },
    label:{
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true,
    }
  },
  computed:{
    ...mapState({
      selectedLeagues: state => state.selected.leagues,
    }),
    isSelected(){
      return this.selectedLeagues.some(league => league.id === this.data.id)
    }
  },
  methods:{
    toggle(){
        this.$store.commit('updateSelected',{
          type:this.type,
          add:!this.isSelected,
          value:this.data,
        })
    },
  }
}
</script>

<style scoped>

</style>