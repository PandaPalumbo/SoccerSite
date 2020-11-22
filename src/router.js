import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Competitions from './views/Competitions.vue'
import Teams from "@/views/Teams";
import Players from "@/views/Players";
import Seasons from "@/views/Seasons";
import Playground from "@/views/Playground";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/competitions/',
      component: Competitions,
    },
    {
      path: '/teams/',
      component: Teams,
    },
    {
      path: '/seasons/',
      component: Seasons,
    },
    {
      path: '/players/',
      component: Players,
    },
    {
      path: '/playground/',
      component: Playground,
    },

  ]
})
