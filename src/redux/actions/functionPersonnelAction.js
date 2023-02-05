import {
  GET_FUNCTION_PERSONNEL,
  GET_FUNCTION_PERSONNEL_REPORT,
  POST_FUNCTION_PERSONNEL,
} from '../../constants'

export function getFuntionPersonnel(data) {
  return {
    type: GET_FUNCTION_PERSONNEL,
    payload: data,
  }
}

export function getFunctionPersonnelReport(data) {
  return {
    type: GET_FUNCTION_PERSONNEL_REPORT,
    payload: data,
  }
}

export function postFuntionPersonnel(data) {
  return {
    type: POST_FUNCTION_PERSONNEL,
    payload: data,
  }
}
