import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_FUNCTION_PERSONNEL,
  GET_FUNCTION_PERSONNEL_SUCCESS,
  GET_FUNCTION_PERSONNEL_ERROR,
  POST_FUNCTION_PERSONNEL,
  POST_FUNCTION_PERSONNEL_SUCCESS,
  POST_FUNCTION_PERSONNEL_ERROR,
  GET_FUNCTION_PERSONNEL_REPORT,
  GET_FUNCTION_PERSONNEL_REPORT_SUCCESS,
  GET_FUNCTION_PERSONNEL_REPORT_ERROR,
  URL,
} from '../../constants'

import { GET, POST } from '../../services'

export function* getFunctionPersonnel(payload) {
  try {
    const res = yield call(
      GET,
      URL.FUNCTION_PERSONNEL + '?costCentreID=' + payload.payload.costcentreId,
    )

    yield put({
      type: GET_FUNCTION_PERSONNEL_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_FUNCTION_PERSONNEL_ERROR,
      error: err.message,
    })
  }
}

export function* getFunctionPersonnelReport(payload) {
  try {
    const res = yield call(GET, URL.FUNCTION_PERSONNEL + '/Report/' + payload.payload)

    yield put({
      type: GET_FUNCTION_PERSONNEL_REPORT_SUCCESS,
      data: res.value.listPersonelFunction,
    })
  } catch (err) {
    yield put({
      type: GET_FUNCTION_PERSONNEL_REPORT_ERROR,
      error: err.message,
    })
  }
}

export function* postFunctionPersonnel(action) {
  try {
    const res = yield call(POST, URL.FUNCTION_PERSONNEL, action.payload)

    if (res) {
      yield put({
        type: POST_FUNCTION_PERSONNEL_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: POST_FUNCTION_PERSONNEL_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_FUNCTION_PERSONNEL, getFunctionPersonnel),
    takeLatest(POST_FUNCTION_PERSONNEL, postFunctionPersonnel),
    takeLatest(GET_FUNCTION_PERSONNEL_REPORT, getFunctionPersonnelReport),
  ])
}
