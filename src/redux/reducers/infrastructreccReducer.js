import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
  ERROR_INFRASTRUCTURECC,
  SUCCESS_INFRASTRUCTURECC,
  GET_INFRASTRUCTURECC_MATERIAL,
  GET_INFRASTRUCTURECC_MATERIAL_ERROR,
  GET_INFRASTRUCTURECC_MATERIAL_SUCCESS,
  POST_INFRASTRUCTURECC_MATERIAL,
  POST_INFRASTRUCTURECC_MATERIAL_ERROR,
  POST_INFRASTRUCTURECC_MATERIAL_SUCCESS,
  GET_INFRASTRUCTURECC_RESOURCE,
  GET_INFRASTRUCTURECC_RESOURCE_ERROR,
  GET_INFRASTRUCTURECC_RESOURCE_SUCCESS,
  POST_INFRASTRUCTURECC_RESOURCE,
  POST_INFRASTRUCTURECC_RESOURCE_ERROR,
  POST_INFRASTRUCTURECC_RESOURCE_SUCCESS,
} from '../../constants'

const INIT_STATE = {
  data: [],
  infrastructures: [
    'Please Select employee Type',
    { label: 'Summative', value: '1' },
    { label: 'Compounding', value: '2' },
  ],
  dataMaterial: [],
  dataResource: [],
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

    case GET_INFRASTRUCTURECC_MATERIAL: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
      }
    }
    case GET_INFRASTRUCTURECC_MATERIAL_SUCCESS: {
      return {
        ...state,
        dataMaterial: action.data,
        loading: false,
      }
    }
    case GET_INFRASTRUCTURECC_MATERIAL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_INFRASTRUCTURECC_MATERIAL: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case POST_INFRASTRUCTURECC_MATERIAL_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    case POST_INFRASTRUCTURECC_MATERIAL_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_INFRASTRUCTURECC_RESOURCE: {
      return {
        ...state,
        data: action.data,
        message: '',
        loading: true,
      }
    }
    case GET_INFRASTRUCTURECC_RESOURCE_SUCCESS: {
      return {
        ...state,
        dataResource: action.data,
        loading: false,
      }
    }
    case GET_INFRASTRUCTURECC_RESOURCE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_INFRASTRUCTURECC_RESOURCE: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case POST_INFRASTRUCTURECC_RESOURCE_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    case POST_INFRASTRUCTURECC_RESOURCE_ERROR: {
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
