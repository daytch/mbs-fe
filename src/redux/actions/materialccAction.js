import { GET_MATERIALCC, POST_MATERIALCC, PUT_MATERIALCC, DELETE_MATERIALCC } from '../../constants'

export function getMaterialcc(payload) {
  return {
    type: GET_MATERIALCC,
    payload: payload,
  }
}

export function postMaterialcc(payload) {
  return {
    type: POST_MATERIALCC,
    payload: payload,
  }
}

export function putMaterialcc(payload) {
  return {
    type: PUT_MATERIALCC,
    payload: payload,
  }
}

export function deleteMaterialcc(payload) {
  return {
    type: DELETE_MATERIALCC,
    payload: payload,
  }
}
