import { GET_PROJECT_COUNTRY, GET_CURRENCIES, POST_CURRENCIES, PUT_CURRENCIES, DELETE_CURRENCIES } from '../../constants'

export function getProjectCountry() {
  return {
    type: GET_PROJECT_COUNTRY,
  }
}

export function getCurrencies() {
  return {
    type: GET_CURRENCIES,
  }
}

export function postCurrencies(payload) {
  return {
    type: POST_CURRENCIES,
    payload: payload
  }
}

export function putCurrencies(payload) {
  return {
    type: PUT_CURRENCIES,
    payload: payload
  }
}

export function deleteCurrencies(payload) {
  return {
    type: DELETE_CURRENCIES,
    payload: payload
  }
}