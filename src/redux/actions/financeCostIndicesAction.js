import {
  GET_COST_INDICES,
  POST_COST_INDICES,
  PUT_COST_INDICES,
  DELETE_COST_INDICES,
} from '../../constants'

export function getCostIndices(data) {
  return {
    type: GET_COST_INDICES,
    payload: data,
  }
}

export function postCostIndices(data) {
  return {
    type: POST_COST_INDICES,
    payload: data,
  }
}

export function putCostIndices(data) {
  return {
    type: PUT_COST_INDICES,
    payload: data,
  }
}

export function deleteCostIndices(data) {
  return {
    type: DELETE_COST_INDICES,
    payload: data,
  }
}
