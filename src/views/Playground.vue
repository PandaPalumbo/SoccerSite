<template>
  <div class="container bg-light">
    <p>
      PlayGround
    </p>
    <b-button variant="dark" @click="test">
      Run test!
    </b-button>
    <p>
      Test : Nothing yet
    </p>
  </div>
</template>

<script>
import api from '../api';
export default {
name: "PlayGround.vue",
  computed:{
    db(){
      return this.$store.state.db;
    }
  },
  methods:{
    test(){
      api.getAllLeagues(data => console.log(data));
    }
  },
  mounted() {
    console.log(this.db);
  }
}
</script>

<style scoped>

</style>