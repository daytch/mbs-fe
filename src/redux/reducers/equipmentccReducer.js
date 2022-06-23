import {
  GET_EQUIPMENTCC,
  POST_EQUIPMENTCC,
  PUT_EQUIPMENTCC,
  DELETE_EQUIPMENTCC,
  ERROR_EQUIPMENTCC,
  SUCCESS_EQUIPMENTCC,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataOption: [
    'Please Select',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Equipmentcc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EQUIPMENTCC: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_EQUIPMENTCC: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          dataOption: action.dataOption,
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
    case ERROR_EQUIPMENTCC: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_EQUIPMENTCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_EQUIPMENTCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_EQUIPMENTCC: {
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
