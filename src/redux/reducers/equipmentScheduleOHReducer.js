import {
  GET_EQUIPMENTSCHEDULE_OH,
  GET_EQUIPMENTSCHEDULE_OH_ERROR,
  GET_EQUIPMENTSCHEDULE_OH_SUCCESS,
  POST_EQUIPMENTSCHEDULE_OH,
  POST_EQUIPMENTSCHEDULE_OH_ERROR,
  POST_EQUIPMENTSCHEDULE_OH_SUCCESS,
  GET_EQUIPMENT_OH_REPORT,
  GET_EQUIPMENT_OH_REPORT_SUCCESS,
  GET_EQUIPMENT_OH_REPORT_ERROR,
} from '../../constants'
import { getExclamationMark } from '../../functions'

const INIT_STATE = {
  data: [],
  report: [],
  costCentreFleets: [],
  loading: false,
  message: '',
  error: '',
  isSuccess: true,
  totalSave: 0,
}

export const EquipmentScheduleOH = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENTSCHEDULE_OH: {
      return {
        ...state,
        loading: true,
      }
    }

    case GET_EQUIPMENTSCHEDULE_OH_SUCCESS: {
      return {
        ...state,
        data: action.data,
        costCentreFleets: action.dataOption,
        loading: false,
        isSuccess: true,
      }
    }

    case GET_EQUIPMENTSCHEDULE_OH_ERROR: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.message,
      }
    }

    case GET_EQUIPMENT_OH_REPORT: {
      return {
        ...state,
      }
    }
    case GET_EQUIPMENT_OH_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
        isSuccess: true,
      }
    }
    case GET_EQUIPMENT_OH_REPORT_ERROR: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        error: action.message,
      }
    }

    case POST_EQUIPMENTSCHEDULE_OH: {
      return {
        ...state,
        loading: true,
      }
    }
    case POST_EQUIPMENTSCHEDULE_OH_SUCCESS: {
      return {
        ...state,
        loading: false,
        message:
          state.totalSave < 1
            ? 'Data Equipment OH Function has been saved!'
            : state.message + getExclamationMark(state.totalSave),
        totalSave: state.totalSave + 1,
      }
    }
    case POST_EQUIPMENTSCHEDULE_OH_ERROR: {
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
