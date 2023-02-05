import {
  GET_FUNCTION_PERSONNEL,
  GET_FUNCTION_PERSONNEL_SUCCESS,
  GET_FUNCTION_PERSONNEL_ERROR,
  POST_FUNCTION_PERSONNEL,
  POST_FUNCTION_PERSONNEL_SUCCESS,
  POST_FUNCTION_PERSONNEL_ERROR,
  GET_FUNCTION_PERSONNEL_REPORT,
  GET_FUNCTION_PERSONNEL_REPORT_SUCCESS,
  GET_FUNCTION_PERSONNEL_REPORT_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
  loading: false,
  error: '',
  message: '',
}

export const FunctionPersonnel = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FUNCTION_PERSONNEL: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_FUNCTION_PERSONNEL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_FUNCTION_PERSONNEL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_FUNCTION_PERSONNEL_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_FUNCTION_PERSONNEL_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
      }
    }
    case GET_FUNCTION_PERSONNEL_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_FUNCTION_PERSONNEL: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_FUNCTION_PERSONNEL_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: 'Data Equipment Roster has been saved!',
      }
    }
    case POST_FUNCTION_PERSONNEL_ERROR: {
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
