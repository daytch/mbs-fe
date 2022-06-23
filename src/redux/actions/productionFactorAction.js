import {
  GET_PRODUCTION_FACTOR,
  POST_PRODUCTION_FACTOR,
  PUT_PRODUCTION_FACTOR,
  DELETE_PRODUCTION_FACTOR,
} from '../../constants'

export function getProductionFactor(data) {
  return {
    type: GET_PRODUCTION_FACTOR,
    payload: data,
  }
}

export function postProductionFactor(data) {
  return {
    type: POST_PRODUCTION_FACTOR,
    payload: data,
  }
}

export function putProductionFactor(data) {
  return {
    type: PUT_PRODUCTION_FACTOR,
    payload: data,
  }
}

export function deleteProductionFactor(data) {
  return {
    type: DELETE_PRODUCTION_FACTOR,
    payload: data,
  }
}
