import {
  GET_INFRASTRUCTURECC,
  POST_INFRASTRUCTURECC,
  PUT_INFRASTRUCTURECC,
  DELETE_INFRASTRUCTURECC,
  ERROR_INFRASTRUCTURECC,
  SUCCESS_INFRASTRUCTURECC,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getInfrastructurecc(action) {
  try {
    const res = yield call(
      GET,
      URL.INFRASTRUCTURECC + `?costCentreId=${action.payload.costCentreId}`,
    )
    const resInfra = yield call(
      GET,
      URL.RESOURCES_INFRA + `?projectRepresentationId=${action.payload.projectRepresentationId}`,
    )

    yield put({
      type: SUCCESS_INFRASTRUCTURECC,
      data: res.value,
      infrastructures: resInfra.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}

export function* postInfrastructurecc(action) {
  try {
    const res = yield call(POSTWithMessage, URL.INFRASTRUCTURECC, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}
export function* putInfrastructurecc(action) {
  try {
    console.log('action', action)
    const res = yield call(
      PUT,
      URL.INFRASTRUCTURECC + '/' + action.payload.costCentreInfrastructureId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}
export function* deleteInfrastructurecc(action) {
  try {
    const res = yield call(DELETE, URL.INFRASTRUCTURECC + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_INFRASTRUCTURECC,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_INFRASTRUCTURECC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_INFRASTRUCTURECC,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_INFRASTRUCTURECC, getInfrastructurecc),
    takeLatest(POST_INFRASTRUCTURECC, postInfrastructurecc),
    takeLatest(PUT_INFRASTRUCTURECC, putInfrastructurecc),
    takeLatest(DELETE_INFRASTRUCTURECC, deleteInfrastructurecc),
  ])
}
