import {
  GET_ROSTER,
  POST_ROSTER,
  PUT_ROSTER,
  DELETE_ROSTER,
  ERROR_ROSTER,
  SUCCESS_ROSTER,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Roster = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROSTER: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }
    case SUCCESS_ROSTER: {
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
    case ERROR_ROSTER: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_ROSTER: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_ROSTER: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_ROSTER: {
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
