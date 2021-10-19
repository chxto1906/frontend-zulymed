import Vue from 'vue'
import Cookies from "js-cookie";
import App from './App.vue'
import Router from 'vue-router'
import store from './store'
import routes from './routes'
import Notifications from 'vt-notifications'
import '@/assets/css/tailwind.css'
//import '@/assets/scss/formvuelar.scss'
import Api from '@/api';
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css'

import HighchartsVue from "highcharts-vue";
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
import solidGaugeInit from 'highcharts/modules/solid-gauge'
highchartsMore(Highcharts);
solidGaugeInit(Highcharts)

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Notifications)
Vue.use(HighchartsVue)


const router = new Router({
  mode: 'history',
  routes
})

const isAuthenticate = async function() {
  let response = false;
  let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null;
  if (userLogged) {
      let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
      const api = new Api(store.getters.baseurl,'get',headers)
      response = await api.call_respuesta_directa('/auth/yo') 
  }
  return response;
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let auth = await isAuthenticate();
    if (auth && auth.status == 200 && auth.data.data=="OK") {
      const userLogged = JSON.parse(Cookies.get("userLogged"));
      if (to.meta.rol.indexOf(userLogged.user.rol) == -1 ) {
        Cookies.remove('userLogged')
        next({ name: 'Unauthorized' })
      }else{
        next() // go to wherever I'm going
      }
    } else {
      Cookies.remove('userLogged')
      let nameRoute = 'LoginUser'
      if (to.meta.rol.indexOf('superadmin') > -1)
        nameRoute = 'LoginSuperAdmin'
      else if (to.meta.rol.indexOf('admin') > -1)
        nameRoute = 'LoginAdmin' 
      next({ name: nameRoute, query: {urlredirect: to.path} })
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')