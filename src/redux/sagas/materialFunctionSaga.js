import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  GET_MATERIAL_FUNCTION_REPORT,
  GET_MATERIAL_FUNCTION_REPORT_SUCCESS,
  GET_MATERIAL_FUNCTION_REPORT_ERROR,
  GET_MATERIAL_INFRA_REPORT,
  GET_MATERIAL_INFRA_REPORT_ERROR,
  GET_MATERIAL_INFRA_REPORT_SUCCESS,
  URL,
} from '../../constants'

import { GET } from '../../services'

export function* getMaterialFunctionReport(payload) {
  try {
    const res = yield call(GET, URL.MATERIAL_FUNCTION + '/Report/' + payload.payload)

    yield put({
      type: GET_MATERIAL_FUNCTION_REPORT_SUCCESS,
      data: res.value.listFunctionGeneralFunctionDto,
    })
  } catch (err) {
    yield put({
      type: GET_MATERIAL_FUNCTION_REPORT_ERROR,
      error: err.message,
    })
  }
}

export function* getMaterialInfraReport(payload) {
  try {
    const res = yield call(GET, URL.MATERIAL_FUNCTION_INFRA + '/Report/' + payload.payload)

    yield put({
      type: GET_MATERIAL_INFRA_REPORT_SUCCESS,
      data: res.value.listCCInfrastructureResourceDto,
    })
  } catch (err) {
    yield put({
      type: GET_MATERIAL_INFRA_REPORT_ERROR,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(GET_MATERIAL_FUNCTION_REPORT, getMaterialFunctionReport),
    takeLatest(GET_MATERIAL_INFRA_REPORT, getMaterialInfraReport),
  ])
}
