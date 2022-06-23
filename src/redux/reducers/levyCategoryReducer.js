import {
  GET_LEVYCATEGORY,
  POST_LEVYCATEGORY,
  PUT_LEVYCATEGORY,
  DELETE_LEVYCATEGORY,
  ERROR_LEVYCATEGORY,
  SUCCESS_LEVYCATEGORY,
  GET_LEVYCATEGORY_OPTION,
} from '../../constants'

const INIT_STATE = {
  data: [],
  loading: false,
  message: '',
  isSuccess: true,
  dataOption: [],
}

export const LevyCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEVYCATEGORY: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }
    case GET_LEVYCATEGORY_OPTION: {
      return {
        ...state,
        dataOption: action.data,
        message: '',
        loading: true,
        isSuccess: true,
      }
    }
    case SUCCESS_LEVYCATEGORY: {
      if (action.data) {
        return {
          ...state,
          data: action.data,
          loading: false,
          isSuccess: true,
        }
      } else if (action.dataType) {
        return {
          ...state,
          dataOption: action.dataType,
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
    case ERROR_LEVYCATEGORY: {
      return {
        ...state,
        loading: false,
        isSuccess: false,
        message: action.message,
      }
    }

    case POST_LEVYCATEGORY: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case PUT_LEVYCATEGORY: {
      return {
        ...state,
        data: action.data,
        loading: true,
        message: '',
        isSuccess: true,
      }
    }
    case DELETE_LEVYCATEGORY: {
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
