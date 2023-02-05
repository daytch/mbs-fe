import {
  GET_FUNCTION_COSTCENTRE,
  GET_FUNCTION_COSTCENTRE_SUCCESS,
  GET_FUNCTION_COSTCENTRE_ERROR,
  POST_FUNCTION_COSTCENTRE,
  POST_FUNCTION_COSTCENTRE_SUCCESS,
  POST_FUNCTION_COSTCENTRE_ERROR,
  GET_FUNCTION_COSTCENTRE_REPORT,
  GET_FUNCTION_COSTCENTRE_REPORT_ERROR,
  GET_FUNCTION_COSTCENTRE_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
  loading: false,
  error: '',
  message: '',
}

export const FunctionCostCentre = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FUNCTION_COSTCENTRE: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_FUNCTION_COSTCENTRE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_FUNCTION_COSTCENTRE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_FUNCTION_COSTCENTRE_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_FUNCTION_COSTCENTRE_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
      }
    }
    case GET_FUNCTION_COSTCENTRE_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_FUNCTION_COSTCENTRE: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_FUNCTION_COSTCENTRE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: 'Data Equipment Roster has been saved!',
      }
    }
    case POST_FUNCTION_COSTCENTRE_ERROR: {
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
