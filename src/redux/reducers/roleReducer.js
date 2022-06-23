import {
  POST_ROLE,
  POST_ROLE_SUCCESS,
  POST_ROLE_ERROR,
  PUT_ROLE,
  PUT_ROLE_SUCCESS,
  PUT_ROLE_ERROR,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const Role = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_ROLE: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_ROLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_ROLE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_ROLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_ROLE: {
      return {
        ...state,
      }
    }
    case DELETE_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_ROLE_ERROR: {
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
