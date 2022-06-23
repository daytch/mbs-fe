import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  POST_ROLE,
  POST_ROLE_SUCCESS,
  POST_ROLE_ERROR,
  PUT_ROLE,
  PUT_ROLE_SUCCESS,
  PUT_ROLE_ERROR,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_ERROR,
  URL,
} from '../../constants'

import { PUT, POSTWithMessage, DELETE } from '../../services'

export function* postRole(action) {
  try {
    const res = yield call(POSTWithMessage, URL.ACCOUNT, action.payload)

    if (res) {
      yield put({
        type: POST_ROLE_SUCCESS,
        data: {},
      })
      // yield call(getRole)
    }
  } catch (err) {
    yield put({
      type: POST_ROLE_ERROR,
      error: err.message,
    })
  }
}

export function* putRole(action) {
  try {
    const res = yield call(PUT, URL.ACCOUNT + '/' + action.payload.infrastructureId, action.payload)

    if (res) {
      yield put({
        type: PUT_ROLE_SUCCESS,
        data: res,
      })
      // yield call(getRole)
    }
  } catch (err) {
    yield put({
      type: PUT_ROLE_ERROR,
      error: err.message,
    })
  }
}

export function* deleteRole(action) {
  try {
    const res = yield call(DELETE, URL.ACCOUNT + '/' + action.payload)

    if (res) {
      yield put({
        type: DELETE_ROLE_SUCCESS,
        data: res,
      })
      // yield call(getRole)
    }
  } catch (err) {
    yield put({
      type: DELETE_ROLE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(POST_ROLE, postRole),
    takeLatest(PUT_ROLE, putRole),
    takeLatest(DELETE_ROLE, deleteRole),
  ])
}
