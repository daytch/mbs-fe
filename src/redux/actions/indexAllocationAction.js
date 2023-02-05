import {
  PUT_INDEX_ALLOCATION,
  GET_PROJECT_REPRESENTATION_DETAIL,
  GET_INDEX_CONTINGENCY_REPORT,
} from '../../constants'

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

export function getIndexContingencyReport(data) {
  return {
    type: GET_INDEX_CONTINGENCY_REPORT,
    payload: data,
  }
}
