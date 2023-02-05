import {
  GET_FUNCTION_GENERAL,
  GET_FUNCTION_GENERAL_SUCCESS,
  GET_FUNCTION_GENERAL_ERROR,
  POST_FUNCTION_GENERAL,
  POST_FUNCTION_GENERAL_SUCCESS,
  POST_FUNCTION_GENERAL_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  error: '',
  message: '',
}

export const FunctionGeneral = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_FUNCTION_GENERAL: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_FUNCTION_GENERAL_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_FUNCTION_GENERAL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_FUNCTION_GENERAL: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_FUNCTION_GENERAL_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: 'Data Equipment Roster has been saved!',
      }
    }
    case POST_FUNCTION_GENERAL_ERROR: {
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
