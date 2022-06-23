import {
  GET_MATERIALCC,
  POST_MATERIALCC,
  PUT_MATERIALCC,
  DELETE_MATERIALCC,
  ERROR_MATERIALCC,
  SUCCESS_MATERIALCC,
  URL,
} from '../../constants'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GET, POSTWithMessage, PUT, DELETE } from '../../services'

export function* getMaterialcc(action) {
  try {
    const res = yield call(GET, URL.MATERIALCC + `?costCentreId=${action.payload.costCentreId}`)
    const resMaterial = yield call(
      GET,
      URL.MATERIALS + `?projectRepresentationId=${action.payload.projectRepresentationId}`,
    )

    yield put({
      type: SUCCESS_MATERIALCC,
      data: res.value,
      materialServices: resMaterial.value,
      message: 'Load Success',
    })
  } catch (err) {
    yield put({
      type: ERROR_MATERIALCC,
      error: err.message,
    })
  }
}

export function* postMaterialcc(action) {
  try {
    const res = yield call(POSTWithMessage, URL.MATERIALCC, action.payload)

    if (!res.isError) {
      yield put({
        type: SUCCESS_MATERIALCC,
        message: 'Data has been saved!',
      })
      // yield call(getCurrencies)
    } else {
      yield put({
        type: ERROR_MATERIALCC,
        message: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_MATERIALCC,
      error: err.message,
    })
  }
}
export function* putMaterialcc(action) {
  try {
    console.log('action', action)
    const res = yield call(
      PUT,
      URL.MATERIALCC + '/' + action.payload.costCentreResourceId,
      action.payload,
    )

    if (!res.isError) {
      yield put({
        type: SUCCESS_MATERIALCC,
        message: 'Data has been saved!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_MATERIALCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_MATERIALCC,
      error: err.message,
    })
  }
}
export function* deleteMaterialcc(action) {
  try {
    const res = yield call(DELETE, URL.MATERIALCC + '/' + action.payload.id)
    console.log(res)
    if (!res.isError) {
      yield put({
        type: SUCCESS_MATERIALCC,
        message: 'Data has been deleted!',
      })
      // yield call(getInfraChecklist)
    } else {
      yield put({
        type: ERROR_MATERIALCC,
        error: res.message,
      })
    }
  } catch (err) {
    yield put({
      type: ERROR_MATERIALCC,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_MATERIALCC, getMaterialcc),
    takeLatest(POST_MATERIALCC, postMaterialcc),
    takeLatest(PUT_MATERIALCC, putMaterialcc),
    takeLatest(DELETE_MATERIALCC, deleteMaterialcc),
  ])
}
