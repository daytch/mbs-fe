import {
  GET_LIST_PROJECT_CATEGORIES,
  DELETE_PROJECT_CATEGORIES,
  PUT_PROJECT_CATEGORIES,
  POST_PROJECT_CATEGORIES,
  DELETE_PROJECT_SUBCATEGORIES,
  PUT_PROJECT_SUBCATEGORIES,
  POST_PROJECT_SUBCATEGORIES,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID,
} from '../../constants'

export function getListProjectCategories() {
  return {
    type: GET_LIST_PROJECT_CATEGORIES,
  }
}

export function getListProjectSubCategories(data) {
  return {
    type: GET_PROJECT_SUBCATEGORY_BY_CATEGORYID,
    payload: data,
  }
}

export function postProjectCategory(data) {
  return {
    type: POST_PROJECT_CATEGORIES,
    payload: data,
  }
}

export function putProjectCategory(data) {
  return {
    type: PUT_PROJECT_CATEGORIES,
    payload: data,
  }
}

export function deleteProjectCategory(data) {
  return {
    type: DELETE_PROJECT_CATEGORIES,
    payload: data,
  }
}

export function postProjectSubCategory(data) {
  return {
    type: POST_PROJECT_SUBCATEGORIES,
    payload: data,
  }
}

export function putProjectSubCategory(data) {
  return {
    type: PUT_PROJECT_SUBCATEGORIES,
    payload: data,
  }
}

export function deleteProjectSubCategory(data) {
  return {
    type: DELETE_PROJECT_SUBCATEGORIES,
    payload: data,
  }
}
