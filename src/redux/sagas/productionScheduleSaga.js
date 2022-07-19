import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_PRODUCTION_SCHEDULE,
  GET_PRODUCTION_SCHEDULE_SUCCESS,
  GET_PRODUCTION_SCHEDULE_ERROR,
  POST_PRODUCTION_SCHEDULE,
  POST_PRODUCTION_SCHEDULE_SUCCESS,
  POST_PRODUCTION_SCHEDULE_ERROR,
  PUT_PRODUCTION_SCHEDULE,
  PUT_PRODUCTION_SCHEDULE_SUCCESS,
  PUT_PRODUCTION_SCHEDULE_ERROR,
  DELETE_PRODUCTION_SCHEDULE,
  DELETE_PRODUCTION_SCHEDULE_SUCCESS,
  DELETE_PRODUCTION_SCHEDULE_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POST, DELETE } from '../../services'

export function* getProductionSchedule(payload) {
  try {
    const res = yield call(
      GET,
      URL.PRODUCTION_SCHEDULE +
        '?projectRepresentationId=' +
        payload.payload.projectRepresentationId,
    )

    yield put({
      type: GET_PRODUCTION_SCHEDULE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_PRODUCTION_SCHEDULE_ERROR,
      error: err.message,
    })
  }
}

export function* postProductionSchedule(action) {
  try {
    const res = yield call(POST, URL.PRODUCTION_SCHEDULE, action.payload)

    if (res) {
      yield put({
        type: POST_PRODUCTION_SCHEDULE_SUCCESS,
        data: {},
      })
    }
  } catch (err) {
    yield put({
      type: POST_PRODUCTION_SCHEDULE_ERROR,
      error: err.message,
    })
  }
}

export function* putProductionSchedule(action) {
  try {
    const res = yield call(
      PUT,
      URL.PRODUCTION_SCHEDULE + '/' + action.payload.infrastructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_PRODUCTION_SCHEDULE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PRODUCTION_SCHEDULE_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProductionSchedule(action) {
  try {
    const res = yield call(DELETE, URL.PRODUCTION_SCHEDULE + '/' + action.payload)

    if (res) {
      yield put({
        type: DELETE_PRODUCTION_SCHEDULE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_PRODUCTION_SCHEDULE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PRODUCTION_SCHEDULE, getProductionSchedule),
    takeLatest(POST_PRODUCTION_SCHEDULE, postProductionSchedule),
    takeLatest(PUT_PRODUCTION_SCHEDULE, putProductionSchedule),
    takeLatest(DELETE_PRODUCTION_SCHEDULE, deleteProductionSchedule),
  ])
}
