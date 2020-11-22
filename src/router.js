import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from "./views/Explore";
import Login from "@/views/Login";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
})
