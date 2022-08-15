import {
  GET_EQUIPMENT_PA,
  GET_EQUIPMENT_PA_ERROR,
  GET_EQUIPMENT_PA_SUCCESS,
  POST_EQUIPMENT_PA,
  POST_EQUIPMENT_PA_ERROR,
  POST_EQUIPMENT_PA_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  message: '',
  isSuccess: true,
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
        costCentreFleets: action.dataOption,
        loading: false,
        isSuccess: true,
      }
    }
    case GET_EQUIPMENT_PA_ERROR: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
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
        data: action.data,
        loading: false,
        message: 'Data has been saved.',
        isSuccess: true,
      }
    }
    case POST_EQUIPMENT_PA_ERROR: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: '',
        isSuccess: true,
      }
    }
    default:
      return state
  }
}
