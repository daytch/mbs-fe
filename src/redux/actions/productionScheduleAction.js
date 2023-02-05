import {
  GET_PRODUCTION_SCHEDULE,
  POST_PRODUCTION_SCHEDULE,
  PUT_PRODUCTION_SCHEDULE,
  DELETE_PRODUCTION_SCHEDULE,
  GET_REPORT_PRODUCTION_SCHEDULES,
} from '../../constants'

export function getProductionSchedule(data) {
  return {
    type: GET_PRODUCTION_SCHEDULE,
    payload: data,
  }
}

export function postProductionSchedule(data) {
  return {
    type: POST_PRODUCTION_SCHEDULE,
    payload: data,
  }
}

export function putProductionSchedule(data) {
  return {
    type: PUT_PRODUCTION_SCHEDULE,
    payload: data,
  }
}

export function deleteProductionSchedule(data) {
  return {
    type: DELETE_PRODUCTION_SCHEDULE,
    payload: data,
  }
}

export function getReportProductionSchedule(data) {
  return {
    type: GET_REPORT_PRODUCTION_SCHEDULES,
    payload: data,
  }
}
