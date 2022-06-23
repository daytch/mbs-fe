import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
  ERROR_INFRASTRUCTURECC,
  SUCCESS_INFRASTRUCTURECC,
} from '../../constants'

const INIT_STATE = {
  data: [],
  infrastructures: [
    'Please Select employee Type',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Infrastructurecc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INFRASTRUCTURECC: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_INFRASTRUCTURECC: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
          infrastructures: action.infrastructures,
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
    case ERROR_INFRASTRUCTURECC: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_INFRASTRUCTURECC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_INFRASTRUCTURECC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_INFRASTRUCTURECC: {
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
