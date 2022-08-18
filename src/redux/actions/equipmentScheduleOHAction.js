import { GET_EQUIPMENTSCHEDULE_OH, POST_EQUIPMENTSCHEDULE_OH } from '../../constants'

export function getEquipmentScheduleOH(payload) {
  return {
    type: GET_EQUIPMENTSCHEDULE_OH,
    payload: payload,
  }
}

export function postEquipmentScheduleOH(payload) {
  return {
    type: POST_EQUIPMENTSCHEDULE_OH,
    payload: payload,
  }
}
