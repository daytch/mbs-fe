import {
  HANDLE_LOGIN,
  HANDLE_REGISTER,
  HANDLE_LOGIN_SUCCESS,
  HANDLE_LOGIN_ERROR,
} from '../../constants'

const INIT_STATE = {
  message: {
    isError: '',
    message: '',
  },
  dataLogin: {},
  user: {},
  isRegister: false,
  loading: false,
  error: '',
}

export const getLogin = (state = INIT_STATE, action) => {
  switch (action.type) {
    case HANDLE_LOGIN: {
      return {
        ...state,
        loading: true,
        dataLogin: action.payload,
        error: '',
      }
    }
    case HANDLE_LOGIN_SUCCESS: {
      return {
        ...state,
        dataLogin: action.data,
        loading: false,
      }
    }
    case HANDLE_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      }
    }
    case HANDLE_REGISTER: {
      return {
        ...state,
        dataLogin: action.payload,
      }
    }
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      }
    }
    case 'MESSAGE': {
      return {
        ...state,
        message: action.payload,
      }
    }
    default:
      return state
  }
}
