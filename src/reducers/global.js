import { SHOW_LOADING_LAYER, HIDE_LOADING_LAYER } from '../actions/global'
import { ERROR_SR } from '../actions/serviceRegistry'
import { ERROR_CH } from '../actions/choreographer'

const initialState = {
  isLoadingLayerVisible: false,
  messages: [],
  notifications: []
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADING_LAYER:
      return {
        ...state,
        isLoadingLayerVisible: true
      }
    case HIDE_LOADING_LAYER:
      return {
        ...state,
        isLoadingLayerVisible: false
      }
    case ERROR_SR:
    case ERROR_CH:
      return {
       ...state,
        notifications: [...state.notifications, action.data]
      }
    default:
      return state
  }
}
