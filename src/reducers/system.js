import { RECEIVE_SYSTEMS } from '../actions/system'

export const initialState = {
  systems: []
}

export default function system(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SYSTEMS:
      return { systems: action.data }
    default:
      return state
  }
}
