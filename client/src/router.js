import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/home/Home.vue'
import Leagues from './components/league/Leagues.vue'
import Teams from "./components/team/Teams";
import Players from "./components/player/Players";
import Seasons from "./components/Seasons";
import Playground from "./components/Playground";

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
