import * as types from '../mutations/mutationTypes'
import { requestGet } from '../utils/index'

export const cacheHomePageData = ({ commit }, data) => {
  commit(types.CACHE_HOME_DATA, data)
}

export const fetchHistoryData = ({ commit, state }, { type }) => {
  let targetState = state.history[type]
  if (targetState.noMore) return console.log('没有更多数据')
  commit(types.REQUEST_HISTORY_DATA, {
    type
  })
  let userCredential = JSON.parse(localStorage.getItem('userCredential'))
  let apiUrl =
    type === 'suggestions'
      ? '/app/v1/suggestion/mySuggestionList'
      : '/app/v1/consult/myConsultList'
  let apiData = {
    ...userCredential,
    pn: targetState.pn,
    ps: targetState.ps
  }
  requestGet(apiUrl, {
    ...apiData
  })
    .then(res => {
      if (res.success) {
        let list = res.data.list
        let payload = {
          type,
          data: [...targetState.data, ...list],
          pn:
            list.length < targetState.ps ? targetState.pn : targetState.pn + 1,
          noMore: list.length < targetState.ps
        }
        commit(types.RECEIVE_HISTORY_DATA, payload)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
export const refreshHistoryData = (
  { dispatch, commit },
  { type = 'suggestions' }
) => {
  commit(types.REFRESH_HISTORY_DATA, {
    type
  })
  return dispatch('fetchHistoryData', { type })
}
