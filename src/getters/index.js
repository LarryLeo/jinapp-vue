export const currentNoticeDetail = state =>
  state.notice.data[state.notice.selectIndex]
export const suggestionsHistory = state => state.history.suggestions
export const consultationsHistory = state => state.history.consultations
