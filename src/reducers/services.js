import { RECEIVE_SERVICES, RECEIVE_SERVICE, RECEIVE_SR_ENTRIES_VIEW, RECEIVE_SYSTEMS, RECEIVE_SR_ENTRIES, RECEIVE_INTERFACES } from '../actions/serviceRegistry'

export const initialState = {
  groupBySystems: [],
  groupByServices: [],
  autoCompleteData: [],
  systems: [],
  services: [],
  interfaces: [],
  entries: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SR_ENTRIES_VIEW:
      return {
        ...state,
        groupBySystems: action.data.servicesGroupedBySystems,
        groupByServices: action.data.servicesGroupedByServiceDefinition,
        autoCompleteData: action.data.autoCompleteData
      }
    case RECEIVE_SR_ENTRIES:
      return {
        ...state,
        entries: action.data
      }
    case RECEIVE_SYSTEMS:
      return {
        ...state,
        systems: action.data
      }
    case RECEIVE_SERVICES:
      return {
        ...state,
        services: action.data
      }
    case RECEIVE_SERVICE:
      const sData = { ...state.serviceData }
      sData[action.serviceId] = action.serviceData
      return {
        ...state,
        serviceData: sData
      }
    case RECEIVE_INTERFACES:
      return {
        ...state,
        interfaces: action.data
      }
    default:
      return state
  }
}
