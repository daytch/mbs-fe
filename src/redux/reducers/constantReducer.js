import {
  GET_CONSTANT,
  POST_CONSTANT,
  PUT_CONSTANT,
  DELETE_CONSTANT,
  ERROR_CONSTANT,
  SUCCESS_CONSTANT,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Constant = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONSTANT: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }
    case SUCCESS_CONSTANT: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
        }
      } else {
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.message,
        }
      }
    }
    case ERROR_CONSTANT: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_CONSTANT: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_CONSTANT: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_CONSTANT: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    default:
      return state
  }
}
