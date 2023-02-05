import { GET_FUNCTION_GENERAL, POST_FUNCTION_GENERAL } from '../../constants'

export function getFuntionGeneral(data) {
  return {
    type: GET_FUNCTION_GENERAL,
    payload: data,
  }
}

export function postFuntionGeneral(data) {
  return {
    type: POST_FUNCTION_GENERAL,
    payload: data,
  }
}
