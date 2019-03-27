import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions/index'
import mutations from './mutations/index'
import * as getters from './getters/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notice: {
      selectIndex: 0,
      noMore: false,
      data: []
    },
    history: {
      suggestions: {
        loading: false,
        noMore: false,
        pn: 1,
        ps: 10,
        data: []
      },
      consultations: {
        loading: false,
        noMore: false,
        pn: 1,
        ps: 10,
        data: []
      }
    }
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
