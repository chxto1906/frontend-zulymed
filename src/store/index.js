import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from './modules/sidebar'
import system from './modules/system'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        sidebar, 
        system,
        auth
    }
})
