import * as types from './mutationTypes'

const mutations = {
  [types.CACHE_NOTICE_DATA](state, { data, selectIndex = 0, noMore }) {
    state.notice.data = data
    state.notice.noMore = noMore
    state.notice.selectIndex = selectIndex
  },
  [types.REQUEST_HISTORY_DATA](state, { type }) {
    let targetState = state.history[type]
    targetState.loading = true
  },
  [types.RECEIVE_HISTORY_DATA](state, { type, data, noMore, pn }) {
    let targetState = state.history[type]
    targetState.data = data
    targetState.loading = false
    targetState.noMore = noMore
    targetState.pn = pn
  },
  [types.REFRESH_HISTORY_DATA](state, { type }) {
    let targetState = state.history[type]
    targetState.data = []
    targetState.noMore = false
    targetState.pn = 1
  },
  [types.SELECT_HISTORY_ITEM](state, { type, selectedIndex }) {
    let targetState = state.history[type]
    targetState.selectedIndex = selectedIndex
  },
  [types.SELECT_CONTACT_COMPANY](state, company) {
    state.selectedCompany = company
  },
  [types.SELECT_CONTACT_PERSON](state, person) {
    state.selectedPerson = person
  },
  [types.RESET_SELECT_CONTACT_PERSON](state) {
    state.selectedPerson = {
      realname: '请选择联系人',
      id: -1
    }
  }
}

export default mutations
