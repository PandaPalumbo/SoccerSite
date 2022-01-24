import Vue from 'vue';
import Vuex from 'vuex';
import { searchPlayers } from './api';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        selected: state.selected
    })
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
                if (value && pos == -1) {
                    // if(type == 'players'){
                    //     value = cleanPlayerData(value);
                    // }
                    target.push(value);
                    console.log(value);
                }

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
        //TODO hit cloud src instead of firebase
        //Initializes firebase, then gets all the league and team ids to use for later.
        initial({state}) {
            state.loaded = true;
        },
        //TODO write update function that updates cloud for all users, when server becomes old for a single user
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
            state.players = null;
            searchPlayers(query, (players) => {
                state.players = players
            });
        },
        // // takes in name of player and searches DB
        // queryLeagues({state}, {query}) {
        //     state.leagues = null;
        //     api.getData.searchLeagues(query, (data) => {
        //             state.leagues = data;
        //             console.log(data);
        //         }
        //     );
        // },
        // queryTeams({state}, {query}) {
        //     state.teams = null;
        //     api.getData.searchTeams(query, (data) => {
        //             state.teams = data;
        //             console.log(data);
        //         }
        //     );
        // },
    }
})
//
// function cleanPlayerData(server){
//     console.log(server.name);
//     let obj = {
//         'name' : server.name,
//         'assists':{
//             'total': server['assists_total'] ? server['assists_total'] : 0,
//             'avg': server['assists_avg'] ? server['assists_avg'] : 0,
//         },
//         'penalties':{
//             'total': server['penalties_total'] ? server['penalties_total'] : 0,
//             'avg': server['penalties_avg'] ? server['penalties_avg'] : 0,
//         },
//         'offsides':{
//             'total': server['offsides_total'] ? server['offsides_total'] : 0,
//             'avg': server['offsides_avg'] ? server['offsides_avg'] : 0,
//         },
//         'substitutions':{
//             'in':{
//                 'total': server['substitutions_in_total'] ? server['substitutions_in_total'] : 0,
//                 'avg': server['substitutions_in_avg'] ? server['substitutions_in_avg'] : 0,
//             },
//             'out':{
//                 'total': server['substitutions_in_total'] ? server['substitutions_in_total'] : 0,
//                 'avg': server['substitutions_in_avg'] ? server['substitutions_in_avg'] : 0,
//             }
//         },
//         'cards':{
//             'yellow':{
//                 'total': server['cards_yellow_total'] ? server['cards_yellow_total'] : 0,
//                 'avg': server['cards_yellow_avg'] ? server['cards_yellow_avg'] : 0
//             },
//             'yellowred':{
//                 'total': server['cards_yellowred_total'] ? server['cards_yellowred_total'] : 0,
//                 'avg': server['cards_yellowred_avg'] ? server['cards_yellowred_avg'] : 0,
//             },
//             'redcards':{
//                 'total': server['cards_redcards_total'] ? server['cards_redcards_total'] : 0,
//                 'avg': server['cards_redcards_avg'] ? server['cards_redcards_avg'] : 0,
//             },
//         },
//         'goals':{
//             'total': server['goals_total'] ? server['goals_total'] : 0,
//             'avg': server['goals_avg'] ? server['goals_avg'] : 0,
//         },
//         'shots':{
//             'total': server['shots_total'] ? server['shots_total'] : 0,
//             'avg_calc':(server['shots_total'] ? server['shots_total'] : 0)/server['matches_played_total'],
//             'on_target':{
//                 'total': server['shots_on_target_total'] ? server['shots_on_target_total'] : 0,
//                 'avg': server['shots_on_target_avg'] ? '' + server['shots_on_target_avg']: 0,
//             },
//             'off_target':{
//                 'total': server['shots_off_target_total'] ? server['shots_off_target_total'] : 0,
//                 'avg': server['shots_off_target_avg'] ? server['shots_off_target_avg'] : 0,
//             },
//             'blocked':{
//                 'total': server['shots_blocked_total'] ? server['shots_blocked_total'] : 0,
//                 'avg': server['shots_blocked_avg'] ? server['shots_blocked_avg'] : 0,
//             },
//         },
//         'corners':{
//             'total': server['corners_total'] ? server['corners_total'] : 0 ,
//             'avg': server['corners_avg'] ? server['corners_avg'] : 0,
//         },
//     }
//     server['stats'] = obj;
//     return server;
// }