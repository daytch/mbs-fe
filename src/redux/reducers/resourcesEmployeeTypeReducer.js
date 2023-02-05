import {
  GET_EMPLOYEE_TYPE,
  GET_EMPLOYEE_TYPE_SUCCESS,
  GET_EMPLOYEE_TYPE_ERROR,
  POST_EMPLOYEE_TYPE,
  POST_EMPLOYEE_TYPE_SUCCESS,
  POST_EMPLOYEE_TYPE_ERROR,
  PUT_EMPLOYEE_TYPE,
  PUT_EMPLOYEE_TYPE_SUCCESS,
  PUT_EMPLOYEE_TYPE_ERROR,
  DELETE_EMPLOYEE_TYPE,
  DELETE_EMPLOYEE_TYPE_SUCCESS,
  DELETE_EMPLOYEE_TYPE_ERROR,
  GET_EMPLOYEE_TYPE_REPORT,
  GET_EMPLOYEE_TYPE_REPORT_SUCCESS,
  GET_EMPLOYEE_TYPE_REPORT_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const ResourcesEmployeeType = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_TYPE: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case GET_EMPLOYEE_TYPE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_EMPLOYEE_TYPE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_EMPLOYEE_TYPE: {
      return {
        ...state,
      }
    }
    case POST_EMPLOYEE_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_EMPLOYEE_TYPE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_EMPLOYEE_TYPE: {
      return {
        ...state,
        loading: true,
      }
    }
    case PUT_EMPLOYEE_TYPE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_EMPLOYEE_TYPE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_EMPLOYEE_TYPE: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case DELETE_EMPLOYEE_TYPE_SUCCESS: {
      return {
        ...state,
        // data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_EMPLOYEE_TYPE_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    case GET_EMPLOYEE_TYPE_REPORT: {
      return { ...state }
    }
    case GET_EMPLOYEE_TYPE_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
      }
    }
    case GET_EMPLOYEE_TYPE_REPORT_ERROR: {
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
