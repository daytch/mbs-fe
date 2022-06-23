import {
  GET_FLEETS,
  GET_FLEETS_SUCCESS,
  GET_FLEETS_ERROR,
  POST_FLEETS,
  POST_FLEETS_SUCCESS,
  POST_FLEETS_ERROR,
  PUT_FLEETS,
  PUT_FLEETS_SUCCESS,
  PUT_FLEETS_ERROR,
  DELETE_FLEETS,
  DELETE_FLEETS_SUCCESS,
  DELETE_FLEETS_ERROR,
  GET_EQUIPMENT_TYPES,
} from '../../constants'

const INIT_STATE = {
  dataFleets: [],
  dataEquipmentTypes: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const Equipment = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_TYPES: {
      return {
        ...state,
        dataEquipmentTypes: action.data,
        loading: false,
      }
    }

    case GET_FLEETS: {
      return {
        ...state,
      }
    }
    case GET_FLEETS_SUCCESS: {
      return {
        ...state,
        dataFleets: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_FLEETS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_FLEETS: {
      return {
        ...state,
        dataFleets: action.payload,
      }
    }
    case POST_FLEETS_SUCCESS: {
      return {
        ...state,
        dataFleets: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_FLEETS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_FLEETS: {
      return {
        ...state,
        loading: true,
      }
    }
    case PUT_FLEETS_SUCCESS: {
      return {
        ...state,
        dataFleets: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_FLEETS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_FLEETS: {
      return {
        ...state,
      }
    }
    case DELETE_FLEETS_SUCCESS: {
      return {
        ...state,
        dataFleets: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_FLEETS_ERROR: {
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
