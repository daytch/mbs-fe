import {
  GET_PRODUCTION_SCHEDULE,
  GET_PRODUCTION_SCHEDULE_SUCCESS,
  GET_PRODUCTION_SCHEDULE_ERROR,
  POST_PRODUCTION_SCHEDULE,
  POST_PRODUCTION_SCHEDULE_SUCCESS,
  POST_PRODUCTION_SCHEDULE_ERROR,
  PUT_PRODUCTION_SCHEDULE,
  PUT_PRODUCTION_SCHEDULE_SUCCESS,
  PUT_PRODUCTION_SCHEDULE_ERROR,
  DELETE_PRODUCTION_SCHEDULE,
  DELETE_PRODUCTION_SCHEDULE_SUCCESS,
  DELETE_PRODUCTION_SCHEDULE_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const ProductionSchedule = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTION_SCHEDULE: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_PRODUCTION_SCHEDULE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_PRODUCTION_SCHEDULE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_PRODUCTION_SCHEDULE: {
      return {
        ...state,
        // data: action.payload,
        loading: true,
      }
    }
    case POST_PRODUCTION_SCHEDULE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_PRODUCTION_SCHEDULE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_PRODUCTION_SCHEDULE: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PRODUCTION_SCHEDULE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_PRODUCTION_SCHEDULE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_PRODUCTION_SCHEDULE: {
      return {
        ...state,
        loading: true,
      }
    }
    case DELETE_PRODUCTION_SCHEDULE_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_PRODUCTION_SCHEDULE_ERROR: {
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
