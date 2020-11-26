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
  },
  methods:{
    test(){
      api.saveData.savePlayers(data => console.log(data));
    }
  },
}
</script>

<style scoped>

</style>