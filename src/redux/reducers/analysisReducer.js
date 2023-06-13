import { POST_ANALYSIS, POST_ANALYSIS_SUCCESS, POST_ANALYSIS_ERROR } from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  error: '',
  message: '',
  isDeleted: false,
  isChangeState: false,
}

export const Analysis = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_ANALYSIS: {
      return {
        ...state,
        loading: true,
        // data: action.payload,
      }
    }
    case POST_ANALYSIS_SUCCESS: {
      debugger
      return {
        ...state,
        loading: false,
        message: action.data.res.value,
        isDeleted: false,
        isChangeState: true,
      }
    }
    case POST_ANALYSIS_ERROR: {
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
