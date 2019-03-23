import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions/index'
import mutations from './mutations/index'
import * as getters from './getters/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homePageData: {
      consultNum: 0,
      weather: {}
    }
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
