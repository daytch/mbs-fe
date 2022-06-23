import {
  GET_EQUIPMENTSCHEDULEOH,
  POST_EQUIPMENTSCHEDULEOH,
  PUT_EQUIPMENTSCHEDULEOH,
  DELETE_EQUIPMENTSCHEDULEOH,
  ERROR_EQUIPMENTSCHEDULEOH,
  SUCCESS_EQUIPMENTSCHEDULEOH,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataOption: [
    'Please Select',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  costCentreFleets: [],
  loading: false,
  message: '',
  isSuccess: true,
}

export const EquipmentScheduleOH = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENTSCHEDULEOH: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_EQUIPMENTSCHEDULEOH: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          costCentreFleets: action.dataOption,
          loading: false,
          isSuccess: true,
        }
      } else {
        // console.log(state)
        // console.log(action)
        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.message,
        }
      }
    }
    case ERROR_EQUIPMENTSCHEDULEOH: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_EQUIPMENTSCHEDULEOH: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_EQUIPMENTSCHEDULEOH: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_EQUIPMENTSCHEDULEOH: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    default:
      return state
  }
}
