import {
  GET_LEVY,
  POST_LEVY,
  PUT_LEVY,
  DELETE_LEVY,
  ERROR_LEVY,
  SUCCESS_LEVY,
  GET_LEVY_REPORT,
  GET_LEVY_REPORT_FAILURE,
  GET_LEVY_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
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

    case GET_LEVY_REPORT: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_LEVY_REPORT_SUCCESS: {
      let list = action.data
      list.forEach((element) => {
        element.levyType = element.levyType === 1 ? 'Summative' : 'Compounding'
      })
      return {
        ...state,
        loading: false,
        report: list,
        isSuccess: true,
      }
    }
    case GET_LEVY_REPORT_FAILURE: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.error,
      }
    }

    case SUCCESS_LEVY: {
      if (action.data) {
        let list = action.data
        list.forEach((element) => {
          element.levyType = element.levyType === 1 ? 'Summative' : 'Compounding'
        })
        return {
          ...state,
          data: list,
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
