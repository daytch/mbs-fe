import {
  GET_PROJECT_CATEGORIES,
  GET_PROJECT_CATEGORIES_SUCCESS,
  GET_PROJECT_CATEGORIES_ERROR,
  GET_PROJECT_SUBCATEGORIES,
  GET_PROJECT_SUBCATEGORIES_SUCCESS,
  GET_PROJECT_SUBCATEGORIES_ERROR,
  POST_PROJECT,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  PUT_PROJECT,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  GET_DROPDOWN_PROJECT,
  GET_DROPDOWN_PROJECT_SUCCESS,
  GET_DROPDOWN_PROJECT_ERROR,
  GET_PROJECT_DASHBOARD,
  GET_PROJECT_DASHBOARD_SUCCESS,
  GET_PROJECT_DASHBOARD_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataCategory: [],
  dataSubcategory: [],
  data: [],
  dataDropdown: [],
  dataCountry: [],
  dataCountries: [],
  dataProjectDashboard: [],
  dataProjects: [
    {
      projectId: 0,
      projectN: null,
      projectName: 'Project Test',
      projectCategoryName: 'Open Gold',
      projectSubCategoryName: 'string',
      countryId: 1,
      currencyAbbr: null,
      notes: 'Test Project',
      proPassword: null,
      rowStatus: true,
    },
  ],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
}

export const Project = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_CATEGORIES: {
      return {
        ...state,
        dataCategory: action.data,
      }
    }
    case GET_PROJECT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        dataCategory: action.data,
        loading: false,
      }
    }
    case GET_PROJECT_CATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_PROJECT_DASHBOARD: {
      return {
        ...state,
      }
    }
    case GET_PROJECT_DASHBOARD_SUCCESS: {
      return {
        ...state,
        dataProjectDashboard: action.data,
        loading: false,
      }
    }
    case GET_PROJECT_DASHBOARD_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_PROJECT_SUBCATEGORIES: {
      return {
        ...state,
        dataSubcategory: action.data,
      }
    }
    case GET_PROJECT_SUBCATEGORIES_SUCCESS: {
      return {
        ...state,
        dataSubcategory: action.data,
        loading: false,
      }
    }
    case GET_PROJECT_SUBCATEGORIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_PROJECT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_PROJECT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted && state.message ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case POST_PROJECT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
        message: '',
        isDeleted: false,
      }
    }

    case GET_PROJECT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_PROJECT_SUCCESS: {
      return {
        ...state,
        dataProjects: action.data,
        loading: false,
      }
    }
    case GET_PROJECT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_PROJECT: {
      return {
        ...state,
        loading: true,
        data: action.payload,
      }
    }
    case PUT_PROJECT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
      }
    }
    case PUT_PROJECT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_PROJECT: {
      return {
        ...state,
        loading: true,
        data: action.payload,
      }
    }
    case DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
      }
    }
    case DELETE_PROJECT_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_DROPDOWN_PROJECT: {
      return {
        ...state,
        dataDropdown: action.payload,
      }
    }
    case GET_DROPDOWN_PROJECT_SUCCESS: {
      return {
        ...state,
        dataDropdown: action.data,
        loading: false,
      }
    }
    case GET_DROPDOWN_PROJECT_ERROR: {
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
