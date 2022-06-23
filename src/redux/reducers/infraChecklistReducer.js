import {
  GET_INFRA_CHECKLIST,
  GET_INFRA_CHECKLIST_SUCCESS,
  GET_INFRA_CHECKLIST_ERROR,
  POST_INFRA_CHECKLIST,
  POST_INFRA_CHECKLIST_SUCCESS,
  POST_INFRA_CHECKLIST_ERROR,
  PUT_INFRA_CHECKLIST,
  PUT_INFRA_CHECKLIST_SUCCESS,
  PUT_INFRA_CHECKLIST_ERROR,
  DELETE_INFRA_CHECKLIST,
  DELETE_INFRA_CHECKLIST_SUCCESS,
  DELETE_INFRA_CHECKLIST_ERROR,
} from '../../constants'

const INIT_STATE = {
  data: [],
  dataInfra: [],
  loading: true,
  error: '',
}

export const InfraChecklist = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INFRA_CHECKLIST: {
      return {
        ...state,
        data: action.data,
      }
    }
    case GET_INFRA_CHECKLIST_SUCCESS: {
      return {
        ...state,
        dataInfra: action.data,
        loading: false,
      }
    }
    case GET_INFRA_CHECKLIST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case POST_INFRA_CHECKLIST: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case POST_INFRA_CHECKLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
      }
    }
    case POST_INFRA_CHECKLIST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case PUT_INFRA_CHECKLIST: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case PUT_INFRA_CHECKLIST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case PUT_INFRA_CHECKLIST_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case DELETE_INFRA_CHECKLIST: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case DELETE_INFRA_CHECKLIST_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    }
    case DELETE_INFRA_CHECKLIST_ERROR: {
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
