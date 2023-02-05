import {
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_COMMISSIONING_SUMMARY,
  EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
  EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
  EQP_DISPOSSAL_VALUE_SUMMARY,
  EQP_DISPOSSAL_VALUE_SUMMARY_SUCCESS,
  EQP_DISPOSSAL_VALUE_SUMMARY_FAILURE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_FAILURE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  dtEquipmentCommissioningByCostCentre: [],
  dtEquipmentCommissioningSummary: [],

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
    case EQP_DISPOSSAL_VALUE_BY_COST_CENTRE: {
      return { ...state, loading: true }
    }
    case EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_SUCCESS: {
      return { ...state, dtEquipmentCommissioningByCostCentre: action.data, loading: false }
    }
    case EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    case EQP_DISPOSSAL_VALUE_SUMMARY: {
      return { ...state, loading: true }
    }
    case EQP_DISPOSSAL_VALUE_SUMMARY_SUCCESS: {
      return { ...state, dtEquipmentCommissioningSummary: action.data, loading: false }
    }
    case EQP_DISPOSSAL_VALUE_SUMMARY_FAILURE: {
      return { ...state, loading: false, error: action.error }
    }

    default:
      return state
  }
}
