import {
  GET_PROJECT_CATEGORIES,
  GET_PROJECT_SUBCATEGORIES,
  POST_PROJECT,
  PUT_PROJECT,
  GET_PROJECT,
  DELETE_PROJECT,
  GET_DROPDOWN_PROJECT,
  GET_PROJECT_DASHBOARD,
} from '../../constants'

export function getProjectCategories() {
  return {
    type: GET_PROJECT_CATEGORIES,
  }
}

export function getProjectSubCategories() {
  return {
    type: GET_PROJECT_SUBCATEGORIES,
  }
}

export function postProject(data) {
  return {
    type: POST_PROJECT,
    payload: data,
  }
}

export function putProject(data) {
  return {
    type: PUT_PROJECT,
    payload: data,
  }
}

export function deleteProject(data) {
  return {
    type: DELETE_PROJECT,
    payload: data,
  }
}

export function getProjects() {
  return {
    type: GET_PROJECT,
  }
}

export function getProjectDashboard() {
  return {
    type: GET_PROJECT_DASHBOARD,
  }
}

export function getDropdownProjects() {
  return {
    type: GET_DROPDOWN_PROJECT,
  }
}
