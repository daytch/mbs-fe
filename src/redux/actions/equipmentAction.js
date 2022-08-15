import {
  GET_FLEETS,
  POST_FLEETS,
  PUT_FLEETS,
  DELETE_FLEETS,
  GET_EQUIPMENT_TYPES,
  GET_FLEET_MATERIAL_SERVICE,
} from '../../constants'

export function getFleets(data) {
  return {
    type: GET_FLEETS,
    payload: data,
  }
}

export function postFleets(data) {
  return {
    type: POST_FLEETS,
    payload: data,
  }
}

export function putFleets(data) {
  return {
    type: PUT_FLEETS,
    payload: data,
  }
}

export function deleteFleets(data) {
  return {
    type: DELETE_FLEETS,
    payload: data,
  }
}

export function getEquipmentTypes(data) {
  return {
    type: GET_EQUIPMENT_TYPES,
    data: data,
  }
}

export function getFleetMaterialService(data) {
  return {
    type: GET_FLEET_MATERIAL_SERVICE,
    data: data,
  }
}
