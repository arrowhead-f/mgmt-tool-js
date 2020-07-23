import networkService from '../services/networkService'
import store from 'store'
import { hideModal } from './modal'
import { showNotification } from './global'
import {coreSystemList } from '../utils/enums/coreSystemList'

export const RECEIVE_SR_ENTRIES_VIEW = 'RECEIVE_SR_ENTRIES_VIEW'
export const RECEIVE_SR_ENTRIES = 'RECEIVE_SR_ENTRIES'
export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'
export const RECEIVE_SERVICE = 'RECEIVE_SERVICE'
export const RECEIVE_SYSTEMS = 'RECEIVE_SYSTEMS'
export const ERROR_SR = 'ERROR_SR'

/*
function receiveServices(
  groupBySystems,
  groupByServices,
  autoCompleteData,
  queryDataObject = {}
) {
  const serviceObject = {
    type: RECEIVE_SERVICES,
    groupByServices,
    groupBySystems
  }

  if (autoCompleteData) {
    serviceObject.systemList = autoCompleteData.systemList
    serviceObject.serviceList = autoCompleteData.serviceList
    serviceObject.interfaceList = autoCompleteData.interfaceList
  }

  if (queryDataObject) {
    serviceObject.queryData = queryDataObject
  }

  return serviceObject
}*/

function errorSR(message){
  return {
    type: ERROR_SR,
    data: message
  }
}

function receiveServiceDataById(serviceId, serviceData) {
  return {
    type: RECEIVE_SERVICE,
    serviceId,
    serviceData
  }
}

function receiveServices(services) {
    return {
        type: RECEIVE_SERVICES,
        data: services.data
    }
}

function receiveSystems(systems) {
    return {
        type: RECEIVE_SYSTEMS,
        data: systems.data
    }
}

function receiveServiceRegistryEntriesView(data) {
    console.log('data', data)
  return {
    type: RECEIVE_SR_ENTRIES_VIEW,
    data
  }
}

function receiveServiceRegistryEntries(data) {
  return {
    type: RECEIVE_SR_ENTRIES,
    data
  }
}

export function echo(cb) {
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService.get(serviceRegistryAddress + '/serviceregistry/echo')
        .then(response => {
          console.log('res', response)
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
          /*
            Wrong url - Network Error
            Invalid url - Failed to execute 'open' on 'XMLHttpRequest': Invalid URL

           */
        })
    }
  }
}

export function getSystems(cb) {
    return dispatch => {
      const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
      if (!serviceRegistryAddress) {
        console.log('No SR address!')
        dispatch(errorSR('No Service Registry Address Provided!'))
      } else {
        networkService
          .get(serviceRegistryAddress + '/serviceregistry/mgmt/systems')
          .then(response => {
            dispatch(receiveSystems(response.data))
            if (cb) {
              cb()
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              console.log('error!', error, error.message)
              console.log('err req!', JSON.stringify(error.request, null, 4))

              dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
            } else {
              console.log('Error', error.message)
            }
            console.log('config', error.config)
          })
      }
    }
}

export function createSystem(system, cb){
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .post(serviceRegistryAddress + '/serviceregistry/mgmt/systems', system)
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
          dispatch(getSystems())
          if (cb) {
            cb()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function getServices(cb) {
    return dispatch => {
      const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
      if (!serviceRegistryAddress) {
        console.log('No SR address!')
        dispatch(errorSR('No Service Registry Address Provided!'))
      } else {
        networkService
          .get(serviceRegistryAddress + '/serviceregistry/mgmt/services')
          .then(response => {
            dispatch(receiveServices(response.data))
            if (cb) {
              cb()
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              console.log('error!', error, error.message)
              console.log('err req!', JSON.stringify(error.request, null, 4))

              dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
            } else {
              console.log('Error', error.message)
            }
            console.log('config', error.config)
          })
      }
    }
}

export function deleteService(serviceId, cb) {
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .delete(`${serviceRegistryAddress}/serviceregistry/mgmt/services/${serviceId}`)
        .then(response => {
          console.log(response.data)
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
          dispatch(getServices())
          if (cb) {
            cb()
          }
        })
    }
  }
}

export function deleteServiceRegistryEntry(entryId, cb){
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .delete(`${serviceRegistryAddress}/serviceregistry/mgmt/${entryId}`)
        .then(response => {
          console.log(response.data)
          if (cb) {
            cb()
          }
        })
    }
  }
}

export function deleteSystem(systemId, cb) {
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .delete(`${serviceRegistryAddress}/serviceregistry/mgmt/systems/${systemId}`)
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
          dispatch(getSystems())
          if (cb) {
            cb()
          }
        })
    }
  }
}

export function getServiceRegistryEntries(cb){
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .get(serviceRegistryAddress + '/serviceregistry/mgmt')
        .then(response => {
          dispatch(
            receiveServiceRegistryEntries(response.data)
          )
          if (cb) {
            cb()
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}


export function getServiceRegistryEntriesView() {
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .get(serviceRegistryAddress + '/serviceregistry/mgmt/grouped')
        .then(response => {
          dispatch(
            receiveServiceRegistryEntriesView(response.data)
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

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function getFilteredServices(queryData, queryDataObject) {
  return (dispatch, getState) => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .put(serviceRegistryAddress + '/serviceregistry/mgmt/query', queryData)
        .then(response => {
          dispatch(
            /*
          receiveServices(
            groupServicesBySystems({ serviceQueryData: response.data }),
            groupServicesByServices({ serviceQueryData: response.data }),
            undefined,
            queryDataObject
          )
             */
          )
          dispatch(hideModal())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function addService(serviceDefinition) {
  return (dispatch, getState) => {
      return new Promise( (resolve, reject) => {
        const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
        if (!serviceRegistryAddress) {
          console.log('No SR address!')
          dispatch(errorSR('No Service Registry Address Provided!'))
        } else {
          networkService
            .post(serviceRegistryAddress + '/serviceregistry/mgmt/services', serviceDefinition)
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
              dispatch(getServices())
              resolve(response.data)
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
              reject(error)
            })
        }
      })
  }
}

export function addSREntry(entry, cb) {
  return (dispatch, getState) => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .post(serviceRegistryAddress + '/serviceregistry/mgmt', entry)
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
          dispatch(getServiceRegistryEntriesView())
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

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function deleteServiceById(serviceId) {
  return (dispatch, getState) => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .delete(`${serviceRegistryAddress}/serviceregistry/mgmt/${serviceId}`)
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
          //dispatch(getServiceRegistryEntriesView())
          dispatch(getServices())
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
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

export function editSREntry(entry) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
      if (!serviceRegistryAddress) {
        console.log('No SR address!')
        dispatch(errorSR('No Service Registry Address Provided!'))
      } else {
        networkService
          .put(`${serviceRegistryAddress}/serviceregistry/mgmt/${entry.id}`, entry)
          .then(response => {
            dispatch(
              showNotification(
                {
                  title: 'Edit was successful',
                  message: '',
                  position: 'tc',
                  dismissible: true,
                  autoDismiss: 5
                },
                'success'
              )
            )
            dispatch(getServiceRegistryEntriesView())
            resolve()
          })
          .catch(error => {
            dispatch(
              showNotification(
                {
                  title: 'Edit was unsuccessful',
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

              dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
            } else {
              console.log('Error', error.message)
            }
            console.log('config', error.config)
            reject(error)
          })
      }
    })
  }
}

export function getServiceById(serviceId) {
  return dispatch => {
    const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
    if (!serviceRegistryAddress) {
      console.log('No SR address!')
      dispatch(errorSR('No Service Registry Address Provided!'))
    } else {
      networkService
        .get(`${serviceRegistryAddress}/serviceregistry/mgmt/id/${serviceId}`)
        .then(response => {
          dispatch(receiveServiceDataById(serviceId, response.data))
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log('error!', error, error.message)
            console.log('err req!', JSON.stringify(error.request, null, 4))

            dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
          } else {
            console.log('Error', error.message)
          }
          console.log('config', error.config)
        })
    }
  }
}

export function editService(serviceId, serviceDefinition) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
      if (!serviceRegistryAddress) {
        console.log('No SR address!')
        dispatch(errorSR('No Service Registry Address Provided!'))
      } else {
        networkService
          .put(`${serviceRegistryAddress}/serviceregistry/mgmt/services/${serviceId}`, { serviceDefinition })
          .then(response => {
            dispatch(
              showNotification(
                {
                  title: 'Edit was successful',
                  message: '',
                  position: 'tc',
                  dismissible: true,
                  autoDismiss: 5
                },
                'success'
              )
            )
            dispatch(getServices())
            resolve(response.data)
          })
          .catch(error => {
            dispatch(
              showNotification(
                {
                  title: 'Edit was unsuccessful',
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

              dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
            } else {
              console.log('Error', error.message)
            }
            console.log('config', error.config)
            reject(error)
          })
      }
    })
  }
}

export function editSystem(systemId, systemName, address, port, authenticationInfo) {
  const systemData = {
    systemName,
    address,
    port,
    authenticationInfo
  }
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const serviceRegistryAddress = store.get(coreSystemList.serviceRegistry)
      if (!serviceRegistryAddress) {
        console.log('No SR address!')
        dispatch(errorSR('No Service Registry Address Provided!'))
      } else {
        networkService
          .put(`${serviceRegistryAddress}/serviceregistry/mgmt/systems/${systemId}`, systemData)
          .then(response => {
            dispatch(
              showNotification(
                {
                  title: 'Edit was successful',
                  message: '',
                  position: 'tc',
                  dismissible: true,
                  autoDismiss: 5
                },
                'success'
              )
            )
            dispatch(getSystems())
            resolve(response.data)
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            } else if (error.request) {
              console.log('error!', error, error.message)
              console.log('err req!', JSON.stringify(error.request, null, 4))

              dispatch(errorSR('Check Service Registry Address or Load a Certificate!'))
            } else {
              console.log('Error', error.message)
            }
            console.log('config', error.config)
            reject(error)
          })
      }
    })
  }
}

// TODO is this needed?
export function editSREntryCollection(
  systemId,
  systemName,
  address,
  port,
  authenticationInfo,
  serviceDefinition,
  serviceMetadata = [],
  interfaces = [],
  serviceURI,
  udp,
  endOfValidity,
  version,
  providedServiceId,
  serviceId,
  SREntryId
) {
  return (dispatch, getState) => {
    dispatch(
      editSystem(systemId, systemName, address, port, authenticationInfo)
    )
      .then(
        dispatch(
          editService(
            providedServiceId,
            serviceDefinition,
            interfaces,
            serviceMetadata
          )
        )
      )
      .then(
        dispatch(
          editSREntry(
            systemId,
            systemName,
            address,
            port,
            authenticationInfo,
            serviceDefinition,
            serviceMetadata,
            interfaces,
            serviceURI,
            udp,
            endOfValidity,
            version,
            SREntryId
          )
        )
      )
  }
}
