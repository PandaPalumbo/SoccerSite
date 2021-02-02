<template>
  <div style="max-height: 900px;" class=" overflow-auto">
    <b-table class="mx-auto my-1" striped table-variant="dark" v-if="statType === 'goals'" :items="filteredData"
             :fields="fields">
      <template #cell(name)="filteredData">
        <b-row>
          <b-col cols="3">
            <b-row>
              <img class="player-img" :src="filteredData.item.player.data.image_path"/>
              <img v-if="filteredData.item.team" class="team-img" :src="filteredData.item.team.data.logo_path"/>
            </b-row>
          </b-col>
          <b-col class="text-left big">
            <p class="my-5  font-weight-bold">
              {{ filteredData.item.player.data.display_name }} - {{ filteredData.item.team.data.name }}
            </p>
          </b-col>
        </b-row>
      </template>
      <template #cell(goals)="filteredData">
        <p class="my-5 big"> {{ filteredData.item.goals }}</p>
      </template>
      <template #cell(penalty_goals)="filteredData">
        <p class="my-5 big">{{ filteredData.item.penalty_goals }}</p>
      </template>
    </b-table>
    <b-table class="mx-auto my-1" striped table-variant="dark" v-if="statType === 'assists'" :items="filteredData"
             :fields="fields">
      <template #cell(name)="filteredData">
        <b-row>
          <b-col cols="3">
            <b-row>
              <img class="player-img" :src="filteredData.item.player.data.image_path"/>
              <img v-if="filteredData.item.team" class="team-img" :src="filteredData.item.team.data.logo_path"/>
            </b-row>
          </b-col>
          <b-col class="text-left big">
            <p class="my-5 font-weight-bold">
              {{ filteredData.item.player.data.display_name }} - {{ filteredData.item.team.data.name }}
            </p>
          </b-col>
        </b-row>
      </template>
      <template #cell(assists)="filteredData">
        <b-col cols="12" class=" big">
          <p class="my-5"> {{ filteredData.item.assists }}</p>
        </b-col>
      </template>
    </b-table>
    <b-table class="mx-auto my-1" striped table-variant="dark" v-if="statType === 'cards'" :items="filteredData"
             :fields="fields">
      <template #cell(name)="filteredData">
        <b-row>
          <b-col cols="3">
            <b-row>
              <img class="player-img" :src="filteredData.item.player.data.image_path"/>
              <img v-if="filteredData.item.team" class="team-img" :src="filteredData.item.team.data.logo_path"/>
            </b-row>
          </b-col>
          <b-col class="text-left big">
            <p class="my-5 font-weight-bold">
              {{ filteredData.item.player.data.display_name }} - {{ filteredData.item.team.data.name }}
            </p>
          </b-col>
        </b-row>
      </template>
      <template #cell(assists)="filteredData">
        <b-col cols="12" class=" big">
          <p class="my-5"> {{ filteredData.item.assists }}</p>
        </b-col>
      </template>
    </b-table>
  </div>
</template>

<script>
import api from '../../api';

export default {
  name: "PlayerTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
    statType: {
      type: String,
      required: true,
    },
    isTeams: {
      type: Boolean,
      required: false,
    },

  },
  computed: {
    fields() {
      let allFields = Object.keys(this.filteredData[0]);
      if (this.statType === 'goals') {
        return allFields.map(field => {
              if (field === 'goals' || field === 'penalty_goals' || field === 'player') {
                let key = field == 'player' ? 'name' : field;
                let obj = {
                  key: key,
                  label: api.util.prettyCasing(field),
                  sortable: true,
                  // thClass: ['header-class'],
                  // tdClass: ['body-class']
                }
                return obj;
              }
            }
        ).sort((a, b) => b.key - a.key);
      } else if (this.statType === 'assists') {
        return allFields.map(field => {
              if (field === 'assists' || field === 'player') {
                let key = field == 'player' ? 'name' : field;
                let obj = {
                  key: key,
                  label: api.util.prettyCasing(field),
                  sortable: true,
                  // thClass: ['header-class'],
                  // tdClass: ['body-class']
                }
                return obj;
              }
            }
        ).sort((a, b) => b.key - a.key);
      } else if (this.statType === 'cards') {
        return allFields.map(field => {
              if (field === 'redcards' || field === 'player' || field === 'yellowcards' || field === 'all_cards') {
                let key = field == 'player' ? 'name' : field;
                let obj = {
                  key: key,
                  label: api.util.prettyCasing(field),
                  sortable: true,
                  // thClass: ['header-class'],
                  // tdClass: ['body-class']
                }
                return obj;
              }
            }
        ).sort((a, b) => b.key - a.key);

      } else {
        return false;
      }

    },
    //use this to order player name first
    filteredData() {
      if (this.statType === 'goals') {
        return this.data.map(player => ({
          name: player.player.data.name,
          player: player.player,
          team: player.team ? player.team : null,
          goals: player.goals,
          penalty_goals: player.penalty_goals,
        }))
      } else if (this.statType === 'assists') {
        return this.data.map(player => ({
          name: player.player.data.name,
          player: player.player,
          team:  player.team ? player.team : null,
          assists: player.assists,
        }))
      } else if (this.statType === 'cards') {
        return this.data.map(player => {
          let obj = {
            name: player.player.data.name,
            player: player.player,
            team:  player.team ? player.team : null,
            redcards: player.redcards,
            yellowcards: player.yellowcards,
          }
          obj['all_cards'] = obj.redcards + obj.yellowcards
          return obj;
        })
      } else {
        return false;
      }
    }
  }
}
</script>

<style scoped>
/*.player-img{*/
/*  width: 50%;*/
/*  height: 50%;*/
/*}*/
.team-img {
  width: 100px;
  height: 100px;
}

.big {
  font-size: 1.2em;
}
</style>