import { GET_EQUIPMENT_PA, POST_EQUIPMENT_PA } from '../../constants'

export function getEquipmentSchedulePA(payload) {
  return {
    type: GET_EQUIPMENT_PA,
    payload: payload,
  }
}

export function postEquipmentSchedulePA(payload) {
  return {
    type: POST_EQUIPMENT_PA,
    payload: payload,
  }
}
