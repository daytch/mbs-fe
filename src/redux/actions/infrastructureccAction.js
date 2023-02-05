import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
  GET_INFRASTRUCTURECC_MATERIAL,
  POST_INFRASTRUCTURECC_MATERIAL,
  GET_INFRASTRUCTURECC_RESOURCE,
  POST_INFRASTRUCTURECC_RESOURCE,
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

export function getInfrastructreccMaterial(payload) {
  return {
    type: GET_INFRASTRUCTURECC_MATERIAL,
    payload: payload,
  }
}

export function postInfrastructureccMaterial(payload) {
  return {
    type: POST_INFRASTRUCTURECC_MATERIAL,
    payload: payload,
  }
}

export function getInfrastructreccResource(payload) {
  return {
    type: GET_INFRASTRUCTURECC_RESOURCE,
    payload: payload,
  }
}

export function postInfrastructureccResource(payload) {
  return {
    type: POST_INFRASTRUCTURECC_RESOURCE,
    payload: payload,
  }
}
