import {
  GET_PRODUCTION_FACTOR,
  GET_PRODUCTION_FACTOR_SUCCESS,
  GET_PRODUCTION_FACTOR_ERROR,
  POST_PRODUCTION_FACTOR,
  POST_PRODUCTION_FACTOR_SUCCESS,
  POST_PRODUCTION_FACTOR_ERROR,
  PUT_PRODUCTION_FACTOR,
  PUT_PRODUCTION_FACTOR_SUCCESS,
  PUT_PRODUCTION_FACTOR_ERROR,
  DELETE_PRODUCTION_FACTOR,
  DELETE_PRODUCTION_FACTOR_SUCCESS,
  DELETE_PRODUCTION_FACTOR_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const ProductionFactor = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTION_FACTOR: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_PRODUCTION_FACTOR_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_PRODUCTION_FACTOR_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_PRODUCTION_FACTOR: {
      return {
        ...state,
        // data: action.payload,
        loading: true,
      }
    }
    case POST_PRODUCTION_FACTOR_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_PRODUCTION_FACTOR_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_PRODUCTION_FACTOR: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PRODUCTION_FACTOR_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_PRODUCTION_FACTOR_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_PRODUCTION_FACTOR: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_PRODUCTION_FACTOR_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_PRODUCTION_FACTOR_ERROR: {
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
