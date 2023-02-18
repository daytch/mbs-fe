import {
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
  EQUIPMENT_COMMISSIONING_SUMMARY,
  EQP_REPLACEMENT_BY_COST_CENTRE,
  EQP_REPLACEMENT_SUMMARY,
  EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE,
  EQUIPMENT_DISPOSAL_VALUE_SUMMARY,
  MATERIALS_SERVICES_COST_BY_COST_CENTRE,
  MATERIALS_COST_BY_COST_CENTRE,
  SERVICES_COST_BY_COST_CENTRE,
  MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_COST_SUMMARY,
  EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE,
  EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY,
  EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE,
  EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY,
  EMPLOYEE_TOTAL_COST_BY_COST_CENTRE,
  EMPLOYEE_TOTAL_COST_SUMMARY,
  INFRASTRUCTURE_COST_BY_COST_CENTRE,
  INFRASTRUCTURE_COST_SUMMARY,
  TOTAL_OPERATING_COSTS,
  TOTAL_PROJECT_COST,
  TOTAL_CAPITAL_COSTS,
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

export function getEquipmentDisposalValueByCostCentre(data) {
  return {
    type: EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE,
    payload: data,
  }
}

export function getEquipmentDisposalValueSummary(data) {
  return {
    type: EQUIPMENT_DISPOSAL_VALUE_SUMMARY,
    payload: data,
  }
}

export function getMaterialsServicesCostByCostCentre(data) {
    return {
        type: MATERIALS_SERVICES_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getMaterialsCostByCostCentre(data) {
    return {
        type: MATERIALS_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getServicesCostByCostCentre(data) {
    return {
        type: SERVICES_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getMaterialsServicesCostConsumedByEquipment(data) {
    return {
        type: MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT,
        payload: data,
    }
}
export function getMaterialsServicesCostNotConsumedByEquipment(data) {
    return {
        type: MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT,
        payload: data,
    }
}
export function getMaterialsServicesCostSummary(data) {
    return {
        type: MATERIALS_SERVICES_COST_SUMMARY,
        payload: data,
    }
}
export function getEmployeeExcludingReliefCostByCostCentre(data) {
    return {
        type: EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getEmployeeExcludingReliefCostSummary(data) {
    return {
        type: EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY,
        payload: data,
    }
}
export function getEmployeeRequiredForReliefCostByCostCentre(data) {
    return {
        type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getEmployeeRequiredForReliefCostSummary(data) {
    return {
        type: EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY,
        payload: data,
    }
}
export function getEmployeeTotalCostByCostCentre(data) {
    return {
        type: EMPLOYEE_TOTAL_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getEmployeeTotalCostSummary(data) {
    return {
        type: EMPLOYEE_TOTAL_COST_SUMMARY,
        payload: data,
    }
}
export function getInfrastructureCostByCostCentre(data) {
    return {
        type: INFRASTRUCTURE_COST_BY_COST_CENTRE,
        payload: data,
    }
}
export function getInfrastructureCostSummary(data) {
    return {
        type: INFRASTRUCTURE_COST_SUMMARY,
        payload: data,
    }
}
export function getTotalCapitalCosts(data) {
    return {
        type: TOTAL_CAPITAL_COSTS,
        payload: data,
    }
}
export function getTotalOperatingCosts(data) {
    return {
        type: TOTAL_OPERATING_COSTS,
        payload: data,
    }
}
export function getTotalProjectCosts(data) {
    return {
        type: TOTAL_PROJECT_COST,
        payload: data,
    }
}

