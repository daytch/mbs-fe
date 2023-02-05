import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE,
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
  EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
  EQUIPMENT_COMMISSIONING_SUMMARY,
  EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
  EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
  EQP_DISPOSSAL_VALUE_SUMMARY,
  EQP_DISPOSSAL_VALUE_SUMMARY_SUCCESS,
  EQP_DISPOSSAL_VALUE_SUMMARY_FAILURE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_FAILURE,
  EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_SUCCESS,
  URL,
} from '../../constants'
import { GET } from '../../services'

export function* getEquipmentCommissioningByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.EQP_COM_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_COMMISSIONING_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEquipmentCommissioningSummary(payload) {
  try {
    const res = yield call(GET, URL.EQP_COM_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQUIPMENT_COMMISSIONING_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQUIPMENT_COMMISSIONING_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export function* getEqpDispossalValueByCostCentre(payload) {
  try {
    const res = yield call(GET, URL.EQP_DISPOSAL_BY_COST_CENTRE + '/' + payload.payload)

    yield put({
      type: EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQP_DISPOSSAL_VALUE_BY_COST_CENTRE_FAILURE,
      error: err.message,
    })
  }
}

export function* getEqpDispossalValueSummary(payload) {
  try {
    const res = yield call(GET, URL.EQP_DISPOSAL_SUMMARY + '/' + payload.payload)

    yield put({
      type: EQP_DISPOSSAL_VALUE_SUMMARY_SUCCESS,
      data: res.value,
    })
  } catch (err) {
    yield put({
      type: EQP_DISPOSSAL_VALUE_SUMMARY_FAILURE,
      error: err.message,
    })
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(EQUIPMENT_COMMISSIONING_BY_COST_CENTRE, getEquipmentCommissioningByCostCentre),
    takeLatest(EQUIPMENT_COMMISSIONING_SUMMARY, getEquipmentCommissioningSummary),
    takeLatest(EQP_DISPOSSAL_VALUE_BY_COST_CENTRE, getEqpDispossalValueByCostCentre),
    takeLatest(EQP_DISPOSSAL_VALUE_SUMMARY, getEqpDispossalValueSummary),
  ])
}
