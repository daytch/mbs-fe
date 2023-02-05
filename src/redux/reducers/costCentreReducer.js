import {
  GET_COST_CENTRE,
  GET_COST_CENTRE_SUCCESS,
  GET_COST_CENTRE_ERROR,
  POST_COST_CENTRE,
  POST_COST_CENTRE_SUCCESS,
  POST_COST_CENTRE_ERROR,
  PUT_COST_CENTRE,
  PUT_COST_CENTRE_SUCCESS,
  PUT_COST_CENTRE_ERROR,
  DELETE_COST_CENTRE,
  DELETE_COST_CENTRE_SUCCESS,
  DELETE_COST_CENTRE_ERROR,
  GET_COST_CENTRE_REPORT,
  GET_COST_CENTRE_REPORT_ERROR,
  GET_COST_CENTRE_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const CostCentre = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COST_CENTRE: {
      return {
        ...state,
        // data: action.data,
      }
    }
    case GET_COST_CENTRE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_COST_CENTRE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_COST_CENTRE_REPORT: {
      return {
        ...state,
      }
    }
    case GET_COST_CENTRE_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
      }
    }
    case GET_COST_CENTRE_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_COST_CENTRE: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_COST_CENTRE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_COST_CENTRE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_COST_CENTRE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_COST_CENTRE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_COST_CENTRE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_COST_CENTRE: {
      return {
        ...state,
      }
    }
    case DELETE_COST_CENTRE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_COST_CENTRE_ERROR: {
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
