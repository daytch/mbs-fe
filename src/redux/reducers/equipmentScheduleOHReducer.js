import {
  GET_EQUIPMENTSCHEDULE_OH,
  GET_EQUIPMENTSCHEDULE_OH_ERROR,
  GET_EQUIPMENTSCHEDULE_OH_SUCCESS,
  POST_EQUIPMENTSCHEDULE_OH,
  POST_EQUIPMENTSCHEDULE_OH_ERROR,
  POST_EQUIPMENTSCHEDULE_OH_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  costCentreFleets: [],
  loading: false,
  message: '',
  isSuccess: true,
}

export const EquipmentScheduleOH = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENTSCHEDULE_OH: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case GET_EQUIPMENTSCHEDULE_OH_SUCCESS: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          costCentreFleets: action.dataOption,
          loading: false,
          isSuccess: true,
        }
      } else {
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.message,
        }
      }
    }
    case GET_EQUIPMENTSCHEDULE_OH_ERROR: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
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
        message: 'Data has been saved!',
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
