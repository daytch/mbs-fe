import {
  GET_EQUIPMENT_ROSTER,
  GET_EQUIPMENT_ROSTER_SUCCESS,
  GET_EQUIPMENT_ROSTER_ERROR,
  POST_EQUIPMENT_ROSTER,
  POST_EQUIPMENT_ROSTER_SUCCESS,
  POST_EQUIPMENT_ROSTER_ERROR,
  GET_EQUIPMENT_ROSTER_REPORT,
  GET_EQUIPMENT_ROSTER_REPORT_ERROR,
  GET_EQUIPMENT_ROSTER_REPORT_SUCCESS,
} from '../../constants'
import { getExclamationMark } from '../../functions'

const INIT_STATE = {
  data: [],
  report: [],
  loading: false,
  error: '',
  message: '',
  totalSave: 0,
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

    case GET_EQUIPMENT_ROSTER_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_EQUIPMENT_ROSTER_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
      }
    }
    case GET_EQUIPMENT_ROSTER_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_EQUIPMENT_ROSTER: {
      return {
        ...state,
        loading: true,
      }
    }
    case POST_EQUIPMENT_ROSTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        message:
          state.totalSave < 1
            ? 'Data Equipment Roster has been saved!'
            : state.message + getExclamationMark(state.totalSave),
        totalSave: state.totalSave + 1,
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
