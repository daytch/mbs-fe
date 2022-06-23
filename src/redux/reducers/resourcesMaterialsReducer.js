import {
  GET_MATERIALS,
  GET_MATERIALS_SUCCESS,
  GET_MATERIALS_ERROR,
  POST_MATERIALS,
  POST_MATERIALS_SUCCESS,
  POST_MATERIALS_ERROR,
  PUT_MATERIALS,
  PUT_MATERIALS_SUCCESS,
  PUT_MATERIALS_ERROR,
  DELETE_MATERIALS,
  DELETE_MATERIALS_SUCCESS,
  DELETE_MATERIALS_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const ResourcesMaterials = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MATERIALS: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_MATERIALS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_MATERIALS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_MATERIALS: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_MATERIALS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_MATERIALS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_MATERIALS: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_MATERIALS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_MATERIALS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_MATERIALS: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_MATERIALS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_MATERIALS_ERROR: {
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
