<template>
  <b-container>
    <b-row class="d-flex justify-content-around">
      <b-col cols="5" class="">
        <HomeTile
            route="/competitions"
            desc="All of your favorite competitions visualized! Compare teams of all varieties."
            :image="competitionImage" label="Competitions">
        </HomeTile>
      </b-col>
      <b-col  cols="5">
        <HomeTile
            route="/players"
            desc="Compare your favorite players, scout hidden talent, see how your selections match up, and more."
            :image="playersImage" label="Players">
        </HomeTile>
      </b-col>
    </b-row>
    <b-row class="d-flex justify-content-around">
      <b-col cols="5" class="">
        <HomeTile
            route="/teams"
            desc="All of your favorite competitions visualized! Compare teams of all varieties."
            :image="teamsImage" label="Teams">
        </HomeTile>
      </b-col>
      <b-col  cols="5">
        <HomeTile
            route="/seasons"
            desc="All of your favorite competitions visualized! Compare teams of all varieties."
            :image="seasonsImage" label="Seasons">
        </HomeTile>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HomeTile from "@/components/HomeTile";

export default {
  name: "Home.vue",
  components: {HomeTile},
  data() {
    return {
      competitionImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      playersImage: "https://images.unsplash.com/photo-1508087625439-de3978963553?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fHNvY2NlcnxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=500&q=60",
      seasonsImage: "https://images.unsplash.com/photo-1604513896387-78c36ee80657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      teamsImage: "https://images.unsplash.com/photo-1532396115384-4be6f5256898?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    }
  }
}
</script>

<style scoped>

</style>