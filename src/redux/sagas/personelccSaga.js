import {
  GET_PERSONELCC,
  POST_PERSONELCC,
  PUT_PERSONELCC,
  DELETE_PERSONELCC,
  ERROR_PERSONELCC,
  SUCCESS_PERSONELCC,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getPersonelcc(action) {
  try {
    const res = yield call(GET, URL.PERSONELCC + `?costCentreId=${action.payload.costCentreId}`)
    const employeeTypes = yield call(
      GET,
      URL.EMPLOYEE_TYPE + `?projectRepresentationId=${action.payload.projectRepresentationId}`,
    )
    yield put({
      type: SUCCESS_PERSONELCC,
      data: res.value,
      employeeTypes: employeeTypes.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_PERSONELCC,
      error: err.message,
    })
  }
}

export function* postPersonelcc(action) {
  try {
    const res = yield call(POSTWithMessage, URL.PERSONELCC, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_PERSONELCC,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_PERSONELCC,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_PERSONELCC,
      error: err.message,
    })
  }
}
export function* putPersonelcc(action) {
  try {
    console.log('action', action)
    const res = yield call(
      PUT,
      URL.PERSONELCC + '/' + action.payload.costCentreEmployeeTypeId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_PERSONELCC,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_PERSONELCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_PERSONELCC,
      error: err.message,
    })
  }
}
export function* deletePersonelcc(action) {
  try {
    const res = yield call(DELETE, URL.PERSONELCC + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_PERSONELCC,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_PERSONELCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_PERSONELCC,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_PERSONELCC, getPersonelcc),
    takeLatest(POST_PERSONELCC, postPersonelcc),
    takeLatest(PUT_PERSONELCC, putPersonelcc),
    takeLatest(DELETE_PERSONELCC, deletePersonelcc),
  ])
}
