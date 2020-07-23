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
export const RECEIVE_AUTH_DATA = 'RECEIVE_AUTH_DATA'
export const RECEIVE_INTERCLOUD_DATA = 'RECEIVE_INTERCLOUD_DATA'

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
    networkService
      .get('/authorization/mgmt/intracloud')
      .then(response => {
        dispatch(
          receiveAuthData(
            response.data.data,
            groupAuthDataByConsumer(response.data.data),
            groupAuthDataByProvider(response.data.data),
            groupAuthDataByService(response.data.data)
          )
        )
        if(cb){
          cb()
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getInterCloudAuthData() {
  return dispatch => {
    networkService
      .get('/authorization/mgmt/intercloud')
      .then(response => {
        dispatch(
          receiveInterCloudAuthData(
            groupInterCloudDataByClouds(response.data.data),
            groupInterCloudDataByServices(response.data.data)
          )
        )
      })
      .catch(error => {
        console.log(error)
      })
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
    networkService
      .post('/authorization/mgmt/intracloud', authData)
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
        if(cb){
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
        console.log(error)
      })
  }
}

export function addInterCloudEntry(interCloudEntry) {
  return dispatch => {
    networkService
      .post('/authorization/mgmt/intercloud', interCloudEntry)
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
        console.log(error)
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

export function deleteAuthEntry(authEntryId, cb) {
  return dispatch => {
    networkService
      .delete(`/authorization/mgmt/intracloud/${authEntryId}`)
      .then(response => {
        dispatch(getIntraCloudAuthData())
        if(cb){
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
        console.log(error)
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

export function deleteInterCloudEntry(entryId) {
  return dispatch => {
    networkService
      .delete(`/authorization/mgmt/intercloud/${entryId}`)
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
        console.log(error)
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
