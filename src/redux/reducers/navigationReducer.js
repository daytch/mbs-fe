import {
  SET_PROJECT,
  SET_PROJECT_REPRESENTATION,
  RESET_PROJECT_REPRESENTATION,
} from '../../constants'
import { isEmptyNullOrUndefined } from 'src/functions'

const proj = localStorage.getItem('project')
const projRep = localStorage.getItem('projectRepresentation')
const INIT_STATE = {
  project: !isEmptyNullOrUndefined(proj) ? JSON.parse(proj) : {},
  projectRepresentation: !isEmptyNullOrUndefined(projRep) ? JSON.parse(projRep) : {},
}

export const Navigation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_PROJECT: {
      return {
        ...state,
        project: action.data,
      }
    }
    case SET_PROJECT_REPRESENTATION: {
      return {
        ...state,
        projectRepresentation: action.data,
      }
    }

    case RESET_PROJECT_REPRESENTATION: {
      return {
        ...state,
        projectRepresentation: {},
      }
    }
    default:
      return state
  }
}
