import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_FUNCTION_GENERAL,
  GET_FUNCTION_GENERAL_SUCCESS,
  GET_FUNCTION_GENERAL_ERROR,
  POST_FUNCTION_GENERAL,
  POST_FUNCTION_GENERAL_SUCCESS,
  POST_FUNCTION_GENERAL_ERROR,
  URL,
} from '../../constants'

import { GET, POST } from '../../services'

export function* getFunctionGeneral(payload) {
  try {
    const res = yield call(
      GET,
      URL.FUNCTION_GENERAL + '?projecetRepresentationID=' + payload.payload.projectRepresentationId,
    )

    yield put({
      type: GET_FUNCTION_GENERAL_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_FUNCTION_GENERAL_ERROR,
      error: err.message,
    })
  }
}

export function* postFunctionGeneral(action) {
  try {
    const res = yield call(POST, URL.FUNCTION_GENERAL, action.payload)

    if (res) {
      yield put({
        type: POST_FUNCTION_GENERAL_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: POST_FUNCTION_GENERAL_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_FUNCTION_GENERAL, getFunctionGeneral),
    takeLatest(POST_FUNCTION_GENERAL, postFunctionGeneral),
  ])
}
