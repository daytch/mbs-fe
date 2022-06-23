import {
  GET_LEVYCATEGORY,
  POST_LEVYCATEGORY,
  PUT_LEVYCATEGORY,
  DELETE_LEVYCATEGORY,
  GET_LEVYCATEGORY_OPTION,
} from '../../constants'

export function getLevyCategories(payload) {
  return {
    type: GET_LEVYCATEGORY,
    payload: payload,
  }
}
export function getLevyCategoryOption(payload) {
  return {
    type: GET_LEVYCATEGORY_OPTION,
    payload: payload,
  }
}

export function postLevyCategory(payload) {
  return {
    type: POST_LEVYCATEGORY,
    payload: payload,
  }
}

export function putLevyCategory(payload) {
  return {
    type: PUT_LEVYCATEGORY,
    payload: payload,
  }
}

export function deleteLevyCategory(payload) {
  return {
    type: DELETE_LEVYCATEGORY,
    payload: payload,
  }
}
