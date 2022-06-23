import {
  GET_GENERAL_EQUIPMENT,
  GET_GENERAL_EQUIPMENT_SUCCESS,
  GET_GENERAL_EQUIPMENT_ERROR,
  POST_GENERAL_EQUIPMENT,
  POST_GENERAL_EQUIPMENT_SUCCESS,
  POST_GENERAL_EQUIPMENT_ERROR,
  PUT_GENERAL_EQUIPMENT,
  PUT_GENERAL_EQUIPMENT_SUCCESS,
  PUT_GENERAL_EQUIPMENT_ERROR,
  DELETE_GENERAL_EQUIPMENT,
  DELETE_GENERAL_EQUIPMENT_SUCCESS,
  DELETE_GENERAL_EQUIPMENT_ERROR,
  GET_GENERAL_EQUIPMENT_TYPE,
  UPDATE_GENERAL_EQUIPMENT_TYPE,
} from '../../constants'

const INIT_STATE = {
  dataEqp: [],
  data: [],
  dataType: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const GenericEquipment = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GENERAL_EQUIPMENT: {
      return {
        ...state,
        // dataEqp: action.data,
      }
    }
    case GET_GENERAL_EQUIPMENT_SUCCESS: {
      return {
        ...state,
        dataEqp: action.data,
        dataType: action.dataType,
        loading: false,
      }
    }
    case GET_GENERAL_EQUIPMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_GENERAL_EQUIPMENT_TYPE: {
      return {
        ...state,
        dataType: action.dataType,
        loading: false,
      }
    }

    case UPDATE_GENERAL_EQUIPMENT_TYPE: {
      return {
        ...state,
        dataType: action.dataType,
        loading: false,
      }
    }

    case POST_GENERAL_EQUIPMENT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_GENERAL_EQUIPMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_GENERAL_EQUIPMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_GENERAL_EQUIPMENT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_GENERAL_EQUIPMENT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_GENERAL_EQUIPMENT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_GENERAL_EQUIPMENT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_GENERAL_EQUIPMENT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_GENERAL_EQUIPMENT_ERROR: {
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
