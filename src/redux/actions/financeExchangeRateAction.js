import {
  GET_EXCHANGE_RATE,
  POST_EXCHANGE_RATE,
  PUT_EXCHANGE_RATE,
  DELETE_EXCHANGE_RATE,
} from '../../constants'

export function getExchangeRate(data) {
  return {
    type: GET_EXCHANGE_RATE,
    payload: data,
  }
}

export function postExchangeRate(data) {
  return {
    type: POST_EXCHANGE_RATE,
    payload: data,
  }
}

export function putExchangeRate(data) {
  return {
    type: PUT_EXCHANGE_RATE,
    payload: data,
  }
}

export function deleteExchangeRate(data) {
  return {
    type: DELETE_EXCHANGE_RATE,
    payload: data,
  }
}
