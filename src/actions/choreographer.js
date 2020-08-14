import networkService from '../services/networkService'
import store from 'store'
import { showNotification } from './global'
import { hideModal } from './modal'
import { coreSystemList } from '../utils/enums/coreSystemList'

export const RECEIVE_ALL_CHOREOGRAPHER_DATA = 'RECEIVE_ALL_CHOREOGRAPHER_DATA'
export const RECEIVE_SINGLE_CHOREOGRAPHER_DATA =
  'RECEIVE_SINGLE_CHOREOGRAPHER_DATA'
export const ERROR_CH = 'ERROR_CH'

function receiveAllData(data) {
  return {
    type: RECEIVE_ALL_CHOREOGRAPHER_DATA,
    data
  }
}

function receiveSingleData(id, data) {
  return {
    type: RECEIVE_SINGLE_CHOREOGRAPHER_DATA,
    id,
    data
  }
}

function errorCH(message){
  return {
    type: ERROR_CH,
    data: message
  }
}

export function getAllChoreographerData() {
  return dispatch => {
    const choreographerAddress = store.get(coreSystemList.choreographer)
    if (!choreographerAddress) {
      console.log('No Choreographer address!')
      dispatch(errorCH('No Choreographer Address Provided!'))
    } else {
    networkService
      .get(choreographerAddress + '/choreographer/mgmt/plan')
      .then(response => {
        dispatch(receiveAllData(response.data))
      })
      .catch(error => {
        if(error.response){
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log('error!', error, error.message)
          console.log('err req!', JSON.stringify(error.request, null, 4))

          dispatch(errorCH('Check Choreographer Address or Load a Certificate!'))
        } else {
          console.log('Error', error.message)
        }
        console.log('config', error.config)
      })
    }
  }
}

export function getSingleChoreographerData(id) {
  return dispatch => {
    const choreographerAddress = store.get(coreSystemList.choreographer)
    if (!choreographerAddress) {
      console.log('No Choreographer address!')
      dispatch(errorCH('No Choreographer Address Provided!'))
    } else {
    networkService
      .get(choreographerAddress + `/choreographer/mgmt/plan/${id}`)
      .then(response => {
        dispatch(receiveSingleData(id, response.data))
      })
      .catch(error => {
        if(error.response){
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log('error!', error, error.message)
          console.log('err req!', JSON.stringify(error.request, null, 4))

          dispatch(errorCH('Check Choreographer Address or Load a Certificate!'))
        } else {
          console.log('Error', error.message)
        }
        console.log('config', error.config)
      })
    }
  }
}

export function deletePlan(id) {
  return dispatch => {
    const choreographerAddress = store.get(coreSystemList.choreographer)
    if (!choreographerAddress) {
      console.log('No Choreographer address!')
      dispatch(errorCH('No Choreographer Address Provided!'))
    } else {
      networkService
        .delete(choreographerAddress + `/choreographer/mgmt/plan/${id}`)
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
          dispatch(getAllChoreographerData())
        })
        .catch(error => {
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
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorCH('Check Choreographer Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function createPlan(plan) {
  return dispatch => {
    const choreographerAddress = store.get(coreSystemList.choreographer)
    if (!choreographerAddress) {
      console.log('No Choreographer address!')
      dispatch(errorCH('No Choreographer Address Provided!'))
    } else {
      networkService
        .post(choreographerAddress + `/choreographer/mgmt/plan`, plan)
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
          dispatch(getAllChoreographerData())
          dispatch(hideModal())
        })
        .catch(error => {
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
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorCH('Check Choreographer Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function sessionStart(ids){
  return dispatch => {
    const choreographerAddress = store.get(coreSystemList.choreographer)
    if (!choreographerAddress) {
      console.log('No Choreographer address!')
      dispatch(errorCH('No Choreographer Address Provided!'))
    } else {
      networkService
        .post(choreographerAddress + '/choreographer/mgmt/session/start', ids)
        .then(response => {
          dispatch(
            showNotification(
              {
                title: 'Start was successful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 5
              },
              'success'
            )
          )
          dispatch(hideModal())
        })
        .catch(error => {
          dispatch(
            showNotification(
              {
                title: 'Start was unsuccessful',
                message: '',
                position: 'tc',
                dismissible: true,
                autoDismiss: 10
              },
              'error'
            )
          )
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorCH('Check Choreographer Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}
