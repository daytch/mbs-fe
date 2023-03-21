import {
  SET_PROJECT,
  SET_PROJECT_REPRESENTATION,
  RESET_PROJECT_REPRESENTATION,
} from '../../constants'
import { isEmptyNullOrUndefined, isObjectEmpty } from 'src/functions'
import disabledNavigation from '../../_disabledNav'
import navigation from '../../_nav'

const proj = localStorage.getItem('project')
const projRep = localStorage.getItem('projectRepresentation')
const INIT_STATE = {
  project: !isEmptyNullOrUndefined(proj) ? JSON.parse(proj) : {},
  projectRepresentation: !isEmptyNullOrUndefined(projRep) ? JSON.parse(projRep) : {},
  listMenu:
    isObjectEmpty(JSON.parse(proj)) || isObjectEmpty(JSON.parse(projRep))
      ? disabledNavigation
      : navigation,
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
      console.log('')
      return {
        ...state,
        projectRepresentation: action.payload,
        listMenu:
          isObjectEmpty(state.project) || isObjectEmpty(state.projectRepresentation)
            ? disabledNavigation
            : navigation,
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
