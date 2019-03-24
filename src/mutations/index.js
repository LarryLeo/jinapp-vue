import * as types from './mutationTypes'

const mutations = {
  [types.CACHE_NOTICE_DATA](state, { data, selectIndex = 0, noMore }) {
    state.notice.data = data
    state.notice.noMore = noMore
    state.notice.selectIndex = selectIndex
  }
}

export default mutations
