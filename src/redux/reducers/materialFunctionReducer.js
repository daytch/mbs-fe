import {
  GET_MATERIAL_FUNCTION_REPORT,
  GET_MATERIAL_FUNCTION_REPORT_SUCCESS,
  GET_MATERIAL_FUNCTION_REPORT_ERROR,
  GET_MATERIAL_INFRA_REPORT,
  GET_MATERIAL_INFRA_REPORT_ERROR,
  GET_MATERIAL_INFRA_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataInfra: [],
  loading: true,
  error: '',
  message: '',
}

export const MaterialFunction = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MATERIAL_FUNCTION_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_MATERIAL_FUNCTION_REPORT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_MATERIAL_FUNCTION_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_MATERIAL_INFRA_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_MATERIAL_INFRA_REPORT_SUCCESS: {
      return {
        ...state,
        dataInfra: action.data,
        loading: false,
      }
    }
    case GET_MATERIAL_INFRA_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    default:
      return state
  }
}
