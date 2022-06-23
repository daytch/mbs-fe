import {
  GET_INFRASTRUCTURE,
  GET_INFRASTRUCTURE_SUCCESS,
  GET_INFRASTRUCTURE_ERROR,
  POST_INFRASTRUCTURE,
  POST_INFRASTRUCTURE_SUCCESS,
  POST_INFRASTRUCTURE_ERROR,
  PUT_INFRASTRUCTURE,
  PUT_INFRASTRUCTURE_SUCCESS,
  PUT_INFRASTRUCTURE_ERROR,
  DELETE_INFRASTRUCTURE,
  DELETE_INFRASTRUCTURE_SUCCESS,
  DELETE_INFRASTRUCTURE_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataInfra: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const ResourcesInfrastructure = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INFRASTRUCTURE: {
      return {
        ...state,
      }
    }
    case GET_INFRASTRUCTURE_SUCCESS: {
      return {
        ...state,
        dataInfra: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_INFRASTRUCTURE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_INFRASTRUCTURE: {
      return {
        ...state,
      }
    }
    case POST_INFRASTRUCTURE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_INFRASTRUCTURE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.data,
      }
    }

    case PUT_INFRASTRUCTURE: {
      return {
        ...state,
        loading: true,
      }
    }
    case PUT_INFRASTRUCTURE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_INFRASTRUCTURE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_INFRASTRUCTURE: {
      return {
        ...state,
      }
    }
    case DELETE_INFRASTRUCTURE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_INFRASTRUCTURE_ERROR: {
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
