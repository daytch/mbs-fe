import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR,
  POST_COMPANY,
  POST_COMPANY_SUCCESS,
  POST_COMPANY_ERROR,
  PUT_COMPANY,
  PUT_COMPANY_SUCCESS,
  PUT_COMPANY_ERROR,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const Company = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY: {
      return {
        ...state,
        // data: action.data,
      }
    }
    case GET_COMPANY_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_COMPANY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_COMPANY: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_COMPANY_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_COMPANY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_COMPANY: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_COMPANY_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_COMPANY_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_COMPANY: {
      return {
        ...state,
      }
    }
    case DELETE_COMPANY_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_COMPANY_ERROR: {
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
