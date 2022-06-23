import {
  GET_COST_CENTRE,
  POST_COST_CENTRE,
  PUT_COST_CENTRE,
  DELETE_COST_CENTRE,
} from '../../constants'

export function getCostCentre(data) {
  return {
    type: GET_COST_CENTRE,
    payload: data,
  }
}

export function postCostCentre(data) {
  return {
    type: POST_COST_CENTRE,
    payload: data,
  }
}

export function putCostCentre(data) {
  return {
    type: PUT_COST_CENTRE,
    payload: data,
  }
}

export function deleteCostCentre(data) {
  return {
    type: DELETE_COST_CENTRE,
    payload: data,
  }
}
