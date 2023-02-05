import {
  GET_EMPLOYEE_TYPE,
  GET_EMPLOYEE_TYPE_SUCCESS,
  GET_EMPLOYEE_TYPE_ERROR,
  POST_EMPLOYEE_TYPE,
  POST_EMPLOYEE_TYPE_SUCCESS,
  POST_EMPLOYEE_TYPE_ERROR,
  PUT_EMPLOYEE_TYPE,
  PUT_EMPLOYEE_TYPE_SUCCESS,
  PUT_EMPLOYEE_TYPE_ERROR,
  DELETE_EMPLOYEE_TYPE,
  DELETE_EMPLOYEE_TYPE_SUCCESS,
  DELETE_EMPLOYEE_TYPE_ERROR,
  GET_EMPLOYEE_TYPE_REPORT,
  GET_EMPLOYEE_TYPE_REPORT_ERROR,
  GET_EMPLOYEE_TYPE_REPORT_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getEmployeeType(action) {
  try {
    const res = yield call(GET, URL.EMPLOYEE_TYPE + '?projectRepresentationId=' + action.payload)

    yield put({
      type: GET_EMPLOYEE_TYPE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_EMPLOYEE_TYPE_ERROR,
      error: err.message,
    })
  }
}
export function* postEmployeeType(action) {
  try {
    const res = yield call(POST, URL.EMPLOYEE_TYPE, action.payload)

    if (res) {
      yield put({
        type: POST_EMPLOYEE_TYPE_SUCCESS,
        data: res.value,
      })
    }
  } catch (err) {
    yield put({
      type: POST_EMPLOYEE_TYPE_ERROR,
      error: err.message,
    })
  }
}
export function* putEmployeeType(action) {
  try {
    const res = yield call(
      PUT,
      URL.EMPLOYEE_TYPE + '/' + action.payload.employeeTypeId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_EMPLOYEE_TYPE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_EMPLOYEE_TYPE_ERROR,
      error: err.message,
    })
  }
}
export function* deleteEmployeeType(action) {
  try {
    const res = yield call(DELETE, URL.EMPLOYEE_TYPE + '/' + action.payload.id)

    if (res) {
      yield put({
        type: DELETE_EMPLOYEE_TYPE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_EMPLOYEE_TYPE_ERROR,
      error: err.message,
    })
  }
}

export function* getEmployeeTypeReport(action) {
  try {
    const res = yield call(GET, URL.EMPLOYEE_TYPE + '?projectRepresentationId=' + action.payload)

    yield put({
      type: GET_EMPLOYEE_TYPE_REPORT_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_EMPLOYEE_TYPE_REPORT_ERROR,
      error: err.message,
    })
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(GET_EMPLOYEE_TYPE, getEmployeeType),
    takeLatest(POST_EMPLOYEE_TYPE, postEmployeeType),
    takeLatest(PUT_EMPLOYEE_TYPE, putEmployeeType),
    takeLatest(DELETE_EMPLOYEE_TYPE, deleteEmployeeType),
    takeLatest(GET_EMPLOYEE_TYPE_REPORT, getEmployeeTypeReport),
  ])
}
