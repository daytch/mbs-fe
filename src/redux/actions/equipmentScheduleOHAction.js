import {
  GET_EQUIPMENTSCHEDULE_OH,
  POST_EQUIPMENTSCHEDULE_OH,
  GET_EQUIPMENT_OH_REPORT,
} from '../../constants'

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

export function getEquipmentScheduleOHReport(payload) {
  return {
    type: GET_EQUIPMENT_OH_REPORT,
    payload: payload,
  }
}
