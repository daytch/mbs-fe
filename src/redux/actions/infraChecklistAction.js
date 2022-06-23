import {
  GET_INFRA_CHECKLIST,
  POST_INFRA_CHECKLIST,
  PUT_INFRA_CHECKLIST,
  DELETE_INFRA_CHECKLIST,
} from '../../constants'

export function getInfraChecklist() {
  return {
    type: GET_INFRA_CHECKLIST,
  }
}

export function postInfraChecklist(data) {
  return {
    type: POST_INFRA_CHECKLIST,
    payload: data,
  }
}

export function putInfraChecklist(data) {
  return {
    type: PUT_INFRA_CHECKLIST,
    payload: data,
  }
}

export function deleteInfraChecklist(data) {
  return {
    type: DELETE_INFRA_CHECKLIST,
    payload: data,
  }
}
