import {
  EQUIPMENT_REQUIRED_BY_COST_CENTRE,
  EQUIPMENT_REQUIRED_SUMMARY,
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE,
  EQUIPMENT_REPLACEMENT_SUMMARY,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY,
  EQUIPMENT_FLEET_BY_COST_CENTRE,
  EQUIPMENT_FLEET_SUMMARY,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE,
  EQUIPMENT_UTILISATION_SUMMARY,
  MATERIALS_SERVICES_BY_COST_CENTRE,
  MATERIALS_BY_COST_CENTRE,
  SERVICES_BY_COST_CENTRE,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_SUMMARY,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY,
  EMPLOYEE_TOTAL_BY_COST_CENTRE,
  EMPLOYEE_TOTAL_SUMMARY,
  GENERAL_FUNCTION,
} from '../../constants'

export function getEquipmentRequiredByCostCentre(data) {
  return {
    type: EQUIPMENT_REQUIRED_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEquipmentRequiredSummary(data) {
  return {
    type: EQUIPMENT_REQUIRED_SUMMARY,
    payload: data,
  }
}

export function getEquipmentCommisionongByCostCentre(data) {
  return {
    type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEquipmentReplacementByCostCentre(data) {
  return {
    type: EQUIPMENT_REPLACEMENT_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEquipmentReplacementSummary(data) {
  return {
    type: EQUIPMENT_REPLACEMENT_SUMMARY,
    payload: data,
  }
}

export function getEquipmentDisposalExpiredByCostCentre(data) {
  return {
    type: EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE,
    payload: data,
  }
}
export function getEquipmentDisposalExpiredSummary(data) {
  return {
    type: EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY,
    payload: data,
  }
}

export function getEquipmentDisposalNotRequiredCostCentre(data) {
  return {
    type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE,
    payload: data,
  }
}
export function getEquipmentDisposalNotRequiredSummary(data) {
  return {
    type: EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY,
    payload: data,
  }
}

export function getEquipmentTotalDisposalByCostCentre(data) {
  return {
    type: EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE,
    payload: data,
  }
}
export function getEquipmentTotalDisposalSummary(data) {
  return {
    type: EQUIPMENT_TOTAL_DISPOSAL_SUMMARY,
    payload: data,
  }
}

export function getEquipmentFleetByCostCentre(data) {
  return {
    type: EQUIPMENT_FLEET_BY_COST_CENTRE,
    payload: data,
  }
}
export function getEquipmentFleetSummary(data) {
  return {
    type: EQUIPMENT_FLEET_SUMMARY,
    payload: data,
  }
}

export function getEquipmentUtilisationByCostCentre(data) {
  return {
    type: EQUIPMENT_UTILISATION_BY_COST_CENTRE,
    payload: data,
  }
}
export function getEquipmentUtilisationSummary(data) {
  return {
    type: EQUIPMENT_UTILISATION_SUMMARY,
    payload: data,
  }
}

export function getMaterialsByCostCentre(data) {
  return {
    type: MATERIALS_BY_COST_CENTRE,
    payload: data,
  }
}

export function getServicesByCostCentre(data) {
  return {
    type: SERVICES_BY_COST_CENTRE,
    payload: data,
  }
}

export function getMaterialsServicesByCostCentre(data) {
  return {
    type: MATERIALS_SERVICES_BY_COST_CENTRE,
    payload: data,
  }
}

export function getMaterialsServicesConsumedByEquipment(data) {
  return {
    type: MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT,
    payload: data,
  }
}

export function getMaterialsServicesNotConsumedByEquipment(data) {
  return {
    type: MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT,
    payload: data,
  }
}

export function getMaterialsServicesSummary(data) {
  return {
    type: MATERIALS_SERVICES_SUMMARY,
    payload: data,
  }
}

export function getEmployeeExcludingReliefByCostCentre(data) {
  return {
    type: EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEmployeeRequiredReliefByCostCentre(data) {
  return {
    type: EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEmployeeExcludingReliefSummary(data) {
  return {
    type: EMPLOYEE_EXCLUDING_RELIEF_SUMMARY,
    payload: data,
  }
}

export function getEmployeeRequiredReliefSummary(data) {
  return {
    type: EMPLOYEE_REQUIRED_RELIEF_SUMMARY,
    payload: data,
  }
}

export function getEmployeeTotalByCostCentre(data) {
  return {
    type: EMPLOYEE_TOTAL_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEmployeeTotalSummary(data) {
  return {
    type: EMPLOYEE_TOTAL_SUMMARY,
    payload: data,
  }
}

export function getGeneralFunction(data) {
  return {
    type: GENERAL_FUNCTION,
    payload: data,
  }
}
