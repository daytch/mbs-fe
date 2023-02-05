import {
  PUT_INDEX_ALLOCATION,
  PUT_INDEX_ALLOCATION_SUCCESS,
  PUT_INDEX_ALLOCATION_ERROR,
  GET_PROJECT_REPRESENTATION_DETAIL,
  GET_PROJECT_REPRESENTATION_DETAIL_SUCCESS,
  GET_PROJECT_REPRESENTATION_DETAIL_ERROR,
  GET_INDEX_CONTINGENCY_REPORT,
  GET_INDEX_CONTINGENCY_REPORT_ERROR,
  GET_INDEX_CONTINGENCY_REPORT_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  report: {},
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const IndexContingency = (state = INIT_STATE, action) => {
  switch (action.type) {
    case PUT_INDEX_ALLOCATION: {
      return {
        ...state,
        loading: true,
      }
    }
    case PUT_INDEX_ALLOCATION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_INDEX_ALLOCATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_PROJECT_REPRESENTATION_DETAIL: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_PROJECT_REPRESENTATION_DETAIL_SUCCESS: {
      return {
        ...state,
        dataDetail: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_PROJECT_REPRESENTATION_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_INDEX_CONTINGENCY_REPORT: {
      return {
        ...state,
      }
    }
    case GET_INDEX_CONTINGENCY_REPORT_SUCCESS: {
      return {
        ...state,
        report: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_INDEX_CONTINGENCY_REPORT_ERROR: {
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
