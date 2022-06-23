import { PUT_INDEX_ALLOCATION, GET_PROJECT_REPRESENTATION_DETAIL } from '../../constants'

export function putIndexAllocation(data) {
  return {
    type: PUT_INDEX_ALLOCATION,
    payload: data,
  }
}

export function getProjectRepresentationDetail(data) {
  return {
    type: GET_PROJECT_REPRESENTATION_DETAIL,
    payload: data,
  }
}
