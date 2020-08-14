import networkService from '../services/networkServiceAuth'
import { showNotification } from './global'
import { hideModal } from './modal'
import {
  groupAuthDataByConsumer,
  groupAuthDataByProvider,
  groupAuthDataByService
} from '../utils/utils'
import {
  groupInterCloudDataByClouds,
  groupInterCloudDataByServices
} from '../utils/authUtils'
import store from 'store'

import { coreSystemList } from '../utils/enums/coreSystemList'
export const RECEIVE_AUTH_DATA = 'RECEIVE_AUTH_DATA'
export const RECEIVE_INTERCLOUD_DATA = 'RECEIVE_INTERCLOUD_DATA'
export const ERROR_AUTH = 'ERROR_AUTH'


function errorAUTH(message){
  return {
    type: ERROR_AUTH,
    data: message
  }
}


function receiveAuthData(authRules, consumer, provider, service) {
  return {
    type: RECEIVE_AUTH_DATA,
    authRules,
    consumer,
    provider,
    service
  }
}

function receiveInterCloudAuthData(cloud, service) {
  return {
    type: RECEIVE_INTERCLOUD_DATA,
    cloud,
    service
  }
}

export function getIntraCloudAuthData(cb) {
  return (dispatch, getState) => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    console.log('cccc', coreSystemList, authorizationAddress)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .get(authorizationAddress + '/authorization/mgmt/intracloud')
        .then(response => {
          dispatch(
            receiveAuthData(
              response.data.data,
              groupAuthDataByConsumer(response.data.data),
              groupAuthDataByProvider(response.data.data),
              groupAuthDataByService(response.data.data)
            )
          )
          if (cb) {
            cb()
          }
        })
        .catch(error => {
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function getInterCloudAuthData() {
  return dispatch => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .get(authorizationAddress + '/authorization/mgmt/intercloud')
        .then(response => {
          dispatch(
            receiveInterCloudAuthData(
              groupInterCloudDataByClouds(response.data.data),
              groupInterCloudDataByServices(response.data.data)
            )
          )
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function addAuthData(consumer, providerList, service, interfaces, cb) {
  const authData = {
    consumerId: consumer.id,
    providerIds: providerList.map(provider => provider.id),
    serviceDefinitionIds: [service.id],
    interfaceIds: interfaces.map(i => i.id)
  }
  return dispatch => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .post(authorizationAddress + '/authorization/mgmt/intracloud', authData)
        .then(response => {
          dispatch(getIntraCloudAuthData())
          dispatch(hideModal())
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
          if (cb) {
            cb()
          }
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
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function addInterCloudEntry(interCloudEntry) {
  return dispatch => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .post(authorizationAddress + '/authorization/mgmt/intercloud', interCloudEntry)
        .then(response => {
          dispatch(getInterCloudAuthData())
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
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
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

export function deleteAuthEntry(authEntryId, cb) {
  return dispatch => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .delete(authorizationAddress + `/authorization/mgmt/intracloud/${authEntryId}`)
        .then(response => {
          dispatch(getIntraCloudAuthData())
          if (cb) {
            cb()
          }
          dispatch(hideModal())
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
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
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

export function deleteInterCloudEntry(entryId) {
  return dispatch => {
    const authorizationAddress = store.get(coreSystemList.authorization)
    if (!authorizationAddress) {
      console.log('No Authorization address!')
      dispatch(errorAUTH('No Authorization Address Provided!'))
    } else {
      networkService
        .delete(authorizationAddress + `/authorization/mgmt/intercloud/${entryId}`)
        .then(response => {
          dispatch(getInterCloudAuthData())
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
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorAUTH('Check Authorization Address or Load a Certificate!'))
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
