import {
  GET_LIST_PROJECT_CATEGORIES,
  GET_LIST_PROJECT_CATEGORIES_SUCCESS,
  GET_LIST_PROJECT_CATEGORIES_ERROR,
  POST_PROJECT_CATEGORIES,
  POST_PROJECT_CATEGORIES_SUCCESS,
  POST_PROJECT_CATEGORIES_ERROR,
  PUT_PROJECT_CATEGORIES,
  PUT_PROJECT_CATEGORIES_SUCCESS,
  PUT_PROJECT_CATEGORIES_ERROR,
  DELETE_PROJECT_CATEGORIES,
  DELETE_PROJECT_CATEGORIES_SUCCESS,
  DELETE_PROJECT_CATEGORIES_ERROR,
  POST_PROJECT_SUBCATEGORIES,
  POST_PROJECT_SUBCATEGORIES_SUCCESS,
  POST_PROJECT_SUBCATEGORIES_ERROR,
  PUT_PROJECT_SUBCATEGORIES,
  PUT_PROJECT_SUBCATEGORIES_SUCCESS,
  PUT_PROJECT_SUBCATEGORIES_ERROR,
  DELETE_PROJECT_SUBCATEGORIES,
  DELETE_PROJECT_SUBCATEGORIES_SUCCESS,
  DELETE_PROJECT_SUBCATEGORIES_ERROR,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_SUCCESS,
  GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_ERROR,
} from '../../constants'

const ProjectCategoriesState = {
  message: {
    isError: false,
    message: '',
  },
  loading: true,
  datas: [],
  data: [],
  isShowModalMessage: false,
  onProcessData: true,
  error: '',
  successMessage: '',
  dataSubcategories: [],
}

const INIT_STATE = {
  ...ProjectCategoriesState,
  action: '',
}

export const ProjectCategories = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_SUBCATEGORY_BY_CATEGORYID: {
      return {
        ...state,
        dataSubcategories: action.data,
        loading: true,
        successMessage: '',
      }
    }
    case GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_SUCCESS: {
      return {
        ...state,
        dataSubcategories: action.data,
        loading: false,
      }
    }
    case GET_PROJECT_SUBCATEGORY_BY_CATEGORYID_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_LIST_PROJECT_CATEGORIES: {
      return {
        ...state,
        data: action.data,
        loading: true,
        successMessage: '',
      }
    }
    case GET_LIST_PROJECT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        datas: action.data,
        loading: false,
      }
    }
    case GET_LIST_PROJECT_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_PROJECT_CATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case POST_PROJECT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
      }
    }
    case POST_PROJECT_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }

    case PUT_PROJECT_CATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case PUT_PROJECT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
      }
    }
    case PUT_PROJECT_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }

    case DELETE_PROJECT_CATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case DELETE_PROJECT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
        successMessage: 'Data has been deleted!',
      }
    }
    case DELETE_PROJECT_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }

    case POST_PROJECT_SUBCATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case POST_PROJECT_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
      }
    }
    case POST_PROJECT_SUBCATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }

    case PUT_PROJECT_SUBCATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case PUT_PROJECT_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
      }
    }
    case PUT_PROJECT_SUBCATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }

    case DELETE_PROJECT_SUBCATEGORIES: {
      return {
        ...state,
        data: action.payload,
        loading: true,
        onProcessData: true,
        error: '',
        successMessage: '',
      }
    }
    case DELETE_PROJECT_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        onProcessData: false,
        successMessage: 'Data has been deleted!',
      }
    }
    case DELETE_PROJECT_SUBCATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        onProcessData: false,
      }
    }
    default:
      return state
  }
}
