import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Leagues from './views/Leagues.vue'
import Teams from "@/views/Teams";
import Players from "@/views/Players";
import Seasons from "@/views/Seasons";
import Playground from "@/views/Playground";

Vue.use(Router)

export default new Router({
  //sets up the routes after localhost:8000, or future website name (ie: www.footballvisuals.com/players)
  //these components live in the 'src/views' folder from the root.
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/competitions/',
      component: Leagues,
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
