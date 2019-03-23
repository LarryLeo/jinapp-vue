import * as types from './mutationTypes'

const mutations = {
  [types.CACHE_HOME_DATA](state, data) {
    state.homePageData = data
  }
}

export default mutations
