import {
  GET_LEVY,
  POST_LEVY,
  PUT_LEVY,
  DELETE_LEVY,
  ERROR_LEVY,
  SUCCESS_LEVY,
  GET_LEVY_REPORT,
  GET_LEVY_REPORT_FAILURE,
  GET_LEVY_REPORT_SUCCESS,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getLevies(action) {
  try {
    const res = yield call(GET, URL.LEVIES + `?projectrepresentationid=${action.payload}`)

    yield put({
      type: SUCCESS_LEVY,
      data: res.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_LEVY,
      error: err.message,
    })
  }
}

export function* getLevyReport(action) {
  try {
    const res = yield call(GET, URL.LEVIES + `/report/${action.payload}`)

    yield put({
      type: GET_LEVY_REPORT_SUCCESS,
      data: res.value.listLevyDto,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: GET_LEVY_REPORT_FAILURE,
      error: err.message,
    })
  }
}

export function* postLevy(action) {
  try {
    const res = yield call(POSTWithMessage, URL.LEVIES, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVY,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_LEVY,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVY,
      error: err.message,
    })
  }
}
export function* putLevy(action) {
  try {
    console.log('action', action)
    const res = yield call(PUT, URL.LEVIES + '/' + action.payload.levyId, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVY,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_LEVY,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVY,
      error: err.message,
    })
  }
}
export function* deleteLevy(action) {
  try {
    const res = yield call(DELETE, URL.LEVIES + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_LEVY,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_LEVY,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_LEVY,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_LEVY, getLevies),
    takeLatest(POST_LEVY, postLevy),
    takeLatest(PUT_LEVY, putLevy),
    takeLatest(DELETE_LEVY, deleteLevy),
    takeLatest(GET_LEVY_REPORT, getLevyReport),
  ])
}
