import * as types from '../mutations/mutationTypes'

export const cacheHomePageData = ({ commit }, data) => {
  commit(types.CACHE_HOME_DATA, data)
}
