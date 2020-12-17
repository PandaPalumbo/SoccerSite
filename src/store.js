import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})

Vue.use(Vuex);


export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        leagues: null,
        teams: null,
        players: null,
        seasons: null,
        loaded: true,
        selected: {
            leagues: [],
            teams: [],
            players: [],
            seasons: [],
        }
    },
    getters: {},
    mutations: {
        //updates a 'selected' array given a particular type ie: teams, leagues, players, seasons...
        //add single value or many values, or clears the selected array
        updateSelected(state, {type, add, value, values, clear}) {
            let target = state.selected[type];
            const pos = target.indexOf(value);
            if (add) {
                if (value && pos == -1)
                    target.push(value);

                else
                    target = values;
                console.log(value)
            } else if (clear) {
                target = [];
            } else {
                target.splice(pos, 1);
            }
        },
    },
    actions: {
        //TODO hit cloud endpoints instead of firebase
        //Initializes firebase, then gets all the league and team ids to use for later.
        initial({state}) {
            state.loaded = true;
            api.firebase.init();
            api.getData.getLeagues(data => {
                if (!state.leagues)
                    state.leagues = data.sort((a, b) => a.id - b.id).filter(league => league.name != 'World Cup');
            });
            api.getData.getTeams(data => {
                if (!state.teams)
                    state.teams = data;
            });
        },
        //TODO write update function that updates cloud for all users, when data becomes old for a single user
        //ex (User A gets stats, stats say next match wsa yesterday, means stats are old
        // app then hits API for new stats, renders new stats, and in background updates DB for all other users.)
        updateSelectedStatistics({state}, {type, id, data}) {
            if (type === 'leagues' && state.selected.leagues.some(league => league.id == id)) {
                //update the stats in the selected leagues and the pool of leagues, to prevent hitting api/cloud again.
                state.selected.leagues.forEach(league => {
                    if (league.id === id)
                        league['stats'] = data;
                })
                state.leagues.forEach(league => {
                    if (league.id === id)
                        league['stats'] = data;
                })
            }
        },
        // takes in name of player and searches DB
        queryPlayers({state}, {query}) {
            api.getData.searchPlayers(query, (data) => {
                    state.players = data;
                }
            );
        },
    }
})