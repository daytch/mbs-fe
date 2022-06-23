import {
  POST_PROJECT_REPRESENTATION,
  POST_PROJECT_REPRESENTATION_SUCCESS,
  POST_PROJECT_REPRESENTATION_ERROR,
  GET_PROJECT_REPRESENTATION,
  GET_PROJECT_REPRESENTATION_SUCCESS,
  GET_PROJECT_REPRESENTATION_ERROR,
  PUT_PROJECT_REPRESENTATION,
  PUT_PROJECT_REPRESENTATION_SUCCESS,
  PUT_PROJECT_REPRESENTATION_ERROR,
  DELETE_PROJECT_REPRESENTATION,
  DELETE_PROJECT_REPRESENTATION_SUCCESS,
  DELETE_PROJECT_REPRESENTATION_ERROR,
  PUT_PROJECT_REPRESENTATION_CALENDAR,
  PUT_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
  PUT_PROJECT_REPRESENTATION_CALENDAR_ERROR,
  DELETE_PROJECT_REPRESENTATION_CALENDAR,
  DELETE_PROJECT_REPRESENTATION_CALENDAR_SUCCESS,
  DELETE_PROJECT_REPRESENTATION_CALENDAR_ERROR,
  GET_PERIOD,
  PUT_PERIOD_EXTEND,
  PUT_PERIOD_EXTEND_SUCCESS,
  PUT_PERIOD_EXTEND_ERROR,
  PUT_PERIOD_EDIT_DATE,
  PUT_PERIOD_EDIT_DATE_SUCCESS,
  PUT_PERIOD_EDIT_DATE_ERROR,
  PUT_PERIOD_SHORTEN,
  PUT_PERIOD_CUSTOM,
  PUT_PERIOD_CUSTOM_SUCCESS,
  PUT_PERIOD_CUSTOM_ERROR,
  PUT_PERIOD_SHORTEN_SUCCESS,
  PUT_PERIOD_SHORTEN_ERROR,
} from '../../constants'

const INIT_STATE = {
  dataCategory: [],
  dataSubcategory: [],
  data: [],
  dataDetail: {},
  dateRepresentation: [],
  dateRepresentationEdited: {},
  dataDropdown: [],
  dataCountry: [],
  dataCountries: [],
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
  dataPeriod: [
    { value: -1, label: 'Please Select Project' },
    { value: 1, label: 'Week' },
    { value: 2, label: 'Month' },
    { value: 3, label: 'Quarter' },
    { value: 4, label: 'Half Year' },
    { value: 5, label: 'Year' },
    { value: 6, label: 'Custom' },
  ],
  yearStartOn: [
    { value: -1, label: 'Please Select Year Start' },
    { value: 1, label: '01 January' },
    { value: 2, label: '01 Februari' },
    { value: 3, label: '01 Maret' },
    { value: 4, label: '01 April' },
    { value: 5, label: '01 May' },
    { value: 6, label: '01 June' },
    { value: 7, label: '01 July' },
    { value: 8, label: '01 August' },
    { value: 9, label: '01 September' },
    { value: 10, label: '01 October' },
    { value: 11, label: '01 November' },
    { value: 12, label: '01 December' },
  ],
  loading: true,
  error: '',
  message: '',
  isDeleted: false,
  isCalendar: false,
  isEdit: false,
}

export const ProjectRepresentation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PERIOD: {
      return {
        ...state,
        dataPeriod: action.data,
      }
    }

    case POST_PROJECT_REPRESENTATION: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_PROJECT_REPRESENTATION_SUCCESS: {
      return {
        ...state,
        dateRepresentation: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
      }
    }
    case POST_PROJECT_REPRESENTATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case GET_PROJECT_REPRESENTATION: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case GET_PROJECT_REPRESENTATION_SUCCESS: {
      return {
        ...state,
        dateRepresentation: action.data,
        loading: false,
        isCalendar: false,
      }
    }
    case GET_PROJECT_REPRESENTATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_PROJECT_REPRESENTATION: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_PROJECT_REPRESENTATION_SUCCESS: {
      return {
        ...state,
        dataRepresentation: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: false,
        isEdit: true,
      }
    }
    case PUT_PROJECT_REPRESENTATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_PROJECT_REPRESENTATION: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_PROJECT_REPRESENTATION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: false,
      }
    }
    case DELETE_PROJECT_REPRESENTATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_PROJECT_REPRESENTATION_CALENDAR: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PROJECT_REPRESENTATION_CALENDAR_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: true,
      }
    }
    case PUT_PROJECT_REPRESENTATION_CALENDAR_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_PROJECT_REPRESENTATION_CALENDAR: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_PROJECT_REPRESENTATION_CALENDAR_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: state.isDeleted ? state.message + '!' : 'Data has been deleted!',
        isDeleted: true,
        isCalendar: true,
      }
    }
    case DELETE_PROJECT_REPRESENTATION_CALENDAR_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    case PUT_PERIOD_EXTEND: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PERIOD_EXTEND_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: true,
      }
    }
    case PUT_PERIOD_EXTEND_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    case PUT_PERIOD_EDIT_DATE: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PERIOD_EDIT_DATE_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: true,
      }
    }
    case PUT_PERIOD_EDIT_DATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    case PUT_PERIOD_SHORTEN: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PERIOD_SHORTEN_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: true,
      }
    }
    case PUT_PERIOD_SHORTEN_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    case PUT_PERIOD_CUSTOM: {
      return {
        ...state,
        data: action.payload,
        loading: true,
      }
    }
    case PUT_PERIOD_CUSTOM_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
        message: !state.isDeleted ? state.message + '!' : 'Data has been saved!',
        isDeleted: false,
        isCalendar: true,
      }
    }
    case PUT_PERIOD_CUSTOM_ERROR: {
      return {
        ...state,
        loading: false,
        error: state.error ? action.data.message + '!' : action.data.message,
      }
    }

    default:
      return state
  }
}
