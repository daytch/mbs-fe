import { GET_MATERIALS, POST_MATERIALS, PUT_MATERIALS, DELETE_MATERIALS } from '../../constants'

export function getMaterials(data) {
  return {
    type: GET_MATERIALS,
    payload: data,
  }
}

export function postMaterials(data) {
  return {
    type: POST_MATERIALS,
    payload: data,
  }
}

export function putMaterials(data) {
  return {
    type: PUT_MATERIALS,
    payload: data,
  }
}

export function deleteMaterials(data) {
  return {
    type: DELETE_MATERIALS,
    payload: data,
  }
}
