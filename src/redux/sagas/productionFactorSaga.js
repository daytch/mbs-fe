import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_PRODUCTION_FACTOR,
  GET_PRODUCTION_FACTOR_SUCCESS,
  GET_PRODUCTION_FACTOR_ERROR,
  POST_PRODUCTION_FACTOR,
  POST_PRODUCTION_FACTOR_SUCCESS,
  POST_PRODUCTION_FACTOR_ERROR,
  PUT_PRODUCTION_FACTOR,
  PUT_PRODUCTION_FACTOR_SUCCESS,
  PUT_PRODUCTION_FACTOR_ERROR,
  DELETE_PRODUCTION_FACTOR,
  DELETE_PRODUCTION_FACTOR_SUCCESS,
  DELETE_PRODUCTION_FACTOR_ERROR,
  URL,
} from '../../constants'

import { GET, PUT, POST, DELETE } from '../../services'

export function* getProductionFactor() {
  try {
    const res = yield call(GET, URL.PRODUCTION_FACTOR)

    yield put({
      type: GET_PRODUCTION_FACTOR_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_PRODUCTION_FACTOR_ERROR,
      error: err.message,
    })
  }
}

export function* postProductionFactor(action) {
  try {
    const res = yield call(POST, URL.PRODUCTION_FACTOR, action.payload)

    if (res) {
      yield put({
        type: POST_PRODUCTION_FACTOR_SUCCESS,
        data: {},
      })
    }
  } catch (err) {
    yield put({
      type: POST_PRODUCTION_FACTOR_ERROR,
      error: err.message,
    })
  }
}

export function* putProductionFactor(action) {
  try {
    const res = yield call(
      PUT,
      URL.COSTCENTRE + '/' + action.payload.infrastructureId,
      action.payload,
    )

    if (res) {
      yield put({
        type: PUT_PRODUCTION_FACTOR_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_PRODUCTION_FACTOR_ERROR,
      error: err.message,
    })
  }
}

export function* deleteProductionFactor(action) {
  try {
    const res = yield call(DELETE, URL.COSTCENTRE + '/' + action.payload)

    if (res) {
      yield put({
        type: DELETE_PRODUCTION_FACTOR_SUCCESS,
        data: res,
      })
      // yield call(getProductionFactor)
    }
  } catch (err) {
    yield put({
      type: DELETE_PRODUCTION_FACTOR_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PRODUCTION_FACTOR, getProductionFactor),
    takeLatest(POST_PRODUCTION_FACTOR, postProductionFactor),
    takeLatest(PUT_PRODUCTION_FACTOR, putProductionFactor),
    takeLatest(DELETE_PRODUCTION_FACTOR, deleteProductionFactor),
  ])
}
