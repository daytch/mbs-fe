import {
  POST_PROJECT_REPRESENTATION,
  PUT_PROJECT_REPRESENTATION,
  GET_PROJECT_REPRESENTATION,
  DELETE_PROJECT_REPRESENTATION,
  PUT_PROJECT_REPRESENTATION_CALENDAR,
  DELETE_PROJECT_REPRESENTATION_CALENDAR,
  GET_PERIOD,
  PUT_PERIOD_SHORTEN,
  PUT_PERIOD_EXTEND,
  PUT_PERIOD_CUSTOM,
  PUT_PERIOD_EDIT_DATE,
} from '../../constants'

export function getPeriod() {
  return {
    type: GET_PERIOD,
  }
}

export function getProjectRepresentation(data) {
  return {
    type: GET_PROJECT_REPRESENTATION,
    payload: data,
  }
}

export function postProjectRepresentation(data) {
  return {
    type: POST_PROJECT_REPRESENTATION,
    payload: data,
  }
}

export function putProjectRepresentation(data) {
  return {
    type: PUT_PROJECT_REPRESENTATION,
    payload: data,
  }
}

export function deleteProjectRepresentation(data) {
  return {
    type: DELETE_PROJECT_REPRESENTATION,
    payload: data,
  }
}

export function putProjectRepresentationCalendar(data) {
  return {
    type: PUT_PROJECT_REPRESENTATION_CALENDAR,
    payload: data,
  }
}

export function deleteProjectRepresentationCalendar(data) {
  return {
    type: DELETE_PROJECT_REPRESENTATION_CALENDAR,
    payload: data,
  }
}

export function putPeriodShorten(data) {
  return {
    type: PUT_PERIOD_SHORTEN,
    payload: data,
  }
}

export function putPeriodExtend(data) {
  return {
    type: PUT_PERIOD_EXTEND,
    payload: data,
  }
}

export function putPeriodCustom(data) {
  return {
    type: PUT_PERIOD_CUSTOM,
    payload: data,
  }
}

export function putPeriodEditDate(data) {
  return {
    type: PUT_PERIOD_EDIT_DATE,
    payload: data,
  }
}
