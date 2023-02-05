import {
  GET_EQUIPMENT_PA,
  GET_EQUIPMENT_PA_ERROR,
  GET_EQUIPMENT_PA_SUCCESS,
  POST_EQUIPMENT_PA,
  POST_EQUIPMENT_PA_ERROR,
  POST_EQUIPMENT_PA_SUCCESS,
} from '../../constants'
import { getExclamationMark } from '../../functions'

const INIT_STATE = {
  data: [],
  loading: false,
  message: '',
  error: '',
  isSuccess: true,
  totalSave: 0,
}

export const EquipmentSchedulePA = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_PA: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_EQUIPMENT_PA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        isSuccess: true,
      }
    }
    case GET_EQUIPMENT_PA_ERROR: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.message,
      }
    }

    case POST_EQUIPMENT_PA: {
      return {
        ...state,
        loading: true,
      }
    }
    case POST_EQUIPMENT_PA_SUCCESS: {
      return {
        ...state,
        loading: false,
        message:
          state.totalSave < 1
            ? 'Data Optional Availability has been saved!'
            : state.message + getExclamationMark(state.totalSave),
        totalSave: state.totalSave + 1,
      }
    }
    case POST_EQUIPMENT_PA_ERROR: {
      return {
        ...state,
        data: action.data,
        loading: false,
        error: action.message,
        isSuccess: true,
      }
    }
    default:
      return state
  }
}
