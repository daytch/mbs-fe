import { GET_COMPANY, POST_COMPANY, PUT_COMPANY, DELETE_COMPANY } from '../../constants'

export function getCompany(data) {
  return {
    type: GET_COMPANY,
    payload: data,
  }
}

export function postCompany(data) {
  return {
    type: POST_COMPANY,
    payload: data,
  }
}

export function putCompany(data) {
  return {
    type: PUT_COMPANY,
    payload: data,
  }
}

export function deleteCompany(data) {
  return {
    type: DELETE_COMPANY,
    payload: data,
  }
}
