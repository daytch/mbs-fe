import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_COMPANY,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR,
  POST_COMPANY,
  POST_COMPANY_SUCCESS,
  POST_COMPANY_ERROR,
  PUT_COMPANY,
  PUT_COMPANY_SUCCESS,
  PUT_COMPANY_ERROR,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POSTWithMessage, DELETE } from '../../services'

export function* getCompany(payload) {
  try {
    const res = yield call(GET, URL.COMPANY)

    yield put({
      type: GET_COMPANY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_COMPANY_ERROR,
      error: err.message,
    })
  }
}

export function* postCompany(action) {
  try {
    const res = yield call(POSTWithMessage, URL.COSTCENTRE, action.payload)

    if (res) {
      yield put({
        type: POST_COMPANY_SUCCESS,
        data: {},
      })
      // yield call(getCompany)
    }
  } catch (err) {
    yield put({
      type: POST_COMPANY_ERROR,
      error: err.message,
    })
  }
}

export function* putCompany(action) {
  try {
    const res = yield call(
      PUT,
      URL.COSTCENTRE + '/' + action.payload.infrastructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_COMPANY_SUCCESS,
        data: res,
      })
      // yield call(getCompany)
    }
  } catch (err) {
    yield put({
      type: PUT_COMPANY_ERROR,
      error: err.message,
    })
  }
}

export function* deleteCompany(action) {
  try {
    const res = yield call(DELETE, URL.COSTCENTRE + '/' + action.payload)

    if (res) {
      yield put({
        type: DELETE_COMPANY_SUCCESS,
        data: res,
      })
      // yield call(getCompany)
    }
  } catch (err) {
    yield put({
      type: DELETE_COMPANY_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_COMPANY, getCompany),
    takeLatest(POST_COMPANY, postCompany),
    takeLatest(PUT_COMPANY, putCompany),
    takeLatest(DELETE_COMPANY, deleteCompany),
  ])
}
