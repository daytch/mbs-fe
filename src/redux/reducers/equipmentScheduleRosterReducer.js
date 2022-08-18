import {
  GET_EQUIPMENT_ROSTER,
  GET_EQUIPMENT_ROSTER_SUCCESS,
  GET_EQUIPMENT_ROSTER_ERROR,
  POST_EQUIPMENT_ROSTER,
  POST_EQUIPMENT_ROSTER_SUCCESS,
  POST_EQUIPMENT_ROSTER_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: true,
  error: '',
  message: '',
}

export const EquipmentScheduleRoster = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_ROSTER: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_EQUIPMENT_ROSTER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case GET_EQUIPMENT_ROSTER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_EQUIPMENT_ROSTER: {
      return {
        ...state,
        // data: action.payload,
      }
    }
    case POST_EQUIPMENT_ROSTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        message: 'Data has been saved!',
      }
    }
    case POST_EQUIPMENT_ROSTER_ERROR: {
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
