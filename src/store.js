import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
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
        //TODO hit cloud endpoints instead of firebase
        //Initializes firebase, then gets all the league and team ids to use for later.
        initial({state}) {
            state.loaded = true;
            // api.firebase.init();
            // api.getData.getLeagues(data => {
            //     if (!state.leagues)
            //         state.leagues = data.sort((a, b) => a.id - b.id).filter(league => league.name != 'World Cup');
            // });
            // api.getData.getTeams(data => {
            //     if (!state.teams)
            //         state.teams = data;
            // });
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
        // takes in name of player and searches DB
        queryLeagues({state}, {query}) {
            api.getData.searchLeagues(query, (data) => {
                    state.players = data;
                    console.log(data);
                }
            );
        },
    }
})
//
// function cleanPlayerData(data){
//     console.log(data.name);
//     let obj = {
//         'name' : data.name,
//         'assists':{
//             'total': data['assists_total'] ? data['assists_total'] : 0,
//             'avg': data['assists_avg'] ? data['assists_avg'] : 0,
//         },
//         'penalties':{
//             'total': data['penalties_total'] ? data['penalties_total'] : 0,
//             'avg': data['penalties_avg'] ? data['penalties_avg'] : 0,
//         },
//         'offsides':{
//             'total': data['offsides_total'] ? data['offsides_total'] : 0,
//             'avg': data['offsides_avg'] ? data['offsides_avg'] : 0,
//         },
//         'substitutions':{
//             'in':{
//                 'total': data['substitutions_in_total'] ? data['substitutions_in_total'] : 0,
//                 'avg': data['substitutions_in_avg'] ? data['substitutions_in_avg'] : 0,
//             },
//             'out':{
//                 'total': data['substitutions_in_total'] ? data['substitutions_in_total'] : 0,
//                 'avg': data['substitutions_in_avg'] ? data['substitutions_in_avg'] : 0,
//             }
//         },
//         'cards':{
//             'yellow':{
//                 'total': data['cards_yellow_total'] ? data['cards_yellow_total'] : 0,
//                 'avg': data['cards_yellow_avg'] ? data['cards_yellow_avg'] : 0
//             },
//             'yellowred':{
//                 'total': data['cards_yellowred_total'] ? data['cards_yellowred_total'] : 0,
//                 'avg': data['cards_yellowred_avg'] ? data['cards_yellowred_avg'] : 0,
//             },
//             'redcards':{
//                 'total': data['cards_redcards_total'] ? data['cards_redcards_total'] : 0,
//                 'avg': data['cards_redcards_avg'] ? data['cards_redcards_avg'] : 0,
//             },
//         },
//         'goals':{
//             'total': data['goals_total'] ? data['goals_total'] : 0,
//             'avg': data['goals_avg'] ? data['goals_avg'] : 0,
//         },
//         'shots':{
//             'total': data['shots_total'] ? data['shots_total'] : 0,
//             'avg_calc':(data['shots_total'] ? data['shots_total'] : 0)/data['matches_played_total'],
//             'on_target':{
//                 'total': data['shots_on_target_total'] ? data['shots_on_target_total'] : 0,
//                 'avg': data['shots_on_target_avg'] ? '' + data['shots_on_target_avg']: 0,
//             },
//             'off_target':{
//                 'total': data['shots_off_target_total'] ? data['shots_off_target_total'] : 0,
//                 'avg': data['shots_off_target_avg'] ? data['shots_off_target_avg'] : 0,
//             },
//             'blocked':{
//                 'total': data['shots_blocked_total'] ? data['shots_blocked_total'] : 0,
//                 'avg': data['shots_blocked_avg'] ? data['shots_blocked_avg'] : 0,
//             },
//         },
//         'corners':{
//             'total': data['corners_total'] ? data['corners_total'] : 0 ,
//             'avg': data['corners_avg'] ? data['corners_avg'] : 0,
//         },
//     }
//     data['stats'] = obj;
//     return data;
// }