import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
} from '../../constants'

export function getInfrastructrecc(payload) {
  return {
    type: GET_INFRASTRUCTURECC,
    payload: payload,
  }
}

export function postInfrastructurecc(payload) {
  return {
    type: POST_INFRASTRUCTURECC,
    payload: payload,
  }
}

export function putInfrastructurecc(payload) {
  return {
    type: PUT_INFRASTRUCTURECC,
    payload: payload,
  }
}

export function deleteInfrastructurecc(payload) {
  return {
    type: DELETE_INFRASTRUCTURECC,
    payload: payload,
  }
}
