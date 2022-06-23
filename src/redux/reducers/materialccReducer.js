import {
  GET_MATERIALCC,
  POST_MATERIALCC,
  PUT_MATERIALCC,
  DELETE_MATERIALCC,
  ERROR_MATERIALCC,
  SUCCESS_MATERIALCC,
} from '../../constants'

const INIT_STATE = {
  data: [],

  materialServices: [
    'Please Select Material/Service',
    { label: 'Material', value: '1' },
    { label: 'Service', value: '2' },
  ],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Materialcc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MATERIALCC: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_MATERIALCC: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
          materialServices: action.materialServices,
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
    case ERROR_MATERIALCC: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_MATERIALCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_MATERIALCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_MATERIALCC: {
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
