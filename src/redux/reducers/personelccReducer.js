import {
  GET_PERSONELCC,
  POST_PERSONELCC,
  PUT_PERSONELCC,
  DELETE_PERSONELCC,
  ERROR_PERSONELCC,
  SUCCESS_PERSONELCC,
  GET_EMPLOYEE_TYPE_REPORT,
  GET_EMPLOYEE_TYPE_REPORT_ERROR,
  GET_EMPLOYEE_TYPE_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: [],
  employeeTypes: [
    'Please Select employee Type',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  loading: false,
  message: '',
  isSuccess: true,
}

export const Personelcc = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PERSONELCC: {
      return {
        ...state,
        // data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }

    case SUCCESS_PERSONELCC: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
          employeeTypes: action.employeeTypes,
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
    case ERROR_PERSONELCC: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_PERSONELCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_PERSONELCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_PERSONELCC: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }

    case GET_EMPLOYEE_TYPE_REPORT: {
      return { ...state }
    }
    case GET_EMPLOYEE_TYPE_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        message: action.message,
        loading: true,
        isSuccess: true,
      }
    }
    case GET_EMPLOYEE_TYPE_REPORT_ERROR: {
      return {
        ...state,
        message: action.error,
        loading: false,
        isSuccess: true,
      }
    }

    default:
      return state
  }
}
