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
        selectedIndex: 0,
        data: []
      },
      consultations: {
        loading: false,
        noMore: false,
        pn: 1,
        ps: 10,
        selectedIndex: 0,
        data: []
      }
    },
    selectedCompany: {
      company: '请选择联系企业',
      id: -1
    },
    selectedPerson: {
      realname: '请选择联系人',
      id: -1
    }
  },
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
