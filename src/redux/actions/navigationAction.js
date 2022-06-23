import { SET_PROJECT, SET_PROJECT_REPRESENTATION } from '../../constants'

export function setProject(data) {
  return {
    type: SET_PROJECT,
    payload: data,
  }
}

export function setProjectRepresentation(data) {
  return {
    type: SET_PROJECT_REPRESENTATION,
    payload: data,
  }
}

export function resetProjectRepresentation() {
  return {
    type: SET_PROJECT_REPRESENTATION,
  }
}
