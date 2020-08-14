import networkService from '../services/networkService'
import { digestOrchestrationBackupListData } from '../utils/utils'
import { showNotification } from './global'
import { coreSystemList } from '../utils/enums/coreSystemList'
import store from 'store'

export const RECEIVE_ORCHESTRATOR_STORE_DATA = 'RECEIVE_ORCHESTRATOR_STORE_DATA'
export const RECEIVE_ORCHESTRATOR_SYSTEMS = 'RECEIVE_ORCHESTRATOR_SYSTEMS'
export const RECEIVE_ORCHESTRATOR_SERVICES = 'RECEIVE_ORCHESTRATOR_SERVICES'
export const RECEIVE_ORCHESTRATOR_CLOUDS = 'RECEIVE_ORCHESTRATOR_CLOUDS'
export const ERROR_ORCH = 'ERROR_ORCH'

function receiveOrchestratorStoreData(backup) {
  return {
    type: RECEIVE_ORCHESTRATOR_STORE_DATA,
    backup
  }
}

function errorORCH(message){
  return {
    type: ERROR_ORCH,
    data: message
  }
}

export function getOrchestrationStoreData() {
  return (dispatch, getState) => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .get(orchestratorAddress + '/orchestrator/mgmt/store')
        .then(response => {
          dispatch(
            receiveOrchestratorStoreData(
              digestOrchestrationBackupListData(response.data.data)
            )
          )
        })
        .catch(error => {
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function savePriorities(priorityData) {
  return dispatch => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .post(orchestratorAddress + '/orchestrator/mgmt/store/modify_priorities', { priorityMap: priorityData })
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Saving was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getOrchestrationStoreData())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          dispatch(
            showNotification(
              {
                title: 'Saving was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
        })
    }
  }
}

export function deleteService(serviceId) {
  return dispatch => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .delete(orchestratorAddress+ `/mgmt/services/${serviceId}`)
        .then(() => {
          dispatch(
            showNotification(
              {
                title: 'Deletion was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getOrchestrationStoreData())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          dispatch(
            showNotification(
              {
                title: 'Deletion was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'error'
            )
          )
        })
    }
  }
}

export function addStoreEntry(storeData) {
  return dispatch => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .post(orchestratorAddress + '/orchestrator/mgmt/store', [storeData])
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Saving was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getOrchestrationStoreData())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          dispatch(
            showNotification(
              {
                title: 'Saving was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
        })
    }
  }
}

export function deleteStoreEntry(id) {
  return dispatch => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .delete(orchestratorAddress + `/orchestrator/mgmt/store/${id}`)
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Deletion was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getOrchestrationStoreData())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          dispatch(
            showNotification(
              {
                title: 'Deletion was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
        })
    }
  }
}

export function editStoreEntry(storeEntry, id) {
  return dispatch => {
    const orchestratorAddress = store.get(coreSystemList.orchestrator)
    if (!orchestratorAddress) {
      console.log('No Orchestrator address!')
      dispatch(errorORCH('No Orchestrator Address Provided!'))
    } else {
      networkService
        .put(orchestratorAddress + `/orchestrator/mgmt/store/update/${id}`, storeEntry)
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Saving was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(getOrchestrationStoreData())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorORCH('Check Orchestrator Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          dispatch(
            showNotification(
              {
                title: 'Saving was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
        })
    }
  }
}
