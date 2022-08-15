import { GET_EQUIPMENTSCHEDULEOH, POST_EQUIPMENTSCHEDULEOH } from '../../constants'

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
