import {
  GET_EQUIPMENTSCHEDULEOH,
  POST_EQUIPMENTSCHEDULEOH,
  PUT_EQUIPMENTSCHEDULEOH,
  DELETE_EQUIPMENTSCHEDULEOH,
} from '../../constants'

export function getEquipmentScheduleOH(payload) {
  return {
    type: GET_EQUIPMENTSCHEDULEOH,
    payload: payload,
  }
}

export function postEquipmentScheduleOH(payload) {
  return {
    type: POST_EQUIPMENTSCHEDULEOH,
    payload: payload,
  }
}

export function putEquipmentScheduleOH(payload) {
  return {
    type: PUT_EQUIPMENTSCHEDULEOH,
    payload: payload,
  }
}

export function deleteEquipmentScheduleOH(payload) {
  return {
    type: DELETE_EQUIPMENTSCHEDULEOH,
    payload: payload,
  }
}
