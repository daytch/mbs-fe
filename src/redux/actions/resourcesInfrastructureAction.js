import {
  GET_INFRASTRUCTURE,
  POST_INFRASTRUCTURE,
  PUT_INFRASTRUCTURE,
  DELETE_INFRASTRUCTURE,
} from '../../constants'

export function getResourcesInfra(data) {
  return {
    type: GET_INFRASTRUCTURE,
    payload: data,
  }
}

export function postResourcesInfra(data) {
  return {
    type: POST_INFRASTRUCTURE,
    payload: data,
  }
}

export function putResourcesInfra(data) {
  return {
    type: PUT_INFRASTRUCTURE,
    payload: data,
  }
}

export function deleteResourcesInfra(data) {
  return {
    type: DELETE_INFRASTRUCTURE,
    payload: data,
  }
}
