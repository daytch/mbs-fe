import {
  GET_EMPLOYEE_TYPE,
  POST_EMPLOYEE_TYPE,
  PUT_EMPLOYEE_TYPE,
  DELETE_EMPLOYEE_TYPE,
  GET_EMPLOYEE_TYPE_REPORT,
} from '../../constants'

export function getEmployeeType(data) {
  return {
    type: GET_EMPLOYEE_TYPE,
    payload: data,
  }
}

export function postEmployeeType(data) {
  return {
    type: POST_EMPLOYEE_TYPE,
    payload: data,
  }
}

export function putEmployeeType(data) {
  return {
    type: PUT_EMPLOYEE_TYPE,
    payload: data,
  }
}

export function deleteEmployeeType(data) {
  return {
    type: DELETE_EMPLOYEE_TYPE,
    payload: data,
  }
}

export function getEmployeeTypeReport(payload) {
  return {
    type: GET_EMPLOYEE_TYPE_REPORT,
    payload: payload,
  }
}
