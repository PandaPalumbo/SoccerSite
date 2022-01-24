<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="true" class="mb-2">
      <b-navbar-brand to="/">
        Football Visuals
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <NavBar/>

        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em class=" mr-2">User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view v-if="loaded"/>
    <b-spinner v-else variant="dark"></b-spinner>
  </div>
</template>

<script>

import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {NavBar},
  computed:{
    loaded(){
      return this.$store.state.loaded
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #343a40;
  min-height:1080px;
  height:100%;
}

.small-img {
  width:50px;
  height:50px;
}
</style>
