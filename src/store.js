import Vue from 'vue';
import Vuex from 'vuex';
import api  from './api';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
})

Vue.use(Vuex);


export default new Vuex.Store({
    plugins:[vuexLocal.plugin],
    state: {
        leagues:null,
        teams:null,
        players:null,
        seasons:null,
        loaded:true,
        selected:{
            leagues:[],
            teams:[],
            players:[],
            seasons:[],
        }
    },
    getters: {
    },
    mutations: {
        updateSelected(state, {type, add, value, values, clear}){
          let target = state.selected[type];
          if(add){
              if(value)
                  target.push(value);
              else
                  target = values;
          }
          else if(clear){
              target = [];
          }
          else {
              const pos = target.indexOf(value);
              target.splice(pos,1);
          }
        },
    },
    actions: {
        initial({state}){
            state.loaded = true;
            api.firebase.init();
            api.getData.getLeagues(data =>{
                if(!state.leagues)
                    state.leagues = data.sort((a,b)=> a.id - b.id).filter(league => league.name != 'World Cup');
            });
            api.getData.getTeams(data =>{
                if(!state.teams)
                    state.teams = data;
            });
        },
        updateSelectedStatistics({state}, {type, id, data}){
            if(type === 'leagues' && state.selected.leagues.some(league => league.id == id))
                state.selected.leagues.forEach(league =>{
                    if(league.id === id)
                        league['stats'] = data;
                })
        },
    }
})