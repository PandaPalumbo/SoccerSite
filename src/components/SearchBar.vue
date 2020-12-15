<template>
  <div class="position-relative w-100">
    <b-form-input
        type="search"
        placeholder="Type player name to search..."
        v-model="searchValue"
        @focusin="focused = true"
        @focusout="focused = false"
        @keyup.up="onArrowKey('up')"
        @keyup.down="onArrowKey('down')"
        @keyup.enter="onEnter"
        @change="(value) => search(value)"
    />
    <b-list-group class="position-absolute w-100 suggestions" v-if="focused && suggestions">
      <div v-for="(item, i) in suggestions.slice(0, 10)" :key="i" >
        <b-list-group-item class="py-2" href="#"
                           @mousedown.stop="addSelectedValue(item)" variant="dark">
          <b-row class="d-flex w-100 p-0 m-0">
            <b-col cols="1">
              <img v-if="item.img" class="league-img bg-light"
                   :src="item.img"/>
              <img v-else-if="item.team_id"
                   :src="'https://cdn.soccersapi.com/images/soccer/teams/50/'+item.team_id+'.png'"
              />
            </b-col>
            <b-col cols="10" class="p-0 m-0">
              <p class="p-0 m-0">
                <strong>Name - </strong>
                {{ item.firstname + " " + item.lastname + " " }}
              </p>
              <p class="p-0 m-0">
                <strong>Nationality - </strong>
                {{item.country_name + " " }}
              </p>
              <p class="p-0 m-0">
                <strong>Club - </strong>
                {{  item.team_name + ", " + item.league_name }}
              </p>
            </b-col>

          </b-row>
        </b-list-group-item>
      </div>

    </b-list-group>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "SearchBar",
  props: {
    inNoteModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    inTimelineModal: {
      type: Boolean,
      required: false,
      default: false,
    },
    patId: {
      type: Number,
      required: false,
      default: null,
    },
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
      suggestions: state => state.players,
      selectedPlayers: state => state.selected.players,
    }),
    isSearching() {
      if (this.focused)
        return true;

      return this.text !== null && this.text !== '';
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
      if (val.length > 4) {
        console.log('hit componenet search method')
        this.$store.dispatch('queryPlayers', {
          query: val
        })
      }
    },
  },
}
</script>

<style scoped>
.suggestions {
  z-index: 2;
}
</style>