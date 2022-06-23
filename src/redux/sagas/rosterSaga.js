import {
  GET_ROSTER,
  POST_ROSTER,
  PUT_ROSTER,
  DELETE_ROSTER,
  SUCCESS_ROSTER,
  ERROR_ROSTER,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getRosters(action) {
  try {
    const res = yield call(GET, URL.ROSTER + `?projectrepresentationid=${action.payload}`)

    yield put({
      type: SUCCESS_ROSTER,
      data: res.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_ROSTER,
      error: err.message,
    })
  }
}

export function* postRoster(action) {
  try {
    const res = yield call(POSTWithMessage, URL.ROSTER, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_ROSTER,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_ROSTER,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_ROSTER,
      error: err.message,
    })
  }
}
export function* putRoster(action) {
  try {
    const res = yield call(PUT, URL.ROSTER + '/' + action.payload.rosterId, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_ROSTER,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_ROSTER,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_ROSTER,
      error: err.message,
    })
  }
}
export function* deleteRoster(action) {
  try {
    const res = yield call(DELETE, URL.ROSTER + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_ROSTER,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_ROSTER,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_ROSTER,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_ROSTER, getRosters),
    takeLatest(POST_ROSTER, postRoster),
    takeLatest(PUT_ROSTER, putRoster),
    takeLatest(DELETE_ROSTER, deleteRoster),
  ])
}
