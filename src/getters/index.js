export const currentNoticeDetail = state =>
  state.notice.data[state.notice.selectIndex]
export const suggestionsHistory = state => state.history.suggestions
export const consultationsHistory = state => state.history.consultations
export const suggestionReply = state =>
  state.history.suggestions.data[state.history.suggestions.selectedIndex]

export const consultationReply = state =>
  state.history.consultations.data[state.history.consultations.selectedIndex]
