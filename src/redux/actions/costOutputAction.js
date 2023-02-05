import {
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
  EQUIPMENT_COMMISSIONING_SUMMARY,
  EQP_REPLACEMENT_BY_COST_CENTRE,
  EQP_REPLACEMENT_SUMMARY,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE,
  EQP_DISPOSSAL_VALUE_SUMMARY,
} from '../../constants'

export function getEquipmentCommissioningByCostCentre(data) {
  return {
    type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEquipmentCommissioningSummary(data) {
  return {
    type: EQUIPMENT_COMMISSIONING_SUMMARY,
    payload: data,
  }
}

export function getEqpReplacementByCostCentre(data) {
  return {
    type: EQP_REPLACEMENT_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEqpReplacementSummary(data) {
  return {
    type: EQP_REPLACEMENT_SUMMARY,
    payload: data,
  }
}

export function getEqpDispossalValueByCostCentre(data) {
  return {
    type: EQP_DISPOSSAL_VALUE_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEqpDispossalValueSummary(data) {
  return {
    type: EQP_DISPOSSAL_VALUE_SUMMARY,
    payload: data,
  }
}
