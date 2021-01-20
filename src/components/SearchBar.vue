<template>
  <div class="position-relative w-100">
    <b-form-input

        :placeholder="getPlaceholder()"
        v-model="searchValue"
        @focus="focused = true"
        @blur="focused = false"
        @keyup.up="onArrowKey('up')"
        @keyup.down="onArrowKey('down')"
        @keyup.enter="search"
        @update="(value) => search(value)"
        @cancel="focused = false"
    />
<!--    TODO one search for leagues another to grab that leagues data once selected-->
      <!--    Player search bar-->
    <b-list-group class="position-absolute w-100 suggestions" v-if="focused && playerSuggestions && searchValue && dataType === 'players'">
      <div v-for="(item, i) in playerSuggestions.slice(0, 10)" :key="i" >
        <b-list-group-item class="py-2" href="#"
                           @mousedown.stop="addSelectedValue(item)" variant="dark">
          <b-row class="d-flex w-100 p-0 m-0">
            <b-col cols="1">
              <img class="league-img bg-light"
                   :src="item.image_path"/>
            </b-col>
            <b-col cols="10" class="p-0 m-0">
              <p class="p-0 m-0">
                <strong>Name - </strong>
                {{ item.firstname + " " + item.lastname + " " }}
              </p>
              <p class="p-0 m-0">
                <strong>Nationality - </strong>
                {{item.nationality + " " }}
              </p>
              <p class="p-0 m-0">
                <strong>Club - </strong>
                {{  item.team.data.name + ", " + item.team.data.league.data.name }}
              </p>
            </b-col>

          </b-row>
        </b-list-group-item>
      </div>

    </b-list-group>
    <b-list-group class="position-absolute w-100 suggestions" v-else-if="focused && searchValue &&  (!leagueSuggestions || !playerSuggestions) ">
      <b-list-group-item class="py-2" href="#" variant="dark">

        <b-spinner variant="dark"></b-spinner>
      </b-list-group-item>
    </b-list-group>
    <!--    League search bar-->
    <b-list-group class="position-absolute w-100 suggestions" v-if="focused && leagueSuggestions && searchValue && dataType === 'leagues'">
      <div v-for="(item, i) in leagueSuggestions.slice(0, 10)" :key="i" >
        <b-list-group-item class="py-2" href="#"
                           @mousedown.stop="addSelectedValue(item)" variant="dark">
          <b-row class="d-flex w-100 p-0 m-0">
            <b-col cols="1">
              <img class="league-img bg-light"
                   :src="item.logo_path"/>
            </b-col>
            <b-col cols="10" class="p-0 m-0">
              <p class="p-0 m-0">
                <strong>Name - </strong>
                {{ item.name }}
              </p>
              <p class="p-0 m-0">
                <strong>Country - </strong>
                {{item.country.data.name + " " }}
              </p>
            </b-col>

          </b-row>
        </b-list-group-item>
      </div>

    </b-list-group>
    <b-list-group class="position-absolute w-100 suggestions" v-else-if="focused && searchValue &&  (!leagueSuggestions || !playerSuggestions) ">
      <b-list-group-item class="py-2" href="#" variant="dark">

        <b-spinner variant="dark"></b-spinner>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "SearchBar",
  props: {
    dataType: {
      type: String,
      required: true,
      default: 'players'
    }
  },
  data() {
    return {
      focused: false,
      index: 0,
      searchValue: null,
    }
  },
  computed: {
    ...mapState({
      playerSuggestions: state => state.players,
      leagueSuggestions: state => state.leagues,
      selectedPlayers: state => state.selected.players,
    }),
    isSearching() {
      if (this.focused)
        return true;

      return this.searchValue !== null && this.searchValue !== '';
    },
  },
  methods: {
    addSelectedValue(item) {
      this.$store.commit('updateSelected',{
        add:true,
        value: item,
        type: this.dataType,
      })
      this.focused = false;
    },
    onArrowKey(direction) {
      if (direction === 'up')
        this.index--;
      else if (direction === 'down')
        this.index++;
    },
    onEnter(val) {
      this.search(val)
    },
    search(val) {
      if (val.length >= 4) {
        //console.log('hit componenet search method')
        if(this.dataType === 'players')
          this.$store.dispatch('queryPlayers', {
            query: val
          })
        if(this.dataType === 'leagues')
          this.$store.dispatch('queryLeagues', {
            query: val
          })
      }
    },
    getPlaceholder(){
      if(this.dataType === 'players'){
        return 'Type player name to search...'
      } else if(this.dataType === 'leagues' ){
        return 'Type league name to search...'
      } else if(this.dataType === 'teams'){
        return 'Type team name to search...'
      } else {
        return 'Type player name to search...'
      }
    }
    // altImage(e, item) {
    //   //console.log(e)
    //   e.target.src = 'https://cdn.soccersapi.com/images/soccer/teams/50/' + item.team_id + '.png'
    // },
  },
}
</script>

<style scoped>
.suggestions {
  z-index: 2;
}
.league-img{
  width: 100px;
  height:100px;
}
</style>