import { GET_LEVY, POST_LEVY, PUT_LEVY, DELETE_LEVY, GET_LEVY_REPORT } from '../../constants'

export function getLevies(payload) {
  return {
    type: GET_LEVY,
    payload: payload,
  }
}

export function getLevyReport(payload) {
  return {
    type: GET_LEVY_REPORT,
    payload: payload,
  }
}

export function postLevy(payload) {
  return {
    type: POST_LEVY,
    payload: payload,
  }
}

export function putLevy(payload) {
  return {
    type: PUT_LEVY,
    payload: payload,
  }
}

export function deleteLevy(payload) {
  return {
    type: DELETE_LEVY,
    payload: payload,
  }
}
