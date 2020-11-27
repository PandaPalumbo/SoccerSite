import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../scss/custom.scss'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
  faTimes
}  from '@fortawesome/free-solid-svg-icons'
library.add(faTimes)

Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.dispatch('initial')
  },
}).$mount('#app');
