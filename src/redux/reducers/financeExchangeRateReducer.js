import {
  GET_EXCHANGE_RATE,
  GET_EXCHANGE_RATE_SUCCESS,
  GET_EXCHANGE_RATE_ERROR,
  POST_EXCHANGE_RATE,
  POST_EXCHANGE_RATE_SUCCESS,
  POST_EXCHANGE_RATE_ERROR,
  PUT_EXCHANGE_RATE,
  PUT_EXCHANGE_RATE_SUCCESS,
  PUT_EXCHANGE_RATE_ERROR,
  DELETE_EXCHANGE_RATE,
  DELETE_EXCHANGE_RATE_SUCCESS,
  DELETE_EXCHANGE_RATE_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataExchangeRate: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const FinanceExchangeRate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EXCHANGE_RATE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_EXCHANGE_RATE_SUCCESS: {
      return {
        ...state,
        dataExchangeRate: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_EXCHANGE_RATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_EXCHANGE_RATE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_EXCHANGE_RATE_SUCCESS: {
      return {
        ...state,
        dataExchangeRate: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_EXCHANGE_RATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_EXCHANGE_RATE: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_EXCHANGE_RATE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_EXCHANGE_RATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_EXCHANGE_RATE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_EXCHANGE_RATE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_EXCHANGE_RATE_ERROR: {
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
