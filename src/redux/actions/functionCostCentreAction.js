import {
  GET_FUNCTION_COSTCENTRE,
  GET_FUNCTION_COSTCENTRE_REPORT,
  POST_FUNCTION_COSTCENTRE,
} from '../../constants'

export function getFuntionCostCentre(data) {
  return {
    type: GET_FUNCTION_COSTCENTRE,
    payload: data,
  }
}

export function getFunctionCostCentreReport(data) {
  return {
    type: GET_FUNCTION_COSTCENTRE_REPORT,
    payload: data,
  }
}

export function postFuntionCostCentre(data) {
  return {
    type: POST_FUNCTION_COSTCENTRE,
    payload: data,
  }
}
