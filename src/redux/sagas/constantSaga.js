import {
  GET_CONSTANT,
  POST_CONSTANT,
  PUT_CONSTANT,
  DELETE_CONSTANT,
  SUCCESS_CONSTANT,
  ERROR_CONSTANT,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getConstants(action) {
  try {
    const res = yield call(GET, URL.CONSTANT + `?projectrepresentationid=${action.payload}`)

    yield put({
      type: SUCCESS_CONSTANT,
      data: res.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_CONSTANT,
      error: err.message,
    })
  }
}

export function* postConstant(action) {
  try {
    const res = yield call(POSTWithMessage, URL.CONSTANT, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_CONSTANT,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_CONSTANT,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_CONSTANT,
      error: err.message,
    })
  }
}
export function* putConstant(action) {
  try {
    const res = yield call(PUT, URL.CONSTANT + '/' + action.payload.constantId, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_CONSTANT,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_CONSTANT,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_CONSTANT,
      error: err.message,
    })
  }
}
export function* deleteConstant(action) {
  try {
    const res = yield call(DELETE, URL.CONSTANT + '/' + action.payload.id)
    if (!res.isError) {
      yield put({
        type: SUCCESS_CONSTANT,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_CONSTANT,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_CONSTANT,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_CONSTANT, getConstants),
    takeLatest(POST_CONSTANT, postConstant),
    takeLatest(PUT_CONSTANT, putConstant),
    takeLatest(DELETE_CONSTANT, deleteConstant),
  ])
}
