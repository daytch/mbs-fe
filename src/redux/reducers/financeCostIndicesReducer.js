import {
  GET_COST_INDICES,
  GET_COST_INDICES_SUCCESS,
  GET_COST_INDICES_ERROR,
  POST_COST_INDICES,
  POST_COST_INDICES_SUCCESS,
  POST_COST_INDICES_ERROR,
  PUT_COST_INDICES,
  PUT_COST_INDICES_SUCCESS,
  PUT_COST_INDICES_ERROR,
  DELETE_COST_INDICES,
  DELETE_COST_INDICES_SUCCESS,
  DELETE_COST_INDICES_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataCostIndices: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const FinanceCostIndices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COST_INDICES: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_COST_INDICES_SUCCESS: {
      return {
        ...state,
        dataCostIndices: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_COST_INDICES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_COST_INDICES: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_COST_INDICES_SUCCESS: {
      return {
        ...state,
        dataCostIndices: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_COST_INDICES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_COST_INDICES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_COST_INDICES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_COST_INDICES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_COST_INDICES: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_COST_INDICES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_COST_INDICES_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    default:
      return state
  }
}
