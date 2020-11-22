import Vue from 'vue';
import Vuex from 'vuex';
import fbConfig from './firebase';
import firebase from 'firebase';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        leagues:[],
        teams:[],
        players:[],
        seasons:[],
        loaded:true,
        db:null
    },
    getters: {
        db(){
           return firebase.firestore();
        }
    },
    mutations: {

    },
    actions: {
        initial({state}){
            firebase.initializeApp(fbConfig.config)
            state.db = firebase.firestore();
            state.loaded = true;
        },
    }
})