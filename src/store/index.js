import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
/* import createLogger from 'vuex/dist/logger' */
Vue.use(Vuex)

/* const debug = process.env.NODE_ENV !== 'production' */
export default new Vuex.Store({
    state,
    mutations
    /* strict: debug,
    plugins: debug ? [createLogger()] : []  */
})