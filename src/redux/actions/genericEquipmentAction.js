import {
  GET_GENERAL_EQUIPMENT,
  POST_GENERAL_EQUIPMENT,
  PUT_GENERAL_EQUIPMENT,
  DELETE_GENERAL_EQUIPMENT,
  UPDATE_GENERAL_EQUIPMENT_TYPE,
} from '../../constants'

export function getGenericEquipment() {
  return {
    type: GET_GENERAL_EQUIPMENT,
  }
}

export function postGenericEquipment(data) {
  return {
    type: POST_GENERAL_EQUIPMENT,
    payload: data,
  }
}

export function updateEquipmentType(data) {
  return {
    type: UPDATE_GENERAL_EQUIPMENT_TYPE,
    payload: data,
  }
}

export function putGenericEquipment(data) {
  return {
    type: PUT_GENERAL_EQUIPMENT,
    payload: data,
  }
}

export function deleteGenericEquipment(data) {
  return {
    type: DELETE_GENERAL_EQUIPMENT,
    payload: data,
  }
}
