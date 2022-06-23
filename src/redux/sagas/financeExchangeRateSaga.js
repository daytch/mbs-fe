import {
  GET_EXCHANGE_RATE,
  GET_EXCHANGE_RATE_SUCCESS,
  GET_EXCHANGE_RATE_ERROR,
  POST_EXCHANGE_RATE,
  POST_EXCHANGE_RATE_SUCCESS,
  POST_EXCHANGE_RATE_ERROR,
  PUT_EXCHANGE_RATE,
  PUT_EXCHANGE_RATE_SUCCESS,
  PUT_EXCHANGE_RATE_ERROR,
  DELETE_EXCHANGE_RATE,
  DELETE_EXCHANGE_RATE_SUCCESS,
  DELETE_EXCHANGE_RATE_ERROR,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POST, PUT, DELETE } from '../../services'

export function* getExchangeRate(action) {
  try {
    const res = yield call(
      GET,
      URL.EXCHANGE_RATE + '?projectRepresentationId=' + action.payload.projectRepresentationId,
    )

    yield put({
      type: GET_EXCHANGE_RATE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_EXCHANGE_RATE_ERROR,
      error: err.message,
    })
  }
}
export function* postExchangeRate(action) {
  try {
    let data = action.payload.map((item) => item)
    const res = yield call(POST, URL.EXCHANGE_RATE, data)

    if (res && res.status === 200) {
      yield put({
        type: POST_EXCHANGE_RATE_SUCCESS,
        data: res,
      })
    } else if (res.isSuccess) {
      yield put({
        type: POST_EXCHANGE_RATE_SUCCESS,
        data: res,
      })
    } else if (!res.isSuccess) {
      yield put({
        type: POST_EXCHANGE_RATE_ERROR,
        data: res.error,
      })
    } else {
      yield put({
        type: POST_EXCHANGE_RATE_ERROR,
        error: res.response.data.errors.$[0],
      })
    }
  } catch (err) {
    yield put({
      type: POST_EXCHANGE_RATE_ERROR,
      error: err.message,
    })
  }
}
export function* putExchangeRate(action) {
  try {
    const res = yield call(PUT, URL.EXCHANGE_RATE, action.payload)

    if (res) {
      yield put({
        type: PUT_EXCHANGE_RATE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: PUT_EXCHANGE_RATE_ERROR,
      error: err.message,
    })
  }
}
export function* deleteExchangeRate(action) {
  try {
    const res = yield call(DELETE, URL.EXCHANGE_RATE + '/' + action.payload.id + '/Period')

    if (res) {
      yield put({
        type: DELETE_EXCHANGE_RATE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: DELETE_EXCHANGE_RATE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_EXCHANGE_RATE, getExchangeRate),
    takeLatest(POST_EXCHANGE_RATE, postExchangeRate),
    takeLatest(PUT_EXCHANGE_RATE, putExchangeRate),
    takeLatest(DELETE_EXCHANGE_RATE, deleteExchangeRate),
  ])
}
