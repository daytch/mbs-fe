import {
  EQUIPMENT_REQUIRED_BY_COST_CENTRE,
  EQUIPMENT_REQUIRED_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_REQUIRED_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_REQUIRED_SUMMARY,
  EQUIPMENT_REQUIRED_SUMMARY_SUCCESS,
  EQUIPMENT_REQUIRED_SUMMARY_FAILURE,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_REPLACEMENT_SUMMARY,
  EQUIPMENT_REPLACEMENT_SUMMARY_SUCCESS,
  EQUIPMENT_REPLACEMENT_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_SUCCESS,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_FAILURE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_SUCCESS,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_FAILURE,
  EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_SUCCESS,
  EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_FAILURE,
  EQUIPMENT_FLEET_BY_COST_CENTRE,
  EQUIPMENT_FLEET_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_FLEET_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_FLEET_SUMMARY,
  EQUIPMENT_FLEET_SUMMARY_SUCCESS,
  EQUIPMENT_FLEET_SUMMARY_FAILURE,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_UTILISATION_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_UTILISATION_SUMMARY,
  EQUIPMENT_UTILISATION_SUMMARY_SUCCESS,
  EQUIPMENT_UTILISATION_SUMMARY_FAILURE,
  MATERIALS_SERVICES_BY_COST_CENTRE,
  MATERIALS_SERVICES_BY_COST_CENTRE_FAILURE,
  MATERIALS_SERVICES_BY_COST_CENTRE_SUCCESS,
  MATERIALS_BY_COST_CENTRE,
  MATERIALS_BY_COST_CENTRE_FAILURE,
  MATERIALS_BY_COST_CENTRE_SUCCESS,
  SERVICES_BY_COST_CENTRE,
  SERVICES_BY_COST_CENTRE_FAILURE,
  SERVICES_BY_COST_CENTRE_SUCCESS,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_FAILURE,
  MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_SUCCESS,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,
  MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
  MATERIALS_SERVICES_SUMMARY,
  MATERIALS_SERVICES_SUMMARY_SUCCESS,
  MATERIALS_SERVICES_SUMMARY_FAILURE,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_SUCCESS,
  EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_FAILURE,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY_SUCCESS,
  EMPLOYEE_REQUIRED_RELIEF_SUMMARY_FAILURE,
  EMPLOYEE_TOTAL_BY_COST_CENTRE,
  EMPLOYEE_TOTAL_BY_COST_CENTRE_SUCCESS,
  EMPLOYEE_TOTAL_BY_COST_CENTRE_FAILURE,
  EMPLOYEE_TOTAL_SUMMARY,
  EMPLOYEE_TOTAL_SUMMARY_SUCCESS,
  EMPLOYEE_TOTAL_SUMMARY_FAILURE,
  GENERAL_FUNCTION,
  GENERAL_FUNCTION_SUCCESS,
  GENERAL_FUNCTION_FAILURE,
} from '../../constants'

const INIT_STATE = {
  dtEquipmentRequiredByCostCentre: [],
  dtEquipmentRequiredSummary: [],
  dtEquipmentReplacementByCostCentre: [],
  dtEquipmentReplacementSummary: [],
  dtEquipmentDisposalExpiredByCostCentre: [],
  dtEquipmentDisposalExpiredSummary: [],
  dtEquipmentDisposalRequiredCostCentre: [],
  dtEquipmentDisposalRequiredSummary: [],
  dtEquipmentDisposalNotRequiredByCostCentre: [],
  dtEquipmentDisposalNotRequiredSummary: [],

  dtEquipmentTotalDisposalByCostCentre: [],
  dtEquipmentTotalDisposalSummary: [],
  dtEquipmentFleetByCostCentre: [],
  dtEquipmentFleetSummary: [],
  dtEquipmentUtilisationByCostCentre: [],
  dtEquipmentUtilisationSummary: [],

  dtMaterialsServicesByCostCentre: [],
  dtMaterialsByCostCentre: [],
  dtServicesByCostCentre: [],
  dtMaterialsConsumedByEquipment: [],
  dtMaterialsNotConsumedByEquipment: [],
  dtMaterialsServicesSummary: [],

  dtEmployeeExcludingReliefByCostCentre: [],
  dtEmployeeRequiredReliefByCostCentre: [],
  dtEmployeeExcludingReliefSummary: [],
  dtEmployeeRequiredReliefSummary: [],

  dtEmployeeTotalByCostCentre: [],
  dtEmployeeTotalSummary: [],
  dtGeneralFunction: [],
  loading: false,
  error: '',
  message: '',
}

export const PhysicalOutput = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EQUIPMENT_REQUIRED_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_REQUIRED_BY_COST_CENTRE_SUCCESS: {
      return { ...state, dtEquipmentRequiredByCostCentre: action.data, loading: false }
    }
    case EQUIPMENT_REQUIRED_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_REQUIRED_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_REQUIRED_SUMMARY_SUCCESS: {
      return { ...state, dtEquipmentRequiredSummary: action.data, loading: false }
    }
    case EQUIPMENT_REQUIRED_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_REPLACEMENT_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentReplacementByCostCentre: action.data }
    }
    case EQUIPMENT_REPLACEMENT_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_REPLACEMENT_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_REPLACEMENT_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentReplacementSummary: action.data }
    }
    case EQUIPMENT_REPLACEMENT_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentDisposalExpiredByCostCentre: action.data }
    }
    case EQUIPMENT_DISPOSAL_EXPIRED_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentDisposalExpiredSummary: action.data }
    }
    case EQUIPMENT_DISPOSAL_EXPIRED_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentDisposalNotRequiredByCostCentre: action.data }
    }
    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentDisposalNotRequiredSummary: action.data }
    }
    case EQUIPMENT_DISPOSAL_NOT_REQUIRED_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentTotalDisposalByCostCentre: action.data }
    }
    case EQUIPMENT_TOTAL_DISPOSAL_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_TOTAL_DISPOSAL_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentTotalDisposalSummary: action.data }
    }
    case EQUIPMENT_TOTAL_DISPOSAL_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_FLEET_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_FLEET_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentFleetByCostCentre: action.data }
    }
    case EQUIPMENT_FLEET_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_FLEET_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_FLEET_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentFleetSummary: action.data }
    }
    case EQUIPMENT_FLEET_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_UTILISATION_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_UTILISATION_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEquipmentUtilisationByCostCentre: action.data }
    }
    case EQUIPMENT_UTILISATION_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQUIPMENT_UTILISATION_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQUIPMENT_UTILISATION_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEquipmentTotalDisposalSummary: action.data }
    }
    case EQUIPMENT_UTILISATION_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case MATERIALS_SERVICES_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case MATERIALS_SERVICES_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtMaterialsServicesByCostCentre: action.data }
    }
    case MATERIALS_SERVICES_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case MATERIALS_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case MATERIALS_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtMaterialsByCostCentre: action.data }
    }
    case MATERIALS_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case SERVICES_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case SERVICES_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtServicesByCostCentre: action.data }
    }
    case SERVICES_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT: {
      return { ...state, loading: true }
    }
    case MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_SUCCESS: {
      return { ...state, loading: false, dtMaterialsConsumedByEquipment: action.data }
    }
    case MATERIALS_SERVICES_CONSUMED_BY_EQUIPMENT_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT: {
      return { ...state, loading: true }
    }
    case MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS: {
      return { ...state, loading: false, dtMaterialsNotConsumedByEquipment: action.data }
    }
    case MATERIALS_SERVICES_NOT_CONSUMED_BY_EQUIPMENT_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case MATERIALS_SERVICES_SUMMARY: {
      return { ...state, loading: true }
    }
    case MATERIALS_SERVICES_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtMaterialsServicesSummary: action.data }
    }
    case MATERIALS_SERVICES_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEmployeeExcludingReliefByCostCentre: action.data }
    }
    case EMPLOYEE_EXCLUDING_RELIEF_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEmployeeRequiredReliefByCostCentre: action.data }
    }
    case EMPLOYEE_REQUIRED_RELIEF_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_EXCLUDING_RELIEF_SUMMARY: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEmployeeExcludingReliefSummary: action.data }
    }
    case EMPLOYEE_EXCLUDING_RELIEF_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_REQUIRED_RELIEF_SUMMARY: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_REQUIRED_RELIEF_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEmployeeRequiredReliefSummary: action.data }
    }
    case EMPLOYEE_REQUIRED_RELIEF_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_TOTAL_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_TOTAL_BY_COST_CENTRE_SUCCESS: {
      return { ...state, loading: false, dtEmployeeTotalByCostCentre: action.data }
    }
    case EMPLOYEE_TOTAL_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EMPLOYEE_TOTAL_SUMMARY: {
      return { ...state, loading: true }
    }
    case EMPLOYEE_TOTAL_SUMMARY_SUCCESS: {
      return { ...state, loading: false, dtEmployeeTotalSummary: action.data }
    }
    case EMPLOYEE_TOTAL_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case GENERAL_FUNCTION: {
      return { ...state, loading: true }
    }
    case GENERAL_FUNCTION_SUCCESS: {
      return { ...state, loading: false, dtGeneralFunction: action.data }
    }
    case GENERAL_FUNCTION_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    default:
      return state
  }
}
