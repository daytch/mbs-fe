import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_ERROR,
  PUT_USER,
  PUT_USER_SUCCESS,
  PUT_USER_ERROR,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  GET_ROLE,
  GET_ROLE_SUCCESS,
  GET_ROLE_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataRole: [],
  image: '',
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case UPLOAD_FILE: {
      return {
        ...state,
        loading: true,
      }
    }
    case UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        image: action.data,
        message: !state.isDeleted && state.message ? state.message + '!' : 'File has been saved!',
        isDeleted: false,
      }
    }
    case UPLOAD_FILE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_ROLE: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_ROLE_SUCCESS: {
      return {
        ...state,
        dataRole: action.data,
        loading: false,
      }
    }
    case GET_ROLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case POST_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case UPDATE_PASSWORD: {
      return {
        ...state,
      }
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case FORGOT_PASSWORD: {
      return {
        ...state,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Please Check your inbox!',
      }
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case UPDATE_ROLE: {
      return {
        ...state,
      }
    }
    case UPDATE_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case UPDATE_ROLE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case PUT_USER_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_USER_ERROR: {
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
