import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_FUNCTION_COSTCENTRE,
  GET_FUNCTION_COSTCENTRE_SUCCESS,
  GET_FUNCTION_COSTCENTRE_ERROR,
  POST_FUNCTION_COSTCENTRE,
  POST_FUNCTION_COSTCENTRE_SUCCESS,
  POST_FUNCTION_COSTCENTRE_ERROR,
  GET_FUNCTION_COSTCENTRE_REPORT,
  GET_FUNCTION_COSTCENTRE_REPORT_ERROR,
  GET_FUNCTION_COSTCENTRE_REPORT_SUCCESS,
  URL,
} from '../../constants'

import { GET, POST } from '../../services'

export function* getFunctionCostCentre(payload) {
  try {
    const res = yield call(
      GET,
      URL.FUNCTION_COSTCENTRE + '?costCentreInfrastructureId=' + payload.payload.costcentreId,
    )

    yield put({
      type: GET_FUNCTION_COSTCENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: GET_FUNCTION_COSTCENTRE_ERROR,
      error: err.message,
    })
  }
}

export function* getFunctionCostCentreReport(payload) {
  try {
    const res = yield call(GET, URL.FUNCTION_COSTCENTRE + '/Report/' + payload.payload)

    yield put({
      type: GET_FUNCTION_COSTCENTRE_REPORT_SUCCESS,
      data: res.value.listCostCentreInfrastructurePersonelFunction,
    })
  } catch (err) {
    yield put({
      type: GET_FUNCTION_COSTCENTRE_REPORT_ERROR,
      error: err.message,
    })
  }
}

export function* postFunctionCostCentre(action) {
  try {
    const res = yield call(POST, URL.EQUIPMENTROSTER, action.payload)

    if (res) {
      yield put({
        type: POST_FUNCTION_COSTCENTRE_SUCCESS,
        data: res,
      })
    }
  } catch (err) {
    yield put({
      type: POST_FUNCTION_COSTCENTRE_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_FUNCTION_COSTCENTRE, getFunctionCostCentre),
    takeLatest(POST_FUNCTION_COSTCENTRE, postFunctionCostCentre),
    takeLatest(GET_FUNCTION_COSTCENTRE_REPORT, getFunctionCostCentreReport),
  ])
}
