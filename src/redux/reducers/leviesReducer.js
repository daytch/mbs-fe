import {
  GET_LEVY,
  POST_LEVY,
  PUT_LEVY,
  DELETE_LEVY,
  ERROR_LEVY,
  SUCCESS_LEVY,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataType: [
    'Please Select Levy Type',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Levy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEVY: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_LEVY: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
        }
      } else {
        console.log(state)

        return {
          ...state,
          loading: false,
          isSuccess: true,
          message: action.message,
        }
      }
    }
    case ERROR_LEVY: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_LEVY: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_LEVY: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_LEVY: {
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
