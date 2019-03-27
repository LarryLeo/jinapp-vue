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
  }
}

export default mutations
