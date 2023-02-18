import {
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
    EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
    EQUIPMENT_COMMISSIONING_SUMMARY,
    EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
    EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY_SUCCESS,
    EQUIPMENT_DISPOSAL_VALUE_SUMMARY_FAILURE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_FAILURE,
    EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_SUCCESS,

    MATERIALS_SERVICES_COST_BY_COST_CENTRE,
    MATERIALS_SERVICES_COST_BY_COST_CENTRE_SUCCESS,
    MATERIALS_SERVICES_COST_BY_COST_CENTRE_FAILURE,

    MATERIALS_COST_BY_COST_CENTRE,
    MATERIALS_COST_BY_COST_CENTRE_SUCCESS,
    MATERIALS_COST_BY_COST_CENTRE_FAILURE,

    SERVICES_COST_BY_COST_CENTRE,
    SERVICES_COST_BY_COST_CENTRE_SUCCESS,
    SERVICES_COST_BY_COST_CENTRE_FAILURE,

    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT,
    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_SUCCESS,
    MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_FAILURE,

    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT,
    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS,
    MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_FAILURE,

    MATERIALS_SERVICES_COST_SUMMARY,
    MATERIALS_SERVICES_COST_SUMMARY_SUCCESS,
    MATERIALS_SERVICES_COST_SUMMARY_FAILURE,

    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE,
    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY,
    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_SUCCESS,
    EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_FAILURE,

    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_SUCCESS,
    EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_FAILURE,

    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE,
    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_SUCCESS,
    EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_FAILURE,

    EMPLOYEE_TOTAL_COST_SUMMARY,
    EMPLOYEE_TOTAL_COST_SUMMARY_SUCCESS,
    EMPLOYEE_TOTAL_COST_SUMMARY_FAILURE,

    INFRASTRUCTURE_COST_BY_COST_CENTRE,
    INFRASTRUCTURE_COST_BY_COST_CENTRE_SUCCESS,
    INFRASTRUCTURE_COST_BY_COST_CENTRE_FAILURE,

    INFRASTRUCTURE_COST_SUMMARY,
    INFRASTRUCTURE_COST_SUMMARY_SUCCESS,
    INFRASTRUCTURE_COST_SUMMARY_FAILURE,

    TOTAL_CAPITAL_COSTS,
    TOTAL_CAPITAL_COSTS_SUCCESS,
    TOTAL_CAPITAL_COSTS_FAILURE,

    TOTAL_OPERATING_COSTS,
    TOTAL_OPERATING_COSTS_SUCCESS,
    TOTAL_OPERATING_COSTS_FAILURE,

    TOTAL_PROJECT_COST,
    TOTAL_PROJECT_COST_SUCCESS,
    TOTAL_PROJECT_COST_FAILURE,
} from '../../constants'

const INIT_STATE = {
    dtEquipmentCommissioningByCostCentre: [],
    dtEquipmentCommissioningSummary: [],
    dtEquipmentDisposalByCostCentre: [],
    dtEquipmentDisposalValueSummary: [],
    dtMaterialsServicesCostByCostCentre: [],
    dtMaterialsCostByCostCentre: [],
    dtServicesCostByCostCentre: [],
    dtMaterialsServicesCostConsumedByEquipment: [],
    dtMaterialsServicesCostNotConsumedByEquipment: [],
    dtMaterialsServicesCostSummary: [],
    dtEmployeeExcludingReliefCostByCostCentre: [],
    dtEmployeeExcludingReliefCostSummary: [],
    dtEmployeeRequiredForReliefCostByCostCentre: [],
    dtEmployeeRequiredForReliefCostSummary: [],
    dtEmployeeTotalCostByCostCentre: [],
    dtEmployeeTotalCostSummary: [],
    dtInfrastructureCostByCostCentre: [],
    dtInfrastructureCostSummary: [],
    dtTotalCapitalCosts: [],
    dtTotalOperationCosts: [],
    dtTotalProjectsCosts: [],

    loading: false,
    error: '',
    message: '',
}

export const CostOutput = (state = INIT_STATE, action) => {
    switch (action.type) {
        case EQUIPMENT_COMMISSIONING_BY_COST_CENTRE: {
            return { ...state, loading: true }
        }
        case EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS: {
            return { ...state, dtEquipmentCommissioningByCostCentre: action.data, loading: false }
        }
        case EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE: {
            return { ...state, loading: false, error: action.error }
        }

        case EQUIPMENT_COMMISSIONING_SUMMARY: {
            return { ...state, loading: true }
        }
        case EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS: {
            return { ...state, dtEquipmentCommissioningSummary: action.data, loading: false }
        }
        case EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE: {
            return { ...state, loading: false, error: action.error }
        }


        case EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE: {
            return { ...state, loading: true }
        }
        case EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_SUCCESS: {
            return { ...state, dtEquipmentDisposalByCostCentre: action.data, loading: false }
        }
        case EQUIPMENT_DISPOSAL_VALUE_BY_COST_CENTRE_FAILURE: {
            return { ...state, loading: false, error: action.error }
        }


        case EQUIPMENT_DISPOSAL_VALUE_SUMMARY: {
            return { ...state, loading: true }
        }
        case EQUIPMENT_DISPOSAL_VALUE_SUMMARY_SUCCESS: {
            return { ...state, dtEquipmentDisposalValueSummary: action.data, loading: false }
        }
        case EQUIPMENT_DISPOSAL_VALUE_SUMMARY_FAILURE: {
            return { ...state, loading: false, error: action.error }
        }

        case MATERIALS_SERVICES_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case MATERIALS_SERVICES_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtMaterialsServicesCostByCostCentre: action.data, loading: false } }
        case MATERIALS_SERVICES_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case MATERIALS_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case MATERIALS_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtMaterialsServicesCostByCostCentre: action.data, loading: false } }
        case MATERIALS_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case SERVICES_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case SERVICES_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtServicesCostByCostCentre: action.data, loading: false } }
        case SERVICES_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT: { return { ...state, loading: true } }
        case MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_SUCCESS: { return { ...state, dtMaterialsServicesCostConsumedByEquipment: action.data, loading: false } }
        case MATERIALS_SERVICES_COST_CONSUMED_BY_EQUIPMENT_FAILURE: { return { ...state, loading: false, error: action.error } }

        case MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT: { return { ...state, loading: true } }
        case MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_SUCCESS: { return { ...state, dtMaterialsServicesCostNotConsumedByEquipment: action.data, loading: false } }
        case MATERIALS_SERVICES_COST_NOT_CONSUMED_BY_EQUIPMENT_FAILURE: { return { ...state, loading: false, error: action.error } }

        case MATERIALS_SERVICES_COST_SUMMARY: { return { ...state, loading: true } }
        case MATERIALS_SERVICES_COST_SUMMARY_SUCCESS: { return { ...state, dtMaterialsServicesCostSummary: action.data, loading: false } }
        case MATERIALS_SERVICES_COST_SUMMARY_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtEmployeeExcludingReliefCostByCostCentre: action.data, loading: false } }
        case EMPLOYEE_EXCLUDING_RELIEF_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY: { return { ...state, loading: true } }
        case EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_SUCCESS: { return { ...state, dtEmployeeExcludingReliefCostSummary: action.data, loading: false } }
        case EMPLOYEE_EXCLUDING_RELIEF_COST_SUMMARY_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtEmployeeRequiredForReliefCostByCostCentre: action.data, loading: false } }
        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY: { return { ...state, loading: true } }
        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_SUCCESS: { return { ...state, dtEmployeeRequiredForReliefCostSummary: action.data, loading: false } }
        case EMPLOYEE_REQUIRED_FOR_RELIEF_COST_SUMMARY_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_TOTAL_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtEmployeeTotalCostByCostCentre: action.data, loading: false } }
        case EMPLOYEE_TOTAL_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case EMPLOYEE_TOTAL_COST_SUMMARY: { return { ...state, loading: true } }
        case EMPLOYEE_TOTAL_COST_SUMMARY_SUCCESS: { return { ...state, dtEmployeeTotalCostSummary: action.data, loading: false } }
        case EMPLOYEE_TOTAL_COST_SUMMARY_FAILURE: { return { ...state, loading: false, error: action.error } }

        case INFRASTRUCTURE_COST_BY_COST_CENTRE: { return { ...state, loading: true } }
        case INFRASTRUCTURE_COST_BY_COST_CENTRE_SUCCESS: { return { ...state, dtInfrastructureCostByCostCentre: action.data, loading: false } }
        case INFRASTRUCTURE_COST_BY_COST_CENTRE_FAILURE: { return { ...state, loading: false, error: action.error } }

        case INFRASTRUCTURE_COST_SUMMARY: { return { ...state, loading: true } }
        case INFRASTRUCTURE_COST_SUMMARY_SUCCESS: { return { ...state, dtInfrastructureCostSummary: action.data, loading: false } }
        case INFRASTRUCTURE_COST_SUMMARY_FAILURE: { return { ...state, loading: false, error: action.error } }

        case TOTAL_CAPITAL_COSTS: { return { ...state, loading: true } }
        case TOTAL_CAPITAL_COSTS_SUCCESS: { return { ...state, dtTotalCapitalCosts: action.data, loading: false } }
        case TOTAL_CAPITAL_COSTS_FAILURE: { return { ...state, loading: false, error: action.error } }

        case TOTAL_OPERATING_COSTS: { return { ...state, loading: true } }
        case TOTAL_OPERATING_COSTS_SUCCESS: { return { ...state, dtTotalOperationCosts: action.data, loading: false } }
        case TOTAL_OPERATING_COSTS_FAILURE: { return { ...state, loading: false, error: action.error } }

        case TOTAL_PROJECT_COST: { return { ...state, loading: true } }
        case TOTAL_PROJECT_COST_SUCCESS: { return { ...state, dtTotalProjectsCosts: action.data, loading: false } }
        case TOTAL_PROJECT_COST_FAILURE: { return { ...state, loading: false, error: action.error } }

        default:
            return state
    }
}
