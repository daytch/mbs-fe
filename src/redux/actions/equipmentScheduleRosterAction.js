import {
  GET_EQUIPMENT_ROSTER,
  GET_EQUIPMENT_ROSTER_REPORT,
  POST_EQUIPMENT_ROSTER,
} from '../../constants'

export function getEquipmentRoster(data) {
  return {
    type: GET_EQUIPMENT_ROSTER,
    payload: data,
  }
}

export function getEquipmentRosterReport(data) {
  return {
    type: GET_EQUIPMENT_ROSTER_REPORT,
    payload: data,
  }
}

export function postEquipmentRoster(data) {
  return {
    type: POST_EQUIPMENT_ROSTER,
    payload: data,
  }
}
